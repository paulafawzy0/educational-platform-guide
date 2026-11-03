// api/_feedback-core.js
// منطق /api/feedback كله في مكان واحد — مشترك بين Vercel (api/feedback.js) و Cloudflare (functions/api/feedback.js)
// علشان السلوك يبقى واحد بالظبط على المنصتين. الملف مبيعرفش أي منصة:
//   - المتغيّرات بتتبعت في env (Vercel: process.env | Cloudflare: context.env)
//   - مفيش Buffer ولا node:* — بس Web APIs (fetch / Blob / FormData / atob / crypto.subtle)
//   - حفظ الشيت اختياري: لو sheets مش متبعتة (Cloudflare دلوقتي) بيتخطّى
// بيرجّع { status, json } والـ adapter هو اللي يبعتها.

import {
  createOtp,
  newSid,
  newCode,
  shortHash,
  maskEmail,
  OTP_TTL_SEC,
  OTP_MAX_SENDS,
  OTP_COOLDOWN_SEC,
  OTP_EMAIL_PER_HOUR,
  OTP_START_PER_IP_HOUR,
  SID_RE,
} from "./_otp.js";

// ──────────────────────────────────────────────────────────────
// ثوابت
// ──────────────────────────────────────────────────────────────
const MAX_TEXT_LEN = 1000;
const MAX_NAME_LEN = 60;
const MAX_REF_LEN = 120;
const MAX_CONTACT_LEN = 100;
const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 1 * 1024 * 1024; // 1MB لكل صورة
const MAX_TOTAL_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB إجمالي
const DAILY_LIMIT = 5; // ★ 5 رسائل/يوم/IP
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_TIMEOUT_MS = 6000;
const TELEGRAM_TIMEOUT_MS = 15000;

// ★ الإيميل هو الوسيلة الوحيدة اللي بتعدّي من السيرفر (بكود تأكيد).
//   واتساب / تليجرام بيتفتحوا من الموقع مباشرة (wa.me / t.me)، والاتصال الهاتفي اتشال.
const CONTACT_LABELS = {
  email: "إيميل",
};
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// ──────────────────────────────────────────────────────────────
// ★ Rate Limit (In-Memory) — احتياطي لو Redis مش متاح
// ⚠️ كل instance/isolate جديدة بتبدأ من صفر.
// ──────────────────────────────────────────────────────────────
const _rateStore = new Map(); // ip → { date, count }
const RATE_CLEANUP = 60 * 60 * 1000;
let _lastCleanup = Date.now();

function _cleanupRate() {
  const now = Date.now();
  if (now - _lastCleanup < RATE_CLEANUP) return;
  _lastCleanup = now;
  const today = new Date().toISOString().slice(0, 10);
  for (const [ip, rec] of _rateStore.entries()) {
    if (rec.date !== today) _rateStore.delete(ip);
  }
}

