// /* بيانات مادة: إدارة المشروعات المتقدمة (advanced-project-management)
//    - المحاضرات (PDF) في lectures/  والأسئلة في questions/
//    - المسارات دايمًا من جذر المشروع: datenew/subjects/advanced-project-management/lectures/lec-01.pdf
//    - انسخي شكل المحاضرة/الأسئلة من مادة شغالة عندك (دليل صاحب المنصة، الخطوة 4 و5) */
// subjects.push({
//   name: "إدارة المشروعات المتقدمة",
//   en: "Advanced Project Management",
//   icon: "📋",
//   slug: "advanced-project-management",
//   lectures: [
//     /* { t:"المحاضرة 1 — العنوان", d:"وصف", id:"lec-01",
//          pdf:"datenew/subjects/advanced-project-management/lectures/lec-01.pdf", questions:[] } */
//   ]
// });
/* ============================================================
   بيانات مادة: إدارة المشروعات المتقدمة (advanced-project-management)
   - المحاضرات (PDF) في lectures/  والأسئلة في questions/
   - المسارات دايمًا من جذر المشروع:
     datenew/subjects/advanced-project-management/lectures/lec-01.pdf
   - الفصول بتتحدد بالاسم بالظبط زي ما هو مكتوب في chapters[].t
   - examSections بتحل محل شكل المحاضرات العادي (showLectures: false)
   ============================================================ */

