// api/feedback.js
// Serverless Function على Vercel — نسخة آمنة
// يستقبل رسالة + صور + reCAPTCHA v2 ثم يرسلها إلى Telegram

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
import {
  appendFeedback,
  getCairoNow,
  formatDateCairo,
  formatTimeCairo,
} from "./sheets.js";
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

const CONTACT_LABELS = {
  telegram: "تليجرام",
  whatsapp: "واتساب",
  email: "إيميل",
  phone: "اتصال هاتفي",
};

// ──────────────────────────────────────────────────────────────
// ★ Rate Limit (In-Memory)
// ⚠️ في Vercel كل instance جديدة بتبدأ من صفر — للحماية الحقيقية
//    استخدم Upstash Redis (مثال في نهاية الملف).
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

function getClientIP(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff) {
    return xff.split(",")[0].trim().slice(0, 45);
  }
  return (req.socket && req.socket.remoteAddress) || "unknown";
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
function bad(res, status, code, error) {
  return res.status(status).json({ ok: false, code, error });
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
 */
function decodeDataUrl(dataUrl) {
  if (typeof dataUrl !== "string") return null;
  const match = dataUrl.match(
    /^data:(image\/(?:jpeg|jpg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/i,
  );
  if (!match) return null;
  try {
    const buffer = Buffer.from(match[2], "base64");
    if (!buffer.length) return null;
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
async function verifyRecaptcha(token, remoteip) {
  const secret = process.env.RECAPTCHA_SECRET;
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

// ──────────────────────────────────────────────────────────────
// Telegram
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

  const file = new File([decoded.buffer], name, { type: decoded.mime });
  form.append("photo", file, name);

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
    const file = new File([x.decoded.buffer], name, { type: x.decoded.mime });
    form.append(`photo_${i}`, file, name);
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
// الـ Handler
// ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // 0) Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");

  // 1) Method
  if (req.method !== "POST") {
    return bad(res, 405, "METHOD", "Method Not Allowed");
  }

  // 2) Content-Type
  const ct = String(req.headers["content-type"] || "");
  if (!ct.includes("application/json")) {
    return bad(res, 415, "INVALID", "Content-Type غير مدعوم");
  }

  // 3) ★ Rate Limit — قبل أي حاجة (يمنع إرهاق reCAPTCHA/Telegram)
  const ip = getClientIP(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return bad(res, 429, "RATE", "تجاوزت الحد اليومي (5 رسائل)");
  }

  // 4) استخراج الحقول
  const body = req.body || {};
  const {
    channel,
    type,
    name,
    contactType,
    contactValue,
    ref,
    text,
    images,
    website,
    recaptchaToken,
  } = body;

  // 5) Honeypot
  if (website && String(website).trim() !== "") {
    return bad(res, 200, "HONEYPOT", "تم رفض الطلب");
  }

  // 6) reCAPTCHA
  const cap = await verifyRecaptcha(recaptchaToken, ip);
  if (!cap.ok) {
    if (cap.reason === "CONFIG") {
      return bad(res, 500, "CONFIG", "إعدادات reCAPTCHA ناقصة على السيرفر");
    }
    if (cap.reason === "CAPTCHA_ERROR") {
      return bad(res, 503, "CAPTCHA_ERROR", "تعذر التحقق حاليًا");
    }
    return bad(res, 400, "CAPTCHA_FAILED", "فشل التحقق البشري — حاول تاني");
  }

  // 7) القناة
  if (channel && channel !== "tg") {
    return bad(res, 400, "INVALID", "قناة الإرسال غير مدعومة");
  }

  // 8) تنظيف الحقول
  const cleanText = sanitize(text, MAX_TEXT_LEN);
  const cleanName = sanitize(name, MAX_NAME_LEN);
  const cleanRef = sanitize(ref, MAX_REF_LEN);
  const cleanType = sanitize(type, 40);
  const cleanCType = sanitize(contactType, 20);
  const cleanCVal = sanitize(contactValue, MAX_CONTACT_LEN);

  // 9) النص
  if (!cleanText) return bad(res, 400, "INVALID", "النص مطلوب");
  if (cleanText.length < 5) return bad(res, 400, "INVALID", "النص قصير جدًا");
  if (cleanText.length > MAX_TEXT_LEN)
    return bad(res, 400, "BIG", "النص طويل جدًا");
  if (/^(.)\1{4,}$/.test(cleanText))
    return bad(res, 400, "INVALID", "النص غير واضح");
  const urlCount = (cleanText.match(/https?:\/\//gi) || []).length;
  if (urlCount > 2) return bad(res, 400, "INVALID", "عدد الروابط كبير");

  // 10) الاسم
  if (cleanName) {
    if (cleanName.length < 2) {
      return bad(res, 400, "INVALID", "الاسم قصير جدًا");
    }
    if (!/^[\u0600-\u06FFa-zA-Z\s.'\-]{2,60}$/.test(cleanName)) {
      return bad(res, 400, "INVALID", "الاسم يحتوي على رموز غير مسموحة");
    }
  }

  // 11) وسيلة التواصل
  if (cleanCType && !CONTACT_LABELS[cleanCType]) {
    return bad(res, 400, "INVALID", "نوع وسيلة التواصل غير مدعوم");
  }
  if (cleanCType && !cleanCVal) {
    return bad(res, 400, "INVALID", "قيمة وسيلة التواصل مطلوبة");
  }
  if (cleanCVal && !cleanCType) {
    return bad(res, 400, "INVALID", "اختاري نوع وسيلة التواصل");
  }
  if (cleanCType === "email" && cleanCVal) {
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(cleanCVal)) {
      return bad(res, 400, "INVALID", "صيغة الإيميل غير صحيحة");
    }
  }
  if (cleanCType === "phone" && cleanCVal) {
    const digits = cleanCVal.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      return bad(res, 400, "INVALID", "رقم الهاتف غير صحيح");
    }
    if (!/^[+\d][\d\s\-()]{6,}$/.test(cleanCVal)) {
      return bad(res, 400, "INVALID", "صيغة رقم الهاتف غير صحيحة");
    }
  }
  if (cleanCType === "telegram" && cleanCVal) {
    if (!/^@?[A-Za-z0-9_]{5,32}$/.test(cleanCVal)) {
      return bad(res, 400, "INVALID", "يوزر تليجرام غير صحيح");
    }
  }
  if (cleanCType === "whatsapp" && cleanCVal) {
    const wd = cleanCVal.replace(/\D/g, "");
    if (wd.length < 8 || wd.length > 15) {
      return bad(res, 400, "INVALID", "رقم واتساب غير صحيح");
    }
  }

  // 12) الصور
  const rawImages = Array.isArray(images) ? images : [];
  if (rawImages.length > MAX_IMAGES) {
    return bad(res, 400, "BIG", "عدد الصور كبير");
  }

  const imageList = [];
  let totalImgBytes = 0;

  for (let i = 0; i < rawImages.length; i++) {
    const im = rawImages[i];
    if (!im || typeof im !== "object") continue;

    const decoded = decodeDataUrl(im.data);
    if (!decoded) {
      return bad(res, 400, "INVALID", `صورة رقم ${i + 1} غير صالحة`);
    }
    if (decoded.buffer.length > MAX_IMAGE_BYTES) {
      return bad(res, 400, "BIG", `صورة رقم ${i + 1} أكبر من 1 ميجا`);
    }
    totalImgBytes += decoded.buffer.length;
    if (totalImgBytes > MAX_TOTAL_IMAGE_BYTES) {
      return bad(res, 400, "BIG", "إجمالي حجم الصور كبير");
    }
    imageList.push({
      name: safeFileName(im.name),
      data: im.data,
    });
  }

  // 13) تجهيز الرسالة (plain text — بدون parse_mode)
  const contactLabel = cleanCType
    ? `${CONTACT_LABELS[cleanCType]}${cleanCVal ? `: ${cleanCVal}` : ""}`
    : "غير محدد";

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
  const BOT_TOKEN = process.env.TG_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing Telegram env vars");
    return bad(res, 500, "CONFIG", "إعدادات تليجرام ناقصة");
  }

  // 15) إرسال الرسالة النصية
  try {
    const tgData = await tgSendMessage(BOT_TOKEN, CHAT_ID, message);
    if (!tgData.ok) {
      console.error("Telegram sendMessage error:", tgData);
      return bad(res, 500, "TELEGRAM", "فشل إرسال الرسالة");
    }
  } catch (error) {
    console.error("sendMessage exception:", error);
    return bad(res, 500, "SERVER", "خطأ في السيرفر");
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
      imagesSent = await sendMediaGroupToTelegram(
        BOT_TOKEN,
        CHAT_ID,
        imageList,
      );
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

  // 17) ★ حفظ في Google Sheets
  try {
    const cairoNow = getCairoNow();
    const dateStr = formatDateCairo(cairoNow);
    const timeStr = formatTimeCairo(cairoNow);

    await appendFeedback([
      Date.now(), // ID
      `${dateStr} ${timeStr}`, // التاريخ
      cleanType || "غير محدد", // النوع
      cleanName || "مجهول", // الاسم
      cleanCType || "", // نوع وسيلة التواصل
      cleanCVal || "", // قيمة وسيلة التواصل
      cleanRef || "", // المرجع
      cleanText, // التفاصيل
      imageList.length, // عدد الصور
    ]);
    console.log("✅ Saved to Google Sheets");
  } catch (sheetErr) {
    // لا نوقف الرد لو الشيت فشل — بس نسجل الخطأ
    console.error("❌ Sheets append failed:", sheetErr.message);
  }

  // 18) الرد النهائي
  return res.status(200).json({
    ok: true,
    message: "تم الإرسال بنجاح",
    imagesSent,
    imagesTotal: imageList.length,
    remaining: rl.remaining,
  });
}