function checkRateLimit(ip) {
  _cleanupRate();
  const today = new Date().toISOString().slice(0, 10);
  const rec = _rateStore.get(ip);

  if (!rec || rec.date !== today) {
    _rateStore.set(ip, { date: today, count: 1 });
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }
  if (rec.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  rec.count++;
  return { allowed: true, remaining: DAILY_LIMIT - rec.count };
}

// ──────────────────────────────────────────────────────────────
// أدوات مساعدة
// ──────────────────────────────────────────────────────────────
function bad(status, code, error) {
  return { status, json: { ok: false, code, error } };
}

/**
 * ★ تنظيف شامل للنص:
 *   - حذف رموز التحكم
 *   - حذف RTL/LTR المخفي
 *   - حذف وسوم HTML/سكريبتات
 *   - حذف backtick و backslash
 *   - توحيد المسافات + حد أقصى للطول
 */
function sanitize(str, maxLen) {
  if (typeof str !== "string") return "";
  let s = str.replace(/[\u0000-\u001F\u007F]/g, "");
  s = s.replace(/[\u202A-\u202E\u200E\u200F]/g, "");
  s = s.replace(/<[^>]*>/g, "");
  s = s.replace(
    /(javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on\w+\s*=\s*["']?)/gi,
    "",
  );
  s = s.replace(/[\\`]/g, "");
  s = s
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (typeof maxLen === "number" && maxLen > 0 && s.length > maxLen) {
    s = s.slice(0, maxLen);
  }
  return s;
}

/**
 * ★ فك ترميز Data URL مع تحقق صارم من MIME
 *   (atob بدل Buffer علشان يشتغل على Cloudflare من غير nodejs_compat)
 */
function decodeDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") return null;
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|jpg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/i,
  );
  if (!match) return null;
  try {
    const binaryStr = atob(match[2]);
    const len = binaryStr.length;
    if (!len) return null;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i++) buffer[i] = binaryStr.charCodeAt(i);
    return { mime: match[1].toLowerCase(), buffer };
  } catch {
    return null;
  }
}

function safeFileName(name, fallback = "image.jpg") {
  if (!name) return fallback;
  const s = String(name)
    .replace(/[^\w.\-]+/g, "_")
    .slice(0, 60);
  return s || fallback;
}

// ──────────────────────────────────────────────────────────────
// fetch مع Timeout
// ──────────────────────────────────────────────────────────────
async function fetchWithTimeout(url, opts, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ──────────────────────────────────────────────────────────────
// reCAPTCHA
// ──────────────────────────────────────────────────────────────
async function verifyRecaptcha(env, token, remoteip) {
  const secret = env.RECAPTCHA_SECRET;
  if (!secret) {
    console.error("RECAPTCHA_SECRET not set");
    return { ok: false, reason: "CONFIG" };
  }
  if (!token || typeof token !== "string" || token.length > 5000) {
    return { ok: false, reason: "MISSING_TOKEN" };
  }

  try {
    const params = new URLSearchParams({ secret, response: token });
    if (remoteip && remoteip !== "unknown") params.append("remoteip", remoteip);

    const r = await fetchWithTimeout(
      RECAPTCHA_VERIFY_URL,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      },
      RECAPTCHA_TIMEOUT_MS,
    );
    const j = await r.json().catch(() => ({ success: false }));

    if (!j.success) {
      console.warn("reCAPTCHA failed:", j["error-codes"] || j);
      return { ok: false, reason: "CAPTCHA_FAILED" };
    }
    return { ok: true };
  } catch (err) {
    console.error("reCAPTCHA verify exception:", err);
    return { ok: false, reason: "CAPTCHA_ERROR" };
  }
}

// reCAPTCHA gate: بيرجّع null لو تمام، أو الرد الجاهز لو فشل
async function captchaGate(env, token, ip) {
  const cap = await verifyRecaptcha(env, token, ip);
  if (cap.ok) return null;
  if (cap.reason === "CONFIG") {
    return bad(500, "CONFIG", "إعدادات reCAPTCHA ناقصة على السيرفر");
  }
  if (cap.reason === "CAPTCHA_ERROR") {
    return bad(503, "CAPTCHA_ERROR", "تعذّر التحقق حاليًا");
  }
  return bad(400, "CAPTCHA_FAILED", "فشل التحقق البشري — حاول تاني");
}

// ──────────────────────────────────────────────────────────────
// Telegram (إشعارات للبوت الخاص بيكي بس)
// ──────────────────────────────────────────────────────────────
async function tgSendMessage(botToken, chatId, text) {
  const r = await fetchWithTimeout(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        // ★ بدون parse_mode → يمنع Markdown/HTML injection
        disable_web_page_preview: true,
      }),
    },
    TELEGRAM_TIMEOUT_MS,
  );
  return r.json().catch(() => ({ ok: false }));
}

async function sendPhotoToTelegram(botToken, chatId, img) {
  const decoded = decodeDataUrl(img && img.data);
  if (!decoded) return false;
  if (decoded.buffer.length > MAX_IMAGE_BYTES) return false;

  const name = safeFileName(img.name);
  const form = new FormData();
  form.append("chat_id", String(chatId));
  form.append("caption", `📷 ${name}`.slice(0, 1024));
  form.append("photo", new Blob([decoded.buffer], { type: decoded.mime }), name);

  try {
    const r = await fetchWithTimeout(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      { method: "POST", body: form },
      TELEGRAM_TIMEOUT_MS,
    );
    const j = await r.json().catch(() => ({ ok: false }));
    return !!j.ok;
  } catch (err) {
    console.warn("sendPhoto exception:", err);
    return false;
  }
}

async function sendMediaGroupToTelegram(botToken, chatId, images) {
  const decoded = images
    .map((img) => ({ img, decoded: decodeDataUrl(img && img.data) }))
    .filter((x) => x.decoded && x.decoded.buffer.length <= MAX_IMAGE_BYTES);

  if (!decoded.length) return 0;

  const form = new FormData();
  form.append("chat_id", String(chatId));

  const media = decoded.map((x, i) => ({
    type: "photo",
    media: `attach://photo_${i}`,
    caption: i === 0 ? `📷 مرفقات (${decoded.length})` : undefined,
  }));
  form.append("media", JSON.stringify(media));

  decoded.forEach((x, i) => {
    const name = safeFileName(x.img.name, `photo_${i}.jpg`);
    form.append(
      `photo_${i}`,
      new Blob([x.decoded.buffer], { type: x.decoded.mime }),
      name,
    );
  });

  try {
    const r = await fetchWithTimeout(
      `https://api.telegram.org/bot${botToken}/sendMediaGroup`,
      { method: "POST", body: form },
      TELEGRAM_TIMEOUT_MS,
    );
    const j = await r.json().catch(() => ({ ok: false }));
    if (!j.ok) {
      console.warn("sendMediaGroup failed:", j.description);
      return 0;
    }
    return decoded.length;
  } catch (err) {
    console.warn("sendMediaGroup exception:", err);
    return 0;
  }
}

// ──────────────────────────────────────────────────────────────
// ★ الحد اليومي (Redis لو متاح — غير كده الذاكرة)
// ──────────────────────────────────────────────────────────────
const todayKey = () => new Date().toISOString().slice(0, 10);

async function dailyPeek(otp, ip) {
  if (otp.redisConfigured()) {
    try {
      const c = await otp.rateCount(`rl:day:${ip}:${todayKey()}`);
      return { allowed: c < DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - c) };
    } catch (e) {
      console.warn("dailyPeek redis error:", e.message);
    }
  }
  const rec = _rateStore.get(ip);
  const c = rec && rec.date === todayKey() ? rec.count : 0;
  return { allowed: c < DAILY_LIMIT, remaining: Math.max(0, DAILY_LIMIT - c) };
}

async function dailyHit(otp, ip) {
  if (otp.redisConfigured()) {
    try {
      const r = await otp.rateLimit(`rl:day:${ip}:${todayKey()}`, DAILY_LIMIT, 86400);
      return { allowed: r.allowed, remaining: Math.max(0, DAILY_LIMIT - r.count) };
    } catch (e) {
      console.warn("dailyHit redis error:", e.message);
    }
  }
  return checkRateLimit(ip);
}

// ──────────────────────────────────────────────────────────────
// ★ OTP — بدء التحقق: reCAPTCHA ثم إرسال كود 6 أرقام على الإيميل
// ──────────────────────────────────────────────────────────────
async function handleOtpStart(env, otp, ip, body) {
  if (body.website && String(body.website).trim() !== "") {
    return bad(200, "HONEYPOT", "تم رفض الطلب");
  }
  if (!otp.redisConfigured() || !otp.secretConfigured()) {
    console.error("Redis (Upstash) / OTP_SECRET env vars missing");
    return bad(500, "CONFIG", "التحقق مش مفعّل على السيرفر");
  }

  if (sanitize(body.contactType, 20) !== "email") {
    return bad(400, "INVALID", "نوع وسيلة التواصل غير مدعوم");
  }

  const gate = await captchaGate(env, body.recaptchaToken, ip);
  if (gate) return gate;

  try {
    const ipRl = await otp.rateLimit(`rl:otp:ip:${ip}`, OTP_START_PER_IP_HOUR, 3600);
    if (!ipRl.allowed) {
      return bad(429, "RATE", "طلبات تحقق كتير — جرّب بعد شوية");
    }

    const email = sanitize(body.contactValue, MAX_CONTACT_LEN).toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return bad(400, "INVALID", "صيغة الإيميل غير صحيحة");
    }
    const em = await otp.rateLimit(
      `rl:otp:mail:${await shortHash(email)}`,
      OTP_EMAIL_PER_HOUR,
      3600,
    );
    if (!em.allowed) {
      return bad(429, "RATE_EMAIL", "اتبعتلك كود كتير على الإيميل ده — جرّب بعد ساعة");
    }

    const sid = newSid();
    const code = newCode();
    await otp.otpSet(sid, {
      type: "email",
      value: email,
      codeHash: await otp.hashCode(sid, code),
      sends: 1,
      createdAt: Date.now(),
    });
    try {
      await otp.sendOtpEmail(email, code);
    } catch (err) {
      console.error("sendOtpEmail failed:", err.message);
      await otp.otpDelete(sid);
      return bad(502, "MAIL", "تعذّر إرسال الإيميل");
    }
    return {
      status: 200,
      json: { ok: true, sid, type: "email", maskedTo: maskEmail(email), ttl: OTP_TTL_SEC },
    };
  } catch (err) {
    console.error("otp_start exception:", err);
    return bad(500, "SERVER", "خطأ في السيرفر");
  }
}

