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

// ============================================================
//  تطبيع النصوص العربي (لمقارنة دقيقة)
// ============================================================
function norm(s) {
  if (!s) return '';
  return String(s)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640\u06D6-\u06ED\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ىيی]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ک/g, 'ك')
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0))
    .replace(/\s+/g, ' ')
    .trim();
}

// تطبيع اسم المعيد: بيشيل البادئات (د/ م/ أ.م.د/) ويطبّع النص
function normInstructor(s) {
  if (!s) return '';
  let n = norm(s);
  // شيل البادئات
  n = n.replace(/^(د\/|م\/|أ\.م\.د\/|ا\.م\.د\/|ا\.د\/|استاذ\/|استاذة\/|د\s|م\s)\s*/g, '');
  return n;
}

// فصل المعيدين المتعددين (لو في " و" أو "،" أو سطر جديد)
function splitInstructors(s) {
  if (!s) return [];
  return String(s)
    .split(/\s+(?:و|،|,)\s+|\n+/)
    .map(x => normInstructor(x))
    .filter(Boolean);
}

// ============================================================
//  فلترة الاشتراك حسب الاستهداف
// ============================================================
//  معاملات الاستهداف (كلها اختيارية — لو مش موجودة، نعامل كـ "all"):
//  - dept: القسم (cs, is, se, ai, all)
//  - course: اسم المادة (مثلاً "نظم التشغيل")
//  - instructor: اسم المعيد/الدكتور (مثلاً "م/ احمد عبدالرحمن")
//  - program: البرنامج (مثلاً "هندسة البرمجيات 1")
//  - section: السكشن (رقم)
//  - classType: نوع الحصة ("lecture" | "lab" | "section")
//  - dryRun: لو true → نرجّع matched بس من غير إرسال
//
//  منطق الفلترة (AND):
//  - كل معامل موجود بيتم تطبيقه (لازم يطابق)
//  - المعاملات المش موجودة بتتعامل كـ "all"
//
//  الطالب بيتخزن عنده:
//  - dept (قسم واحد: cs/is/se/ai)
//  - targets: array of {course, instructor, program, section, type}
//             (من الجدول المعتمد أو المختار)
//
//  لو الطالب معندهوش targets (اشتراك قديم)، نعامله كـ "all"
// ============================================================
function matchesTarget(subData, params) {
  // 1) فلترة dept
  if (params.dept && params.dept !== 'all') {
    if (subData.dept && subData.dept !== 'all' && subData.dept !== params.dept) {
      return false;
    }
  }

  // 2) لو مفيش استهداف أدق (course/instructor/section/classType) → نوقف
  if (!params.course && !params.instructor && !params.section && !params.classType && !params.program) {
    return true; // dept بس
  }

  // 3) نشوف targets الطالب
  let targets = [];
  try {
    if (subData.targets) {
      targets = typeof subData.targets === 'string'
        ? JSON.parse(subData.targets)
        : subData.targets;
    }
  } catch (e) {
    targets = [];
  }

  // لو مفيش targets (اشتراك قديم) → نعامله كـ "all" (مسموح)
  if (!Array.isArray(targets) || targets.length === 0) {
    return true;
  }

  // 4) نشوف لو فيه أي target يطابق كل المعاملات (AND)
  const nCourse = params.course ? norm(params.course) : null;
  const nInstructors = params.instructor ? splitInstructors(params.instructor) : [];
  const nSection = params.section ? norm(String(params.section)) : null;
  const nProgram = params.program ? norm(params.program) : null;
  const nClassType = params.classType ? norm(params.classType) : null;

  for (const t of targets) {
    // course
    if (nCourse && norm(t.course) !== nCourse) continue;
    // instructor (ممكن المعيد في الـ target يكون فيه أكتر من واحد، أو المعامل فيه أكتر من واحد)
    if (nInstructors.length > 0) {
      const tInstrs = splitInstructors(t.instructor || '');
      const match = nInstructors.some(ni => tInstrs.includes(ni));
      if (!match) continue;
    }
    // program
    if (nProgram && norm(t.program) !== nProgram) continue;
    // section (ممكن الـ target فيه أكتر من سكشن مفصولين بمسافة: "1 2 3")
    if (nSection) {
      const tSecs = String(t.section || '').split(/\s+/).map(norm).filter(Boolean);
      if (!tSecs.includes(nSection)) continue;
    }
    // classType
    if (nClassType && norm(t.type) !== nClassType) continue;

    // لو وصلنا هنا → الـ target ده يطابق كل المعاملات
    return true;
  }

  return false;
}

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
      .map(s => s.trim())
      .filter(Boolean);

    if (!token || !allowedSecrets.includes(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ---------- التحقق من البيانات ----------
    // معاملات الاستهداف (كلها اختيارية):
    //   dept: القسم (cs/is/se/ai/all)
    //   course: اسم المادة
    //   instructor: اسم المعيد/الدكتور
    //   program: البرنامج
    //   section: رقم السكشن
    //   classType: lecture|lab|section
    //   dryRun: true → من غير إرسال
    const {
      title, body, url,
      dept, course, instructor, program, section, classType,
      type, dryRun, batchSize
    } = req.body || {};

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    // الـ payload اللي هيتبعت للـ Service Worker
    const payload = JSON.stringify({
      title,
      body,
      url: url || "/",
      type: type || "general",
      course: course || null,
      instructor: instructor || null,
      section: section || null,
      classType: classType || null
    });

    const pushOptions = {
      TTL: 60 * 60 * 24 * 3,    // 3 أيام
      urgency: "high"
    };

    // ---------- جلب كل الاشتراكات ----------
    const keys = await redis.keys("sub:*");
    let sent = 0;
    let failed = 0;
    let matched = 0;
    const startedAt = Date.now();
    const MAX_DURATION_MS = 8500;  // حد أمان: 8.5 ثواني
    const BATCH = Math.min(Math.max(parseInt(batchSize, 10) || 100, 5), 100);

    // لو dryRun → نرجّع matched بس من غير إرسال
    if (dryRun) {
      for (const key of keys) {
        const subData = await redis.hgetall(key);
        if (!subData || !subData.endpoint) continue;
        if (matchesTarget(subData, { dept, course, instructor, program, section, classType })) {
          matched++;
        }
      }
      return res.status(200).json({
        success: true,
        matched,
        total: keys.length,
        dryRun: true
      });
    }

    // ---------- الإرسال ----------
    for (let i = 0; i < keys.length; i += BATCH) {
      // لو قربنا من حد الوقت، نوقف ونرجّع اللي اتبعت لحد دلوقتي
      if (Date.now() - startedAt > MAX_DURATION_MS) {
        return res.status(200).json({
          success: true,
          sent,
          failed,
          matched,
          processed: i,
          total: keys.length,
          remaining: keys.length - i,
          message: "اتوقف لحد الوقت المسموح. كرّري الطلب عشان تكملي الباقي."
        });
      }

      const batch = keys.slice(i, i + BATCH);

      const results = await Promise.all(
        batch.map(async (key) => {
          try {
            const subData = await redis.hgetall(key);
            if (!subData || !subData.endpoint) return { ok: false, key };

            // فلترة بالاستهداف
            if (!matchesTarget(subData, { dept, course, instructor, program, section, classType })) {
              return { skipped: true };
            }
            matched++;

            const pushSubscription = {
              endpoint: subData.endpoint,
              keys: typeof subData.keys === 'string'
                ? JSON.parse(subData.keys)
                : subData.keys
            };

            await webpush.sendNotification(pushSubscription, payload, pushOptions);
            return { ok: true };
          } catch (err) {
            if (err.statusCode === 404 || err.statusCode === 410) {
              await redis.del(key);
            }
            return { ok: false, key };
          }
        })
      );

      for (const r of results) {
        if (r.ok) sent++;
        else if (r.skipped) {} // تم تجاوزه حسب الاستهداف
        else failed++;
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      failed,
      matched,
      total: keys.length
    });
  } catch (err) {
    console.error("push-send error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
