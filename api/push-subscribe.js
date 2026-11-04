// ============================================================
//  api/push-subscribe.js  —  ES Module version
//  يعمل مع Vercel عند وجود "type": "module" في package.json
// ============================================================

import { Redis } from '@upstash/redis';

// قائمة النطاقات المسموح لها (CORS)
// ضيفي/شيلي اللي عايزاها من هنا
const ALLOWED_ORIGINS = [
  "https://third-year-platform.pages.dev",
  "https://fcal-third-year.vercel.app",
  "https://faclstudentdcs.vercel.app"
];

// تهيئة Redis بالمتغيرات الصريحة (أضمن من Redis.fromEnv())
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  // ---------- CORS ----------
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ---------- preflight ----------
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    // ---------- GET: رجّع المفتاح العام ----------
    if (req.method === "GET") {
      return res.status(200).json({
        publicKey: process.env.VAPID_PUBLIC_KEY
      });
    }

    // ---------- POST: احفظ اشتراك جديد ----------
    if (req.method === "POST") {
      const { subscription, dept } = req.body || {};
      if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: "Invalid subscription" });
      }
      // مفتاح فريد لكل جهاز (بناءً على endpoint)
      const key = `sub:${Buffer.from(subscription.endpoint).toString('base64url')}`;
      await redis.hset(key, {
        endpoint: subscription.endpoint,
        keys: JSON.stringify(subscription.keys),
        dept: dept || "all",
        updatedAt: Date.now()
      });
      return res.status(200).json({ success: true });
    }

    // ---------- DELETE: امسح اشتراك ----------
    if (req.method === "DELETE") {
      const { endpoint } = req.body || {};
      if (endpoint) {
        const key = `sub:${Buffer.from(endpoint).toString('base64url')}`;
        await redis.del(key);
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("push-subscribe error:", err);
    return res.status(500).json({
      error: "Internal server error",
      detail: err.message
    });
  }
}
