// api/push-subscribe.js — GET: المفتاح العام | POST: حفظ الاشتراك | DELETE: مسحه
const crypto = require("crypto");
const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const ALLOWED = [
  "https://fcal-third-year.vercel.app",
  "https://third-year-platform.pages.dev",
];
const DEPTS = ["cs", "is", "se", "ai"];
const HASH_KEY = "push:subs";

const id = (endpoint) => crypto.createHash("sha256").update(endpoint).digest("hex").slice(0, 32);

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      if (!process.env.VAPID_PUBLIC_KEY) return res.status(503).json({ ok: false, error: "VAPID missing" });
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ ok: true, key: process.env.VAPID_PUBLIC_KEY });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    if (req.method === "POST") {
      const sub = body.subscription;
      if (!sub || typeof sub.endpoint !== "string" || !sub.endpoint.startsWith("https://") || !sub.keys)
        return res.status(400).json({ ok: false, error: "bad subscription" });
      const dept = DEPTS.includes(body.dept) ? body.dept : "";
      await redis.hset(HASH_KEY, {
        [id(sub.endpoint)]: JSON.stringify({ sub: { endpoint: sub.endpoint, keys: sub.keys }, dept, at: Date.now() }),
      });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      if (typeof body.endpoint !== "string") return res.status(400).json({ ok: false });
      await redis.hdel(HASH_KEY, id(body.endpoint));
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE, OPTIONS");
    return res.status(405).json({ ok: false });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
};
