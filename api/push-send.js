// ============================================================
//  api/push-send.js  —  ES Module version
//  شغّال مع "type": "module" في package.json
// ============================================================

import webpush from 'web-push';
import { Redis } from '@upstash/redis';

// تهيئة Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// إعداد VAPID (بيشتغل مرة واحدة وقت تحميل الموديول)
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ---------- التحقق من Authorization ----------
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const allowedSecrets = (process.env.ADMIN_SECRET || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!token || !allowedSecrets.includes(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ---------- التحقق من البيانات ----------
    // type: اختياري — "lecture" | "cancel" | "alert" | "exam" | "general"
    // batchSize: اختياري — حجم الدفعة (default 50) عشان Vercel ما يعملش timeout
    const { title, body, url, dept, type, batchSize } = req.body || {};
    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    // ---------- جلب كل الاشتراكات ----------
    const keys = await redis.keys("sub:*");
    let sent = 0;
    let failed = 0;
    const startedAt = Date.now();
    const MAX_DURATION_MS = 8500; // حد أمان: 8.5 ثواني (Vercel بيقتل عند 10)
    const BATCH = 100; // 100 إشعار في الدفعة الواحدة = أسرع

    // نجهّز الـ payload مرة واحدة
    const payload = JSON.stringify({
      title,
      body,
      url: url || "/",
      type: type || "general",
    });
    const pushOptions = {
      TTL: 60 * 60 * 24 * 3, // 3 أيام
      urgency: "high",
    };

    // نعالج المفاتيح على دفعات متوازية (Promise.all) عشان نسرع
    for (let i = 0; i < keys.length; i += BATCH) {
      // لو قربنا من حد الوقت، نوقف ونرجّع اللي اتبعت لحد دلوقتي
      if (Date.now() - startedAt > MAX_DURATION_MS) {
        return res.status(200).json({
          success: true,
          sent,
          failed,
          processed: i,
          total: keys.length,
          remaining: keys.length - i,
          message: "اتوقف لحد الوقت المسموح. كرّري الطلب عشان تكملي الباقي.",
        });
      }

      const batch = keys.slice(i, i + BATCH);

      const results = await Promise.all(
        batch.map(async (key, idx) => {
          try {
            const subData = await redis.hgetall(key);
            if (!subData || !subData.endpoint) return { ok: false, key };

            // فلترة حسب القسم
            if (
              dept &&
              dept !== "all" &&
              subData.dept !== "all" &&
              subData.dept !== dept
            ) {
              return { skipped: true };
            }

            const pushSubscription = {
              endpoint: subData.endpoint,
              keys:
                typeof subData.keys === "string"
                  ? JSON.parse(subData.keys)
                  : subData.keys,
            };

            await webpush.sendNotification(
              pushSubscription,
              payload,
              pushOptions,
            );
            return { ok: true };
          } catch (err) {
            // 404 / 410 = الاشتراك انتهى، نمسحه
            if (err.statusCode === 404 || err.statusCode === 410) {
              await redis.del(key);
            }
            return { ok: false, key };
          }
        }),
      );

      for (const r of results) {
        if (r.ok) sent++;
        else if (r.skipped) {
        } // تم تجاوزه حسب القسم
        else failed++;
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      failed,
      total: keys.length,
    });
  } catch (err) {
    console.error("push-send error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
