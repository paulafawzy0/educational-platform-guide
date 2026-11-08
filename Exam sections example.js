/* مثال داتا: ضيفي examSections جوه object المادة (جنب chapters).
   الفصول بتتحدد بالاسم بالظبط زي ما هو مكتوب في chapters[].t
   والمحاضرات المنفردة بتتحدد بالـ id أو برقمها (من صفر). */

var exampleSubject = {
  // ... t, lectures, links, الخ زي ما هي ...

  // الفصول الحالية (زي ما هي)
  chapters: [
    {
      t: "الفصل الأول: الأساسيات",
      icon: "📘",
      d: "مقدمة وأساسيات",
      lectures: ["lec-1", "lec-2", "lec-3"],
    },
    {
      t: "الفصل الثاني: Application Layer",
      icon: "📘",
      lectures: ["lec-4", "lec-5", "lec-6"],
    },
    {
      t: "الفصل الثالث: Transport Layer",
      icon: "📘",
      lectures: ["lec-7", "lec-8"],
    },
    {
      t: "الفصل الرابع: Network Layer",
      icon: "📘",
      lectures: ["lec-9", "lec-10"],
    },
  ],

  // الجديد: محتوى الميد ومحتوى الفاينل
  examSections: {
    midterm: {
      mode: "separate", // "separate" = قسم لوحده | "inFinal" = جوه الفاينل بس
      open: false, // false = مقلّص | true = مفتوح
      title: "محتوى الميد", // اختياري
      icon: "📝", // اختياري
      notes: [
        // اختياري: بتظهر أول حاجة جوه القسم (نص أو array أسطر)
        "الميد من الفصل الأول والتاني بس",
        "ركزي على أسئلة الـ Sockets",
      ],
      chapters: ["الفصل الأول: الأساسيات", "الفصل الثاني: Application Layer"],
      lectures: [], // اختياري: محاضرات منفردة بالـ id أو الرقم
    },

    final: {
      open: true, // الفاينل مفتوح ولا مقلّص
      title: "محتوى الفاينل",
      icon: "🎓",
      includeMidterm: true, // true = محتوى الميد يظهر جوه الفاينل | false = مايظهرش
      midtermOpen: false, // الميد اللي جوه الفاينل: false = مقلّص | true = مفتوح
      notes: "الفاينل بيشمل الميد + الفصل التالت والرابع",
      chapters: [
        "الفصل الثالث: Transport Layer",
        "الفصل الرابع: Network Layer",
      ],
      lectures: [],
    },
  },
};
