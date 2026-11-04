import webpush from "web-push";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const allowedSecrets = (process.env.ADMIN_SECRET || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!token || !allowedSecrets.includes(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, body, url, dept } = req.body || {};
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const keys = await redis.keys("sub:*");
    let sent = 0;
    let failed = 0;

    for (const key of keys) {
      const subData = await redis.hgetall(key);
      if (!subData || !subData.endpoint) continue;

      if (
        dept &&
        dept !== "all" &&
        subData.dept !== "all" &&
        subData.dept !== dept
      ) {
        continue;
      }

      const pushSubscription = {
        endpoint: subData.endpoint,
        keys:
          typeof subData.keys === "string"
            ? JSON.parse(subData.keys)
            : subData.keys,
      };

      const payload = JSON.stringify({ title, body, url: url || "/" });

      try {
        await webpush.sendNotification(pushSubscription, payload);
        sent++;
      } catch (err) {
        failed++;
        if (err.statusCode === 404 || err.statusCode === 410) {
          await redis.del(key);
        }
      }
    }

    return res.status(200).json({ success: true, sent, failed });
  } catch (err) {
    console.error("push-send error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", detail: err.message });
  }
}
