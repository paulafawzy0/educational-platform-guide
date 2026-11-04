// functions/api/feedback.js
// Cloudflare Pages / Workers Function - POST /api/feedback
// نفس منطق Vercel بالظبط (مشترك في api/_feedback-core.js) — هنا بس ربط Cloudflare (Request/Response و context.env).
//   ملحوظة: حفظ Google Sheets مش مفعّل هنا (زي النسخة القديمة). لتفعيله ابعتي sheets تتحمّل في Workers.
import { handleFeedback } from "../../api/_feedback-core.js";

export async function onRequest(context) {
  const { request, env } = context;

  const contentType = String(request.headers.get("content-type") || "");
  let body;
  if (request.method === "POST" && contentType.includes("application/json")) {
    try {
      body = await request.json();
    } catch {
      body = null; // JSON غير صالح
    }
  }

  const r = await handleFeedback({
    method: request.method,
    contentType,
    ip: request.headers.get("cf-connecting-ip") || "unknown",
    body,
    env,
    sheets: null,
  });

  return new Response(JSON.stringify(r.json), {
    status: r.status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-store",
    },
  });
}
