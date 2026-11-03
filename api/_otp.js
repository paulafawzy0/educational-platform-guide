// api/_otp.js
// أدوات التحقق (OTP) المشتركة بين Vercel و Cloudflare — نفس الملف بالظبط على المنصتين.
//  - مفيش أي استيراد من node:* ومفيش process.env هنا. المتغيرات بتتبعت لـ createOtp(env):
//      Vercel:     createOtp(process.env)
//      Cloudflare: createOtp(context.env)
//  - التشفير كله بـ Web Crypto (موجود في Node 20+ وفي Workers من غير أي إعدادات).
//  - الملفات اللي بتبدأ بـ _ جوه api/ مش بتتحول لـ Endpoint على Vercel، بتتستورد بس.

export const OTP_TTL_SEC = 600; // الكود صالح 10 دقايق
export const OTP_MAX_ATTEMPTS = 5; // أقصى محاولات غلط للجلسة، بعدها تتقفل
export const OTP_MAX_SENDS = 3; // أقصى عدد إرسالات للجلسة (الأول + إعادة الإرسال)
export const OTP_COOLDOWN_SEC = 60; // الفاصل بين إعادة إرسال وإعادة إرسال
export const OTP_EMAIL_PER_HOUR = 3; // أقصى أكواد في الساعة لنفس الإيميل
export const OTP_START_PER_IP_HOUR = 10; // أقصى طلبات otp_start في الساعة لكل IP

export const SID_RE = /^[A-Za-z0-9_-]{16,64}$/;

const enc = new TextEncoder();

