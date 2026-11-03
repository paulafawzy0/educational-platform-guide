// api/feedback.js
// Serverless Function على Vercel — نسخة آمنة
// يستقبل رسالة + صور + reCAPTCHA v2 ثم يرسلها إلى Telegram (+ Google Sheets)
// المنطق كله في _feedback-core.js (مشترك مع Cloudflare) — هنا بس ربط Vercel (req/res و process.env).

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
import * as sheets from "./sheets.js";
import { handleFeedback } from "./_feedback-core.js";

function getClientIP(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff) {
    return xff.split(",")[0].trim().slice(0, 45);
  }
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

export default async function handler(req, res) {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "no-store");

  const r = await handleFeedback({
    method: req.method,
    contentType: req.headers["content-type"],
    ip: getClientIP(req),
    body: req.body,
    env: process.env,
    sheets,
  });
  return res.status(r.status).json(r.json);
}
