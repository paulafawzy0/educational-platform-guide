// ═══════════════════════════════════════════════════════════════════
//  فهرس المواد
//  الهيكل: كل مادة في مجلدها الخاص data/{slug}/
//          ├── {slug}.js                    ← ملف المحاضرات والأسئلة
//          └── sections-{slug}.json         ← ملف السكاشن
// ═══════════════════════════════════════════════════════════════════

var SUBJECTS_INDEX = [
  // ─────────────────────────────────────────────────────────────
  // 1) Computer Graphics — الرسم بالحاسب
  // ─────────────────────────────────────────────────────────────
  {
    slug: "graphics",
    name: "Computer Graphics",
    en: "الرسم بالحاسب",
    icon: "🎨",
    file: "datenew/graphics/graphics.js",
    sectionsFile: "datenew/graphics/sections-graphics.json",
    sectionTitle: "🧩 سكاشن الرسوميات",
    active: true,
  },

  // ─────────────────────────────────────────────────────────────
  // 2) Visual Programming — البرمجة المرئية
  // ─────────────────────────────────────────────────────────────
  {
    slug: "visual-programming",
    name: "Visual Programming",
    en: "البرمجة المرئية",
    icon: "🧩",
    file: "datenew/visual-programming/visual-programming.js",
    sectionsFile: "datenew/visual-programming/sections-visual-programming.json",
    sectionTitle: "🧩 سكاشن البرمجة المرئية",
    active: true,
  },

  // ─────────────────────────────────────────────────────────────
  // 3) Computer Networks — شبكات الحاسوب
  // ─────────────────────────────────────────────────────────────
  {
    slug: "networks",
    name: "Computer Networks",
    en: "شبكات الحاسوب",
    icon: "🌐",
    file: "datenew/networks/networks.js",
    sectionsFile: "datenew/networks/sections-networks.json",
    sectionTitle: "🧩 سكاشن الشبكات",
    active: true,
  },

  // ─────────────────────────────────────────────────────────────
  // 4) Operating Systems — نظم التشغيل
  // ─────────────────────────────────────────────────────────────
  {
    slug: "operating-systems",
    name: "Operating Systems",
    en: "نظم التشغيل",
    icon: "⚙️",
    file: "datenew/operating-systems/operating-systems.js",
    sectionsFile: "datenew/operating-systems/sections-operating-systems.json",
    sectionTitle: "🧩 سكاشن نظم التشغيل",
    active: true,
  },

  // ─────────────────────────────────────────────────────────────
  // 5) Software Engineering — هندسة البرمجيات
  // ─────────────────────────────────────────────────────────────
  {
    slug: "software-engineering",
    name: "Software Engineering",
    en: "هندسة البرمجيات",
    icon: "🏗️",
    file: "datenew/software-engineering/software-engineering.js",
    sectionsFile:
      "datenew/software-engineering/sections-software-engineering.json",
    sectionTitle: "🧩 سكاشن هندسة البرمجيات",
    active: true,
  },

  // ─────────────────────────────────────────────────────────────
  // 6) Sample — مادة تجريبية (لتجربة الشكل)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "sample",
    name: "مادة تجريبية",
    en: "Sample",
    icon: "🧪",
    file: "datenew/sample/sample.js",
    sectionsFile: "datenew/sample/sections-sample.json",
    sectionTitle: "🧩 سكاشن تجريبية",
    active: false,
  },

  // ─────────────────────────────────────────────────────────────
  // 7) Computer Networks (نسخة بديلة — اختياري)
  // ─────────────────────────────────────────────────────────────
  //   {
  //     slug: "computer-networks",
  //     name: "Computer Networks (Alt)",
  //     en: "Computer Networks — نسخة بديلة",
  //     icon: "🌐",
  //     file: "data/computer-networks/computer-networks.js",
  //     sectionsFile: "data/computer-networks/sections-computer-networks.json",
  //     sectionTitle: "🧩 سكاشن الشبكات",
  //     active: false, // ← مقفولة. شيلها لو مش محتاجها
  //   },
];