// ──────────────────────────────────────────────────────────────
// ★ OTP — إعادة إرسال الكود (من غير reCAPTCHA جديد، بس بحدود)
// ──────────────────────────────────────────────────────────────
async function handleOtpResend(otp, body) {
  if (!otp.redisConfigured() || !otp.secretConfigured()) {
    return bad(500, "CONFIG", "التحقق مش مفعّل على السيرفر");
  }
  const sid = String(body.sid || "");
  if (!SID_RE.test(sid)) return bad(400, "OTP_EXPIRED", "انتهت صلاحية الجلسة");

  try {
    const s = await otp.otpGet(sid);
    if (!s || s.type !== "email") {
      return bad(400, "OTP_EXPIRED", "انتهت صلاحية الجلسة");
    }
    if ((s.sends || 0) >= OTP_MAX_SENDS) {
      return bad(429, "RATE", "وصلت للحد الأقصى لإعادة الإرسال");
    }
    const cool = await otp.rateLimit(`rl:otp:cool:${sid}`, 1, OTP_COOLDOWN_SEC);
    if (!cool.allowed) {
      return bad(429, "COOLDOWN", "استنى دقيقة قبل إعادة الإرسال");
    }
    const em = await otp.rateLimit(
      `rl:otp:mail:${await shortHash(s.value)}`,
      OTP_EMAIL_PER_HOUR,
      3600,
    );
    if (!em.allowed) {
      return bad(429, "RATE_EMAIL", "اتبعتلك كود كتير على الإيميل ده — جرّب بعد ساعة");
    }

    const code = newCode();
    s.codeHash = await otp.hashCode(sid, code);
    s.sends = (s.sends || 0) + 1;
    await otp.otpSet(sid, s); // بيجدّد صلاحية الجلسة 10 دقايق من آخر كود
    await otp.redis(["DEL", `otp:att:${sid}`]); // محاولات الإدخال تبدأ من صفر مع كل كود جديد
    try {
      await otp.sendOtpEmail(s.value, code);
    } catch (err) {
      console.error("sendOtpEmail (resend) failed:", err.message);
      return bad(502, "MAIL", "تعذّر إرسال الإيميل");
    }
    return { status: 200, json: { ok: true, maskedTo: maskEmail(s.value) } };
  } catch (err) {
    console.error("otp_resend exception:", err);
    return bad(500, "SERVER", "خطأ في السيرفر");
  }
}

