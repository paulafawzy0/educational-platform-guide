// ============================================================
//  api/admin.js — لوحة الإشعارات المحمية بكلمة سر
//  كلمة سر اللوحة من PANEL_PASSWORD في Environment Variables
//  (مختلفة عن ADMIN_SECRET اللي بتبعت بيها الإشعارات)
//
//  Environment Variables:
//   PANEL_PASSWORD, ADMIN_PASSWORD, ADMIN_EMAIL, RESEND_API_KEY, OTP_FROM(اختياري)
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, PUBLIC_API_URL
//   ★ جديد:
//   ALLOWED_ORIGIN      — الـ origin الوحيد المسموح له بـ CORS (مثال https://your-domain.vercel.app)
//                         لو فاضي: مفيش CORS خالص (same-origin بس)
//   TELEGRAM_BOT_TOKEN  — توكن بوت التنبيهات (اختياري)
//   TELEGRAM_CHAT_ID    — الشات اللي بتوصله التنبيهات (اختياري)
//   OWNER_IPS           — IPs صاحبة النظام (IPv4/IPv6 مفصولين بفاصلة) — مابتتحظرش أبدًا (لسه محتاجة الباسورد)
//   RECOVERY_CODE       — كود طوارئ (52 حرف عشوائي على الأقل) بيتجاوز فحص الحظر بس: /api/admin?recovery=CODE
//                         لسه محتاج ADMIN_PASSWORD + رمز الإيميل. لو أقل من 52 حرف الميزة بتتعطّل.
//   RECOVERY_IPS        — IPs المسموح لها تستخدم RECOVERY_CODE (مفصولين بفاصلة، IPv6 → /64).
//                         فاضي = الـ recovery مقفول تمامًا (fail-closed)
//   PANEL_IPS           — IPs مسموح لها بالدخول لما "بوابة الدخول" تكون مفعلة (من شاشة الأدمن، مقفولة افتراضيًا).
//                         لما البوابة تتفعّل: أي IP مش في (PANEL_IPS + OWNER_IPS + وايت ليست + IPs مسموحة من الشاشة
//                         + recovery) → 404 على كل حاجة. الحالة في Redis: panel_gate:enabled (مش موجود = مقفولة)
// ============================================================
import { isIP } from 'net';


