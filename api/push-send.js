// إرسال إشعار Push لكل المشتركين — للأدمن بس (محمي بـ ADMIN_SECRET)
//
// مثال (من الترمنال):
//   curl -X POST https://YOUR-SITE.vercel.app/api/push-send \
//     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
//     -H "Content-Type: application/json" \
//     -d '{"title":"📚 محاضرة جديدة","body":"الرسم بالحاسب — المحاضرة 5","depts":["cs","ai"]}'
//
// الحقول: title, body (مطلوبين) — url (اختياري، مسار داخل الموقع) — depts (اختياري: "all" أو مصفوفة)
import webpush from "web-push";
import { redis, redisReady, SUBS_KEY, checkAdmin, readBody } from "./_push.js";

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ error: "method" }); }
  if (!checkAdmin(req)) return res.status(401).json({ error: "unauthorized" });

  const pub = process.env.VAPID_PUBLIC_KEY, priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv || !redisReady()) return res.status(503).json({ error: "server not configured" });
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:admin@example.com", pub, priv);

  const b = readBody(req);
  const title = String(b.title || "").trim().slice(0, 100);
  const text = String(b.body || "").trim().slice(0, 300);
  if (!title || !text) return res.status(400).json({ error: "title and body required" });

  // الرابط لازم يكون مسار داخل الموقع (بيمنع فتح روابط خارجية من الإشعار)
  let url = typeof b.url === "string" ? b.url.trim() : "/";
  if (!url.startsWith("/") || url.startsWith("//")) url = "/";

  const depts = b.depts === "all" || b.depts == null || b.depts === ""
    ? null
    : (Array.isArray(b.depts) ? b.depts : [b.depts]).map((d) => String(d).toLowerCase());

  const payload = JSON.stringify({ title, body: text, url, tag: b.tag ? String(b.tag).slice(0, 60) : undefined });

  try {
    const flat = await redis(["HGETALL", SUBS_KEY]); // [id, json, id, json, ...]
    const all = [];
    for (let i = 0; i < flat.length; i += 2) {
      try { all.push({ id: flat[i], ...JSON.parse(flat[i + 1]) }); } catch { /* تجاهل المعطوب */ }
    }
    // اشتراك من غير قسم (dept فاضي) بيستقبل الكل
    const targets = depts ? all.filter((s) => !s.dept || depts.includes(s.dept)) : all;

    let sent = 0, failed = 0;
    const dead = [];
    const CHUNK = 50;
    for (let i = 0; i < targets.length; i += CHUNK) {
      await Promise.all(targets.slice(i, i + CHUNK).map(async (s) => {
        try {
          await webpush.sendNotification(s.sub, payload, { TTL: 60 * 60 * 24 });
          sent++;
        } catch (e) {
          failed++;
          if (e && (e.statusCode === 404 || e.statusCode === 410)) dead.push(s.id); // اشتراك منتهي
        }
      }));
    }
    if (dead.length) await redis(["HDEL", SUBS_KEY, ...dead]);

    return res.status(200).json({ ok: true, total: all.length, targeted: targets.length, sent, failed, removed: dead.length });
  } catch (e) {
    console.error("push-send:", e && e.message);
    return res.status(500).json({ error: "server" });
  }
}