// ──────────────────────────────────────────────────────────────
// ★ تحقق reCAPTCHA بس (واتساب / تليجرام): الموقع بيفتح المحادثة بعد ما التحقق ينجح
//   رقم الواتساب / يوزر تليجرام بيتقروا من Environment Variables ومبيتبعتوش غير بعد نجاح reCAPTCHA
// ──────────────────────────────────────────────────────────────
async function handleCaptchaCheck(env, ip, body) {
  if (body.website && String(body.website).trim() !== "") {
    return bad(200, "HONEYPOT", "تم رفض الطلب");
  }
  const gate = await captchaGate(env, body.recaptchaToken, ip);
  if (gate) return gate;

  const kind = sanitize(body.kind, 20);
  let base = "";
  if (kind === "whatsapp") {
    const n = String(env.WHATSAPP_NUMBER || "").replace(/\D/g, "");
    if (/^\d{8,15}$/.test(n)) base = `https://wa.me/${n}`;
  } else if (kind === "telegram") {
    const u = String(env.TELEGRAM_USERNAME || "").replace(/^@/, "");
    if (/^[A-Za-z0-9_]{5,32}$/.test(u)) base = `https://t.me/${u}`;
  } else {
    return bad(400, "INVALID", "نوع غير مدعوم");
  }
  if (!base) {
    console.error("WHATSAPP_NUMBER / TELEGRAM_USERNAME env var missing");
    return bad(500, "CONFIG", "بيانات التواصل مش متضبطة على السيرفر");
  }
  return { status: 200, json: { ok: true, base } };
}

