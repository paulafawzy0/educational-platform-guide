/* Service Worker — غيّري VERSION مع كل تعديل مهم: v1 → v2 → v3 ... */
const VERSION = "v1794071370981"; // ★ غيّرت الرقم عشان المتصفح ي.pickup التحديث
const CACHE = `study-platform-${VERSION}`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./pwa.js",
  "./pdf-annotator.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./datenew/departments.js",
  "./datenew/cs/subjects-index.js",
  "./datenew/is/subjects-index.js",
  "./datenew/se/subjects-index.js",
  "./datenew/ai/subjects-index.js",
];

// مكتبات وخطوط خارجية مسموح تتخزن أوفلاين (Google Drive والـ iframes مش هتتخزن)
const CDN_HOSTS = [
  "cdnjs.cloudflare.com",
  "cdn.jsdelivr.net",
  "unpkg.com",
  "code.jquery.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.allSettled(
          APP_SHELL.map((url) =>
            cache.add(
              new Request(new URL(url, self.location.href).href, {
                cache: "reload",
              }),
            ),
          ),
        ),
      ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("study-platform-") && k !== CACHE)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// الصفحة بتبعت "SKIP_WAITING" لما تدوسي "تحديث" في التوست
self.addEventListener("message", (event) => {
  const d = event.data;
  if (d === "SKIP_WAITING" || (d && d.type === "SKIP_WAITING"))
    self.skipWaiting();
});

const ANNOTATOR_KEY = "./pdf-annotator.html";

// Cloudflare Pages بيعمل redirect (index.html → / و pdf-annotator.html → /pdf-annotator).
async function cleanResponse(res) {
  if (!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}

function offlineFramePage() {
  return new Response(
    '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
      '<body style="font-family:system-ui,sans-serif;text-align:center;padding:32px 16px;color:#64748b">' +
      "<p>📴 مفيش اتصال بالإنترنت، والصفحة دي لسه ماتفتحتش على جهازك.</p></body></html>",
    {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

async function networkFirst(request, isPage) {
  const cache = await caches.open(CACHE);
  const url = new URL(request.url);
  const isAnnotator = url.pathname.endsWith("/pdf-annotator.html");
  const isAppPage =
    isPage && (url.pathname === "/" || url.pathname.endsWith("/index.html"));
  const key = isAnnotator ? ANNOTATOR_KEY : isAppPage ? "./" : request;
  try {
    const response = await fetch(request, isPage ? { cache: "no-cache" } : undefined);
    if (response && response.status === 200) cache.put(key, response.clone());
    return response;
  } catch (err) {
    const hit = await cache.match(key);
    if (hit) return cleanResponse(hit);
    if (request.destination === "iframe") return offlineFramePage();
    if (isPage) {
      const page =
        (await cache.match("./")) || (await cache.match("./index.html"));
      if (page) return cleanResponse(page);
    }
    return new Response(
      "📴 مفيش اتصال بالإنترنت، والصفحة دي لسه ماتفتحتش على جهازك — ممكن تفتحها تاني لما النت يرجع",
      {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }
}

async function networkFirstPwa(request) {
  const cache = await caches.open(CACHE);
  const urlObj = new URL(request.url);
  const cleanUrl = urlObj.origin + urlObj.pathname;

  try {
    const freshUrl = cleanUrl + "?_t=" + Date.now();
    const raw = await fetch(freshUrl, {
      cache: "no-store",
      credentials: "same-origin",
    });

    if (raw && raw.status === 200) {
      const clean = await cleanResponse(raw);
      try {
        await cache.put(cleanUrl, clean.clone());
      } catch (e) {}
      return clean;
    }
    return raw;
  } catch (err) {
    const hit = await cache.match(cleanUrl);
    if (hit) return cleanResponse(hit);
    return new Response("📴 pwa.js مش متاح — تأكد من الاتصال", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(request, revalidate) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const network = fetch(request, revalidate ? { cache: "no-cache" } : undefined)
    .then((response) => {
      if (response && (response.status === 200 || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  return cached || (await network) || new Response("", { status: 504 });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;

  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith("/_vercel/")) return;

    if (request.mode === "navigate") {
      event.respondWith(networkFirst(request, true));
    } else if (url.pathname.endsWith("/pwa.js")) {
      event.respondWith(networkFirstPwa(request));
    } else if (url.pathname.endsWith("/app.js") || url.pathname.startsWith("/api/")) {
      event.respondWith(networkFirst(request, false));
    } else {
      event.respondWith(staleWhileRevalidate(request, true));
    }
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

/* ==========================================================
   ★★★ إشعارات Push — الجزء اللي كان ناقص ★★★
   ========================================================== */

// إعدادات حسب نوع الإشعار
function getNotificationSettings(type) {
  switch (type) {
    case "lecture":
      return { vibrate: [200, 100, 200], requireInteraction: false };
    case "cancel":
      return { vibrate: [300, 100, 300, 100, 300], requireInteraction: true };
    case "alert":
      return { vibrate: [400, 100, 400], requireInteraction: true };
    case "exam":
      return { vibrate: [200, 50, 200, 50, 200, 50, 200], requireInteraction: true };
    default:
      return { vibrate: [200], requireInteraction: false };
  }
}

// لما السيرفر يبعت push → نعرض الإشعار
self.addEventListener("push", (event) => {
  let data = { title: "منصة المواد", body: "إشعار جديد", url: "/", type: "general" };

  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (e) {
    if (event.data) data.body = event.data.text();
  }

  const settings = getNotificationSettings(data.type);

  const options = {
    body: data.body,
    vibrate: settings.vibrate,
    tag: `notif_${Date.now()}`,
    renotify: true,
    data: {
      url: data.url || "/",
      type: data.type || "general",
      date: new Date().toISOString(),
    },
    actions: [
      { action: "open", title: "فتح الموقع" },
      { action: "close", title: "إغلاق" },
    ],
    requireInteraction: settings.requireInteraction,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// لما الطالب يضغط الإشعار
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") return;

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // لو الموقع مفتوح في تبويب، نركز عليه
      for (const client of clientList) {
        if (client.url.includes(self.location.origin)) {
          client.focus();
          client.navigate(targetUrl);
          return;
        }
      }
      // لو مفتوحش، نفتح تبويب جديد
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});
