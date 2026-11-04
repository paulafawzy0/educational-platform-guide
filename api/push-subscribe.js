import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ALLOWED_ORIGINS = [
  "https://third-year-platform.pages.dev",
  "https://fcal-third-year.vercel.app",
  "https://faclstudentdcs.vercel.app",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    if (req.method === "GET") {
      return res.status(200).json({
        publicKey: process.env.VAPID_PUBLIC_KEY,
      });
    }

    if (req.method === "POST") {
      const { subscription, dept } = req.body || {};
      if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: "Invalid subscription" });
      }
      const key = `sub:${Buffer.from(subscription.endpoint).toString("base64url")}`;
      await redis.hset(key, {
        endpoint: subscription.endpoint,
        keys: JSON.stringify(subscription.keys),
        dept: dept || "all",
        updatedAt: Date.now(),
      });
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const { endpoint } = req.body || {};
      if (endpoint) {
        const key = `sub:${Buffer.from(endpoint).toString("base64url")}`;
        await redis.del(key);
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("push-subscribe error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", detail: err.message });
  }
}
