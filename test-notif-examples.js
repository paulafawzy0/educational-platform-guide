// ============================================================
//  أمثلة لإضافة إشعارات في الجرس (من جوه app.js)
//  استخدمي addNotification / addAnnouncementLog / addAuditLog
//  الـ notifVisible هتدلعهم تلقائيًا حسب جدول الطالب
// ============================================================

// 1) إشعار عام لكل الطلاب (زي ما كان)
addNotification({
  type: "info",
  title: "📢 إعلان عام",
  message: "الموقع اتحّدث بإضافة محاضرات جديدة",
  depts: "all"
});

// 2) إشعار لقسم معين
addNotification({
  type: "info",
  title: "📢 إعلان لقسم علوب الحاسب",
  message: "اجتماع القسم بكرة الساعة 2",
  depts: ["cs"]
});

// 3) إشعار لمادة + معيد معين (اللي يظهر للطالب لو عنده المادة دي عند المعيد ده)
addAnnouncementLog({
  title: "📢 تنبيه: سكاشن التدريب الميداني",
  message: "سكاشن م/ وليد ممدوح بكرة هتكون أوفلاين عادي.",
  depts: "all",
  course: "التدريب الميداني",
  instructor: "م/ وليد ممدوح"
});

// 4) إشعار لمادة + معيد + سكشن معين
addAnnouncementLog({
  title: "📢 تنبيه لسكشن 3",
  message: "سكشن شبكات الحاسب لسكشن 3 اتلغى بكرة.",
  depts: "cs",
  course: "شبكات الحاسب",
  instructor: "م/ اسعد نصرالله",
  section: "3"
});

// 5) إشعار لمعمل بس (بدون محاضرات)
addAnnouncementLog({
  title: "🧪 تنبيه معمل",
  message: "معمل نظم التشغيل اتعمل تصحيح للسكاشن.",
  depts: "se",
  course: "نظم التشغيل",
  instructor: "م/ احمد عبدالرحمن",
  classType: "lab"
});

// 6) إشعار لمحاضرة نظرية بس
addAnnouncementLog({
  title: "📖 محاضرة جديدة",
  message: "اترفع تلخيص محاضرة هندسة البرمجيات النظرية.",
  depts: "all",
  course: "هندسة البرمجيات",
  classType: "lecture"
});

// 7) إشعار تعديل إجابة (addAuditLog — زي ما هو)
addAuditLog({
  context: "بنك أسئلة شبكات الحاسب",
  questionNum: 5,
  questionText: "ما هو الـ OSI Model؟",
  oldAnswer: "مكون من 7 طبقات",
  newAnswer: "مكون من 7 طبقات: Physical, Data Link, Network, Transport, Session, Presentation, Application",
  depts: ["cs", "is", "se"]
});

// 8) إشعار إضافة محاضرة (addLectureAddedLog — زي ما هو)
addLectureAddedLog({
  subject: "شبكات الحاسب",
  lectureTitle: "المحاضرة 7",
  lectureDesc: "TCP/IP Model",
  depts: ["cs", "is", "se"]
});
