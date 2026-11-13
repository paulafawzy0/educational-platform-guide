// ============================================================
//  api/[...catchall].js — شبكة صيد (Catch-All)
//  أي مسار تحت /api/ مالوش ملف خاص بيه بيوصل هنا (الملفات الموجودة زي api/admin.js و api/push-send.js ليها الأولوية).
//  بيرد 404 مقلّد لصفحة Vercel الحقيقية وبيحظر الـ IP حظر دائم — الـ logic كله جوه api/admin.js (opts.trap).
//  ⚠️ قبل النشر: اتأكدي إن كل مسارات الـ API اللي الموقع بيستخدمها ليها ملف في api/ (أو rewrite في vercel.json)،
//     وإن مفيش مسار فرعي زي /api/x/y بيتنادى من الموقع نفسه.
//  ⚠️ أي طلب curl/سكريبت (من غير Sec-Fetch-Site) لمسار غلط هيحظر الـ IP — حتى IP بتاعك لو جرّبتي مسار غلط بـ curl.
// ============================================================
import handler from './admin.js';

export default function catchall(req, res) {
  return handler(req, res, { trap: true });
}
