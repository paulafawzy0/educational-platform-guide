/* مثال داتا: ضيفي examSections جوه object المادة (جنب chapters).
   الفصول بتتحدد بالاسم بالظبط زي ما هو مكتوب في chapters[].t
   والمحاضرات المنفردة بتتحدد بالـ id أو برقمها (من صفر). */

var exampleSubject = {
  // ... t, lectures, links, الخ زي ما هي ...

  // الفصول الحالية (زي ما هي)
  chapters: [
    { t: "الفصل الأول: الأساسيات",  icon: "📘", d: "مقدمة وأساسيات", lectures: ["lec-1", "lec-2", "lec-3"] },
    { t: "الفصل الثاني: Application Layer", icon: "📘", lectures: ["lec-4", "lec-5", "lec-6"] },
    { t: "الفصل الثالث: Transport Layer",   icon: "📘", lectures: ["lec-7", "lec-8"] },
    { t: "الفصل الرابع: Network Layer",     icon: "📘", lectures: ["lec-9", "lec-10"] }
  ],

  // الجديد: محتوى الميد ومحتوى الفاينل
  examSections: {
    // لما examSections موجودة، بتظهر هي بدل شكل المحاضرات العادي.
    // لو عايزة تفضل قايمة المحاضرات العادية تظهر معاها: showLectures: true
    showLectures: false,
    // المحاضرات اللي مش داخلة في أي قسم بتظهر تحت بعنوان "باقي المحاضرات".
    // لو عايزة تخفيها: showOthers: false
    showOthers: true,

    midterm: {
      mode: "separate",        // الميد قسم لوحده (بيختفي من مكانه لو الفاينل includeMidterm: true)
      open: false,             // false = مقلّص | true = مفتوح
      title: "محتوى الميد",     // اختياري
      icon: "📝",              // اختياري
      notesOpen: true,         // الملاحظات: true = مفتوحة | false = مقلّصة (والطالب يقدر يفتحها ويقفلها)
      notes: [                 // اختياري: بتظهر أول حاجة جوه القسم (نص أو array أسطر)
        "الميد من الفصل الأول والتاني بس",
        "ركزي على أسئلة الـ Sockets"
      ],
      chapters: [
        "الفصل الأول: الأساسيات",   // فصل كامل: اسمه بس
        // فصل جزئي: بتختاري محاضرات منه (بالـ id أو الرقم من صفر)،
        // وباقي محاضرات الفصل بتظهر تحت الميد بعنوان "(باقي الفصل) • تبع الفاينل"،
        // وفي الداشبورد بتتعلّم "تبع الفاينل" (والمختارة "تبع الميد")
        { t: "الفصل الثاني: Application Layer", lectures: ["lec-4"] }
      ],
      lectures: []             // اختياري: محاضرات منفردة بالـ id أو الرقم
    },

    final: {
      open: true,              // الفاينل مفتوح ولا مقلّص
      title: "محتوى الفاينل",
      icon: "🎓",
      includeMidterm: true,    // true = محتوى الميد يظهر جوه الفاينل | false = مايظهرش
      midtermOpen: false,      // الميد اللي جوه الفاينل: false = مقلّص | true = مفتوح
      notes: "الفاينل بيشمل الميد + الفصل التالت والرابع",
      chapters: ["الفصل الثالث: Transport Layer", "الفصل الرابع: Network Layer"],
      lectures: []
    }
  }
};
