// أدوات مشتركة لإشعارات الـ Push (ملف داخلي — الشرطة السفلية في الاسم بتمنع Vercel إنه يبقى endpoint)
import crypto from "node:crypto";

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const SUBS_KEY = "push:subs"; // Redis hash: field = hash(endpoint) → value = JSON

export function redisReady() {
  return !!(URL_ && TOKEN);
}

// أمر Redis واحد عبر REST (من غير مكتبات)
export async function redis(cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || "redis " + r.status);
  return j.result;
}

export function subId(endpoint) {
  return crypto.createHash("sha256").update(endpoint).digest("hex").slice(0, 32);
}

// مقارنة آمنة لكلمة السر
export function checkAdmin(req) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const h = String(req.headers["authorization"] || "");
  const got = h.startsWith("Bearer ") ? h.slice(7) : "";
  const a = crypto.createHash("sha256").update(got).digest();
  const b = crypto.createHash("sha256").update(secret).digest();
  return crypto.timingSafeEqual(a, b);
}

export function readBody(req) {
  const b = req.body;
  if (b && typeof b === "object") return b;
  try { return JSON.parse(b || "{}"); } catch { return {}; }
}
