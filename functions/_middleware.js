// functions/_middleware.js
// Cloudflare Pages middleware.
// بيمنع تقديم ملفات المشروع الداخلية (كود الـ Functions، إعدادات wrangler/npm، ...) كملفات عامة،
// لأن مجلد النشر هو جذر الـ repo فكل الملفات كانت بتتنشر.
// بيشتغل بس على المسارات المذكورة في _routes.json (يعني مفيش أي تأثير على سرعة باقي الموقع).

// أي مسار بيبدأ بواحد من دول → 404
const BLOCKED_PREFIXES = [
  "/functions/",
  "/node_modules/",
  "/.git",
  "/.wrangler",
  "/.github",
];

// أسماء ملفات بالظبط → 404
const BLOCKED_FILES = new Set([
  "/wrangler.jsonc",
  "/wrangler.json",
  "/wrangler.toml",
  "/package.json",
  "/package-lock.json",
  "/build-version.cjs",
  "/vercel.json",
  "/api/webhook.js", // ملف الـ webhook بتاع Vercel كملف ثابت (المسار /api/webhook نفسه مش ممنوع)
  "/schedule_year3.csv",
  "/.env",
  "/.gitignore",
  "/.assetsignore",
]);

function normalizePath(pathname) {
  let p = pathname;
  try {
    p = decodeURIComponent(p);
  } catch (e) {
    return null; // ترميز مش صالح → نرفضه
  }
  p = p.replace(/\\/g, "/").replace(/\/{2,}/g, "/").toLowerCase();
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function isBlocked(pathname) {
  const p = normalizePath(pathname);
  if (p === null) return true;
  if (BLOCKED_FILES.has(p)) return true;
  // ملفات Vercel الثابتة جوه api/ (feedback.js و _otp.js و _feedback-core.js و webhook.js ...) → 404
  // (مسارات الـ Functions نفسها زي /api/feedback من غير .js فمش بتتأثر)
  if (p.startsWith("/api/") && /\.(?:m|c)?js$/.test(p)) return true;
  // نضيف "/" في الآخر عشان "/functions" نفسها تتمنع زي "/functions/x"
  const withSlash = p + "/";
  return BLOCKED_PREFIXES.some(
    (b) => p.startsWith(b) || withSlash.startsWith(b),
  );
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (isBlocked(url.pathname)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  }
  return context.next(); // /api/sheet و /api/feedback وغيرهم يكملوا عادي
}
