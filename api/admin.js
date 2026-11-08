// ============================================================
//  api/admin.js — لوحة الإشعارات المحمية بكلمة سر
//  كلمة سر اللوحة من PANEL_PASSWORD في Environment Variables
//  (مختلفة عن ADMIN_SECRET اللي بتبعت بيها الإشعارات)
// ============================================================

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
      "م/ مصطفى اسامة",
    ],
    "هندسة البرمجيات": [
      "د/ احمد مصطفى",
      "م/ جهاد زكريا",
      "م/ شيماء حسام الدين",
      "م/ محمد طه",
      "م/ مصطفى اسامة",
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
    "البرمجة المرئية|م/ مصطفى اسامة": [
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
    "البرمجة المرئية|م/ مصطفى اسامة": [
      "lab"
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
    "هندسة البرمجيات|م/ مصطفى اسامة": [
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
    "م/ مصطفى اسامة": [
      "البرمجة المرئية"
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
    "م/ مصطفى اسامة": [
      "البرمجة المرئية",
      "هندسة البرمجيات"
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
    "م/ مصطفى اسامة",
    "م/ مصطفى اسامة",
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

// ★ صفحة تسجيل الدخول (POST عبر fetch — مش GET)
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
  <form onsubmit="return doLogin(event)">
    <label>كلمة السر</label>
    <input type="password" id="pass" placeholder="•••••••••" autofocus required>
    <button type="submit" id="loginBtn">🔑 دخول</button>
  </form>
</div>
<script>
function doLogin(e) {
  e.preventDefault();
  var pass = document.getElementById('pass').value;
  if (!pass) return false;
  var btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.textContent = '⏳ جاري الدخول...';
  
  fetch(window.location.pathname, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: pass })
  }).then(function(r) {
    if (r.redirected) {
      window.location.href = r.url;
      return;
    }
    if (r.status === 429) {
      return r.text().then(function(t) {
        var d = document.createElement('div');
        d.innerHTML = t;
        var banText = d.querySelector('h1') ? d.querySelector('h1').textContent : 'تم حظرك';
        document.getElementById('banMsg').textContent = banText;
        document.getElementById('banMsg').classList.add('show');
        document.getElementById('err').classList.remove('show');
        btn.disabled = false;
        btn.textContent = '🔑 دخول';
      });
    }
    if (r.status === 401) {
      document.getElementById('err').classList.add('show');
      document.getElementById('banMsg').classList.remove('show');
      btn.disabled = false;
      btn.textContent = '🔑 دخول';
      return;
    }
    // لو status 200 أو redirect → اعمل reload
    window.location.reload();
  }).catch(function() {
    window.location.reload();
  });
  return false;
}
</script>
</body>
</html>`;

export default async function handler(req, res) {
  // ★ البند 4: X-Robots-Tag
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // ★ البند 6: apiUrl من env var
  const PUBLIC_API_URL = process.env.PUBLIC_API_URL || 'https://fcal-third-year.vercel.app/api/push-send';
  
  // ★ البند 2: HMAC-SHA256 للـ Cookie
  const crypto = await import('crypto');
  const PANEL_PASSWORD = process.env.PANEL_PASSWORD || '';

  function makeToken() {
    const ts = Date.now().toString();
    const sig = crypto.createHmac('sha256', PANEL_PASSWORD).update(ts).digest('hex');
    return ts + '.' + sig;
  }

  function verifyToken(token) {
    if (!token || !PANEL_PASSWORD) return false;
    const parts = token.split('.');
    if (parts.length !== 2) return false;
    const [ts, sig] = parts;
    if (Date.now() - parseInt(ts) > 86400000) return false; // 24 ساعة
    const expected = crypto.createHmac('sha256', PANEL_PASSWORD).update(ts).digest('hex');
    try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)); }
    catch { return false; }
  }

  // ★ البند 3: نظام الحظر في Redis
  // نقرا من أي متغيرات Upstash متاحة (REST أو KV)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  const redis = (redisUrl && redisToken)
    ? new (await import('@upstash/redis')).Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

  // IP من Vercel headers
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
              req.headers['x-real-ip'] || 'unknown';
  const banKey = `ban:${ip}`;

  async function checkBan() {
    if (!redis) return null;
    try {
      const banData = await redis.get(banKey);
      if (!banData) return null;
      const ban = typeof banData === 'string' ? JSON.parse(banData) : banData;
      if (ban.level === 'perm') {
        return { level: 'perm', message: '🚫 تم حظرك بشكل دائم من الدخول للوحة.' };
      }
      if (ban.level === 'temp' && ban.until > Date.now()) {
        const hoursLeft = Math.ceil((ban.until - Date.now()) / 3600000);
        return { level: 'temp', message: `🚫 تم حظرك مؤقتًا. متبقي ${hoursLeft} ساعة.` };
      }
      // الحظر انتهى — نمسحه
      await redis.del(banKey);
      return null;
    } catch { return null; }
  }

  async function recordFailedAttempt() {
    if (!redis) return;
    try {
      const existing = await redis.get(banKey);
      let ban = existing ? (typeof existing === 'string' ? JSON.parse(existing) : existing) : { fails: 0, level: 'none' };
      ban.fails = (ban.fails || 0) + 1;
      
      if (ban.fails >= 5) {
        if (ban.level === 'temp') {
          // كان محظور مؤقتًا قبل كده → حظر دائم
          ban.level = 'perm';
          delete ban.until;
        } else {
          // أول مرة → حظر مؤقت 24 ساعة
          ban.level = 'temp';
          ban.until = Date.now() + 86400000;
        }
        ban.fails = 0;
      }
      await redis.set(banKey, JSON.stringify(ban));
    } catch {}
  }

  async function resetFails() {
    if (!redis) return;
    try {
      const existing = await redis.get(banKey);
      if (existing) {
        let ban = typeof existing === 'string' ? JSON.parse(existing) : existing;
        ban.fails = 0;
        await redis.set(banKey, JSON.stringify(ban));
      }
    } catch {}
  }

  // ★ البند 1: POST login بدل GET
  if (req.method === 'POST') {
    // Vercel بتدعم req.body تلقائيًا للـ JSON
    const pass = (req.body && req.body.password) || '';
    
    // لو مفيش PANEL_PASSWORD محدد
    if (!PANEL_PASSWORD) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send('<h1>PANEL_PASSWORD not set</h1>');
    }

    if (pass === PANEL_PASSWORD) {
      // نجح → ضع cookie + redirect
      await resetFails();
      const token = makeToken();
      res.setHeader('Set-Cookie', `panel_auth=${token}; Path=/api/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);
      return res.redirect(303, req.url.split('?')[0]);
    }

    // فشل → سجل المحاولة
    await recordFailedAttempt();
    const ban = await checkBan();
    if (ban) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(429).send(`<h1>${ban.message}</h1><p>حاول مرة أخرى لاحقًا.</p>`);
    }
    // ارجع صفحة الدخول مع رسالة خطأ
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(401).send(LOGIN_HTML.replace('display: none;', 'display: block;'));
  }

  // ★ GET: تأكد من Cookie
  if (req.method === 'GET') {
    // تأكد من الحظر الأول
    const ban = await checkBan();
    if (ban) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(429).send(`<h1>${ban.message}</h1>`);
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