// ──────────────────────────────────────────────────────────────
// الـ Handler المشترك
// ──────────────────────────────────────────────────────────────
export async function handleFeedback({ method, contentType, ip, body, env, sheets }) {
  env = env || {};
  ip = ip || "unknown";

  // 1) Method
  if (method !== "POST") {
    return bad(405, "METHOD", "Method Not Allowed");
  }

  // 2) Content-Type
  if (!String(contentType || "").includes("application/json")) {
    return bad(415, "INVALID", "Content-Type غير مدعوم");
  }

  // 3) الـ Body (null = الـ adapter ما قدرش يقرا JSON)
  if (body === null) return bad(400, "INVALID", "JSON غير صالح");
  body = body && typeof body === "object" && !Array.isArray(body) ? body : {};

  const otp = createOtp(env);

  // 3.1) الإجراءات: otp_start / otp_resend / captcha_check
  if (body.action === "otp_start") return handleOtpStart(env, otp, ip, body);
  if (body.action === "otp_resend") return handleOtpResend(otp, body);
  if (body.action === "captcha_check") return handleCaptchaCheck(env, ip, body);

  const { channel, type, name, contactType, contactValue, ref, text, images, website, recaptchaToken } =
    body;

  // ★ الإيميل هو الوسيلة الوحيدة المسموحة هنا (أي phone / whatsapp / telegram ← رفض)
  //   بنرفضها قبل ما ناكل من الحد اليومي أو نستهلك reCAPTCHA
  const cleanCType = sanitize(contactType, 20);
  if (cleanCType && !CONTACT_LABELS[cleanCType]) {
    return bad(400, "INVALID", "نوع وسيلة التواصل غير مدعوم");
  }
  const needsOtp = cleanCType === "email";

  // 3.2) ★ Rate Limit — قبل أي حاجة
  //   - من غير إيميل: بنحسب الطلب فورًا (يمنع إرهاق reCAPTCHA/Telegram)
  //   - مع الإيميل: بنفحص بس، وبنحسب بعد نجاح الكود (غلطة في الكود ما تاكلش من الحد اليومي)
  let rl = needsOtp ? await dailyPeek(otp, ip) : await dailyHit(otp, ip);
  if (!rl.allowed) {
    return bad(429, "RATE", "تجاوزت الحد اليومي (5 رسائل)");
  }

  // 4) Honeypot
  if (website && String(website).trim() !== "") {
    return bad(200, "HONEYPOT", "تم رفض الطلب");
  }

  // 5) reCAPTCHA — مع الإيميل بيتحقق منه وقت بدء الـ OTP، فمش مطلوب تاني في الإرسال النهائي
  if (!needsOtp) {
    const gate = await captchaGate(env, recaptchaToken, ip);
    if (gate) return gate;
  }

  // 6) القناة
  if (channel && channel !== "tg") {
    return bad(400, "INVALID", "قناة الإرسال غير مدعومة");
  }

  // 7) تنظيف الحقول
  const cleanText = sanitize(text, MAX_TEXT_LEN);
  const cleanName = sanitize(name, MAX_NAME_LEN);
  const cleanRef = sanitize(ref, MAX_REF_LEN);
  const cleanType = sanitize(type, 40);
  const cleanCVal = sanitize(contactValue, MAX_CONTACT_LEN);

  // 8) النص
  if (!cleanText) return bad(400, "INVALID", "النص مطلوب");
  if (cleanText.length < 5) return bad(400, "INVALID", "النص قصير جدًا");
  if (cleanText.length > MAX_TEXT_LEN) return bad(400, "BIG", "النص طويل جدًا");
  if (/^(.)\1{4,}$/.test(cleanText)) return bad(400, "INVALID", "النص غير واضح");
  const urlCount = (cleanText.match(/https?:\/\//gi) || []).length;
  if (urlCount > 2) return bad(400, "INVALID", "عدد الروابط كبير");

  // 9) الاسم
  if (cleanName) {
    if (cleanName.length < 2) {
      return bad(400, "INVALID", "الاسم قصير جدًا");
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s.'\-]{2,60}$/.test(cleanName)) {
      return bad(400, "INVALID", "الاسم يحتوي على رموز غير مسموحة");
    }
  }

  // 10) الإيميل
  if (needsOtp) {
    if (!cleanCVal) {
      return bad(400, "INVALID", "قيمة وسيلة التواصل مطلوبة");
    }
    if (!EMAIL_RE.test(cleanCVal)) {
      return bad(400, "INVALID", "صيغة الإيميل غير صحيحة");
    }
  }

  // 11) الصور
  const rawImages = Array.isArray(images) ? images : [];
  if (rawImages.length > MAX_IMAGES) {
    return bad(400, "BIG", "عدد الصور كبير");
  }

  const imageList = [];
  let totalImgBytes = 0;

  for (let i = 0; i < rawImages.length; i++) {
    const im = rawImages[i];
    if (!im || typeof im !== "object") continue;

    const decoded = decodeDataUrl(im.data);
    if (!decoded) {
      return bad(400, "INVALID", `صورة رقم ${i + 1} غير صالحة`);
    }
    if (decoded.buffer.length > MAX_IMAGE_BYTES) {
      return bad(400, "BIG", `صورة رقم ${i + 1} أكبر من 1 ميجا`);
    }
    totalImgBytes += decoded.buffer.length;
    if (totalImgBytes > MAX_TOTAL_IMAGE_BYTES) {
      return bad(400, "BIG", "إجمالي حجم الصور كبير");
    }
    imageList.push({
      name: safeFileName(im.name),
      data: im.data,
    });
  }

  // 12) ★ التحقق من كود التأكيد (إيميل) — الكود بيتستهلك هنا (مرة واحدة)
  let verified = null; // { label, sType, sVal }
  if (needsOtp) {
    if (!otp.redisConfigured() || !otp.secretConfigured()) {
      console.error("Redis (Upstash) / OTP_SECRET env vars missing");
      return bad(500, "CONFIG", "التحقق مش مفعّل على السيرفر");
    }
    const o = body.otp && typeof body.otp === "object" ? body.otp : {};
    let v;
    try {
      v = await otp.otpVerify(String(o.sid || ""), String(o.code || ""));
    } catch (err) {
      console.error("otpVerify exception:", err);
      return bad(503, "OTP_ERROR", "تعذّر التحقق حاليًا");
    }
    if (!v.ok) {
      return {
        status: 400,
        json: {
          ok: false,
          code: "OTP_" + v.reason,
          error: "فشل التحقق من الكود",
          left: v.left,
        },
      };
    }

    // الإيميل في الإرسال النهائي لازم يطابق اللي اتأكد
    if (v.session.value !== cleanCVal.toLowerCase()) {
      return bad(400, "OTP_MISMATCH", "الإيميل اتغيّر بعد التأكيد");
    }
    verified = {
      label: `إيميل ✅ (متأكد بكود): ${v.session.value}`,
      sType: "email",
      sVal: v.session.value,
    };

    // نجح الكود → نحسب الرسالة من الحد اليومي
    rl = await dailyHit(otp, ip);
  }

  // 13) تجهيز الرسالة (plain text — بدون parse_mode)
  const contactLabel = verified ? verified.label : "غير محدد";

  const messageLines = [
    "📬 رسالة جديدة من المنصة",
    "─────────────────",
    `النوع: ${cleanType || "غير محدد"}`,
    `الاسم: ${cleanName || "غير محدد"}`,
    `التواصل: ${contactLabel}`,
    `المرجع: ${cleanRef || "غير محدد"}`,
    "─────────────────",
    "التفاصيل:",
    cleanText,
  ];
  if (imageList.length) {
    messageLines.push("─────────────────");
    messageLines.push(`📷 عدد الصور: ${imageList.length}`);
  }
  const message = messageLines.join("\n");

  // 14) Telegram env
  const BOT_TOKEN = env.TG_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = env.TG_CHAT_ID || env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing Telegram env vars");
    return bad(500, "CONFIG", "إعدادات تليجرام ناقصة");
  }

  // 15) إرسال الرسالة النصية
  try {
    const tgData = await tgSendMessage(BOT_TOKEN, CHAT_ID, message);
    if (!tgData.ok) {
      console.error("Telegram sendMessage error:", tgData);
      return bad(500, "TELEGRAM", "فشل إرسال الرسالة");
    }
  } catch (error) {
    console.error("sendMessage exception:", error);
    return bad(500, "SERVER", "خطأ في السيرفر");
  }

  // 16) إرسال الصور
  let imagesSent = 0;
  if (imageList.length === 1) {
    try {
      const ok = await sendPhotoToTelegram(BOT_TOKEN, CHAT_ID, imageList[0]);
      if (ok) imagesSent = 1;
    } catch (err) {
      console.warn("sendPhoto exception:", err);
    }
  } else if (imageList.length > 1) {
    try {
      imagesSent = await sendMediaGroupToTelegram(BOT_TOKEN, CHAT_ID, imageList);
    } catch (err) {
      console.warn("sendMediaGroup exception:", err);
      for (const img of imageList) {
        try {
          const ok = await sendPhotoToTelegram(BOT_TOKEN, CHAT_ID, img);
          if (ok) imagesSent++;
        } catch (e) {
          console.warn("sendPhoto fallback:", e);
        }
      }
    }
  }

  // 17) ★ حفظ في Google Sheets (اختياري — بيتخطّى لو sheets مش متبعتة)
  if (sheets) {
    try {
      const cairoNow = sheets.getCairoNow();
      const dateStr = sheets.formatDateCairo(cairoNow);
      const timeStr = sheets.formatTimeCairo(cairoNow);

      await sheets.appendFeedback([
        Date.now(), // ID
        `${dateStr} ${timeStr}`, // التاريخ
        cleanType || "غير محدد", // النوع
        cleanName || "مجهول", // الاسم
        verified ? verified.sType : "", // نوع وسيلة التواصل (المتأكد منها فقط)
        verified ? verified.sVal : "", // قيمة وسيلة التواصل (المتأكد منها فقط)
        cleanRef || "", // المرجع
        cleanText, // التفاصيل
        imageList.length, // عدد الصور
      ]);
      console.log("✅ Saved to Google Sheets");
    } catch (sheetErr) {
      // لا نوقف الرد لو الشيت فشل — بس نسجل الخطأ
      console.error("❌ Sheets append failed:", sheetErr.message);
    }
  }

  // 18) الرد النهائي
  return {
    status: 200,
    json: {
      ok: true,
      message: "تم الإرسال بنجاح",
      imagesSent,
      imagesTotal: imageList.length,
      remaining: rl.remaining,
    },
  };
}
