// api/push-send.js — POST + هيدر Authorization: Bearer <سر>
// ADMIN_SECRET ممكن يبقى أكتر من سر مفصولين بفاصلة: "secretA,secretB,secretC"
const crypto = require("crypto");
const webpush = require("web-push");
const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const HASH_KEY = "push:subs";
const DEPTS = ["cs", "is", "se", "ai"];

function authorized(req) {
  const secrets = String(process.env.ADMIN_SECRET || "").split(",").map((s) => s.trim()).filter(Boolean);
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || "");
  if (!m || !secrets.length) return false;
  const got = crypto.createHash("sha256").update(m[1]).digest();
  return secrets.some((s) => crypto.timingSafeEqual(got, crypto.createHash("sha256").update(s).digest()));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!authorized(req)) return res.status(401).json({ ok: false, error: "unauthorized" });
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY)
    return res.status(503).json({ ok: false, error: "VAPID missing" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const title = String(b.title || "").trim().slice(0, 100);
  const body = String(b.body || "").trim().slice(0, 300);
  if (!title || !body) return res.status(400).json({ ok: false, error: "title and body required" });
  const url = typeof b.url === "string" && b.url.startsWith("/") && !b.url.startsWith("//") ? b.url : "/";
  const tag = b.tag ? String(b.tag).slice(0, 64) : undefined;

  let depts = b.depts;
  if (depts === undefined || depts === null || depts === "" || depts === "all") depts = "all";
  else depts = [].concat(depts).filter((d) => DEPTS.includes(d));
  if (depts !== "all" && !depts.length) return res.status(400).json({ ok: false, error: "bad depts" });

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@example.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );

  const all = (await redis.hgetall(HASH_KEY)) || {};
  const entries = Object.entries(all).map(([id, v]) => {
    try { return [id, typeof v === "string" ? JSON.parse(v) : v]; } catch (e) { return [id, null]; }
  }).filter(([, v]) => v && v.sub);

  // اللي ماعندهوش قسم محدد بيوصله أي إشعار
  const targeted = entries.filter(([, v]) => depts === "all" || !v.dept || depts.includes(v.dept));
  const payload = JSON.stringify({ title, body, url, tag });

  let sent = 0, failed = 0;
  const dead = [];
  for (let i = 0; i < targeted.length; i += 50) {
    await Promise.all(
      targeted.slice(i, i + 50).map(([id, v]) =>
        webpush.sendNotification(v.sub, payload, { TTL: 86400 }).then(
          () => { sent++; },
          (e) => { failed++; if (e && (e.statusCode === 404 || e.statusCode === 410)) dead.push(id); },
        ),
      ),
    );
  }
  if (dead.length) await redis.hdel(HASH_KEY, ...dead);

  return res.status(200).json({ ok: true, total: entries.length, targeted: targeted.length, sent, failed, removed: dead.length });
};