const PANEL_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>لوحة إرسال الإشعارات — منصة المواد</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; padding: 16px; }
  .container { max-width: 680px; margin: 0 auto; }
  h1 { font-size: 22px; text-align: center; margin-bottom: 6px; color: #38bdf8; }
  .subtitle { text-align: center; font-size: 13px; color: #94a3b8; margin-bottom: 24px; }
  .card { background: #1e293b; border-radius: 14px; padding: 18px; margin-bottom: 14px; border: 1px solid #334155; }
  .card h2 { font-size: 15px; color: #38bdf8; margin-bottom: 14px; border-bottom: 1px solid #334155; padding-bottom: 8px; }
  label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: #cbd5e1; }
  input, select, textarea { width: 100%; padding: 10px 12px; font-size: 14px; font-family: inherit; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 8px; margin-bottom: 14px; transition: border-color 0.2s; }
  input:focus, select:focus, textarea:focus { outline: none; border-color: #38bdf8; }
  textarea { resize: vertical; min-height: 70px; }
  .row { display: flex; gap: 10px; }
  .row > div { flex: 1; }
  .row input, .row select { margin-bottom: 14px; }
  .btns { display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap; }
  button { padding: 14px; font-size: 15px; font-weight: 700; font-family: inherit; border: 0; border-radius: 10px; cursor: pointer; transition: all 0.2s; flex: 1; }
  .btn-send { background: #059669; color: #fff; } .btn-send:hover { background: #047857; } .btn-send:disabled { opacity: 0.5; cursor: wait; }
  .btn-test { background: #7c3aed; color: #fff; } .btn-test:hover { background: #6d28d9; } .btn-test:disabled { opacity: 0.5; cursor: wait; }
  .btn-copy { background: #0891b2; color: #fff; flex: 0 0 100%; } .btn-copy:hover { background: #0e7490; }
  .btn-clear { background: #475569; color: #fff; flex: 0.5; } .btn-clear:hover { background: #334155; }
  #result, #psOutput { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 14px; font-size: 13px; font-family: monospace; white-space: pre-wrap; word-break: break-all; min-height: 50px; color: #94a3b8; }
  #result.ok { color: #4ade80; border-color: #059669; } #result.err { color: #f87171; border-color: #dc2626; }
  .hint { font-size: 11px; color: #64748b; margin-top: -8px; margin-bottom: 14px; }
  .preset-btn { background: #334155; color: #cbd5e1; border: 1px solid #475569; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; font-family: inherit; margin: 2px; transition: all 0.2s; }
  .preset-btn:hover { background: #475569; color: #fff; }
  .presets { margin-bottom: 14px; } .presets-label { font-size: 12px; color: #64748b; margin-bottom: 6px; }
  .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #059669; color: #fff; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 700; z-index: 9999; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="container">
  <h1>📢 لوحة إرسال الإشعارات</h1>
  <p class="subtitle">منصة المواد التعليمية — إرسال Web Push</p>

  <div class="card">
    <h2>⚙️ الإعدادات</h2>
    <label>رابط الـ API</label>
    <input type="text" id="apiUrl" value="__PUBLIC_API_URL__">
    <label>كلمة سر الإرسال (ADMIN_SECRET)</label>
    <input type="password" id="secret" placeholder="اكتبي كلمة سر الإرسال هنا">
    <p class="hint">⚠️ كلمة السر دي بتتبعت مع الإشعار (ADMIN_SECRET). مش بتتحفظ — بتتمسح أول ما تقفلي الصفحة.</p>
  </div>

  <div class="card">
    <h2>📋 قوالب جاهزة</h2>
    <div class="presets">
      <span class="presets-label">اضغطي على قالب لتعبئة الفورم:</span><br>
      <button class="preset-btn" onclick="loadPreset('all')">📢 لكل الطلاب</button>
      <button class="preset-btn" onclick="loadPreset('dept')">🎓 لقسم معين</button>
      <button class="preset-btn" onclick="loadPreset('course')">📚 لمادة + معيد</button>
      <button class="preset-btn" onclick="loadPreset('section')">🧩 لقسم + سكشن</button>
      <button class="preset-btn" onclick="loadPreset('lab')">🧪 معمل بس</button>
      <button class="preset-btn" onclick="loadPreset('lecture')">📖 محاضرة نظرية بس</button>
      <button class="preset-btn" onclick="loadPreset('waleed')">📢 تنبيه وليد ممدوح</button>
      <button class="preset-btn" onclick="loadPreset('cancel')">❌ إلغاء محاضرة</button>
    </div>
  </div>

  <div class="card">
    <h2>📝 محتوى الإشعار</h2>
    <label>العنوان (Title)</label>
    <input type="text" id="title" placeholder="مثلاً: 📚 محاضرة جديدة">
    <label>النص (Body)</label>
    <textarea id="body" placeholder="اكتبي تفاصيل الإشعار هنا..."></textarea>
    <label>الرابط عند الضغط (URL)</label>
    <input type="text" id="url" value="/">
    <label>نوع الإشعار (Type)</label>
    <select id="type">
      <option value="general">عام</option>
      <option value="lecture">📚 محاضرة جديدة</option>
      <option value="cancel">❌ إلغاء</option>
      <option value="alert">⚠️ تنبيه</option>
      <option value="exam">📝 امتحان</option>
    </select>
  </div>

  <div class="card">
    <h2>🎯 الاستهداف (اختياري)</h2>
    <p class="hint">سيبي فاضي = الكل. كل حقل بتعبيه بيضاف كفلتر (AND). القوائم بتح حدد تلقائيًا حسب اللي قبلها.</p>
    <div class="row">
      <div>
        <label>القسم (Dept)</label>
        <select id="dept" onchange="onDeptChange()">
          <option value="all">كل الأقسام</option>
          <option value="cs">علوم الحاسب</option>
          <option value="is">نظم المعلومات</option>
          <option value="se">هندسة البرمجيات</option>
          <option value="ai">الذكاء الاصطناعي</option>
        </select>
      </div>
      <div>
        <label>البرنامج (Program)</label>
        <select id="program" onchange="onProgramChange()">
          <option value="">— أي برنامج —</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div>
        <label>السكشن (Section)</label>
        <select id="section">
          <option value="">— أي سكشن —</option>
        </select>
      </div>
      <div>
        <label>نوع الحصة (Class Type)</label>
        <select id="classType">
          <option value="">— أي نوع —</option>
        </select>
      </div>
    </div>
    <label>المادة (Course)</label>
    <select id="course" onchange="onCourseChange()">
      <option value="">— كل المواد —</option>
    </select>
    <label>المعيد/الدكتور (Instructor)</label>
    <select id="instructor" onchange="onInstructorChange()">
      <option value="">— أي معيد/دكتور —</option>
    </select>
  </div>

  <div class="btns">
    <button class="btn-test" id="btnTest" onclick="send(true)">🧪 تجربة (بدون إرسال)</button>
    <button class="btn-send" id="btnSend" onclick="send(false)">📤 إرسال الإشعار</button>
    <button class="btn-clear" onclick="clearForm()">🗑️ مسح</button>
  </div>
  <div class="btns" style="margin-top: 10px;">
    <button class="btn-copy" onclick="copyPowerShell()">📋 نسخ أمر PowerShell</button>
  </div>

  <div class="card" style="margin-top: 14px;">
    <h2>📊 النتيجة</h2>
    <div id="result">في انتظار الإرسال...</div>
  </div>
  <div class="card" style="margin-top: 14px; display:none;" id="psCard">
    <h2>📋 أمر PowerShell (للنسخ)</h2>
    <div id="psOutput"></div>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>
// ============================================================
//  بيانات الجدول — مولّدة من CSV
// ============================================================
var SCHEDULE_DATA =

{
  "deptPrograms": {
    "cs": [
      "علوم الحاسب"
    ],
    "is": [
      "نظم المعلومات"
    ],
    "se": [
      "هندسة البرمجيات 1",
      "هندسة البرمجيات 2"
    ],
    "ai": [
      "الذكاء الاصطناعي"
    ]
  },
  "progSections": {
    "هندسة البرمجيات 1": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "علوم الحاسب": [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    "نظم المعلومات": [
      "1"
    ],
    "الذكاء الاصطناعي": [
      "1",
      "2",
      "3",
      "4"
    ],
    "هندسة البرمجيات 2": [
      "6",
      "7",
      "8",
      "9",
      "10"
    ]
  },
  "progCourses": {
    "هندسة البرمجيات 1": [
      "البرمجة المرئية",
      "التدريب الميداني",
      "تحليل وتصميم الخوارزميات",
      "شبكات الحاسب",
      "نظم التشغيل",
      "هندسة البرمجيات"
    ],
    "علوم الحاسب": [
      "البرمجة المرئية",
      "التدريب الميداني",
      "الرسم بالحاسب",
      "شبكات الحاسب",
      "نظم التشغيل",
      "هندسة البرمجيات"
    ],
    "نظم المعلومات": [
      "إدارة المشروعات المتقدمة",
      "البرمجة المرئية",
      "التدريب الميداني",
      "الرسم بالحاسب",
      "تحليل عددى",
      "تمارين تحليل عددي",
      "شبكات الحاسب",
      "هندسة البرمجيات"
    ],
    "الذكاء الاصطناعي": [
      "التدريب الميداني",
      "الرسم بالحاسب",
      "الشبكات العصبية",
      "تحليل وتصميم الخوارزميات",
      "تعلم الالة",
      "تفاعل الانسان والحاسب",
      "هندسة البرمجيات"
    ],
    "هندسة البرمجيات 2": [
      "البرمجة المرئية",
      "التدريب الميداني",
      "تحليل وتصميم الخوارزميات",
      "شبكات الحاسب",
      "نظم التشغيل",
      "هندسة البرمجيات"
    ]
  },
  "courseInstr": {
    "تحليل وتصميم الخوارزميات": [
      "د/ ماجد أحمد جاد الرب عسكر",
      "م/ عبدالله أحمد",
      "م/ محمود عصام"
    ],
    "نظم التشغيل": [
      "د/ لؤى ممدوح محمد",
      "م/ احمد عبدالرحمن"
    ],
    "التدريب الميداني": [
      "م/ احمد حسين",
      "م/ اكرام",
      "م/ امير",
      "م/ وليد ممدوح"
    ],
    "شبكات الحاسب": [
      "د/ طارق محمد عبد القادر",
      "م/ اسعد نصرالله",
      "م/ سحر خيري",
      "م/ محمد عبدالحميد"
    ],
    "الرسم بالحاسب": [
      "د/ لؤى ممدوح محمد",
      "م/ احمد هشام",
      "م/ مصطفى عبدالحليم"
    ],
    "تفاعل الانسان والحاسب": [
      "د/ اسماء عباس",
      "م/ رضوى صالح"
    ],
    "تعلم الالة": [
      "أ.م.د/ ممدوح فاروق",
      "م/ ماريا ايمن"
    ],
    "تمارين تحليل عددي": [
      "م/ الاء محمد"
    ],
    "البرمجة المرئية": [
      "د/ سارة طارق",
      "م/ اسماء اسماعيل",
      "م/ ريم اسامة",
      "م/ علي أحمد",
      "م/ مصطفى أسامة"
    ],
    "هندسة البرمجيات": [
      "د/ احمد مصطفى",
      "م/ جهاد زكريا",
      "م/ شيماء حسام الدين",
      "م/ محمد طه",
      "م/ مصطفى أسامة",
      "م/ نهاد عبدالرحيم"
    ],
    "تحليل عددى": [
      "د/ مديحة عبد المجيد على د/ مصطفى على عبد النعيم"
    ],
    "إدارة المشروعات المتقدمة": [
      "د/ سها عبدالمؤمن",
      "م/ غادة سمير"
    ],
    "الشبكات العصبية": [
      "د/ أمل عبد العظيم",
      "م/ عبدالرحمن فرغلي"
    ]
  },
  "courseTypes": {
    "تحليل وتصميم الخوارزميات": [
      "lab",
      "lecture"
    ],
    "نظم التشغيل": [
      "lab",
      "lecture"
    ],
    "التدريب الميداني": [
      "lab",
      "lecture"
    ],
    "شبكات الحاسب": [
      "lab",
      "lecture"
    ],
    "الرسم بالحاسب": [
      "lab",
      "lecture"
    ],
    "تفاعل الانسان والحاسب": [
      "lab",
      "lecture"
    ],
    "تعلم الالة": [
      "lab",
      "lecture"
    ],
    "تمارين تحليل عددي": [
      "lab"
    ],
    "البرمجة المرئية": [
      "lab",
      "lecture"
    ],
    "هندسة البرمجيات": [
      "lab",
      "lecture",
      "section"
    ],
    "تحليل عددى": [
      "lecture"
    ],
    "إدارة المشروعات المتقدمة": [
      "lab",
      "lecture"
    ],
    "الشبكات العصبية": [
      "lab",
      "lecture"
    ]
  },
  "ciTypes": {
    "تحليل وتصميم الخوارزميات|م/ محمود عصام": [
      "lab"
    ],
    "نظم التشغيل|م/ احمد عبدالرحمن": [
      "lab"
    ],
    "التدريب الميداني|م/ وليد ممدوح": [
      "lab"
    ],
    "شبكات الحاسب|م/ اسعد نصرالله": [
      "lab"
    ],
    "الرسم بالحاسب|م/ احمد هشام": [
      "lab"
    ],
    "تفاعل الانسان والحاسب|م/ رضوى صالح": [
      "lab"
    ],
    "تعلم الالة|م/ ماريا ايمن": [
      "lab"
    ],
    "التدريب الميداني|م/ اكرام": [
      "lab",
      "lecture"
    ],
    "شبكات الحاسب|م/ سحر خيري": [
      "lab"
    ],
    "تحليل وتصميم الخوارزميات|د/ ماجد أحمد جاد الرب عسكر": [
      "lecture"
    ],
    "تمارين تحليل عددي|م/ الاء محمد": [
      "lab"
    ],
    "البرمجة المرئية|م/ علي أحمد": [
      "lab"
    ],
    "البرمجة المرئية|م/ مصطفى أسامة": [
      "lab"
    ],
    "الرسم بالحاسب|د/ لؤى ممدوح محمد": [
      "lecture"
    ],
    "هندسة البرمجيات|م/ محمد طه": [
      "lab",
      "section"
    ],
    "تحليل وتصميم الخوارزميات|م/ عبدالله أحمد": [
      "lab"
    ],
    "البرمجة المرئية|د/ سارة طارق": [
      "lecture"
    ],
    "تفاعل الانسان والحاسب|د/ اسماء عباس": [
      "lecture"
    ],
    "تحليل عددى|د/ مديحة عبد المجيد على د/ مصطفى على عبد النعيم": [
      "lecture"
    ],
    "شبكات الحاسب|د/ طارق محمد عبد القادر": [
      "lecture"
    ],
    "شبكات الحاسب|م/ محمد عبدالحميد": [
      "lab"
    ],
    "البرمجة المرئية|م/ ريم اسامة": [
      "lab"
    ],
    "هندسة البرمجيات|م/ شيماء حسام الدين": [
      "lab"
    ],
    "تعلم الالة|أ.م.د/ ممدوح فاروق": [
      "lecture"
    ],
    "البرمجة المرئية|م/ اسماء اسماعيل": [
      "lab"
    ],
    "الرسم بالحاسب|م/ مصطفى عبدالحليم": [
      "lab"
    ],
    "إدارة المشروعات المتقدمة|م/ غادة سمير": [
      "lab"
    ],
    "الشبكات العصبية|م/ عبدالرحمن فرغلي": [
      "lab"
    ],
    "هندسة البرمجيات|م/ جهاد زكريا": [
      "lab"
    ],
    "إدارة المشروعات المتقدمة|د/ سها عبدالمؤمن": [
      "lecture"
    ],
    "هندسة البرمجيات|م/ مصطفى أسامة": [
      "lab"
    ],
    "التدريب الميداني|م/ احمد حسين": [
      "lab"
    ],
    "التدريب الميداني|م/ امير": [
      "lab"
    ],
    "هندسة البرمجيات|د/ احمد مصطفى": [
      "lecture"
    ],
    "نظم التشغيل|د/ لؤى ممدوح محمد": [
      "lecture"
    ],
    "هندسة البرمجيات|م/ نهاد عبدالرحيم": [
      "lab"
    ],
    "الشبكات العصبية|د/ أمل عبد العظيم": [
      "lecture"
    ]
  },
  "instrCourses": {
    "م/ محمود عصام": [
      "تحليل وتصميم الخوارزميات"
    ],
    "م/ احمد عبدالرحمن": [
      "نظم التشغيل"
    ],
    "م/ وليد ممدوح": [
      "التدريب الميداني"
    ],
    "م/ اسعد نصرالله": [
      "شبكات الحاسب"
    ],
    "م/ احمد هشام": [
      "الرسم بالحاسب"
    ],
    "م/ رضوى صالح": [
      "تفاعل الانسان والحاسب"
    ],
    "م/ ماريا ايمن": [
      "تعلم الالة"
    ],
    "م/ اكرام": [
      "التدريب الميداني"
    ],
    "م/ سحر خيري": [
      "شبكات الحاسب"
    ],
    "د/ ماجد أحمد جاد الرب عسكر": [
      "تحليل وتصميم الخوارزميات"
    ],
    "م/ الاء محمد": [
      "تمارين تحليل عددي"
    ],
    "م/ علي أحمد": [
      "البرمجة المرئية"
    ],
    "م/ مصطفى أسامة": [
      "البرمجة المرئية",
      "هندسة البرمجيات"
    ],
    "د/ لؤى ممدوح محمد": [
      "الرسم بالحاسب",
      "نظم التشغيل"
    ],
    "م/ محمد طه": [
      "هندسة البرمجيات"
    ],
    "م/ عبدالله أحمد": [
      "تحليل وتصميم الخوارزميات"
    ],
    "د/ سارة طارق": [
      "البرمجة المرئية"
    ],
    "د/ اسماء عباس": [
      "تفاعل الانسان والحاسب"
    ],
    "د/ مديحة عبد المجيد على د/ مصطفى على عبد النعيم": [
      "تحليل عددى"
    ],
    "د/ طارق محمد عبد القادر": [
      "شبكات الحاسب"
    ],
    "م/ محمد عبدالحميد": [
      "شبكات الحاسب"
    ],
    "م/ ريم اسامة": [
      "البرمجة المرئية"
    ],
    "م/ شيماء حسام الدين": [
      "هندسة البرمجيات"
    ],
    "أ.م.د/ ممدوح فاروق": [
      "تعلم الالة"
    ],
    "م/ اسماء اسماعيل": [
      "البرمجة المرئية"
    ],
    "م/ مصطفى عبدالحليم": [
      "الرسم بالحاسب"
    ],
    "م/ غادة سمير": [
      "إدارة المشروعات المتقدمة"
    ],
    "م/ عبدالرحمن فرغلي": [
      "الشبكات العصبية"
    ],
    "م/ جهاد زكريا": [
      "هندسة البرمجيات"
    ],
    "د/ سها عبدالمؤمن": [
      "إدارة المشروعات المتقدمة"
    ],
    "م/ احمد حسين": [
      "التدريب الميداني"
    ],
    "م/ امير": [
      "التدريب الميداني"
    ],
    "د/ احمد مصطفى": [
      "هندسة البرمجيات"
    ],
    "م/ نهاد عبدالرحيم": [
      "هندسة البرمجيات"
    ],
    "د/ أمل عبد العظيم": [
      "الشبكات العصبية"
    ]
  },
  "allCourses": [
    "إدارة المشروعات المتقدمة",
    "البرمجة المرئية",
    "التدريب الميداني",
    "الرسم بالحاسب",
    "الشبكات العصبية",
    "تحليل عددى",
    "تحليل وتصميم الخوارزميات",
    "تعلم الالة",
    "تفاعل الانسان والحاسب",
    "تمارين تحليل عددي",
    "شبكات الحاسب",
    "نظم التشغيل",
    "هندسة البرمجيات"
  ],
  "allInstructors": [
    "أ.م.د/ ممدوح فاروق",
    "د/ أمل عبد العظيم",
    "د/ احمد مصطفى",
    "د/ اسماء عباس",
    "د/ سارة طارق",
    "د/ سها عبدالمؤمن",
    "د/ طارق محمد عبد القادر",
    "د/ لؤى ممدوح محمد",
    "د/ ماجد أحمد جاد الرب عسكر",
    "د/ مديحة عبد المجيد على د/ مصطفى على عبد النعيم",
    "م/ احمد حسين",
    "م/ احمد عبدالرحمن",
    "م/ احمد هشام",
    "م/ اسعد نصرالله",
    "م/ اسماء اسماعيل",
    "م/ اكرام",
    "م/ الاء محمد",
    "م/ امير",
    "م/ جهاد زكريا",
    "م/ رضوى صالح",
    "م/ ريم اسامة",
    "م/ سحر خيري",
    "م/ شيماء حسام الدين",
    "م/ عبدالرحمن فرغلي",
    "م/ عبدالله أحمد",
    "م/ علي أحمد",
    "م/ غادة سمير",
    "م/ ماريا ايمن",
    "م/ محمد طه",
    "م/ محمد عبدالحميد",
    "م/ محمود عصام",
    "م/ مصطفى أسامة",
    "م/ مصطفى عبدالحليم",
    "م/ نهاد عبدالرحيم",
    "م/ وليد ممدوح"
  ],
  "allPrograms": [
    "الذكاء الاصطناعي",
    "علوم الحاسب",
    "نظم المعلومات",
    "هندسة البرمجيات 1",
    "هندسة البرمجيات 2"
  ]
}
;

// ============================================================
//  القوالب الجاهزة
// ============================================================
var PRESETS = {
  all: { title: "📢 إعلان عام لكل الطلاب", body: "اكتبي رسالتك هنا...", url: "/", type: "general", dept: "all", program: "", section: "", course: "", instructor: "", classType: "" },
  dept: { title: "📢 إعلان لقسم علوم الحاسب", body: "اكتبي رسالتك هنا...", url: "/", type: "general", dept: "cs", program: "", section: "", course: "", instructor: "", classType: "" },
  course: { title: "📚 محاضرة جديدة: نظم التشغيل", body: "اكتبي تفاصيل المحاضرة هنا...", url: "/", type: "lecture", dept: "all", program: "", section: "", course: "نظم التشغيل", instructor: "م/ احمد عبدالرحمن", classType: "" },
  section: { title: "🧩 تنبيه لسكشن 1", body: "اكتبي رسالتك هنا...", url: "/", type: "alert", dept: "cs", program: "علوم الحاسب", section: "1", course: "", instructor: "", classType: "" },
  lab: { title: "🧪 معمل: شبكات الحاسب", body: "اكتبي تفاصيل المعمل هنا...", url: "/", type: "lecture", dept: "all", program: "", section: "", course: "شبكات الحاسب", instructor: "", program: "", classType: "lab" },
  lecture: { title: "📖 محاضرة نظرية: هندسة البرمجيات", body: "اكتبي تفاصيل المحاضرة هنا...", url: "/", type: "lecture", dept: "all", program: "", section: "", course: "هندسة البرمجيات", instructor: "", classType: "lecture" },
  waleed: { title: "📢 تنبيه: سكاشن التدريب الميداني", body: "سكاشن البشمهندس/ وليد ممدوح بكرة هتكون أوفلاين عادي.\\n\\nماعدا سكشن SE 9 وسكشن CS 3 — هياخدوا السكشن يوم الاثنين الساعة 7 بالليل بعد صلاة العشاء (أونلاين).", url: "/", type: "alert", dept: "all", program: "", section: "", course: "التدريب الميداني", instructor: "م/ وليد ممدوح", classType: "lab" },
  cancel: { title: "❌ إلغاء محاضرة", body: "اكتبي تفاصيل الإلغاء هنا...", url: "/", type: "cancel", dept: "all", program: "", section: "", course: "", instructor: "", classType: "" }
};

// ============================================================
//  دوال القوائم المتسلسلة (Cascading Dropdowns)
// ============================================================
function fillSelect(id, items, includeEmpty, emptyLabel) {
  var sel = document.getElementById(id);
  var current = sel.value;
  sel.innerHTML = '';
  if (includeEmpty) {
    var opt = document.createElement('option');
    opt.value = '';
    opt.textContent = emptyLabel || '— الكل —';
    sel.appendChild(opt);
  }
  items.forEach(function(item) {
    var opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    sel.appendChild(opt);
  });
  // نحاول نحافظ على القيمة المختارة لو لسه موجودة
  if (items.indexOf(current) > -1) sel.value = current;
}

function onDeptChange() {
  var dept = getVal('dept');
  var programs = [];
  if (dept === 'all' || !dept) {
    programs = SCHEDULE_DATA.allPrograms;
  } else {
    programs = SCHEDULE_DATA.deptPrograms[dept] || [];
  }
  fillSelect('program', programs, true, '— أي برنامج —');
  onProgramChange();
}

function onProgramChange() {
  var prog = getVal('program');
  var dept = getVal('dept');

  // فلترة السكاشن حسب البرنامج
  var sections = [];
  if (prog && SCHEDULE_DATA.progSections[prog]) {
    sections = SCHEDULE_DATA.progSections[prog];
  } else if (dept !== 'all' && dept) {
    // لو مفيش برنامج محدد بس فيه قسم، نجيب سكاشن كل برامج القسم
    var deptProgs = SCHEDULE_DATA.deptPrograms[dept] || [];
    var sset = {};
    deptProgs.forEach(function(p) {
      (SCHEDULE_DATA.progSections[p] || []).forEach(function(s) { sset[s] = true; });
    });
    sections = Object.keys(sset).sort(function(a,b) { return parseInt(a) - parseInt(b); });
  } else {
    // كل السكاشن
    var sset2 = {};
    Object.values(SCHEDULE_DATA.progSections).forEach(function(arr) {
      arr.forEach(function(s) { sset2[s] = true; });
    });
    sections = Object.keys(sset2).sort(function(a,b) { return parseInt(a) - parseInt(b); });
  }
  fillSelect('section', sections, true, '— أي سكشن —');

  // فلترة المواد حسب البرنامج
  var courses = [];
  if (prog && SCHEDULE_DATA.progCourses[prog]) {
    courses = SCHEDULE_DATA.progCourses[prog];
  } else if (dept !== 'all' && dept) {
    var deptProgs2 = SCHEDULE_DATA.deptPrograms[dept] || [];
    var cset = {};
    deptProgs2.forEach(function(p) {
      (SCHEDULE_DATA.progCourses[p] || []).forEach(function(c) { cset[c] = true; });
    });
    courses = Object.keys(cset).sort();
  } else {
    courses = SCHEDULE_DATA.allCourses;
  }
  fillSelect('course', courses, true, '— كل المواد —');
  onCourseChange();
}

function onCourseChange() {
  var course = getVal('course');
  var instructors = [];
  if (course && SCHEDULE_DATA.courseInstr[course]) {
    instructors = SCHEDULE_DATA.courseInstr[course];
  } else {
    instructors = SCHEDULE_DATA.allInstructors;
  }
  fillSelect('instructor', instructors, true, '— أي معيد/دكتور —');

  // فلترة نوع الحصة حسب المادة
  var types = [];
  if (course && SCHEDULE_DATA.courseTypes[course]) {
    types = SCHEDULE_DATA.courseTypes[course];
  } else {
    types = ['lecture', 'lab', 'section'];
  }
  var typeLabels = { lecture: 'محاضرة (Lecture)', lab: 'معمل (Lab)', section: 'سكشن (Section)' };
  var sel = document.getElementById('classType');
  var current = sel.value;
  sel.innerHTML = '<option value="">— أي نوع —</option>';
  types.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t;
    opt.textContent = typeLabels[t] || t;
    sel.appendChild(opt);
  });
  if (types.indexOf(current) > -1) sel.value = current;
}

function onInstructorChange() {
  // لو اختارت معيد، نفلتر نوع الحصة كمان حسب المعيد+المادة
  var course = getVal('course');
  var instr = getVal('instructor');
  if (!course || !instr) return;

  var key = course + '|' + instr;
  var types = SCHEDULE_DATA.ciTypes[key] || SCHEDULE_DATA.courseTypes[course] || ['lecture', 'lab', 'section'];
  var typeLabels = { lecture: 'محاضرة (Lecture)', lab: 'معمل (Lab)', section: 'سكشن (Section)' };
  var sel = document.getElementById('classType');
  var current = sel.value;
  sel.innerHTML = '<option value="">— أي نوع —</option>';
  types.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t;
    opt.textContent = typeLabels[t] || t;
    sel.appendChild(opt);
  });
  if (types.indexOf(current) > -1) sel.value = current;
}

// ============================================================
//  تعبئة القوالب
// ============================================================
function loadPreset(key) {
  var p = PRESETS[key];
  if (!p) return;
  setVal('title', p.title);
  setVal('body', p.body);
  setVal('url', p.url);
  setVal('type', p.type);
  setVal('dept', p.dept);
  // حدّث القوائم المتسلسلة
  onDeptChange();
  setVal('program', p.program);
  onProgramChange();
  setVal('section', p.section);
  setVal('course', p.course);
  onCourseChange();
  setVal('instructor', p.instructor);
  onInstructorChange();
  setVal('classType', p.classType);
}

function setVal(id, val) { var el = document.getElementById(id); if (el) el.value = val; }
function getVal(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

function clearForm() {
  ['title','body'].forEach(function(id) { setVal(id, ''); });
  setVal('url', '/');
  setVal('type', 'general');
  setVal('dept', 'all');
  onDeptChange();
  setVal('section', '');
  setVal('course', '');
  onCourseChange();
  setVal('instructor', '');
  setVal('classType', '');
  document.getElementById('result').textContent = 'في انتظار الإرسال...';
  document.getElementById('result').className = '';
  document.getElementById('psCard').style.display = 'none';
}

function buildData(isDryRun) {
  var data = { title: getVal('title'), body: getVal('body'), url: getVal('url') || '/', type: getVal('type'), dept: getVal('dept') || 'all' };
  var fields = ['program','section','course','instructor','classType'];
  fields.forEach(function(f) { var v = getVal(f); if (v) data[f] = v; });
  if (isDryRun) data.dryRun = true;
  return data;
}

function send(isDryRun) {
  var apiUrl = getVal('apiUrl');
  var secret = getVal('secret');
  if (!secret) { showResult('❌ اكتبي كلمة السر الأول!', 'err'); return; }
  var data = buildData(isDryRun);
  if (!data.title || !data.body) { showResult('❌ اكتبي العنوان والنص!', 'err'); return; }
  var btnId = isDryRun ? 'btnTest' : 'btnSend';
  var btn = document.getElementById(btnId);
  btn.disabled = true;
  btn.textContent = isDryRun ? '⏳ جاري التجربة...' : '⏳ جاري الإرسال...';
  showResult(isDryRun ? '⏳ جاري التجربة...' : '⏳ جاري الإرسال...', '');
  fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + secret }, body: JSON.stringify(data) })
  .then(function(r) { return r.text().then(function(text) { try { return JSON.parse(text); } catch(e) { return { error: text, status: r.status }; } }); })
  .then(function(result) {
    if (result.error) { showResult('❌ خطأ: ' + JSON.stringify(result, null, 2), 'err'); }
    else if (isDryRun) { showResult('✅ التجربة نجحت!\\n\\nاللي هيوصلهم: ' + (result.matched||0) + ' طالب\\nإجمالي المشتركين: ' + (result.total||0) + '\\n\\n' + JSON.stringify(result, null, 2), 'ok'); }
    else {
      var msg = '✅ تم الإرسال!\\n\\n✅ وصل: ' + (result.sent||0) + ' | ❌ فشل: ' + (result.failed||0) + ' | 🎯 مطابق: ' + (result.matched||0) + ' | 📊 إجمالي: ' + (result.total||0);
      if (result.remaining) msg += '\\n\\n⚠️ فيه ' + result.remaining + ' متبقي — كرّري الطلب';
      msg += '\\n\\n' + JSON.stringify(result, null, 2);
      showResult(msg, 'ok');
    }
  })
  .catch(function(err) { showResult('❌ خطأ في الاتصال: ' + err.message, 'err'); })
  .finally(function() { btn.disabled = false; btn.textContent = isDryRun ? '🧪 تجربة (بدون إرسال)' : '📤 إرسال الإشعار'; });
}

function copyPowerShell() {
  var apiUrl = getVal('apiUrl');
  var secret = getVal('secret');
  var data = buildData(false);
  if (!data.title || !data.body) { showToast('❌ اكتبي العنوان والنص الأول!'); return; }
  var psSecret = secret || 'YOUR_SECRET_HERE';
  var hasDollar = psSecret.indexOf('$') > -1;
  var secretStr = hasDollar ? "'" + psSecret + "'" : '"' + psSecret + '"';
  var psBody = '$h = @{ Authorization = "Bearer ' + psSecret + '" }\\n';
  var items = [];
  items.push('title = "' + data.title.replace(/"/g, '\`"') + '"');
  items.push('body = "' + data.body.replace(/"/g, '\`"').replace(/\\n/g, ' ') + '"');
  items.push('url = "' + (data.url || '/') + '"');
  items.push('dept = "' + (data.dept || 'all') + '"');
  if (data.type) items.push('type = "' + data.type + '"');
  if (data.course) items.push('course = "' + data.course + '"');
  if (data.instructor) items.push('instructor = "' + data.instructor + '"');
  if (data.program) items.push('program = "' + data.program + '"');
  if (data.section) items.push('section = "' + data.section + '"');
  if (data.classType) items.push('classType = "' + data.classType + '"');
  psBody += '$b = @{ ' + items.join('; ') + ' } | ConvertTo-Json -Compress\\n';
  psBody += 'Invoke-RestMethod -Uri "' + apiUrl + '" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body ([System.Text.Encoding]::UTF8.GetBytes($b))';
  document.getElementById('psOutput').textContent = psBody;
  document.getElementById('psCard').style.display = '';
  navigator.clipboard.writeText(psBody).then(function() { showToast('✅ اتنسخ أمر PowerShell!'); }).catch(function() { showToast('📋 انسخيه يدويًا من الصندوق تحت'); });
}

function showResult(text, cls) { var el = document.getElementById('result'); el.textContent = text; el.className = cls || ''; }
function showToast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(function() { t.classList.remove('show'); }, 2500); }

// تهيئة أول مرة
onDeptChange();
</script>
</body>
</html>
`;

// ★ صفحة تسجيل الدخول (form POST عادي — بدون JS redirect)
const LOGIN_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>تسجيل الدخول — لوحة الإشعارات</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; }
  .login-box { background: #1e293b; border-radius: 16px; padding: 32px; max-width: 380px; width: 100%; border: 1px solid #334155; }
  h1 { font-size: 22px; text-align: center; color: #38bdf8; margin-bottom: 8px; }
  p { text-align: center; color: #94a3b8; font-size: 13px; margin-bottom: 24px; }
  label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #cbd5e1; }
  input { width: 100%; padding: 12px 14px; font-size: 15px; font-family: inherit; background: #0f172a; color: #e2e8f0; border: 1px solid #475569; border-radius: 10px; margin-bottom: 16px; }
  input:focus { outline: none; border-color: #38bdf8; }
  button { width: 100%; padding: 14px; font-size: 16px; font-weight: 700; font-family: inherit; background: #059669; color: #fff; border: 0; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
  button:hover { background: #047857; }
  button:disabled { opacity: 0.5; cursor: wait; }
  .error { color: #f87171; text-align: center; font-size: 13px; margin-bottom: 16px; display: none; }
  .error.show { display: block; }
  .ban-msg { color: #f87171; text-align: center; font-size: 15px; font-weight: 700; margin-bottom: 16px; padding: 12px; background: rgba(239,68,68,0.1); border-radius: 10px; display: none; }
  .ban-msg.show { display: block; }
</style>
</head>
<body>
<div class="login-box">
  <h1>🔐 لوحة الإشعارات</h1>
  <p>اكتبي كلمة السر للدخول</p>
  <div class="ban-msg" id="banMsg"></div>
  <div class="error" id="err">❌ كلمة السر غلط</div>
  <form method="POST" action="/api/admin" autocomplete="off">
    <label>كلمة السر</label>
    <input type="password" id="pass" name="password" placeholder="•••••••••" autofocus required>
    <button type="submit" id="loginBtn">🔑 دخول</button>
  </form>
</div>
</body>
</html>`;

function renderLogin({ error = false, banMessage = '', mode = 'password', message = '' } = {}) {
  let html = LOGIN_HTML;
  if (mode === 'code') {
    html = html.replace('<title>تسجيل الدخول — لوحة الإشعارات</title>', '<title>رمز التحقق — لوحة الإشعارات</title>');
    html = html.replace('<p>اكتبي كلمة السر للدخول</p>', '<p>بعتنا رمز من 6 أرقام على الإيميل. اكتبيه هنا (صالح 10 دقايق).</p>');
    html = html.replace('<label>كلمة السر</label>', '<label>رمز التحقق</label>');
    html = html.replace(/<input type="password"[^>]*>/, '<input type="text" id="code" name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="000000" autocomplete="one-time-code" autofocus required>');
    html = html.replace('🔑 دخول', '✅ تأكيد');
  }
  if (message) html = html.replace('❌ كلمة السر غلط', message);
  if (error) html = html.replace('<div class="error" id="err">', '<div class="error show" id="err">');
  if (banMessage) {
    html = html.replace('<div class="ban-msg" id="banMsg"></div>', '<div class="ban-msg show" id="banMsg">' + banMessage + '</div>');
    html = html.replace('id="loginBtn">', 'id="loginBtn" disabled>');
  }
  return html;
}

// ★ تفكيك IPv6 لـ 8 مجموعات (أرقام) — null لو الصيغة غلط
function expandIPv6(ip) {
  let s = String(ip).split('%')[0].toLowerCase();
  const m = s.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/); // ذيل IPv4 (::ffff:1.2.3.4)
  if (m) {
    const o = m[2].split('.').map(Number);
    if (o.length !== 4 || o.some((n) => !(n >= 0 && n <= 255))) return null;
    s = m[1] + ((o[0] << 8) | o[1]).toString(16) + ':' + ((o[2] << 8) | o[3]).toString(16);
  }
  let groups;
  if (s.indexOf('::') !== -1) {
    const parts = s.split('::');
    if (parts.length !== 2) return null;
    const head = parts[0] ? parts[0].split(':') : [];
    const tail = parts[1] ? parts[1].split(':') : [];
    const fill = 8 - head.length - tail.length;
    if (fill < 1) return null;
    groups = head.concat(Array(fill).fill('0'), tail);
  } else {
    groups = s.split(':');
  }
  if (groups.length !== 8 || !groups.every((g) => /^[0-9a-f]{1,4}$/.test(g))) return null;
  return groups.map((g) => parseInt(g, 16));
}

// ★ البند 4: مفتاح الحظر — IPv4 زي ما هو، IPv6 على مستوى /64 (أول 4 مجموعات)
function banPrefix(ip) {
  ip = String(ip || '');
  if (ip.indexOf(':') === -1) return ip;
  const g = expandIPv6(ip);
  if (!g) return ip;
  // ::ffff:a.b.c.d (IPv4-mapped بصيغة hex) → نرجعه IPv4 عشان مايتجمّعوش كلهم في prefix واحد
  if (g.slice(0, 5).every((x) => x === 0) && g[5] === 0xffff) {
    return [g[6] >> 8, g[6] & 255, g[7] >> 8, g[7] & 255].join('.');
  }
  return g.slice(0, 4).map((x) => x.toString(16)).join(':') + '::';
}

// عرض المفتاح للأدمن (IPv6 → /64)
function shownKey(k) {
  return String(k).slice(-2) === '::' ? k + '/64' : k;
}

// IP يكتبه الأدمن → مفتاح موحّد (أو '' لو مش IP صالح)
function normalizeIpInput(v) {
  const t = String(v || '').trim().replace(/%.*$/, '').replace(/\/64$/, '')
    .replace(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i, '$1');
  return isIP(t) ? banPrefix(t) : '';
}

// تنظيف نص حر (ملاحظة/سبب): بدون محارف تحكم وبحد أقصى للطول
function cleanText(v, max) {
  return String(v == null ? '' : v).replace(/[\x00-\x1f\x7f]/g, ' ').trim().slice(0, max);
}

function escapeHtml(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderAdminPage(d, currentKey) {
  const e = escapeHtml;
  const fmt = (t) => new Date(t).toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });
  const me = (k) => (k === currentKey ? ' <span class="me">(ده الـ IP بتاعك)</span>' : '');
  const post = (action, fields, label, cls) =>
    '<form method="POST" action="/api/admin"><input type="hidden" name="action" value="' + action + '">' +
    Object.keys(fields).map((k) => '<input type="hidden" name="' + k + '" value="' + e(fields[k]) + '">').join('') +
    '<button type="submit" class="' + (cls || '') + '">' + label + '</button></form>';

  // ✅ القائمة البيضاء
  const wlRows = d.whitelist.length ? d.whitelist.map((w) =>
    '<tr><td dir="ltr">' + e(shownKey(w.ip)) + me(w.ip) + '</td><td>' + e(w.note || '—') + '</td><td dir="ltr">' + e(w.addedBy || '—') +
    '</td><td>' + e(w.addedAt ? fmt(w.addedAt) : '—') + '</td><td>' + (w.expiresAt ? e(fmt(w.expiresAt)) : 'دائم') +
    '</td><td>' + post('wl_del', { ip: w.ip }, '🗑️ حذف', 'del') + '</td></tr>'
  ).join('') : '<tr><td colspan="6" class="empty">القائمة فاضية</td></tr>';

  // 🌐 IPs المسموح لها بشاشة الأدمن (temp access)
  const piRows = d.panelIps.length ? d.panelIps.map((p) =>
    '<tr><td dir="ltr">' + e(shownKey(p.ip)) + me(p.ip) + '</td><td>' + e(p.note || '—') + '</td><td dir="ltr">' + e(p.addedBy || '—') +
    '</td><td>' + e(p.addedAt ? fmt(p.addedAt) : '—') + '</td><td>' + (p.expiresAt ? e(fmt(p.expiresAt)) : '⚠️ دائم') +
    '</td><td>' + post('panel_ip_del', { ip: p.ip }, '🗑️ حذف', 'del') + '</td></tr>'
  ).join('') : '<tr><td colspan="6" class="empty">مفيش IPs مضافة من هنا</td></tr>';

  // 🚫 القائمة السوداء
  const blRows = d.blacklist.length ? d.blacklist.map((b) =>
    '<tr><td dir="ltr">' + e(shownKey(b.ip)) + me(b.ip) + '</td><td>' + e(b.reason || '—') + '</td><td dir="ltr">' + e(b.addedBy || '—') +
    '</td><td>' + e(b.addedAt ? fmt(b.addedAt) : '—') +
    '</td><td>' + post('bl_del', { ip: b.ip }, '🗑️ حذف', 'del') + '</td></tr>'
  ).join('') : '<tr><td colspan="5" class="empty">القائمة فاضية</td></tr>';

  // ⛔ جدول الحظر
  const banRows = d.bans.length ? d.bans.map((b) => {
    let status;
    if (b.level === 'perm') status = '🚫 دائم';
    else if (b.level === 'temp' && b.until > Date.now()) status = '⏳ مؤقت — ينتهي ' + e(fmt(b.until));
    else if (b.level === 'temp') status = '⌛ المؤقت انتهى (أي 5 محاولات غلط تانية = دائم)';
    else status = '⚠️ محاولات فاشلة بس (' + e(b.fails || 0) + ')';
    return '<tr><td dir="ltr">' + e(shownKey(b.ip)) + me(b.ip) + '</td><td>' + status + '</td><td>' + post('unban', { ip: b.ip }, '🔓 فك الحظر') + '</td></tr>';
  }).join('') : '<tr><td colspan="3" class="empty">مفيش أي IP محظور حاليًا ✅</td></tr>';

  // 📜 سجل العمليات
  const labels = {
    login_ok: '✅ دخول ناجح', login_fail: '❌ كلمة سر غلط', otp_sent: '📧 إرسال رمز', otp_fail: '❌ رمز غلط',
    ban_temp: '⏳ حظر مؤقت', ban_perm: '🚫 حظر دائم', unban: '🔓 فك حظر', logout: '🚪 خروج',
    whitelist_add: '✅ إضافة للبيضاء', whitelist_del: '🗑️ حذف من البيضاء', whitelist_expired: '⌛ انتهاء بيضاء',
    blacklist_add: '🚫 إضافة للسوداء', blacklist_del: '🗑️ حذف من السوداء',
    owner_fail: '⚠️ غلطة من IP صاحبة النظام', recovery_used: '🆘 استخدام رابط الطوارئ', otp_cooldown: '⏳ وقف ساعة (رمز)',
    panel_ip_rejected: '🚫 محاولة دخول من IP غير مسموح', panel_ip_temp_add: '🌐 إضافة IP مؤقت', panel_ip_temp_del: '🗑️ حذف IP مؤقت',
    recovery_ip_rejected: '⚠️ Recovery من IP غير مسموح', panel_ips_misconfig: '⚠️ PANEL_IPS كلها غلط',
    panel_gate_on: '🟢 تفعيل بوابة الدخول', panel_gate_off: '🔴 إلغاء بوابة الدخول'
  };
  const detailsOf = (r) => Object.keys(r).filter((k) => k !== 't' && k !== 'a' && k !== 'ip')
    .map((k) => e(k) + ': ' + e(r[k])).join(' • ');
  const auRows = d.audit.length ? d.audit.map((r) =>
    '<tr><td>' + e(r.t ? fmt(r.t) : '—') + '</td><td>' + e(labels[r.a] || r.a) + '</td><td dir="ltr">' + e(r.ip || '—') + '</td><td>' + (detailsOf(r) || '—') + '</td></tr>'
  ).join('') : '<tr><td colspan="4" class="empty">لسه مفيش عمليات مسجلة</td></tr>';

  // 🚪 بوابة الدخول (ON/OFF)
  const gateSection =
    '<h2 class="gt">🚪 بوابة الدخول</h2>' +
    '<p class="sub">الحالة: <b>' + (d.gateOn ? '🟢 مفعلة' : '🔴 مقفولة') + '</b> — ' +
    (d.gateOn
      ? 'أي IP مش في القوايم (PANEL_IPS / OWNER_IPS / الوايت ليست / IPs المسموحة / recovery) بيشوف 404 على كل حاجة. لو حد جديد عايز يدخل، ضيفيه في الوايت ليست وهتتفتح له فورًا.'
      : 'كل الناس بتشوف صفحة الدخول. فعّليها لما الـ users يدخلوا ويستخدموا النظام الأول.') + '</p>' +
    post('panel_gate_toggle', { to: d.gateOn ? 'off' : 'on' }, d.gateOn ? '🔴 إلغاء البوابة' : '🟢 تفعيل البوابة', d.gateOn ? 'del' : '');

  const addForm = (action, second, secondPh, extra) =>
    '<form method="POST" action="/api/admin" class="add"><input type="hidden" name="action" value="' + action + '">' +
    '<input name="ip" dir="ltr" placeholder="IP" required maxlength="45">' +
    '<input name="' + second + '" placeholder="' + secondPh + '"' + (extra || '') + ' maxlength="120">';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>إدارة الحظر</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; padding: 16px; }
  .box { max-width: 980px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; }
  h1 { font-size: 22px; color: #38bdf8; margin-bottom: 6px; }
  h2 { font-size: 17px; margin: 26px 0 6px; }
  h2.gt { color: #c4b5fd; } h2.pi { color: #38bdf8; } h2.wl { color: #34d399; } h2.bl { color: #f87171; } h2.bn { color: #fbbf24; } h2.au { color: #a5b4fc; }
  p.sub { color: #94a3b8; font-size: 13px; margin-bottom: 10px; }
  .wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { padding: 9px; border-bottom: 1px solid #334155; text-align: right; vertical-align: middle; }
  th { color: #94a3b8; font-weight: 700; }
  td.empty { text-align: center; color: #94a3b8; padding: 20px; }
  .me { color: #fbbf24; font-size: 12px; }
  button { padding: 8px 14px; font-size: 13px; font-weight: 700; font-family: inherit; background: #059669; color: #fff; border: 0; border-radius: 8px; cursor: pointer; }
  button:hover { background: #047857; }
  button.del { background: #b91c1c; } button.del:hover { background: #991b1b; }
  button.out { background: #475569; margin-top: 22px; }
  form.add { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 12px; }
  form.add input, form.add select { padding: 8px 10px; font-size: 13px; font-family: inherit; background: #0f172a; color: #e2e8f0; border: 1px solid #334155; border-radius: 8px; }
  form.add input[name=ip] { width: 190px; } form.add input:not([name=ip]) { flex: 1; min-width: 150px; }
</style>
</head>
<body>
<div class="box">
  <h1>🛡️ إدارة الدخول</h1>
  <p class="sub">عناوين IPv6 بتتطبق على الـ /64 كله. القائمة السوداء بتتغلب على البيضاء.</p>

  ${gateSection}

  <h2 class="wl">✅ القائمة البيضاء</h2>
  <p class="sub">IP هنا مابيتحظرش أبدًا (بس لسه محتاج كلمة السر). ولما بوابة الدخول تكون مفعلة، الوايت ليست بتفتحله الدخول كمان.</p>
  ${addForm('wl_add', 'note', 'ملاحظة (اختياري)')}
    <select name="duration"><option value="perm">دائم</option><option value="1h">ساعة</option><option value="1d">يوم</option><option value="1w">أسبوع</option></select>
    <button type="submit">➕ إضافة</button></form>
  <div class="wrap"><table>
    <tr><th>الـ IP</th><th>ملاحظة</th><th>أضيف بواسطة</th><th>تاريخ الإضافة</th><th>ينتهي</th><th></th></tr>
    ${wlRows}
  </table></div>

  <h2 class="pi">🌐 IPs المسموح لها بالدخول</h2>
  <p class="sub">دي IPs مسموح لها بالدخول لما البوابة تكون مفعلة (بالإضافة للي في الـ env والوايت ليست). ⚠️ "دائم" بيفضل مفتوح لحد ما تمسحيه (حد أقصى 10). مش هتقدري تمسحي الـ IP اللي بتدخلي منه لو هو السبب الوحيد في دخولك.</p>
  ${addForm('panel_ip_add', 'note', 'ملاحظة (اختياري)')}
    <select name="duration"><option value="1h">ساعة</option><option value="1d">يوم</option><option value="1w">أسبوع</option><option value="perm">دائم ⚠️</option></select>
    <button type="submit">➕ إضافة</button></form>
  <div class="wrap"><table>
    <tr><th>الـ IP</th><th>ملاحظة</th><th>أضيف بواسطة</th><th>تاريخ الإضافة</th><th>ينتهي</th><th></th></tr>
    ${piRows}
  </table></div>

  <h2 class="bl">🚫 القائمة السوداء</h2>
  <p class="sub">IP هنا محظور فورًا ودائمًا — حتى لو معاه الباسورد الصح.</p>
  ${addForm('bl_add', 'reason', 'السبب (إجباري)', ' required')}
    <button type="submit" class="del">➕ حظر</button></form>
  <div class="wrap"><table>
    <tr><th>الـ IP</th><th>السبب</th><th>أضيف بواسطة</th><th>تاريخ الإضافة</th><th></th></tr>
    ${blRows}
  </table></div>

  <h2 class="bn">⛔ المحظورين تلقائيًا</h2>
  <p class="sub">فك الحظر بيمسح سجل الـ IP بالكامل (يبدأ من الأول).</p>
  <div class="wrap"><table>
    <tr><th>الـ IP</th><th>الحالة</th><th></th></tr>
    ${banRows}
  </table></div>

  <h2 class="au">📜 آخر 100 عملية</h2>
  <div class="wrap"><table>
    <tr><th>الوقت</th><th>العملية</th><th>الـ IP</th><th>تفاصيل</th></tr>
    ${auRows}
  </table></div>

  <form method="POST" action="/api/admin"><input type="hidden" name="action" value="logout"><button class="out" type="submit">تسجيل خروج</button></form>
</div>
</body>
</html>`;
}

export default async function handler(req, res) {
  // ★ البند 6: apiUrl من env var
  const PUBLIC_API_URL = process.env.PUBLIC_API_URL || '';
  let apiOrigin = '';
  try { apiOrigin = PUBLIC_API_URL ? new URL(PUBLIC_API_URL).origin : ''; } catch {}

  // ★ رؤوس الأمان (على كل الردود)
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  // الصفحات فيها inline style/script → 'unsafe-inline' (مفيش موارد خارجية)؛ connect-src للـ API بتاع الإشعارات بس
  res.setHeader('Content-Security-Policy', [
    "default-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'" + (apiOrigin ? ' ' + apiOrigin : ''),
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "object-src 'none'"
  ].join('; '));
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');

  // ★ البند 2: CORS مقيّد بـ origin واحد من ALLOWED_ORIGIN (ولو مش متظبط: same-origin بس)
  const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '').trim();
  const reqOrigin = String(req.headers.origin || '');
  const originAllowed = !!ALLOWED_ORIGIN && reqOrigin === ALLOWED_ORIGIN;
  if (originAllowed) {
    res.setHeader('Access-Control-Allow-Origin', reqOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') {
    return originAllowed ? res.status(204).end() : res.status(403).end();
  }
  // POST جاي من موقع تاني → مرفوض (Sec-Fetch-Site بيتبعت حتى مع Referrer-Policy: no-referrer)
  if (req.method === 'POST') {
    const sfs = String(req.headers['sec-fetch-site'] || '');
    const crossSite = sfs && sfs !== 'same-origin' && sfs !== 'none';
    const badOrigin = reqOrigin && reqOrigin !== 'null' &&
      reqOrigin !== 'https://' + String(req.headers.host || '');
    if (!originAllowed && (crossSite || badOrigin)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(403).send('Forbidden');
    }
  }

  // ★ البند 2: HMAC-SHA256 للـ Cookie
  const crypto = await import('crypto');
  const PANEL_PASSWORD = process.env.PANEL_PASSWORD || '';

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

  function secretFor(role) { return role === 'admin' ? ADMIN_PASSWORD : PANEL_PASSWORD; }
  function sigFor(role, ts) {
    return crypto.createHmac('sha256', secretFor(role)).update(role === 'admin' ? 'admin.' + ts : ts).digest('hex');
  }

  function makeToken(role = 'panel') {
    const ts = Date.now().toString();
    return ts + '.' + sigFor(role, ts);
  }

  function verifyToken(token, role = 'panel') {
    if (!token || !secretFor(role)) return false;
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [ts, sig] = parts;
    const maxAge = role === 'admin' ? 2 * 3600000 : 86400000; // الأدمن ساعتين، اللوحة 24 ساعة
    if (!(Date.now() - parseInt(ts) <= maxAge)) return false;
    try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sigFor(role, ts))); }
    catch { return false; }
  }

  // مقارنة نصوص بدون تسريب توقيت
  function safeEq(a, b) {
    if (!a || !b) return false;
    const ha = crypto.createHash('sha256').update(String(a)).digest();
    const hb = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(ha, hb);
  }

  // ★ البند 3: نظام الحظر في Redis (عبر REST API مباشرة)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  const redisEnabled = !!(redisUrl && redisToken);

  // ★ timeout على كل طلب Redis (2.5 ثانية) + قاطع: أول timeout في الطلب → باقي نداءات Redis في نفس الطلب بتتخطى فورًا
  //   (fail-open زي أي فشل تاني). من غير ده Redis المعلّق كان بيخلّي الطلب يستنى لحد حد Vercel ويرد 504
  const REDIS_TIMEOUT_MS = 2500;
  let redisDead = false;
  async function redisJson(url, opt) {
    if (redisDead) return null;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), REDIS_TIMEOUT_MS);
    try {
      const r = await fetch(url, { ...opt, signal: ctl.signal });
      return await r.json();   // قراءة الـ body جوه نفس الـ timeout
    } catch (e) {
      if (ctl.signal.aborted) redisDead = true;
      return null;
    } finally { clearTimeout(timer); }
  }

  async function redisGet(key) {
    if (!redisEnabled) return null;
    const data = await redisJson(`${redisUrl}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${redisToken}` }
    });
    return data ? data.result : null;
  }

  async function redisSet(key, value) {
    if (!redisEnabled) return false;
    return (await redisCmd(['SET', key, String(value)])) === 'OK';
  }

  async function redisCmd(cmd) {
    if (!redisEnabled) return null;
    const out = await redisJson(redisUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd)
    });
    return out ? out.result : null;
  }

  async function redisPipeline(cmds) {
    if (!redisEnabled || !cmds.length) return [];
    const out = await redisJson(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmds)
    });
    return Array.isArray(out) ? out : [];
  }

  // SCAN عام لأي pattern
  async function scanKeys(pattern) {
    const keys = [];
    let cursor = '0';
    for (let i = 0; i < 50; i++) {
      const out = await redisCmd(['SCAN', cursor, 'MATCH', pattern, 'COUNT', '200']);
      if (!out) break;
      cursor = String(out[0]);
      keys.push(...out[1]);
      if (cursor === '0') break;
    }
    return keys;
  }

  async function getJsonMany(keys) {
    const vals = await redisPipeline(keys.map((k) => ['GET', k]));
    return keys.map((k, i) => {
      try { return { key: k, val: JSON.parse(vals[i] && vals[i].result) }; }
      catch { return { key: k, val: null }; }
    });
  }

  async function listBans() {
    const rows = await getJsonMany(await scanKeys('ban:*'));
    const bans = [];
    rows.forEach(({ key, val: b }) => {
      if (b && (b.level === 'temp' || b.level === 'perm' || b.fails > 0)) bans.push({ ip: key.slice(4), ...b });
    });
    const rank = (b) => (b.level === 'perm' ? 0 : b.level === 'temp' ? 1 : 2);
    return bans.sort((x, y) => rank(x) - rank(y));
  }

  // ✅ البيضاء: المنتهية تتنضف أول ما تتشاف
  async function listWhitelist() {
    const rows = await getJsonMany(await scanKeys('whitelist:*'));
    const out = [];
    for (const { key, val: w } of rows) {
      if (!w) continue;
      if (w.expiresAt && w.expiresAt <= Date.now()) {
        await redisDel(key);
        await auditLog('whitelist_expired', { target: key.slice(10) });
        continue;
      }
      out.push({ ip: key.slice(10), ...w });
    }
    return out.sort((x, y) => (y.addedAt || 0) - (x.addedAt || 0));
  }

  async function listBlacklist() {
    const rows = await getJsonMany(await scanKeys('blacklist:*'));
    return rows.filter((r) => r.val).map((r) => ({ ip: r.key.slice(10), ...r.val }))
      .sort((x, y) => (y.addedAt || 0) - (x.addedAt || 0));
  }

  // ★ البند 7: Audit Log (آخر 1000 عملية، بنعرض آخر 100)
  async function auditLog(action, details = {}) {
    if (!redisEnabled) return;
    try {
      const rec = { t: Date.now(), a: action, ip: ip || 'unknown' };
      Object.keys(details).forEach((k) => {
        rec[k] = typeof details[k] === 'string' ? details[k].slice(0, 200) : details[k];
      });
      await redisPipeline([['LPUSH', 'audit:log', JSON.stringify(rec)], ['LTRIM', 'audit:log', '0', '999']]);
    } catch {}
  }

  async function getAudit() {
    const out = await redisCmd(['LRANGE', 'audit:log', '0', '99']);
    if (!Array.isArray(out)) return [];
    return out.map((x) => { try { return JSON.parse(x); } catch { return null; } }).filter(Boolean);
  }

  async function loadAdminData() {
    const [whitelist, blacklist, bansAll, audit, panelIps] = await Promise.all([listWhitelist(), listBlacklist(), listBans(), getAudit(), listPanelIps()]);
    const trusted = new Set(whitelist.map((w) => w.ip));
    return { gateOn, whitelist, blacklist, panelIps, bans: bansAll.filter((b) => !trusted.has(b.ip) && OWNER_LIST.indexOf(b.ip) === -1), audit };
  }

  // ★ البند 6: تنبيه تليجرام (fail-safe: أي فشل يتجاهل ومايكسرش العملية)
  async function notifyTelegram(text) {
    const tok = process.env.TELEGRAM_BOT_TOKEN || '';
    const chat = process.env.TELEGRAM_CHAT_ID || '';
    if (!tok || !chat) return;
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 3000);
      await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text: String(text).slice(0, 3500), disable_web_page_preview: true }),
        signal: ctl.signal
      });
      clearTimeout(timer);
    } catch {}
  }

  async function redisDel(key) {
    if (!redisEnabled) return;
    await redisJson(`${redisUrl}/del/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${redisToken}` }
    });
  }

  // ★ التحقق بالإيميل (2FA): الرمز بيتبعت على ADMIN_EMAIL عن طريق Resend
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
  const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
  const OTP_FROM = process.env.OTP_FROM || 'onboarding@resend.dev';
  const OTP_TTL_MS = 10 * 60 * 1000;

  function hashCode(code, id) {
    return crypto.createHmac('sha256', PANEL_PASSWORD).update(code + ':' + id).digest('hex');
  }

  async function sendOtpEmail(code) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: OTP_FROM,
          to: [ADMIN_EMAIL],
          subject: 'رمز الدخول للوحة الإشعارات',
          html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif"><p>رمز الدخول بتاعك:</p><p style="font-size:32px;font-weight:700;letter-spacing:6px">${code}</p><p>صالح 10 دقايق. لو مش إنتي اللي حاولتي تدخلي، تجاهلي الرسالة.</p></div>`
        })
      });
      return r.ok;
    } catch { return false; }
  }

  // ★ البند 3 و 4: IP من Vercel headers ← x-real-ip ← socket، وبعدين رفض لو مش IP صالح
  const hdrStr = (n) => String(req.headers[n] || '');
  const ipCandidates = [
    hdrStr('x-forwarded-for').split(',')[0],
    hdrStr('x-real-ip'),
    req.socket && req.socket.remoteAddress ? String(req.socket.remoteAddress) : ''
  ].map((c) => c.trim().replace(/%.*$/, '').replace(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i, '$1'));
  const ip = ipCandidates.find((c) => c && c !== 'unknown' && isIP(c)) || '';
  const ipKnown = !!ip;
  const ipKey = ipKnown ? banPrefix(ip) : '';   // IPv4 كامل، IPv6 → /64
  const banKey = `ban:${ipKey}`;
  const who = () => (ipKey && ipKey !== ip ? `${ip} (${ipKey}/64)` : ip);

  // ★ صاحبة النظام: OWNER_IPS من env بس (مابتتسجل ولا بتظهر في أي رد/لوج). IPv6 بيتحوّل لـ /64 زي باقي الكود
  const OWNER_LIST = String(process.env.OWNER_IPS || '').split(',').map((x) => normalizeIpInput(x)).filter(Boolean);
  const isOwner = () => ipKnown && OWNER_LIST.indexOf(ipKey) !== -1;

  // ★ RECOVERY_IPS / PANEL_IPS: من env بس (مابتظهر في HTML ولا audit — بنسجّل الـ IP اللي حاول بس)
  const parseIpList = (raw) => String(raw || '').split(',').map((x) => x.trim()).filter(Boolean)
    .map((x) => normalizeIpInput(x)).filter(Boolean);
  const RECOVERY_IPS = parseIpList(process.env.RECOVERY_IPS);
  const PANEL_IPS_CONFIGURED = String(process.env.PANEL_IPS || '').split(',').some((x) => x.trim());
  const PANEL_IPS = parseIpList(process.env.PANEL_IPS);

  // ★ تنبيه/audit للرفض بدون إغراق: audit أول رفض لكل IP في الساعة، وتليجرام 5 كحد أقصى/ساعة/IP
  async function rejectAlert(kind, action, text) {
    if (!redisEnabled || !ipKnown) return;
    const key = `rej:${kind}:${ipKey}:${Math.floor(Date.now() / 3600000)}`;
    const n = await redisCmd(['INCR', key]);
    if (typeof n !== 'number') return;
    if (n === 1) await redisCmd(['EXPIRE', key, '7200']);
    const jobs = [];
    if (n === 1) jobs.push(auditLog(action, { target: ipKey }));
    if (n <= 5) jobs.push(notifyTelegram(text));
    await Promise.all(jobs);
  }

  // حالة القوائم (بتتحمّل مرة واحدة في الطلب)
  let isBlack = false;
  let isWhite = false;
  // ★ حالة بوابة الدخول من Redis (panel_gate:enabled = '1' → مفعلة). Redis وقع/مش موجود = مقفولة (fail-open)
  let gateOn = false;
  async function loadListState() {
    if (!redisEnabled) return;
    const cmds = [['GET', 'panel_gate:enabled']];
    if (ipKnown) cmds.push(['GET', 'blacklist:' + ipKey], ['GET', 'whitelist:' + ipKey]);
    const r = await redisPipeline(cmds);
    gateOn = !!(r[0] && r[0].result === '1');
    if (!ipKnown) return;
    isBlack = !!(r[1] && r[1].result);
    if (isBlack && isOwner()) isBlack = false;   // ★ الـ owner بيتخطى السوداء كمان (عشان مايتقفلش على نفسه)
    const w = r[2] && r[2].result;
    if (w) {
      try {
        const o = JSON.parse(w);
        if (o.expiresAt && o.expiresAt <= Date.now()) {   // منتهية → نظّفها واعتبره عادي
          await redisDel('whitelist:' + ipKey);
          await auditLog('whitelist_expired', { target: ipKey });
        } else isWhite = true;
      } catch { isWhite = false; }
    }
  }

  // ★ البند 5: Rate limit على GET — 100 طلب/دقيقة لكل IP (Redis INCR + EXPIRE، fail-open لو Redis وقع)
  async function rateLimitGet() {
    if (isOwner() || isRecovery) return false;   // ★ الـ owner والـ recovery مايتقفلوش بالـ rate limit
    if (!redisEnabled || !ipKnown) return false;
    const key = `rl:get:${ipKey}:${Math.floor(Date.now() / 60000)}`;
    const n = await redisCmd(['INCR', key]);
    if (typeof n !== 'number') return false;
    if (n === 1) await redisCmd(['EXPIRE', key, '120']);
    return n > 100;
  }

  // ★ RECOVERY_CODE: بيتجاوز فحص الحظر بس (مش الباسورد ولا الـ OTP). الكود مابيتسجّل في أي مكان
  const RECOVERY_CODE = String(process.env.RECOVERY_CODE || '').trim();
  const RECOVERY_ENABLED = RECOVERY_CODE.length >= 52;   // أقصر من كده = الميزة مقفولة
  let isRecovery = false;
  let recoveryViaParam = false;

  // كوكي قصير (15 دقيقة) مربوط بالـ IP — عشان الـ POST (الباسورد ثم الرمز) مابيشيلش الـ query
  function recoveryToken() {
    const ts = Date.now().toString();
    return ts + '.' + crypto.createHmac('sha256', RECOVERY_CODE).update(`recovery.${ts}.${ipKey}`).digest('hex');
  }
  function verifyRecoveryToken(tok) {
    const parts = String(tok || '').split('.');
    if (parts.length !== 2 || !(Date.now() - parseInt(parts[0]) <= 15 * 60000)) return false;
    try {
      const exp = crypto.createHmac('sha256', RECOVERY_CODE).update(`recovery.${parts[0]}.${ipKey}`).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(parts[1]), Buffer.from(exp));
    } catch { return false; }
  }

  async function loadRecovery() {
    if (!RECOVERY_ENABLED || !ipKnown) return;
    let param = '';
    try { param = new URL(req.url, 'http://x').searchParams.get('recovery') || ''; } catch {}
    const viaParam = !!param && safeEq(param, RECOVERY_CODE);
    const cm = (req.headers.cookie || '').match(/recovery_ok=([^;]+)/);
    const viaCookie = !viaParam && !!cm && verifyRecoveryToken(cm[1]);
    if (!viaParam && !viaCookie) return;
    // ★ الكود لوحده مش كفاية: لازم الـ IP كمان يكون في RECOVERY_IPS (فاضي = مقفول). بنتأكد في كل طلب (query + كوكي)
    if (RECOVERY_IPS.indexOf(ipKey) === -1) {
      await bumpRecoveryCounter();   // المحاولة بتتحسب في سقف الـ 10/ساعة برضه
      await rejectAlert('recovery_ip', 'recovery_ip_rejected', `⚠️ محاولة استخدام RECOVERY_CODE من IP غير مسموح: ${who()}`);
      return;
    }
    // سقف أمان: لو اتجرّب 10 مرات غلط تحت الـ recovery في ساعة → التجاوز بيتقفل (fail-open لو Redis وقع)
    const used = parseInt((await redisGet(`rec:fail:${ipKey}:${Math.floor(Date.now() / 3600000)}`)) || '0', 10);
    if (used >= 10) return;
    isRecovery = true;
    recoveryViaParam = viaParam;
  }

  async function bumpRecoveryCounter() {
    if (!redisEnabled || !ipKnown) return;
    const key = `rec:fail:${ipKey}:${Math.floor(Date.now() / 3600000)}`;
    const n = await redisCmd(['INCR', key]);
    if (n === 1) await redisCmd(['EXPIRE', key, '7200']);
  }
  async function noteRecoveryFail() {
    if (isRecovery) await bumpRecoveryCounter();
  }

  // ★ cooldown الرمز للـ whitelist/owner: 20 رمز غلط في الساعة → وقف ساعة (مش حظر)
  async function bumpExemptOtp() {
    if (!redisEnabled) return false;
    const n = await redisCmd(['INCR', 'wl:otp:' + ipKey]);
    if (typeof n !== 'number') return false;
    if (n === 1) await redisCmd(['EXPIRE', 'wl:otp:' + ipKey, '3600']);
    if (n >= 20) {
      await redisCmd(['SET', 'wl:otp:cooldown:' + ipKey, '1', 'EX', '3600']);
      return true;
    }
    return false;
  }
  async function exemptCooldownActive() {
    if (!(isWhite || isOwner())) return false;
    return !!(await redisGet('wl:otp:cooldown:' + ipKey));
  }

  // ★ IPs مسموح لها مؤقتًا/دائمًا بشاشة الأدمن (Redis: panel_ip:<prefix>) — المنتهية بتتنضف
  async function listPanelIps() {
    const rows = await getJsonMany(await scanKeys('panel_ip:*'));
    const out = [];
    for (const { key, val: p } of rows) {
      if (!p) continue;
      if (p.expiresAt && p.expiresAt <= Date.now()) {
        await redisDel(key);
        await auditLog('panel_ip_temp_del', { target: key.slice(9), note: 'انتهت المدة' });
        continue;
      }
      out.push({ ip: key.slice(9), ...p });
    }
    return out.sort((x, y) => (y.addedAt || 0) - (x.addedAt || 0));
  }

  // temp access صالح لـ IP (Redis: panel_ip:<prefix>) — المنتهي بيتنضف
  async function getTempAccess(key) {
    if (!redisEnabled || !key) return null;
    const raw = await redisGet('panel_ip:' + key);
    if (!raw) return null;
    try {
      const p = JSON.parse(raw);
      if (!p.expiresAt || p.expiresAt > Date.now()) return p;
      await redisDel('panel_ip:' + key);
      await auditLog('panel_ip_temp_del', { target: key, note: 'انتهت المدة' });
    } catch {}
    return null;
  }

  // ★ مسموح له بالدخول؟ PANEL_IPS + OWNER_IPS + recovery (كود + IP) + الوايت ليست + temp access
  async function isPanelAllowed() {
    if (isOwner() || isRecovery) return true;
    if (ipKnown && PANEL_IPS.indexOf(ipKey) !== -1) return true;
    if (isWhite) return true;
    return !!(await getTempAccess(ipKey));
  }

  // ★ بوابة الدخول: true → 404. بتشتغل بس لما panel_gate:enabled = '1' (من شاشة الأدمن)
  async function panelGateBlocks() {
    if (!gateOn) return false;   // مقفولة (أو Redis وقع) → تخطي كامل، مفيش 404
    if (PANEL_IPS_CONFIGURED && PANEL_IPS.length === 0 && redisEnabled) {   // env متظبط بس كله غلط → تنبيه (مرة/ساعة)
      const k = 'cfg:panel_ips_empty:' + Math.floor(Date.now() / 3600000);
      const n = await redisCmd(['INCR', k]);
      if (n === 1) {
        await redisCmd(['EXPIRE', k, '7200']);
        await Promise.all([auditLog('panel_ips_misconfig', {}), notifyTelegram('⚠️ PANEL_IPS متظبط بس كل القيم فيه غلط — راجعي الـ env.')]);
      }
    }
    if (await isPanelAllowed()) return false;
    await rejectAlert('panel_ip', 'panel_ip_rejected', `🚫 محاولة دخول من IP غير مسموح (البوابة مفعلة): ${who()}`);
    return true;
  }

  async function checkBan() {
    // ★ صاحبة النظام ورابط الطوارئ: تجاوز كامل لفحص الحظر (من غير Redis)
    if (isOwner()) return null;
    if (isRecovery) return null;
    // ★ البند 9/10: السوداء أولًا (بتتغلب على البيضاء) ← البيضاء مابتتحظرش أبدًا
    if (isBlack) return { level: 'perm', message: '🚫 تم حظرك بشكل دائم من الدخول للوحة.' };
    if (isWhite) return null;
    const banRaw = await redisGet(banKey);
    if (!banRaw) return null;
    try {
      const ban = JSON.parse(banRaw);
      if (ban.level === 'perm') {
        return { level: 'perm', message: '🚫 تم حظرك بشكل دائم من الدخول للوحة.' };
      }
      if (ban.level === 'temp' && ban.until > Date.now()) {
        const hoursLeft = Math.ceil((ban.until - Date.now()) / 3600000);
        return { level: 'temp', message: `🚫 تم حظرك مؤقتًا. متبقي ${hoursLeft} ساعة.` };
      }
      // الحظر المؤقت انتهى — نسيب السجل (level=temp) عشان أول 5 محاولات فاشلة بعده تتصعّد لـ perm
      return null;
    } catch { return null; }
  }

  async function recordFailedAttempt(kind = 'password') {
    const banRaw = await redisGet(banKey);
    let ban;
    try { ban = banRaw ? JSON.parse(banRaw) : { fails: 0, level: 'none' }; }
    catch { ban = { fails: 0, level: 'none' }; }

    ban.fails = (ban.fails || 0) + 1;
    const failNo = ban.fails;
    const failAction = kind === 'otp' ? 'otp_fail' : 'login_fail';
    await noteRecoveryFail();

    // ★ صاحبة النظام: نسجّل + تنبيه بس — مايتحظرش أبدًا
    if (isOwner()) {
      await redisSet(banKey, JSON.stringify(ban));
      await auditLog('owner_fail', { kind: 'password', fails: failNo });
      if (failNo === 1 || failNo % 5 === 0) await notifyTelegram(`⚠️ محاولة دخول فاشلة من IP صاحبة النظام (${failNo})\nIP: ${who()}`);
      return;
    }

    // ★ البيضاء: نسجّل بس ومنحظرش — لكن نبعت تنبيه لو المحاولات كتيرة (ممكن يكون اختراق)
    if (isWhite) {
      await redisSet(banKey, JSON.stringify(ban));
      await auditLog(failAction, { fails: failNo, trusted: 'yes' });
      if (failNo % 5 === 0) {
        await notifyTelegram(`⚠️ IP في القائمة البيضاء عنده ${failNo} محاولة دخول فاشلة — ممكن يكون اختراق!\nIP: ${who()}`);
      }
      return;
    }

    let newLevel = '';
    if (ban.fails >= 5) {
      if (ban.level === 'temp') {
        ban.level = 'perm';
        delete ban.until;
      } else {
        ban.level = 'temp';
        ban.until = Date.now() + 86400000;
      }
      ban.fails = 0;
      newLevel = ban.level;
    }
    await redisSet(banKey, JSON.stringify(ban));
    await auditLog(failAction, { fails: failNo });

    if (newLevel === 'temp') {
      await Promise.all([auditLog('ban_temp', { target: ipKey }), notifyTelegram(`⏳ حظر مؤقت 24 ساعة بعد 5 محاولات فاشلة\nIP: ${who()}`)]);
    } else if (newLevel === 'perm') {
      await Promise.all([auditLog('ban_perm', { target: ipKey }), notifyTelegram(`🚫 حظر دائم (تكرار بعد الحظر المؤقت)\nIP: ${who()}`)]);
    } else if (failNo === 1) {
      await notifyTelegram(`⚠️ أول محاولة دخول فاشلة (1/5)\nIP: ${who()}`);
    }
  }

  // ★ فشل رمز الأدمن: 5 مرات غلط (مجموعة عبر كل الرموز، مش لكل رمز) = حظر دائم على طول
  async function recordOtpFailure() {
    const banRaw = await redisGet(banKey);
    let ban;
    try { ban = banRaw ? JSON.parse(banRaw) : { fails: 0, level: 'none' }; }
    catch { ban = { fails: 0, level: 'none' }; }
    ban.otpFails = (ban.otpFails || 0) + 1;
    const n = ban.otpFails;
    await noteRecoveryFail();

    // ★ صاحبة النظام: نسجّل + تنبيه بس — مايتحظرش أبدًا (لكن لسه عليه cooldown 20 غلطة/ساعة)
    if (isOwner()) {
      await redisSet(banKey, JSON.stringify(ban));
      await auditLog('owner_fail', { kind: 'otp', tries: n });
      if (n === 1 || n % 5 === 0) await notifyTelegram(`⚠️ رمز أدمن غلط من IP صاحبة النظام (${n})\nIP: ${who()}`);
      const cd = await bumpExemptOtp();
      if (cd) await Promise.all([auditLog('otp_cooldown', {}), notifyTelegram(`⏳ وقف ساعة بعد 20 رمز غلط (IP صاحبة النظام)\nIP: ${who()}`)]);
      return { perm: false, left: null, exempt: true, cooldown: cd };
    }

    // الموثوق (whitelist): نسجّل ونبعت تنبيه بس ومنحظرش (cooldown بعد 20 غلطة/ساعة)
    if (isWhite) {
      await redisSet(banKey, JSON.stringify(ban));
      await auditLog('otp_fail', { tries: n, trusted: 'yes' });
      if (n % 5 === 0) await notifyTelegram(`⚠️ IP في القائمة البيضاء غلط في رمز الأدمن ${n} مرة — ممكن يكون اختراق!\nIP: ${who()}`);
      const cd = await bumpExemptOtp();
      if (cd) await Promise.all([auditLog('otp_cooldown', {}), notifyTelegram(`⏳ وقف ساعة بعد 20 رمز غلط (IP موثوق)\nIP: ${who()}`)]);
      return { perm: false, left: null, exempt: true, cooldown: cd };
    }

    if (n >= 5) {
      ban.level = 'perm';
      delete ban.until;
      ban.fails = 0;
      ban.otpFails = 0;
      await redisSet(banKey, JSON.stringify(ban));
      await Promise.all([
        auditLog('otp_fail', { tries: n }),
        auditLog('ban_perm', { target: ipKey, reason: 'رمز الأدمن غلط 5 مرات' }),
        notifyTelegram(`🚫 حظر دائم — رمز الأدمن غلط 5 مرات\nIP: ${who()}`)
      ]);
      return { perm: true, left: 0 };
    }
    await redisSet(banKey, JSON.stringify(ban));
    await auditLog('otp_fail', { tries: n });
    if (n === 1) await notifyTelegram(`⚠️ رمز أدمن غلط (1/5)\nIP: ${who()}`);
    return { perm: false, left: 5 - n };
  }

  // alsoOtp=true بس عند نجاح الأدمن بالرمز (باسورد اللوحة العادية مايصفّرش عدّاد الرمز)
  async function resetFails(alsoOtp = false) {
    const banRaw = await redisGet(banKey);
    if (!banRaw) return;
    try {
      const ban = JSON.parse(banRaw);
      ban.fails = 0;
      if (alsoOtp) ban.otpFails = 0;
      await redisSet(banKey, JSON.stringify(ban));
    } catch {}
  }

  // ★ ترتيب الفحص: recovery (الكود + IP مسموح) → owner → حالة القوائم → بوابة الدخول (404، لما تتفعّل)
  //   → blacklist (403) → unknown IP (400) → rate limit (GET) → checkBan → (whitelist بتتخطى الحظر) → باسورد/OTP
  await loadRecovery();
  if (isRecovery && recoveryViaParam) {
    // رابط الطوارئ: بيتجاوز الحظر والبوابة. بنثبّت كوكي قصير ونبعت تنبيه فوري (من غير ما نسجّل الكود نفسه)
    res.setHeader('Set-Cookie', `recovery_ok=${recoveryToken()}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=900`);
    await Promise.all([
      auditLog('recovery_used', {}),
      notifyTelegram(`🆘 اتستخدم رابط الطوارئ (recovery)\nIP: ${who()}\nلو مش إنتي — غيّري RECOVERY_CODE فورًا.`)
    ]);
  }
  await loadListState();   // حالة البوابة + blacklist + whitelist (طلب Redis واحد)
  if (await panelGateBlocks()) {
    // 404 عام (مش 403 — مايفضحش إن فيه صفحة هنا) + مسح كوكي الأدمن
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Set-Cookie', 'admin_auth=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
    return res.status(404).send('<h1>404 Not Found</h1>');
  }
  if (isBlack) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(403).send('Forbidden');   // من غير حتى صفحة دخول
  }
  if (!ipKnown) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(400).send('Bad Request');
  }
  if (req.method === 'GET' && (await rateLimitGet())) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Retry-After', '60');
    return res.status(429).send(renderLogin({ banMessage: '⏳ طلبات كتير جدًا. استني دقيقة وجرّبي تاني.' }));
  }

  // ★ البند 1: POST login بدل GET
  if (req.method === 'POST') {
    // لو مفيش PANEL_PASSWORD محدد
    if (!PANEL_PASSWORD) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send('<h1>PANEL_PASSWORD not set</h1>');
    }

    // ★ الحظر الأول — حتى لو الباسورد صح، المحظور مايدخلش
    const banNow = await checkBan();
    if (banNow) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(429).send(renderLogin({ banMessage: banNow.message }));
    }

    res.setHeader('Cache-Control', 'no-store');
    const body = req.body || {};
    const cookieHdr = req.headers.cookie || '';
    const clearPending = 'panel_pending=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0';

    // ★ إجراءات شاشة الإدارة (محتاجة جلسة أدمن صالحة؛ والحظر اتفحص فوق)
    if (typeof body.action !== 'undefined') {
      const am = cookieHdr.match(/admin_auth=([^;]+)/);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (!verifyToken(am ? am[1] : '', 'admin')) {
        return res.status(401).send(renderLogin());
      }
      const back = () => res.redirect(303, req.url.split('?')[0]);
      const target = normalizeIpInput(body.ip);
      const msgPage = (msg) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send('<!DOCTYPE html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>مرفوض</title><body style="font-family:Tahoma,sans-serif;padding:24px"><h1>' + msg + '</h1><p><a href="/api/admin">رجوع</a></p></body></html>');
      };

      if (body.action === 'unban') {
        // بنمسح المفتاح الموحّد + المفتاح الخام (لسجلات قديمة اتخزنت بالـ IPv6 الكامل)
        const raw = typeof body.ip === 'string' ? body.ip.trim() : '';
        if (target) await redisDel('ban:' + target);
        if (raw && raw !== target && /^[0-9a-fA-F:.]{2,45}$/.test(raw)) await redisDel('ban:' + raw);
        if (target) {
          await Promise.all([auditLog('unban', { target }), notifyTelegram(`🔓 تم فك حظر\nIP: ${shownKey(target)}\nبواسطة: ${ip}`)]);
        }
        return back();
      }

      // ✅ القائمة البيضاء
      if (body.action === 'wl_add' && target) {
        const durMs = { '1h': 3600000, '1d': 86400000, '1w': 604800000 }[String(body.duration)];
        const rec = { addedBy: ip, addedAt: Date.now(), note: cleanText(body.note, 120) };
        if (durMs) rec.expiresAt = Date.now() + durMs;
        await redisSet('whitelist:' + target, JSON.stringify(rec));
        await auditLog('whitelist_add', { target, note: rec.note, expires: rec.expiresAt ? 'مؤقت' : 'دائم' });
        return back();
      }
      if (body.action === 'wl_del' && target) {
        // البوابة مفعلة + ده الـ IP الحالي + الوايت ليست هي السبب الوحيد في دخوله → ممنوع (هتتقفلي بره)
        if (gateOn && target === ipKey && !isOwner() && !isRecovery && PANEL_IPS.indexOf(ipKey) === -1 && !(await getTempAccess(ipKey))) {
          return msgPage('⚠️ لو مسحتي ده، هتتقفلي بره فورًا — الـ IP ده هو اللي بيسمحلك بالدخول دلوقتي (البوابة مفعلة). العملية اتلغت.');
        }
        await redisDel('whitelist:' + target);
        await auditLog('whitelist_del', { target });
        return back();
      }

      // 🌐 IPs المسموح لها بشاشة الأدمن (temp access)
      // 🚪 تفعيل/إلغاء بوابة الدخول (to = on | off)
      if (body.action === 'panel_gate_toggle') {
        const turnOn = String(body.to) === 'on';
        if (turnOn) {
          // مايتفعّلش لو IP الأدمن نفسه مش مسموح (عشان ماتتقفلش بره فورًا)
          if (!(await isPanelAllowed())) {
            return msgPage('⚠️ لو فعّلتي البوابة دلوقتي هتتقفلي بره فورًا — الـ IP بتاعك مش في أي قايمة مسموحة (PANEL_IPS / OWNER_IPS / الوايت ليست / IPs المسموحة). ضيفي نفسك الأول.');
          }
          if (!(await redisSet('panel_gate:enabled', '1'))) return msgPage('❌ مقدرناش نحفظ الحالة (Redis مش متاح).');
        } else {
          if (typeof (await redisCmd(['DEL', 'panel_gate:enabled'])) !== 'number') return msgPage('❌ مقدرناش نحفظ الحالة (Redis مش متاح).');
        }
        await Promise.all([
          auditLog(turnOn ? 'panel_gate_on' : 'panel_gate_off', {}),
          notifyTelegram(turnOn
            ? `🟢 اتفعّلت بوابة الدخول — أي IP مش في القوايم هيشوف 404\nبواسطة: ${ip}`
            : `🔴 اتلغت بوابة الدخول — كل الناس بتشوف صفحة الدخول\nبواسطة: ${ip}`)
        ]);
        return back();
      }
      if (body.action === 'panel_ip_add' && target) {
        const durMs = { '1h': 3600000, '1d': 86400000, '1w': 604800000 }[String(body.duration)];
        if (!durMs) {   // دائم: حد أقصى 10
          const permCount = (await listPanelIps()).filter((p) => !p.expiresAt && p.ip !== target).length;
          if (permCount >= 10) return msgPage('❌ وصلتي للحد الأقصى (10 IPs دائمة). امسحي واحد الأول أو اختاري مدة.');
        }
        const rec = { addedBy: ipKey, addedAt: Date.now(), note: cleanText(body.note, 120) };
        if (durMs) rec.expiresAt = Date.now() + durMs;
        await redisSet('panel_ip:' + target, JSON.stringify(rec));
        await Promise.all([
          auditLog('panel_ip_temp_add', { target, note: rec.note, expires: rec.expiresAt ? 'مؤقت' : 'دائم' }),
          notifyTelegram(`🌐 اتضاف IP مسموح لشاشة الأدمن\nIP: ${shownKey(target)} (${rec.expiresAt ? 'مؤقت' : 'دائم'})\nبواسطة: ${ip}`)
        ]);
        return back();
      }
      if (body.action === 'panel_ip_del' && target) {
        // مايتمسحش IP الأدمن لو هو السبب الوحيد في دخوله (عشان ماتتقفلش بره)
        const onlyViaTemp = gateOn && target === ipKey &&
          PANEL_IPS.indexOf(ipKey) === -1 && !isOwner() && !isRecovery && !isWhite;
        if (onlyViaTemp) return msgPage('⚠️ لو مسحتي ده، هتتقفلي بره شاشة الأدمن فورًا — الـ IP ده هو اللي بيسمحلك بالدخول دلوقتي. العملية اتلغت.');
        await redisDel('panel_ip:' + target);
        await Promise.all([
          auditLog('panel_ip_temp_del', { target }),
          notifyTelegram(`🗑️ اتحذف IP من المسموح لشاشة الأدمن\nIP: ${shownKey(target)}\nبواسطة: ${ip}`)
        ]);
        return back();
      }

      // 🚫 القائمة السوداء (السبب إجباري، ومايتحظرش الأدمن نفسه)
      if (body.action === 'bl_add' && target) {
        const reason = cleanText(body.reason, 120);
        if (!reason) return back();
        // ★ مايتحظرش الـ IP الحالي ولا أي IP من OWNER_IPS (الرسالة عامة — مابتكشفش القيم)
        if (target === ipKey || OWNER_LIST.indexOf(target) !== -1) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(400).send('<!DOCTYPE html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>مرفوض</title><body style="font-family:Tahoma,sans-serif;padding:24px"><h1>❌ العملية دي مش مسموحة على الـ IP ده.</h1><p><a href="/api/admin">رجوع</a></p></body></html>');
        }
        await redisSet('blacklist:' + target, JSON.stringify({ addedBy: ip, addedAt: Date.now(), reason, permanent: true }));
        await auditLog('blacklist_add', { target, reason });
        return back();
      }
      if (body.action === 'bl_del' && target) {
        await redisDel('blacklist:' + target);
        await auditLog('blacklist_del', { target });
        return back();
      }

      if (body.action === 'logout') {
        await auditLog('logout', {});
        res.setHeader('Set-Cookie', 'admin_auth=; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
        return back();
      }
      return back();
    }

    // ★ الخطوة 2: رمز الإيميل
    if (typeof body.code !== 'undefined') {
      // ★ cooldown الموثوق/صاحبة النظام: لو واقف ساعة → 429 فورًا
      if (await exemptCooldownActive()) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(429).send(renderLogin({ mode: 'code', banMessage: '⏳ استني ساعة وجرّبي تاني.' }));
      }
      const code = String(body.code).trim();
      const pm = cookieHdr.match(/panel_pending=([a-f0-9]{32})/);
      const otpId = pm ? pm[1] : '';
      let rec = null;
      if (otpId) {
        try { rec = JSON.parse(await redisGet('otp:' + otpId)); } catch { rec = null; }
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      if (!rec || !rec.exp || rec.exp < Date.now() || (rec.tries || 0) >= 5) {
        if (otpId) await redisDel('otp:' + otpId);
        res.setHeader('Set-Cookie', clearPending);
        return res.status(401).send(renderLogin({ error: true, message: '⏱️ الرمز انتهت صلاحيته. اكتبي كلمة السر من جديد.' }));
      }
      let ok = false;
      if (/^[0-9]{6}$/.test(code)) {
        try { ok = crypto.timingSafeEqual(Buffer.from(hashCode(code, otpId)), Buffer.from(rec.h)); } catch { ok = false; }
      }
      if (ok) {
        await redisDel('otp:' + otpId);
        await resetFails(true);
        if (isWhite || isOwner()) await redisDel('wl:otp:' + ipKey);   // تنضيف عدّاد الـ cooldown بعد دخول ناجح
        await auditLog('login_ok', { role: 'admin' });
        const token = makeToken('admin');
        res.setHeader('Set-Cookie', [
          `admin_auth=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=7200`,
          clearPending
        ]);
        return res.redirect(303, req.url.split('?')[0]);
      }
      const otpRes = await recordOtpFailure();
      if (otpRes.cooldown) {
        return res.status(429).send(renderLogin({ mode: 'code', banMessage: '⏳ استني ساعة وجرّبي تاني.' }));
      }
      if (otpRes.perm) {
        await redisDel('otp:' + otpId);
        res.setHeader('Set-Cookie', clearPending);
        return res.status(429).send(renderLogin({ mode: 'code', banMessage: '🚫 تم حظرك بشكل دائم من الدخول للوحة.' }));
      }
      rec.tries = (rec.tries || 0) + 1;
      await redisSet('otp:' + otpId, JSON.stringify(rec));
      return res.status(401).send(renderLogin({ mode: 'code', error: true, message: otpRes.exempt ? '❌ الرمز غلط' : '❌ الرمز غلط — باقي ' + otpRes.left + ' محاولات قبل الحظر الدائم' }));
    }

    const pass = typeof body.password === 'string' ? body.password : '';

    // ★ كلمة السر الأولى → دخول مباشر للوحة الإشعارات (من غير إيميل)
    if (safeEq(pass, PANEL_PASSWORD)) {
      await resetFails();
      await auditLog('login_ok', { role: 'panel' });
      const token = makeToken('panel');
      res.setHeader('Set-Cookie', `panel_auth=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
      return res.redirect(303, req.url.split('?')[0]);
    }

    // ★ كلمة السر التانية (الأدمن) → نبعت رمز على الإيميل (مفيش دخول لسه)
    if (ADMIN_PASSWORD && safeEq(pass, ADMIN_PASSWORD)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // بنقفل الباب لو التحقق بالإيميل مش متظبط (مانسمحش بالدخول بالباسورد لوحده)
      if (!ADMIN_EMAIL || !RESEND_API_KEY || !redisEnabled) {
        return res.status(500).send('<h1>التحقق بالإيميل مش متظبط (ADMIN_EMAIL / RESEND_API_KEY / Redis)</h1>');
      }
      const otp = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
      const id = crypto.randomBytes(16).toString('hex');
      const stored = await redisSet('otp:' + id, JSON.stringify({ h: hashCode(otp, id), exp: Date.now() + OTP_TTL_MS, tries: 0 }));
      if (!stored) {   // Redis واقع → ماتبعتش إيميل برمز مش هيشتغل
        return res.status(503).send('<h1>الخدمة مش متاحة دلوقتي. جرّبي تاني بعد شوية.</h1>');
      }
      const sent = await sendOtpEmail(otp);
      if (!sent) {
        await redisDel('otp:' + id);
        return res.status(502).send('<h1>مقدرناش نبعت الإيميل. جرّبي تاني بعد شوية.</h1>');
      }
      await Promise.all([auditLog('otp_sent', {}), notifyTelegram(`📧 اتبعت رمز دخول (أدمن)\nIP: ${who()}`)]);
      res.setHeader('Set-Cookie', `panel_pending=${id}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=600`);
      return res.status(200).send(renderLogin({ mode: 'code' }));
    }

    // فشل → سجل المحاولة
    await recordFailedAttempt();
    const ban = await checkBan();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (ban) return res.status(429).send(renderLogin({ banMessage: ban.message }));
    // ارجع صفحة الدخول مع رسالة خطأ
    return res.status(401).send(renderLogin({ error: true }));
  }

  // ★ GET: تأكد من Cookie
  if (req.method === 'GET') {
    // تأكد من الحظر الأول
    const ban = await checkBan();
    if (ban) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(429).send(renderLogin({ banMessage: ban.message }));
    }

    res.setHeader('Cache-Control', 'no-store');
    // ★ جلسة الأدمن → شاشة إدارة الحظر
    const adminMatch = (req.headers.cookie || '').match(/admin_auth=([^;]+)/);
    if (verifyToken(adminMatch ? adminMatch[1] : '', 'admin')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(renderAdminPage(await loadAdminData(), ipKey));
    }

    // التحقق من Cookie
    const cookie = req.headers.cookie || '';
    const match = cookie.match(/panel_auth=([^;]+)/);
    const token = match ? match[1] : '';

    if (verifyToken(token)) {
      // ★ البند 6: استبدل الـ placeholder بـ PUBLIC_API_URL
      const htmlWithUrl = PANEL_HTML.replace(
        '__PUBLIC_API_URL__',
        PUBLIC_API_URL
      );
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(htmlWithUrl);
    }

    // مفيش cookie صالح → اعرض صفحة الدخول
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send(LOGIN_HTML);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(405).send('<h1>Method not allowed</h1>');
}