// ──────────────────────────────────────────────────────────────
// أدوات تشفير (Web Crypto)
// ──────────────────────────────────────────────────────────────
function toHex(buf) {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function toBase64Url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function newSid() {
  return toBase64Url(globalThis.crypto.getRandomValues(new Uint8Array(18))); // 24 حرف
}

// كود 6 أرقام عشوائي بدون انحياز (rejection sampling)
export function newCode() {
  const LIMIT = 4294967296 - (4294967296 % 1000000);
  const buf = new Uint32Array(1);
  do {
    globalThis.crypto.getRandomValues(buf);
  } while (buf[0] >= LIMIT);
  return String(buf[0] % 1000000).padStart(6, "0");
}

export async function shortHash(s) {
  const d = await globalThis.crypto.subtle.digest("SHA-256", enc.encode(String(s)));
  return toHex(d).slice(0, 24);
}

// مقارنة بزمن ثابت (بديل timingSafeEqual بتاع Node، بتشتغل في Workers كمان)
export function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function maskEmail(e) {
  const [u, d] = String(e).split("@");
  if (!d) return e;
  return (u.length <= 2 ? u[0] + "*" : u.slice(0, 2) + "***") + "@" + d;
}

// ──────────────────────────────────────────────────────────────
// كل الدوال اللي محتاجة متغيّرات بيئة
// ──────────────────────────────────────────────────────────────
export function createOtp(env) {
  const E = env || {};

  // ── Redis (Upstash REST) — بدون مكتبات ──
  // بيقبل أسماء Upstash المباشرة أو بتاعة Vercel Marketplace (KV_REST_API_*)
  const rUrl = String(E.UPSTASH_REDIS_REST_URL || E.KV_REST_API_URL || "").replace(/\/+$/, "");
  const rTok = E.UPSTASH_REDIS_REST_TOKEN || E.KV_REST_API_TOKEN || "";
  const secret = E.OTP_SECRET || E.TG_BOT_TOKEN || E.TELEGRAM_BOT_TOKEN || "";

  const redisConfigured = () => !!(rUrl && rTok);
  const secretConfigured = () => !!secret;

  async function rFetch(path, body) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    try {
      const r = await fetch(rUrl + path, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${rTok}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j) throw new Error("REDIS_HTTP_" + r.status);
      return j;
    } finally {
      clearTimeout(timer);
    }
  }

  async function redis(cmd) {
    const j = await rFetch("", cmd);
    if (j.error) throw new Error("REDIS: " + j.error);
    return j.result;
  }

  async function redisPipeline(cmds) {
    const j = await rFetch("/pipeline", cmds);
    if (!Array.isArray(j)) throw new Error("REDIS_PIPELINE");
    return j.map((x) => {
      if (x.error) throw new Error("REDIS: " + x.error);
      return x.result;
    });
  }

  // عدّاد بنافذة زمنية: SET NX (ينشئ المفتاح مع انتهاء الصلاحية) + INCR في نفس الطلب (pipeline)
  async function rateLimit(key, limit, windowSec) {
    const res = await redisPipeline([
      ["SET", key, "0", "EX", String(windowSec), "NX"],
      ["INCR", key],
    ]);
    const count = Number(res[1]) || 0;
    return { allowed: count <= limit, count };
  }

  // قراءة العدّاد من غير ما نزوّده
  async function rateCount(key) {
    const v = await redis(["GET", key]);
    return Number(v) || 0;
  }

  // ── جلسات الـ OTP ──
  async function hashCode(sid, code) {
    if (!secret) throw new Error("OTP_SECRET missing");
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const sig = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(`${sid}:${code}`));
    return toHex(sig);
  }

  async function otpGet(sid) {
    const raw = await redis(["GET", `otp:${sid}`]);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  async function otpSet(sid, obj, ttl = OTP_TTL_SEC) {
    await redis(["SET", `otp:${sid}`, JSON.stringify(obj), "EX", String(ttl)]);
  }

  async function otpDelete(sid) {
    await redisPipeline([
      ["DEL", `otp:${sid}`],
      ["DEL", `otp:att:${sid}`],
    ]);
  }

  // تحقق من الكود. لو صح: الجلسة بتتمسح (استخدام مرة واحدة) وبنرجّع بياناتها.
  // reason: EXPIRED | BAD_CODE | LOCKED | WRONG (مع left = المحاولات الباقية)
  async function otpVerify(sid, code) {
    if (!SID_RE.test(sid || "")) return { ok: false, reason: "EXPIRED" };
    if (!/^\d{6}$/.test(code || "")) return { ok: false, reason: "BAD_CODE" };

    const s = await otpGet(sid);
    if (!s || s.type !== "email" || !s.codeHash) return { ok: false, reason: "EXPIRED" };

    // عدّاد المحاولات (ذري). أي محاولة بعد الحد الأقصى = الجلسة مقفولة.
    const attKey = `otp:att:${sid}`;
    const { count: att } = await rateLimit(attKey, OTP_MAX_ATTEMPTS, OTP_TTL_SEC * 3);
    if (att > OTP_MAX_ATTEMPTS) {
      await otpDelete(sid);
      return { ok: false, reason: "LOCKED" };
    }

    const match = timingSafeEqual(await hashCode(sid, code), String(s.codeHash));
    if (!match) {
      if (att >= OTP_MAX_ATTEMPTS) {
        await otpDelete(sid); // المحاولة الخامسة الغلط بتقفل الجلسة فورًا
        return { ok: false, reason: "LOCKED" };
      }
      return { ok: false, reason: "WRONG", left: OTP_MAX_ATTEMPTS - att };
    }

    // DEL ذري: لو اتنين بعتوا نفس الكود الصح في نفس اللحظة، واحد بس ياخد 1
    const deleted = await redis(["DEL", `otp:${sid}`]);
    if (deleted !== 1) return { ok: false, reason: "EXPIRED" };
    await redis(["DEL", attKey]);
    return { ok: true, session: s };
  }

  // ── إرسال الإيميل ──
  //  - Brevo (الأساسي): مفيش دومين مطلوب، بس لازم إيميل المُرسِل يكون متأكد في حسابك
  //  - Resend (بديل): من غير دومين متأكد بيبعت لإيميل حسابك إنتِ بس
  async function sendOtpEmail(to, code) {
    const subject = `رمز التأكيد: ${code}`;
    const text =
      `رمز التأكيد بتاعك هو: ${code}\n\n` +
      `الرمز صالح 10 دقايق. اكتبه في صفحة الاقتراحات علشان نكمّل إرسال رسالتك.\n` +
      `لو إنت مطلبتش الرمز ده، تجاهل الرسالة.`;
    const html =
      `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.8">` +
      `<p>رمز التأكيد بتاعك:</p>` +
      `<p style="font-size:30px;font-weight:700;letter-spacing:6px;direction:ltr">${code}</p>` +
      `<p>الرمز صالح 10 دقايق. اكتبه في صفحة الاقتراحات علشان نكمّل إرسال رسالتك.</p>` +
      `<p style="color:#777">لو إنت مطلبتش الرمز ده، تجاهل الرسالة.</p></div>`;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
      let r;
      if (E.BREVO_API_KEY) {
        if (!E.MAIL_FROM_EMAIL) throw new Error("MAIL_FROM_EMAIL missing");
        r = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: { "api-key": E.BREVO_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({
            sender: { name: E.MAIL_FROM_NAME || "منصة المواد", email: E.MAIL_FROM_EMAIL },
            to: [{ email: to }],
            subject,
            textContent: text,
            htmlContent: html,
          }),
          signal: ctrl.signal,
        });
      } else if (E.RESEND_API_KEY) {
        r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${E.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: E.MAIL_FROM || "Study Platform <onboarding@resend.dev>",
            to: [to],
            subject,
            text,
            html,
          }),
          signal: ctrl.signal,
        });
      } else {
        throw new Error("NO_MAIL_PROVIDER");
      }
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        throw new Error(`MAIL_HTTP_${r.status} ${t.slice(0, 200)}`);
      }
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    redisConfigured,
    secretConfigured,
    redis,
    rateLimit,
    rateCount,
    hashCode,
    otpGet,
    otpSet,
    otpDelete,
    otpVerify,
    sendOtpEmail,
  };
}
