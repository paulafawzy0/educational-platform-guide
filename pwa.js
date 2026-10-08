/* pwa.js — تسجيل الـ Service Worker + زرار التثبيت + إشعار التحديث */
(function () {
  "use strict";

  /* ---------- ستايل الزرار والتوست (مرفوعين فوق status-bar الموقع) ---------- */
  var style = document.createElement("style");
  style.textContent =
    ".pwa-install{position:fixed;right:16px;bottom:calc(46px + env(safe-area-inset-bottom,0px));z-index:9999;" +
    "display:none;align-items:center;gap:8px;padding:12px 18px;border:0;border-radius:999px;cursor:pointer;" +
    "background:#3498db;color:#fff;font-size:14px;font-weight:700;font-family:inherit;box-shadow:0 6px 20px rgba(0,0,0,.35)}" +
    ".pwa-install.show{display:inline-flex}" +
    ".pwa-install:hover{filter:brightness(1.15)}" +
    ".pwa-toast{position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);" +
    "z-index:10000;display:flex;align-items:center;gap:12px;max-width:calc(100% - 32px);padding:12px 16px;" +
    "border-radius:14px;background:#161b22;color:#fff;font-family:inherit;font-size:14px;" +
    "box-shadow:0 8px 28px rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.12)}" +
    ".pwa-toast button{border:0;border-radius:10px;padding:8px 14px;cursor:pointer;font-family:inherit;font-weight:700;" +
    "background:#3498db;color:#fff}" +
    ".pwa-toast .pwa-close{background:transparent;color:#94a3b8;padding:4px 8px}";
  document.head.appendChild(style);

  function toast(message, actionLabel, onAction) {
    var el = document.createElement("div");
    el.className = "pwa-toast";
    el.setAttribute("role", "status");
    var text = document.createElement("span");
    text.textContent = message;
    el.appendChild(text);
    if (actionLabel) {
      var action = document.createElement("button");
      action.type = "button";
      action.textContent = actionLabel;
      action.addEventListener("click", function () {
        el.remove();
        if (onAction) onAction();
      });
      el.appendChild(action);
    }
    var close = document.createElement("button");
    close.type = "button";
    close.className = "pwa-close";
    close.setAttribute("aria-label", "إغلاق");
    close.textContent = "✕";
    close.addEventListener("click", function () {
      el.remove();
    });
    document.body.appendChild(el);
    return el;
  }

  /* ---------- الـ Service Worker + إشعار التحديث ---------- */
  if ("serviceWorker" in navigator) {
    var userAskedUpdate = false;

    // ★ نافذة "الفتح" — لو التحديث وصل خلال 20 ثانية من فتح التطبيق
    //   → نطبقه تلقائي (بدون زرار). بعد كده → زرار.
    var COLD_START_MS = 20000;
    var coldStartUntil = Date.now() + COLD_START_MS;
    var autoApplied = false;
    var userInteracted = false;

    // ★ لو المستخدم داس/لمس/كتب → ما نعملش auto-reload (نعرض زرار بدل)
    function markInteracted(e) {
      if (e && e.isTrusted) userInteracted = true;
    }
    ["click", "keydown", "touchstart"].forEach(function (ev) {
      document.addEventListener(ev, markInteracted, { passive: true });
    });

    function shouldAutoApply() {
      return !autoApplied && !userInteracted && Date.now() < coldStartUntil;
    }

    // ★ pwa.js بيتحمّل متأخر (بعد load) فلازم نسجّل فورًا لو load عدّى
    function registerSW() {
      navigator.serviceWorker
        .register("./sw.js")
        .then(function (reg) {
          // helper: تنفيذ التحديث (تلقائي أو يدوي)
          function applyUpdate(worker, isAuto) {
            if (isAuto) autoApplied = true;
            userAskedUpdate = true;
            worker.postMessage("SKIP_WAITING");
          }

          // helper: التعامل مع SW جاهز (installed + waiting)
          function offerUpdate(worker) {
            // ★ داخل نافذة الفتح + مفيش تفاعل → تحديث تلقائي
            if (shouldAutoApply()) {
              applyUpdate(worker, true);
              return;
            }
            // ★ غير كده → اعرض زرار
            toast("🔄 فيه تحديث جديد للموقع", "تحديث", function () {
              applyUpdate(worker, false);
            });
          }

          // ★ SW في حالة waiting من جلسة سابقة
          if (reg.waiting && navigator.serviceWorker.controller) {
            offerUpdate(reg.waiting);
          }

          // ★ SW جديد اتنزّل
          reg.addEventListener("updatefound", function () {
            var worker = reg.installing;
            if (!worker) return;
            worker.addEventListener("statechange", function () {
              if (
                worker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                offerUpdate(worker);
              }
            });
          });

          // ★ helper آمن لنداء reg.update()
          function safeUpdate() {
            try {
              var p = reg.update();
              if (p && typeof p.catch === "function") p.catch(function () {});
            } catch (e) {}
          }

          // ★ فحص فوري عند الفتح (عشان نافذة الـ cold start تلقط التحديث)
          if (navigator.serviceWorker.controller) safeUpdate();

          // ★ فحص دوري كل 5 دقايق (شغّال بس والتطبيق ظاهر)
          setInterval(
            function () {
              if (!document.hidden) safeUpdate();
            },
            5 * 60 * 1000,
          );

          // ★ فحص عند رجوع المستخدم للتطبيق (المضمون على الموبايل)
          document.addEventListener("visibilitychange", function () {
            if (!document.hidden) safeUpdate();
          });

          // ★ فحص عند رجوع الاتصال
          window.addEventListener("online", safeUpdate);
        })
        .catch(function (err) {
          console.error("SW registration failed:", err);
        });
    }
    if (document.readyState === "complete") registerSW();
    else window.addEventListener("load", registerSW);

    // ★ reload بس لما نكون قررنا نطبّق (تلقائي أو يدوي) — عشان الكويز ما يتقطعش
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (userAskedUpdate) window.location.reload();
    });
  }

  /* ---------- زرار "ثبّت التطبيق" ---------- */
  var isStandalone =
    (window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;

  var btn = document.getElementById("installBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "installBtn";
    btn.type = "button";
    btn.className = "pwa-install";
    btn.textContent = "📲 ثبّت التطبيق";
    document.body.appendChild(btn);
  }

  function showBtn() {
    btn.classList.add("show");
    btn.hidden = false;
  }
  function hideBtn() {
    btn.classList.remove("show");
    btn.hidden = true;
  }

  if (isStandalone) {
    hideBtn();
  } else {
    var deferredPrompt = null;
    hideBtn();

    function onBIP(e) {
      e.preventDefault();
      deferredPrompt = e;
      showBtn();
    }
    window.addEventListener("beforeinstallprompt", onBIP);
    // ★ الحدث ممكن يكون اتطلق قبل تحميل pwa.js (اتلقط في index)
    if (window.__bip) onBIP(window.__bip);

    btn.addEventListener("click", function () {
      if (deferredPrompt) {
        hideBtn();
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function () {
          deferredPrompt = null;
        });
      } else if (isIOS) {
        toast(
          '📲 اضغطي زرار المشاركة ⎋ ثم "إضافة إلى الشاشة الرئيسية"',
          null,
          null,
        );
      }
    });

    if (isIOS) showBtn(); // iOS مفيهوش beforeinstallprompt

    window.addEventListener("appinstalled", function () {
      deferredPrompt = null;
      hideBtn();
    });
  }

  /* ---------- theme-color يتغير مع الثيم ---------- */
  function syncThemeColor() {
    if (!document.body) return;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    var bg = getComputedStyle(document.body).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent")
      meta.setAttribute("content", bg);
  }
  syncThemeColor();
  var opts = {
    attributes: true,
    attributeFilter: ["class", "data-theme", "style"],
  };
  new MutationObserver(syncThemeColor).observe(document.documentElement, opts);
  new MutationObserver(syncThemeColor).observe(document.body, opts);
})();
