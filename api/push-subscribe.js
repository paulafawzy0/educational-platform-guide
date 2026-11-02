// تسجيل / إلغاء اشتراك جهاز الطالب في إشعارات الـ Push
//   GET    → بيرجّع VAPID_PUBLIC_KEY (مفتاح عام، مش سر)
//   POST   → { subscription, dept }  بيحفظ الاشتراك (أو بيحدّث القسم)
//   DELETE → { endpoint }            بيمسح الاشتراك
import { redis, redisReady, SUBS_KEY, subId, readBody } from "./_push.js";

const MAX_SUBS = 20000; // سقف أمان
// خدمات الـ Push المعروفة بس (جوجل / فايرفوكس / آبل / ويندوز)
const OK_HOST = /(^|\.)(googleapis\.com|push\.services\.mozilla\.com|push\.apple\.com|notify\.windows\.com)$/i;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const key = process.env.VAPID_PUBLIC_KEY || "";
    return res.status(key ? 200 : 503).json({ key });
  }

  if (!redisReady()) return res.status(503).json({ error: "redis missing" });

  const body = readBody(req);

  try {
    if (req.method === "POST") {
      const sub = body.subscription;
      const ep = sub && typeof sub.endpoint === "string" ? sub.endpoint : "";
      const k = sub && sub.keys;
      if (!ep || ep.length > 700 || !k || typeof k.p256dh !== "string" || typeof k.auth !== "string"
          || k.p256dh.length > 200 || k.auth.length > 100)
        return res.status(400).json({ error: "bad subscription" });

      let host = "";
      try { const u = new URL(ep); if (u.protocol !== "https:") throw 0; host = u.hostname; }
      catch { return res.status(400).json({ error: "bad endpoint" }); }
      if (!OK_HOST.test(host)) return res.status(400).json({ error: "unsupported push service" });

      const dept = /^[a-z0-9_-]{1,20}$/i.test(String(body.dept || "")) ? String(body.dept).toLowerCase() : "";
      const id = subId(ep);

      const isNew = await redis(["HSETNX", SUBS_KEY, id, "x"]); // 1 لو جديد
      if (isNew === 1) {
        const n = await redis(["HLEN", SUBS_KEY]);
        if (n > MAX_SUBS) { await redis(["HDEL", SUBS_KEY, id]); return res.status(429).json({ error: "full" }); }
      }
      await redis(["HSET", SUBS_KEY, id,
        JSON.stringify({ sub: { endpoint: ep, keys: { p256dh: k.p256dh, auth: k.auth } }, dept, ts: Date.now() })]);
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      const ep = typeof body.endpoint === "string" ? body.endpoint : "";
      if (!ep) return res.status(400).json({ error: "no endpoint" });
      await redis(["HDEL", SUBS_KEY, subId(ep)]);
      return res.status(200).json({ ok: true });
    }
  } catch (e) {
    console.error("push-subscribe:", e && e.message);
    return res.status(500).json({ error: "server" });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "method" });
}