subjects.push({
  name: "إدارة المشروعات المتقدمة",
  en: "Advanced Project Management",
  icon: "📋",
  slug: "advanced-project-management",

  /* ---------- الفصول ---------- */
  chapters: [
    {
      t: "الفصل الأول: مقدمة في إدارة المشروعات المتقدمة",
      icon: "📘",
      d: "مفاهيم أساسية وأطر العمل",
      open: true,
      lectures: ["lec-01", "lec-02", "lec-03"],
    },
    {
      t: "الفصل الثاني: التخطيط والجدولة",
      icon: "📗",
      d: "WBS, CPM, PERT, Gantt",
      lectures: ["lec-04", "lec-05", "lec-06"],
    },
    {
      t: "الفصل الثالث: إدارة المخاطر والجودة",
      icon: "📙",
      d: "Risk Register, QA/QC",
      lectures: ["lec-07", "lec-08"],
    },
    {
      t: "الفصل الرابع: Agile و Scrum وإدارة الفرق",
      icon: "📕",
      d: "Sprint, Backlog, Retrospective",
      lectures: ["lec-09", "lec-10"],
    },
  ],

  /* ---------- المحاضرات ---------- */
  lectures: [
    /* ===== المحاضرة 1 ===== */
    {
      id: "lec-01",
      t: "المحاضرة الأولى — مقدمة في إدارة المشروعات المتقدمة",
      d: "تعريف المشروع، دورة الحياة، أصحاب المصلحة، الفرق بين Project/Program/Portfolio",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-01.pdf",
      pdf2: "datenew/subjects/advanced-project-management/questions/lec-01-questions.pdf",
      sectionTitle: "🧩 سكاشن المقدمة",
      audio: [
        {
          t: "الجزء الأول",
          url: "datenew/subjects/advanced-project-management/lectures/lec-01-part1.mp3",
        },
        {
          t: "الجزء الثاني",
          url: "datenew/subjects/advanced-project-management/lectures/lec-01-part2.mp3",
        },
      ],
      videos: [
        { t: "مراجعة سريعة على المحاضرة", url: "https://youtu.be/XXXXXXXXXXX" },
      ],
      links: [
        {
          t: "📑 السلايدات",
          d: "سلايدات المحاضرة كاملة",
          url: "https://example.com/lec-01-slides",
        },
        {
          t: "📖 PMBOK Guide (فصل 1)",
          url: "https://www.pmi.org/pmbok-guide-standards",
        },
      ],
      linkCategories: [
        {
          category: "مراجع أساسية",
          icon: "📚",
          description: "كتب ومراجع للمقدمة",
          links: [
            {
              t: "PMBOK 7th Edition",
              d: "المرجع الأساسي لـ PMI",
              icon: "📘",
              actions: [
                {
                  label: "📖 الموقع",
                  url: "https://www.pmi.org/pmbok-guide-standards",
                  type: "view",
                  color: "blue",
                },
              ],
            },
          ],
        },
      ],
      questions: [
        {
          q: "إيه الفرق الأساسي بين البرنامج (Program) والمشروع (Project)؟",
          options: [
            "البرنامج مجموعة مشروعات مترابطة، والمشروع شغل مؤقت لإنتاج منتج/خدمة فريدة",
            "البرنامج أصغر من المشروع",
            "مفيش فرق بينهم",
            "البرنامج دايمًا حكومي",
          ],
          correct: 0,
          translation:
            "What is the main difference between a Program and a Project?",
          explanation:
            "المشروع شغل مؤقت (Temporary) له بداية ونهاية، والبرنامج مجموعة مشروعات مترابطة بتدير مع بعض.",
          video: { t: "شرح السؤال", url: "https://youtu.be/XXXXXXXXXXX" },
        },
        {
          q: "أي من التالي يعتبر من أصحاب المصلحة (Stakeholders) في المشروع؟",
          options: [
            "العميل فقط",
            "فريق المشروع فقط",
            "العميل + الفريق + الرعاة + المستخدمين النهائيين + الموردين",
            "الإدارة العليا فقط",
          ],
          correct: 2,
          explanation:
            "أصحاب المصلحة أي شخص/جهة له مصلحة في المشروع أو يتأثر بنتائجه — وليسوا العميل أو الفريق فقط.",
        },
        {
          type: "essay",
          q: "اشرح مراحل دورة حياة المشروع (Project Life Cycle) مع مثال عملي.",
          answer:
            "مراحل دورة حياة المشروع:\n" +
            "1) Initiation (البدء): تحديد الهدف وأصحاب المصلحة وإعداد Project Charter.\n" +
            "2) Planning (التخطيط): وضع الخطة، WBS، الجدول الزمني، الميزانية، إدارة المخاطر.\n" +
            "3) Execution (التنفيذ): تنفيذ الأنشطة وإدارة الفريق والتواصل.\n" +
            "4) Monitoring & Controlling (المتابعة والتحكم): متابعة الأداء مقابل الخطة واتخاذ إجراءات تصحيحية.\n" +
            "5) Closure (الإغلاق): تسليم المنتج وتوثيق الدروس المستفادة وإغلاق العقود.\n\n" +
            "مثال: بناء تطبيق موبايل: الفكرة والموافقة → تحديد المتطلبات والجدول → التطوير → الاختبار والمراقبة → الإطلاق والتسليم.",
          tags: ["Life Cycle", "PMBOK"],
          ref: "المحاضرة 1 — Section 1.2",
        },
      ],
      notes:
        "📌 راجعي الفرق بين Project / Program / Portfolio قبل المحاضرة الجاية.",
      summary: {
        pdf: "datenew/subjects/advanced-project-management/lectures/lec-01-summary.pdf",
        text:
          "نقاط رئيسية:\n" +
          "• المشروع شغل مؤقت لإنتاج منتج فريد.\n" +
          "• البرنامج = مجموعة مشروعات مترابطة.\n" +
          "• دورة الحياة: Initiation → Planning → Execution → M&C → Closure.\n" +
          "• أصحاب المصلحة مش بس العميل.",
      },
      transcript: {
        pdf: "datenew/subjects/advanced-project-management/lectures/lec-01-transcript.pdf",
        text: "تفريغ صوت المحاضرة:\nالدكتور: النهاردة هنبدأ بمقدمة عن إدارة المشروعات المتقدمة...",
      },
    },

    /* ===== المحاضرة 2 ===== */
    {
      id: "lec-02",
      t: "المحاضرة الثانية — إطار العمل PMBOK",
      d: "Knowledge Areas و Process Groups والفرق بينهم",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-02.pdf",
      questions: [
        {
          q: "عدد الـ Knowledge Areas في PMBOK 6th Edition؟",
          options: ["5", "8", "10", "12"],
          correct: 2,
          explanation:
            "PMBOK 6th Edition فيه 10 Knowledge Areas و5 Process Groups.",
        },
        {
          q: "أي من التالي يعتبر من Process Groups في PMBOK؟",
          options: [
            "Scope, Time, Cost",
            "Initiating, Planning, Executing, M&C, Closing",
            "Risk, Quality, HR",
            "Stakeholder, Communication",
          ],
          correct: 1,
          explanation:
            "الـ Process Groups هي: Initiating / Planning / Executing / Monitoring & Controlling / Closing.",
        },
        {
          type: "essay",
          q: "اذكر الـ 10 Knowledge Areas في PMBOK 6th Edition.",
          answer:
            "1. Integration Management\n" +
            "2. Scope Management\n" +
            "3. Schedule (Time) Management\n" +
            "4. Cost Management\n" +
            "5. Quality Management\n" +
            "6. Resource Management\n" +
            "7. Communications Management\n" +
            "8. Risk Management\n" +
            "9. Procurement Management\n" +
            "10. Stakeholder Management",
          tags: ["PMBOK", "Knowledge Areas"],
        },
      ],
      summary: {
        text: "PMBOK 6: 5 Process Groups + 10 Knowledge Areas.\nPMBOK 7: 12 Principles + 8 Performance Domains.",
      },
    },

    /* ===== المحاضرة 3 ===== */
    {
      id: "lec-03",
      t: "المحاضرة الثالثة — Project Charter و Stakeholder Analysis",
      d: "خطاب تفويض المشروع ومصفوفة تحليل أصحاب المصلحة",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-03.pdf",
      questions: [
        {
          q: "مين المسؤول عن إصدار الـ Project Charter؟",
          options: [
            "مدير المشروع",
            "الراعي (Sponsor) أو صاحب الصلاحية",
            "الفريق",
            "العميل فقط",
          ],
          correct: 1,
          explanation:
            "الـ Project Charter بيصدره الـ Sponsor أو الجهة المالكة، وبيفوّض مدير المشروع رسميًا.",
        },
        {
          q: "في مصفوفة تحليل أصحاب المصلحة (Power/Interest)، الشخص اللي عنده Power عالية و Interest عالي بيتعامل معاه إزاي؟",
          options: [
            "Manage Closely — إدارة وثيقة",
            "Monitor فقط",
            "Keep Informed فقط",
            "Keep Satisfied فقط",
          ],
          correct: 0,
          explanation:
            "Power عالي + Interest عالي = Manage Closely (إدارة وثيقة).",
        },
      ],
    },

    /* ===== المحاضرة 4 ===== */
    {
      id: "lec-04",
      t: "المحاضرة الرابعة — Work Breakdown Structure (WBS)",
      d: "تفكيك المشروع، Work Packages، Dictionary",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-04.pdf",
      questions: [
        {
          q: "الـ WBS بيتفكك لحد إيه؟",
          options: ["Activity", "Task", "Work Package", "Milestone"],
          correct: 2,
          explanation:
            "الـ WBS بيتفكك لحد الـ Work Package، اللي بعدها بيتحول لأنشطة في الجدول.",
        },
        {
          q: "قاعدة 100% في WBS معناها إيه؟",
          options: [
            "لازم 100 نشاط بالظبط",
            "مجموع شغل المستوى الأدنى لازم يساوي 100% من شغل المستوى الأعلى",
            "الميزانية 100% للتنفيذ",
            "الفريق 100 شخص",
          ],
          correct: 1,
          explanation:
            "قاعدة 100%: مجموع الـ scope في الأبناء = 100% من scope الأب (مفيش نقص ولا زيادة).",
        },
      ],
    },

    /* ===== المحاضرة 5 ===== */
    {
      id: "lec-05",
      t: "المحاضرة الخامسة — CPM و PERT",
      d: "Critical Path Method و Program Evaluation and Review Technique",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-05.pdf",
      questions: [
        {
          q: "الـ Critical Path هو المسار اللي...",
          options: [
            "أقصر مدة في المشروع",
            "أطول مدة في المشروع وبيحدد مدة المشروع الكلية",
            "أقل تكلفة",
            "أكتر مسار فيه مخاطر",
          ],
          correct: 1,
          explanation:
            "المسار الحرج هو أطول مسار زمني، وبيحدد أقصر مدة ممكنة لإنهاء المشروع، وأي تأخير فيه بيأخر المشروع كله.",
        },
        {
          q: "في PERT، المدة المتوقعة (TE) لسهولة الحساب = ؟",
          options: [
            "(O + M + P) / 3",
            "(O + 4M + P) / 6",
            "(O + 2M + P) / 4",
            "(O + P) / 2",
          ],
          correct: 1,
          explanation: "TE = (Optimistic + 4×Most Likely + Pessimistic) / 6.",
        },
        {
          type: "essay",
          q: "اشرح الفرق بين CPM و PERT.",
          answer:
            "CPM: بيستخدم مدد تقديرية واحدة لكل نشاط (Deterministic) — مناسب للمشروعات اللي ليها خبرة سابقة.\n" +
            "PERT: بيستخدم 3 تقديرات (Optimistic / Most Likely / Pessimistic) لاحتساب المتوسط والانحراف المعياري — مناسب للمشروعات ذات عدم اليقين.\n" +
            "الاتنين بيحسبوا الـ Critical Path، بس PERT بيضيف بُعد احتمالي.",
          tags: ["CPM", "PERT", "Scheduling"],
        },
      ],
      notes: "📌 تمارين: احسبي المسار الحرج لمشروع 7 أنشطة (شوفي PDF2).",
    },

    /* ===== المحاضرة 6 ===== */
    {
      id: "lec-06",
      t: "المحاضرة السادسة — Gantt Chart و Resource Leveling",
      d: "الجدول الزمني البصري وتسوية الموارد",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-06.pdf",
      questions: [
        {
          q: "الفرق بين Crashing و Fast Tracking؟",
          options: [
            "الاتنين نفس الحاجة",
            "Crashing: إضافة موارد بتكلفة إضافية | Fast Tracking: تنفيذ أنشطة متوازية بمخاطرة أعلى",
            "Crashing للجودة | Fast Tracking للتكلفة",
            "مفيش فرق حقيقي",
          ],
          correct: 1,
          explanation:
            "Crashing بيركّز على تقليل المدة بإضافة موارد/تكلفة. Fast Tracking بيمشّي أنشطة متوازية (بتزود المخاطر).",
        },
      ],
    },

    /* ===== المحاضرة 7 ===== */
    {
      id: "lec-07",
      t: "المحاضرة السابعة — إدارة المخاطر",
      d: "Risk Register، تحليل كمي ونوعي، استراتيجيات الاستجابة",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-07.pdf",
      questions: [
        {
          q: "في تحليل المخاطر، الـ Risk Score = ؟",
          options: [
            "Probability × Impact",
            "Probability + Impact",
            "Impact / Probability",
            "Cost × Time",
          ],
          correct: 0,
          explanation: "Risk Score = Probability × Impact (احتمالية × تأثير).",
        },
        {
          q: "استراتيجية 'Avoid' في التعامل مع المخاطر معناها؟",
          options: [
            "تقليل الاحتمالية",
            "نقل المخاطرة لطرف تالت (تأمين مثلًا)",
            "تغيير الخطة لإزالة التهديد بالكامل",
            "قبول المخاطرة",
          ],
          correct: 2,
          explanation:
            "Avoid = تغيير خطة المشروع لإزالة التهديد أو حماية الأهداف منه بالكامل.",
        },
        {
          type: "essay",
          q: "اذكر استراتيجيات الاستجابة للمخاطر السلبية (Threats) في PMBOK.",
          answer:
            "1) Avoid — تجنب المخاطرة\n" +
            "2) Transfer — نقل المخاطرة (تأمين / عقود)\n" +
            "3) Mitigate — تقليل الاحتمالية أو التأثير\n" +
            "4) Accept — قبول (Active / Passive)\n" +
            "5) Escalate — تصعيد لو خارج صلاحية مدير المشروع",
          tags: ["Risk", "PMBOK"],
        },
      ],
    },

    /* ===== المحاضرة 8 ===== */
    {
      id: "lec-08",
      t: "المحاضرة الثامنة — إدارة الجودة",
      d: "QA vs QC، Cost of Quality، أدوات الجودة السبعة",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-08.pdf",
      questions: [
        {
          q: "الفرق بين QA و QC؟",
          options: [
            "نفس الحاجة",
            "QA عملية وقائية (Process) — QC عملية كشفية (Product)",
            "QA للتصنيع فقط — QC للبرمجيات فقط",
            "QA و QC تابعات للتكلفة",
          ],
          correct: 1,
          explanation:
            "Quality Assurance = وقائي على العمليات. Quality Control = كشف العيوب في المنتج النهائي.",
        },
      ],
    },

    /* ===== المحاضرة 9 ===== */
    {
      id: "lec-09",
      t: "المحاضرة التاسعة — Agile Manifesto و Scrum",
      d: "4 Values, 12 Principles, Roles, Events, Artifacts",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-09.pdf",
      questions: [
        {
          q: "أدوار Scrum الأساسية هي؟",
          options: [
            "PM + Team + Client",
            "Product Owner + Scrum Master + Development Team",
            "Sponsor + Manager + Team",
            "CEO + CTO + Team Lead",
          ],
          correct: 1,
          explanation:
            "أدوار Scrum: Product Owner / Scrum Master / Development Team.",
        },
        {
          q: "مدة Sprint المعتادة في Scrum؟",
          options: ["1 يوم", "1-4 أسابيع", "3 شهور", "سنة"],
          correct: 1,
          explanation: "الـ Sprint عادة من أسبوع لأربع أسابيع (Time-boxed).",
        },
        {
          type: "essay",
          q: "اشرح أحداث Scrum (Scrum Events) وهدف كل واحد.",
          answer:
            "1) Sprint — الحاوية الأساسية (1-4 أسابيع).\n" +
            "2) Sprint Planning — تحديد Sprint Goal و Sprint Backlog.\n" +
            "3) Daily Scrum — مزامنة يومية 15 دقيقة.\n" +
            "4) Sprint Review — عرض المنتج لأصحاب المصلحة.\n" +
            "5) Sprint Retrospective — تحسين العملية والفريق.",
          tags: ["Agile", "Scrum"],
        },
      ],
    },

    /* ===== المحاضرة 10 ===== */
    {
      id: "lec-10",
      t: "المحاضرة العاشرة — إدارة الفرق والتواصل",
      d: "Tuckman Model، Communication Channels، Conflict Resolution",
      pdf: "datenew/subjects/advanced-project-management/lectures/lec-10.pdf",
      questions: [
        {
          q: "مراحل تطوّر الفريق (Tuckman Model) بالترتيب؟",
          options: [
            "Forming → Storming → Norming → Performing → Adjourning",
            "Forming → Norming → Storming → Performing",
            "Storming → Forming → Performing → Norming",
            "Performing → Forming → Storming → Norming",
          ],
          correct: 0,
          explanation:
            "Tuckman: Forming / Storming / Norming / Performing / Adjourning.",
        },
        {
          q: "عدد قنوات التواصل لفريق من 6 أفراد = ؟",
          options: ["15", "12", "30", "6"],
          correct: 0,
          explanation: "N(N-1)/2 = 6×5/2 = 15 قناة.",
        },
      ],
    },
  ],

  /* ---------- محتوى الميد والفاينل ---------- */
  examSections: {
    showLectures: false, // الأقسام تظهر بدل شكل المحاضرات العادي

    midterm: {
      mode: "separate",
      open: false,
      title: "محتوى الميد",
      icon: "📝",
      notes: [
        "الميد من الفصل الأول والتاني بس",
        "ركزي على CPM/PERT وحساب المسار الحرج",
        "أسئلة مقالية متوقعة عن دورة حياة المشروع",
      ],
      chapters: [
        "الفصل الأول: مقدمة في إدارة المشروعات المتقدمة",
        // اختيار جزئي: بس المحاضرة 4 و5 من الفصل التاني
        { t: "الفصل الثاني: التخطيط والجدولة", lectures: ["lec-04", "lec-05"] },
      ],
      lectures: [],
    },

    // final: {
    //   open: true,
    //   title: "محتوى الفاينل",
    //   icon: "🎓",
    //   includeMidterm: true,
    //   midtermOpen: false,
    //   notes:
    //     "الفاينل بيشمل الميد + الفصل التالت والرابع. ركزي على Agile و Scrum وإدارة المخاطر.",
    //   chapters: [
    //     "الفصل الثالث: إدارة المخاطر والجودة",
    //     "الفصل الرابع: Agile و Scrum وإدارة الفرق",
    //   ],
    //   lectures: [],
    // },
  },
});
