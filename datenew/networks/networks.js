subjects.push({
  name: "شبكات الحاسب",
  en: "Computer Networks",
  icon: "🌐",
  lectures: [
    {
      id: "networks-lecture-01",
      t: "المحاضرة الأولى",
      d: "مقدمة في الشبكات ونموذج الطبقات OSI.",
      pdf: "Computer Networks/lectures/lec 1/Ch01 - Computer Networks - Lec 01.pdf",
      pdf2: "Computer Networks/Questions/Questions on each lecture/Chapter 1 - Questions - Computer Networks.pdf",

      linkCategories: [
        {
          category: "فيديوهات عربية",
          icon: "🇪🇬",
          description:
            "شروحات باللغة العربية لمفاهيم الفصل الأول: تعريف الإنترنت، البروتوكولات، شبكات الوصول، والـ Packet Switching",
          links: [
            {
              t: "شبكات الحاسوب - A Top-Down Approach (الكتاب نفسه)",
              d: "شرح عربي كامل لكتاب Kurose & Ross: مكونات الإنترنت (Hosts, Packet Switches, ISPs)، الـ Protocols، شبكات الوصول (DSL, Cable, FTTH)، والـ Packet Switching مع Store-and-Forward  فديوهات (من 1 الي 3) ",
              icon: "🇪🇬",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://www.youtube.com/playlist?list=PL8v_bZALWLKE9Lo2BIy8nsdsakbSvQlEo",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "شبكات الحاسوب - A Top-Down Approach (الكتاب نفسه)",
              d: "شرح عربي لكتاب Kurose & Ross: تعريف الإنترنت والـ Protocols، مكونات الـ Network Edge (الـ Hosts وشبكات الوصول DSL/Cable/FTTH)، والـ Network Core (مفهوم الـ Packet Switching وStore-and-Forward وهيكل الـ ISPs).  في فديو3 لحد 23:20  [فيديوهات 1-3]",
              icon: "🇪🇬",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://youtube.com/playlist?list=PLYljoJMAPFLHrCVfzuMLkJOZHhCgfSXG-&si=c2A3_89g912REXOZ",
                  type: "view",
                  color: "red",
                },
              ],
            },
          ],
        },
        {
          category: "فيديوهات عالمية",
          icon: "🌍",
          description:
            "المحاضرات الرسمية من مؤلف الكتاب Jim Kurose + مراجع عالمية مُتحقّق منها",
          links: [
            {
              t: "Jim Kurose - Chapter 1 (Official Author Lectures)",
              d: "الشرح المباشر من مؤلف الكتاب نفسه: What is the Internet, Network Edge, Access Networks, Packet Switching — نفس ترتيب الكتاب بالضبط",
              icon: "🌍",
              actions: [
                {
                  label: "📖 Playlist كامل",
                  url: "https://www.youtube.com/playlist?list=PL1ya5dD_M8uX-BLUF1FEvUNsYWQL5_l0O",
                  type: "view",
                  color: "red",
                },
                {
                  label: "🎬 المحاضرة 1.1 مباشرة",
                  url: "https://www.youtube.com/watch?v=74sEFYBBRAY",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "Neso Academy - Introduction to Computer Networks",
              d: "شرح شامل: Protocols, Transmission Media, Store-and-Forward Delay, Packet Switching — مرجع تكميلي قوي",
              icon: "🌍",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgneraVKkEXrwyLVx2vJUvt",
                  type: "view",
                  color: "red",
                },
              ],
            },
          ],
        },
        {
          category: " كل  شي يخص السكشن ",
          icon: "⏱️",
          description: "حلول مسائل وقوانين تأخير الشبكات (Delay calculations).",
          links: [
            {
              t: "  Propagation Delay و Transmission Delay (Problem)",
              d: "شرح عربي لكيفية حساب d_prop = m/s و d_trans = L/R، وإيجاد المسافة عندما يتساوى الـ Propagation Delay مع الـ Transmission Delay.",
              icon: "🇪🇬",
              actions: [
                {
                  label: "🔍 بحث",
                  url: "https://drive.google.com/drive/folders/1s6z0r_ZhNEHe6fzRGhqlJhQXszWi8F69?usp=drive_link",
                  type: "view",
                  color: "red",
                },
              ],
            },
          ],
        },
        {
          category: "مواقع ومراجع",
          icon: "📚",
          description:
            "مراجع مُتحقّق منها تغطي: شبكات الوصول (DSL/Cable/FTTH)، وسائط النقل المادية، والـ Packet Switching",
          links: [
            {
              t: "Kurose & Ross Official Student Resources",
              d: "الموقع الرسمي للكتاب: محاضرات أونلاين، شرائح PowerPoint، Wireshark Labs، وتمارين مراجعة — المرجع الأول",
              icon: "📚",
              actions: [
                {
                  label: "🌐 فتح الموقع",
                  url: "https://gaia.cs.umass.edu/kurose_ross/",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "GeeksforGeeks - Transmission Media in Computer Networks",
              d: "شرح تفصيلي لوسائط النقل: Twisted-Pair Copper Wire, Coaxial Cable, Fiber Optics, Terrestrial Radio, Satellite — يطابق قسم 1.2.2 بالكامل",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح المقال",
                  url: "https://www.geeksforgeeks.org/transmission-media/",
                  type: "view",
                  color: "green",
                },
              ],
            },
            {
              t: "GeeksforGeeks - Types of Internet Access",
              d: "مقال يشرح أنواع الاتصال بالإنترنت: DSL, Cable, Fiber, Satellite, Wireless — يغطي قسم Access Networks (1.2.1)",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح المقال",
                  url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
                  type: "view",
                  color: "green",
                },
              ],
            },
          ],
        },
        {
          category: "أدوات ومحاكاة",
          icon: "🔧",
          description:
            "تمارين تفاعلية من مؤلفي الكتاب + أدوات عملية لتجربة الـ Packet Switching وتحليل الحزم",
          links: [
            {
              t: "Kurose & Ross Interactive Problems (Chapter 1)",
              d: "تمارين تفاعلية رسمية من مؤلفي الكتاب — تشمل: Queuing Delay, End-to-End Delay, Packet Switching vs Circuit Switching, One-hop Transmission Delay — كلها من مفاهيم 1.3.1",
              icon: "🔧",
              actions: [
                {
                  label: "🚀 فتح التمارين",
                  url: "https://gaia.cs.umass.edu/kurose_ross/interactive/",
                  type: "view",
                  color: "orange",
                },
              ],
            },
            {
              t: "Wireshark - Packet Analyzer",
              d: "أداة تتبع الـ Packets وقراءة الـ Headers عملياً — لفهم كيف تُرسل الحزم عبر الشبكة (يُذكر في الكتاب كأداة معتمدة)",
              icon: "🔧",
              actions: [
                {
                  label: "⭳ تحميل الأداة",
                  url: "https://www.wireshark.org/",
                  type: "download",
                  color: "blue",
                },
              ],
            },
          ],
        },
      ],
      // ═══════════════════════════════════════════════════════════════════
      //  مادة: Computer Networks — شبكات الحاسوب
      //  المسار: datenew/networks/networks.js → lectures[0].questions
      //  المرجع: Kurose & Ross — Top-Down Approach (Chapter 1)
      // ═══════════════════════════════════════════════════════════════════

      questions: [
        // ═══════════════════════════════════════════════════════
        // MCQ (1-65)
        // ═══════════════════════════════════════════════════════
        {
          q: "1. What is the primary focus of the book when discussing computer networks?",
          options: [
            "Private corporate networks",
            "The public Internet and its protocols",
            "Local area networks only",
            "Satellite communication systems",
          ],
          correct: 1,
          translation: "ما هو التركيز الأساسي للكتاب عند مناقشة شبكات الحاسوب؟",
          explanation:
            "الكتاب يركّز على الإنترنت العام (Public Internet) وبروتوكولاته — لأنه أشهر وأهم شبكة، وكل المفاهيم تنطبق على غيره من الشبكات.",
        },
        {
          q: "2. How can the Internet be described in terms of its basic components?",
          options: [
            "Only as a service provider for applications",
            "As hardware and software components (nuts and bolts) or as infrastructure for distributed applications",
            "Solely as a collection of servers",
            "As a single global database",
          ],
          correct: 1,
          translation: "كيف يمكن وصف الإنترنت من حيث مكوناته الأساسية؟",
          explanation:
            "وصفان: (1) Nuts-and-Bolts = المكونات المادية والبرمجية، (2) Services = البنية التحتية اللي بتقدم خدمات لتطبيقات موزعة.",
        },
        {
          q: "3. What are computing devices connected to the Internet called in Internet jargon?",
          options: ["Servers", "Hosts or end systems", "Routers", "Links"],
          correct: 1,
          translation:
            "ما اسم أجهزة الحوسبة المتصلة بالإنترنت في مصطلحات الإنترنت؟",
          explanation:
            "Hosts أو End Systems (المضيفون أو الأنظمة الطرفية) — كل الأجهزة المتصلة بالإنترنت من حواسيب وهواتف وأجهزة IoT.",
        },
        {
          q: "4. According to estimates mentioned, how many devices were connected to the Internet by 2022?",
          options: ["18 billion", "28.5 billion", "10 billion", "50 billion"],
          correct: 1,
          translation:
            "حسب التقديرات المذكورة، كم جهاز كان متصلاً بالإنترنت بحلول 2022؟",
          explanation:
            "28.5 مليار جهاز — رقم ضخم بيعكس الانتشار الهائل للإنترنت وإنترنت الأشياء (IoT).",
        },
        {
          q: "5. What connects end systems in a network?",
          options: [
            "Only packet switches",
            "A network of communication links and packet switches",
            "Servers exclusively",
            "Protocols alone",
          ],
          correct: 1,
          translation: "ما الذي يربط الأنظمة الطرفية في الشبكة؟",
          explanation:
            "شبكة من روابط الاتصال (Communication Links) ومبدلات الحزم (Packet Switches) — دي البنية التحتية للنقل.",
        },
        {
          q: "6. What is a packet in computer networks?",
          options: [
            "A complete message sent without segmentation",
            "Segmented data with added headers sent through the network",
            "A hardware device",
            "A type of router",
          ],
          correct: 1,
          translation: "ما هي الحزمة (Packet) في شبكات الحاسوب؟",
          explanation:
            "بيانات مُجزّأة + ترويسات (Headers) مضافة، تُرسَل عبر الشبكة. التجزئة بتسمح بمشاركة أفضل للموارد بين المستخدمين.",
        },
        {
          q: "7. What are the two main types of packet switches in the Internet?",
          options: [
            "Hosts and end systems",
            "Routers and link-layer switches",
            "Servers and clients",
            "Links and protocols",
          ],
          correct: 1,
          translation: "ما هما النوعان الرئيسيان لمبدلات الحزم في الإنترنت؟",
          explanation:
            "الموجّهات (Routers) ومبدلات طبقة الوصلة (Link-layer Switches). الاتنين بيمرروا الحزم لكن على طبقات مختلفة.",
        },
        {
          q: "8. Where are link-layer switches typically used?",
          options: [
            "In the network core",
            "In access networks",
            "Only in end systems",
            "In global transit",
          ],
          correct: 1,
          translation: "أين تُستخدم مبدلات طبقة الوصلة عادةً؟",
          explanation:
            "في شبكات الوصول (Access Networks) — زي شبكات LAN في الشركات والمنازل والجامعات.",
        },
        {
          q: "9. What is the sequence of links and switches a packet traverses called?",
          options: ["A protocol", "A route or path", "A header", "A segment"],
          correct: 1,
          translation: "ما اسم تتابع الروابط والمبدلات اللي بيمر بيها الحزمة؟",
          explanation:
            "المسار (Route أو Path) — من المُرسِل للمستقبِل عبر سلسلة من الروابط والمبدلات.",
        },
        {
          q: "10. How do end systems access the Internet?",
          options: [
            "Directly through global routers",
            "Through Internet Service Providers (ISPs)",
            "Via packet switches only",
            "Using protocols without intermediaries",
          ],
          correct: 1,
          translation: "كيف تصل الأنظمة الطرفية بالإنترنت؟",
          explanation:
            "من خلال مزوّدي خدمة الإنترنت (ISPs) — كل ISP بيوفّر وصول لمجموعة من المستخدمين.",
        },
        {
          q: "11. What interconnects lower-tier ISPs?",
          options: [
            "End systems",
            "National and international upper-tier ISPs",
            "Only local links",
            "Application protocols",
          ],
          correct: 1,
          translation: "ما الذي يربط مزوّدي الخدمة من المستوى الأدنى ببعضهم؟",
          explanation:
            "مزوّدو الخدمة من المستوى الأعلى (Upper-tier ISPs) وطنياً ودولياً. التسلسل الهرمي بيسمح بتغطية عالمية.",
        },
        {
          q: "12. What are the two most important protocols in the Internet?",
          options: [
            "HTTP and SMTP",
            "TCP and IP",
            "Ethernet and WiFi",
            "DNS and FTP",
          ],
          correct: 1,
          translation: "ما هما أهم بروتوكولين في الإنترنت؟",
          explanation:
            "TCP و IP — الأساس اللي بيقوم عليه الإنترنت كله. TCP مسؤول عن النقل الموثوق، و IP عن العنونة والتوجيه.",
        },
        {
          q: "13. Who develops Internet standards?",
          options: [
            "IEEE",
            "IETF (Internet Engineering Task Force)",
            "Cisco",
            "Google",
          ],
          correct: 1,
          translation: "من يطوّر معايير الإنترنت؟",
          explanation:
            "IETF — فريق هندسة الإنترنت. منظمة مفتوحة بيشارك فيها خبراء من كل العالم لوضع معايير الإنترنت.",
        },
        {
          q: "14. What are RFCs?",
          options: [
            "Hardware specifications",
            "Requests for comments that define protocols like TCP and IP",
            "Network hardware",
            "Application services",
          ],
          correct: 1,
          translation: "ما هي RFCs؟",
          explanation:
            "Requests for Comments — وثائق معيارية تعرّف بروتوكولات الإنترنت زي TCP و IP. ليها تنسيق صارم ومراجعة مجتمعية.",
        },
        {
          q: "15. What body specifies standards for network links like Ethernet?",
          options: [
            "IETF",
            "IEEE 802 LAN Standards Committee",
            "Cisco VNI",
            "Fiber Broadband",
          ],
          correct: 1,
          translation: "أي جهة تضع معايير روابط الشبكة زي Ethernet؟",
          explanation:
            "لجنة معايير IEEE 802 LAN — مسؤولة عن معايير Ethernet و WiFi (802.3 و 802.11 على التوالي).",
        },
        {
          q: "16. How is the Internet described as an infrastructure?",
          options: [
            "Only for hardware connections",
            "As providing services to distributed applications",
            "Solely for packet switching",
            "As a single protocol stack",
          ],
          correct: 1,
          translation: "كيف يُوصف الإنترنت كبنية تحتية؟",
          explanation:
            "كبنية تحتية بتقدّم خدمات لتطبيقات موزعة — ده الوصف الوظيفي (Services Description) للإنترنت.",
        },
        {
          q: "17. What are distributed applications?",
          options: [
            "Programs running on a single system",
            "Applications involving multiple end systems exchanging data",
            "Only server-based programs",
            "Hardware components",
          ],
          correct: 1,
          translation: "ما هي التطبيقات الموزعة؟",
          explanation:
            "تطبيقات بتشتغل على أنظمة طرفية متعددة وبتتبادل البيانات بينها — زي الويب، البريد، والبث المباشر.",
        },
        {
          q: "18. What interface do end systems use to deliver data over the Internet?",
          options: [
            "Packet switch interface",
            "Socket interface",
            "Router interface",
            "Link-layer interface",
          ],
          correct: 1,
          translation:
            "أي واجهة تستخدمها الأنظمة الطرفية لتوصيل البيانات عبر الإنترنت؟",
          explanation:
            "واجهة Socket — بتحدد كيف يطلب البرنامج من الإنترنت توصيل بياناته لبرنامج آخر على نظام طرفي بعيد.",
        },
        {
          q: "19. In a human protocol analogy, what initiates communication?",
          options: [
            "Asking for time directly",
            "Offering a greeting like 'Hi'",
            "Sending a packet",
            "Closing the connection",
          ],
          correct: 1,
          translation: "في تشبيه البروتوكول البشري، ما الذي يبدأ التواصل؟",
          explanation:
            "تقديم تحية زي 'Hi' — بداية الحوار. البروتوكولات البشرية والشبكية بتشترك في فكرة: تبادل رسائل بترتيب محدد.",
        },
        {
          q: "20. What defines a network protocol?",
          options: [
            "Hardware only",
            "Format and order of messages, plus actions on transmission/receipt",
            "Physical media",
            "End systems alone",
          ],
          correct: 1,
          translation: "ما الذي يعرّف بروتوكول الشبكة؟",
          explanation:
            "تنسيق الرسائل + ترتيبها + الإجراءات عند الإرسال/الاستقبال. ثلاث عناصر أساسية لأي بروتوكول.",
        },
        {
          q: "21. What are end systems also referred to as?",
          options: ["Routers", "Hosts", "Links", "Switches"],
          correct: 1,
          translation: "بماذا يُشار للأنظمة الطرفية أيضاً؟",
          explanation:
            "Hosts (المضيفون) — تسمية بديلة. مثال: Host = End System.",
        },
        {
          q: "22. How are hosts categorized?",
          options: [
            "Into links and switches",
            "Into clients and servers",
            "Into protocols and layers",
            "Into physical media",
          ],
          correct: 1,
          translation: "كيف تُصنّف المضيفون؟",
          explanation:
            "إلى Clients و Servers — العميل بيطلب الخدمة، والسيرفر بيقدمها. بعض المضيفين بيقوموا بالدورين.",
        },
        {
          q: "23. Where do most servers for search results and email reside today?",
          options: [
            "In homes",
            "In large data centers",
            "On mobile devices",
            "In access networks",
          ],
          correct: 1,
          translation: "أين توجد معظم سيرفرات البحث والبريد اليوم؟",
          explanation:
            "في مراكز بيانات ضخمة (Data Centers) — لأنها بتتطلب كهرباء وتبريد وأمن واتصال عالي السرعة.",
        },
        {
          q: "24. What is the access network?",
          options: [
            "The core of the Internet",
            "The network connecting an end system to the first router",
            "Only wireless connections",
            "Global transit links",
          ],
          correct: 1,
          translation: "ما هي شبكة الوصول؟",
          explanation:
            "الشبكة اللي بتربط النظام الطرفي بأول موجّه (Edge Router) على الطريق لأنظمة أخرى — المدخل للإنترنت.",
        },
        {
          q: "25. What are the two most prevalent broadband residential access types?",
          options: [
            "Ethernet and WiFi",
            "DSL and cable",
            "FTTH and 5G",
            "Satellite and radio",
          ],
          correct: 1,
          translation: "ما أكثر نوعين انتشاراً للوصول السكني عريض النطاق؟",
          explanation:
            "DSL (عبر خطوط الهاتف) و Cable (عبر البنية التحتية للتلفزيون الكابلي). الاثنان يستخدمان نفس البنية الموجودة.",
        },
        {
          q: "26. In DSL, what device is located in the telco's central office?",
          options: [
            "Cable modem",
            "DSLAM (Digital Subscriber Line Access Multiplexer)",
            "Router",
            "Switch",
          ],
          correct: 1,
          translation:
            "في DSL، ما الجهاز الموجود في المكتب المركزي لشركة الاتصالات؟",
          explanation:
            "DSLAM — بيفصل إشارات البيانات عن إشارات الهاتف وبيوجّه البيانات للإنترنت.",
        },
        {
          q: "27. How are data and telephone signals handled in DSL?",
          options: [
            "On separate lines",
            "Encoded at different frequencies on the same line",
            "Only digitally",
            "Via satellite",
          ],
          correct: 1,
          translation: "كيف تُعالَج إشارات البيانات والهاتف في DSL؟",
          explanation:
            "بترددات مختلفة على نفس الخط — البيانات على ترددات عالية، والهاتف على ترددات منخفضة. ده بيسمح باستخدام نفس السلك للاثنين.",
        },
        {
          q: "28. What is the typical range for DSL to work effectively?",
          options: ["1-2 miles", "5-10 miles", "20 miles", "Unlimited"],
          correct: 1,
          translation: "ما المدى النموذجي لعمل DSL بفعالية؟",
          explanation:
            "5-10 أميال (تقريباً 8-16 كم) من المكتب المركزي — كل ما بعُدت المسافة، ضعفت الإشارة وقلّت السرعة.",
        },
        {
          q: "29. What infrastructure does cable Internet use?",
          options: [
            "Telephone lines",
            "Cable television infrastructure",
            "Fiber optics only",
            "Wireless spectrum",
          ],
          correct: 1,
          translation: "ما البنية التحتية اللي بيستخدمها إنترنت الكابل؟",
          explanation:
            "البنية التحتية للتلفزيون الكابلي — نفس الكابلات المحورية الموجودة أصلاً في معظم المنازل.",
        },
        {
          q: "30. What is HFC in cable access?",
          options: [
            "High-frequency coax",
            "Hybrid fiber coax",
            "Home fiber connection",
            "High-speed fiber",
          ],
          correct: 1,
          translation: "ما هو HFC في الوصول بالكابل؟",
          explanation:
            "Hybrid Fiber Coax — مزيج من الألياف الضوئية (للأجزاء الرئيسية) والكابل المحوري (للأجزاء الطرفية).",
        },
        {
          q: "31. What device serves a similar function to DSLAM in cable networks?",
          options: [
            "DSL modem",
            "CMTS (Cable Modem Termination System)",
            "Router",
            "Switch",
          ],
          correct: 1,
          translation: "أي جهاز بيؤدي وظيفة مشابهة لـ DSLAM في شبكات الكابل؟",
          explanation:
            "CMTS — بيفصل وبيوجّه إشارات الإنترنت عن إشارات التلفزيون في شبكة الكابل.",
        },
        {
          q: "32. Why is cable Internet access shared?",
          options: [
            "It uses dedicated lines",
            "Every packet travels on shared links to all homes",
            "Only upstream is shared",
            "It is not shared",
          ],
          correct: 1,
          translation: "لماذا يُعتبر الوصول بالكابل مشتركاً؟",
          explanation:
            "لأن كل حزمة بتمر عبر روابط مشتركة لكل المنازل — لو الجيران بيستخدموا الإنترنت بكثافة، السرعة بتقل.",
        },
        {
          q: "33. What technology provides gigabit speeds directly to homes?",
          options: ["DSL", "Cable", "FTTH (Fiber to the Home)", "Ethernet"],
          correct: 2,
          translation: "أي تقنية بتوفّر سرعات جيجابت مباشرةً للمنازل؟",
          explanation:
            "FTTH — الألياف الضوئية لحد البيت. أسرع تقنية وصول منزلي حالياً، بتوصل لسرعات جيجابت.",
        },
        {
          q: "34. What is the simplest FTTH technology?",
          options: [
            "Hybrid fiber",
            "Direct fiber",
            "Coaxial fiber",
            "Wireless fiber",
          ],
          correct: 1,
          translation: "ما أبسط تقنية FTTH؟",
          explanation:
            "Direct Fiber — ليف ضوئي مباشر من المكتب المركزي لكل بيت. أبسط تصميماً لكن الأغلى تكلفة.",
        },
        {
          q: "35. What is the most prevalent access technology in enterprises?",
          options: ["DSL", "Ethernet", "Cable", "Satellite"],
          correct: 1,
          translation: "ما أكثر تقنية وصول انتشاراً في المؤسسات؟",
          explanation:
            "Ethernet — الأشهر في الشركات والجامعات والمباني السكنية. سريع وموثوق وسهل الإدارة.",
        },
        {
          q: "36. What standard is WiFi based on?",
          options: ["IEEE 802.3", "IEEE 802.11", "IEEE 802.1", "IEEE 802.15"],
          correct: 1,
          translation: "على أي معيار يعتمد WiFi؟",
          explanation:
            "IEEE 802.11 — المعيار الرسمي لشبكات LAN اللاسلكية. 802.3 هو Ethernet، و 802.15 للـ Bluetooth.",
        },
        {
          q: "37. What is the range for a wireless LAN user from an access point?",
          options: [
            "A few meters",
            "A few tens of meters",
            "Kilometers",
            "Unlimited",
          ],
          correct: 1,
          translation: "ما مدى مستخدم شبكة LAN اللاسلكية من نقطة الوصول؟",
          explanation:
            "بضع عشرات من الأمتار — عشان كده WiFi مناسب للمنازل والمكاتب مش للتغطية الواسعة.",
        },
        {
          q: "38. What generation of wireless provides wide-area access up to tens of kilometers?",
          options: ["WiFi", "Ethernet", "3G, 4G, and 5G cellular", "FTTH"],
          correct: 2,
          translation:
            "أي جيل من الشبكات اللاسلكية بيوفّر وصولاً واسع النطاق يصل لعشرات الكيلومترات؟",
          explanation:
            "الجيل الثالث والرابع والخامس (3G/4G/5G) — تغطية خلوية واسعة، عكس WiFi المحدود بعشرات الأمتار.",
        },
        {
          q: "39. What are the two categories of physical media?",
          options: [
            "Wired and wireless",
            "Guided and unguided",
            "Copper and fiber",
            "Terrestrial and satellite",
          ],
          correct: 1,
          translation: "ما فئتا الوسائط الفيزيائية؟",
          explanation:
            "Guided (موجّه — كابلات) و Unguided (غير موجّه — موجات راديو، ضوء، إلخ). التقسيم حسب وجود مسار فيزيائي محدد.",
        },
        {
          q: "40. What is the most common guided medium for LANs?",
          options: [
            "Fiber optics",
            "Coaxial cable",
            "Twisted-pair copper wire",
            "Radio spectrum",
          ],
          correct: 2,
          translation: "ما أكثر وسط موجّه شيوعاً للشبكات المحلية (LANs)؟",
          explanation:
            "السلك النحاسي المجدول (Twisted-pair) — زي كابلات Cat5 و Cat6 المستخدمة في Ethernet.",
        },
        {
          q: "41. What breaks messages into packets?",
          options: ["Routers", "The source end system", "Switches", "Links"],
          correct: 1,
          translation: "ما الذي يقسّم الرسائل إلى حزم؟",
          explanation:
            "النظام الطرفي المصدر (Source End System) — بيقسّم الرسالة الطويلة لحزم صغيرة، كل حزمة بتمر عبر الشبكة.",
        },
        {
          q: "42. What is store-and-forward transmission?",
          options: [
            "Transmitting bits immediately",
            "Receiving the entire packet before forwarding",
            "Segmenting packets",
            "Queuing only",
          ],
          correct: 1,
          translation: "ما هو النقل تخزين-ثم-تمرير (Store-and-Forward)؟",
          explanation:
            "المبدل لازم يستقبل الحزمة كاملة قبل ما يبدأ يبعت أول بت منها على الرابط الصادر. أبسط آلية لتمرير الحزم.",
        },
        {
          q: "43. For a path with N links of rate R and packet length L, what is the end-to-end delay without other delays?",
          options: ["L/R", "N(L/R)", "(N-1)(L/R)", "2L/R"],
          correct: 2,
          translation:
            "لمسار به N روابط بمعدل R وطول الحزمة L، ما هو التأخير من طرف لطرف بدون تأخيرات أخرى؟",
          explanation:
            "(N-1)(L/R) — لأن أول حزمة بتتأخر بمقدار L/R على كل رابط، لكن النظام لا ينتظر الحزمة كاملة على الرابط الأخير. بالتالي N-1.",
        },
        {
          q: "44. What causes queuing delays?",
          options: [
            "Empty buffers",
            "Packets waiting in output buffers due to congestion",
            "Propagation speed",
            "Header addition",
          ],
          correct: 1,
          translation: "ما سبب تأخيرات الانتظار في الطابور؟",
          explanation:
            "حزم بتنتظر في مخرجات المخازن (Buffers) بسبب الازدحام — في أوقات الذروة، الحزم أكتر من قدرة الرابط.",
        },
        {
          q: "45. What happens when a queue is full?",
          options: [
            "Faster transmission",
            "Packet loss",
            "Automatic rerouting",
            "No effect",
          ],
          correct: 1,
          translation: "ماذا يحدث عندما يمتلئ الطابور؟",
          explanation:
            "فقدان الحزم (Packet Loss) — الحزمة الواصلة أو حزمة موجودة في الطابور بيتم إسقاطها. ده يعني إعادة إرسال = تأخير إضافي.",
        },
        {
          q: "46. How does a router determine where to forward a packet?",
          options: [
            "Using protocols",
            "Forwarding table based on destination address",
            "Randomly",
            "Via physical media",
          ],
          correct: 1,
          translation: "كيف يحدد الموجّه مكان تمرير الحزمة؟",
          explanation:
            "جدول التمرير (Forwarding Table) بناءً على عنوان الوجهة — كل حزمة بيتم فحص عنوانها وتوجيهها للرابط المناسب.",
        },
        {
          q: "47. What sets forwarding tables automatically?",
          options: [
            "End systems",
            "Routing protocols",
            "Applications",
            "Physical layer",
          ],
          correct: 1,
          translation: "ما الذي يضبط جداول التمرير تلقائياً؟",
          explanation:
            "بروتوكولات التوجيه (Routing Protocols) — بتحدّث جداول التمرير تلقائياً حسب حالة الشبكة.",
        },
        {
          q: "48. In circuit switching, what is reserved for a session?",
          options: [
            "Packets",
            "Resources like buffers and link rates",
            "Messages",
            "Headers",
          ],
          correct: 1,
          translation: "في تبديل الدوائر، ما الذي يُحجز للجلسة؟",
          explanation:
            "الموارد زي المخازن ومعدلات الروابط — محجوزة طوال مدة الجلسة، حتى لو مفيش بيانات بتُرسَل.",
        },
        {
          q: "49. What are the two multiplexing methods in circuit switching?",
          options: [
            "Packet and message",
            "FDM and TDM",
            "Store-and-forward",
            "Queuing and propagation",
          ],
          correct: 1,
          translation: "ما طريقتي التقسيم المتعدد في تبديل الدوائر؟",
          explanation:
            "FDM (تقسيم الترددات) و TDM (تقسيم الزمن) — الاثنان بيسمحوا بمشاركة الرابط بين عدة جلسات.",
        },
        {
          q: "50. Why is packet switching better for sharing capacity?",
          options: [
            "It reserves resources",
            "It allows better sharing than circuit switching",
            "It has fixed delays",
            "No queuing",
          ],
          correct: 1,
          translation: "لماذا تبديل الحزم أفضل لمشاركة السعة؟",
          explanation:
            "بيسمح بمشاركة أفضل من تبديل الدوائر — الموارد بتُستخدم عند الطلب، مش محجوزة لفترة كاملة.",
        },
        {
          q: "51. What trend is seen in telecommunication networks?",
          options: [
            "Toward circuit switching",
            "Toward packet switching",
            "Away from multiplexing",
            "To proprietary networks",
          ],
          correct: 1,
          translation: "ما الاتجاه السائد في شبكات الاتصالات؟",
          explanation:
            "نحو تبديل الحزم — حتى الشبكات التقليدية (زي الهاتف) بقت تتحول لـ VoIP (صوت عبر IP).",
        },
        {
          q: "52. In Network Structure 1, how are access ISPs interconnected?",
          options: [
            "Directly to each other",
            "Via a single global transit ISP",
            "Through end systems",
            "Without interconnection",
          ],
          correct: 1,
          translation: "في بنية الشبكة 1، كيف تت互联 مزوّدو الوصول؟",
          explanation:
            "عبر ISP عالمي واحد للنقل — أبسط هيكل ممكن: كل مزوّدي الوصول بيتصلوا بمزوّد عالمي واحد.",
        },
        {
          q: "53. What is a customer-provider relationship in ISPs?",
          options: [
            "Free peering",
            "Access ISP pays the global ISP",
            "Equal sharing",
            "No payment",
          ],
          correct: 1,
          translation: "ما علاقة العميل-المزوّد بين مزوّدي الخدمة؟",
          explanation:
            "مزوّد الوصول (العميل) بيدفع للمزوّد العالمي — مقابل خدمة النقل. دي علاقة تجارية هرمية.",
        },
        {
          q: "54. What does Network Structure 2 add?",
          options: [
            "Single ISP",
            "Multiple competing global transit ISPs",
            "Only access ISPs",
            "End systems",
          ],
          correct: 1,
          translation: "ما الذي تضيفه بنية الشبكة 2؟",
          explanation:
            "عدة مزوّدين عالميين متنافسين — مزوّدو الوصول بقى لهم خيارات، والمنافسة بتحسّن الأسعار والخدمة.",
        },
        {
          q: "55. What are tier-1 ISPs?",
          options: [
            "Local access providers",
            "Global ISPs with presence not in every city",
            "Only regional",
            "Home networks",
          ],
          correct: 1,
          translation: "ما هي مزوّدات الطبقة الأولى (Tier-1)؟",
          explanation:
            "مزوّدون عالميون بحضور واسع لكن مش في كل مدينة — بيمثلوا قمة الهرم، مش بيدفعوا لحد.",
        },
        {
          q: "56. In Network Structure 3, what connects access ISPs in a region?",
          options: [
            "Global ISPs directly",
            "Regional ISPs that connect to tier-1",
            "Peering points",
            "Content providers",
          ],
          correct: 1,
          translation:
            "في بنية الشبكة 3، ما الذي يربط مزوّدي الوصول في المنطقة؟",
          explanation:
            "مزوّدو خدمة إقليميون بيتصلوا بـ Tier-1 — طبقة وسيطة بين الوصول والمستوى العالمي.",
        },
        {
          q: "57. What is a PoP?",
          options: [
            "Point of presence for customer connections",
            "Protocol over protocol",
            "Packet of packets",
            "Point of peering",
          ],
          correct: 0,
          translation: "ما هو PoP؟",
          explanation:
            "نقطة حضور (Point of Presence) — مجموعة من الموجّهات في شبكة المزوّد حيث يمكن لمزوّدي الوصول الاتصال.",
        },
        {
          q: "58. What is multi-homing?",
          options: [
            "Connecting to one ISP",
            "Connecting to two or more provider ISPs",
            "Single link use",
            "No redundancy",
          ],
          correct: 1,
          translation: "ما هو Multi-homing؟",
          explanation:
            "الاتصال بأكثر من مزوّد — بيدي مرونة واستمرارية في الخدمة لو حصل عطل عند مزوّد واحد.",
        },
        {
          q: "59. What is peering between ISPs?",
          options: [
            "Payment-based connection",
            "Direct, settlement-free connection",
            "Through tier-1 only",
            "Via end systems",
          ],
          correct: 1,
          translation: "ما هو الـ Peering بين مزوّدي الخدمة؟",
          explanation:
            "اتصال مباشر بدون مقابل مالي (settlement-free) — بيسمح بتبادل الترافيك بدون وسيط مدفوع.",
        },
        {
          q: "60. What is an IXP?",
          options: [
            "Internet exchange point for peering",
            "ISP expansion protocol",
            "Internal exchange protocol",
            "Internet xylem point",
          ],
          correct: 0,
          translation: "ما هو IXP؟",
          explanation:
            "نقطة تبادل إنترنت (Internet Exchange Point) — مكان بيتجمع فيه عدة مزوّدين للـ Peering.",
        },
        {
          q: "61. What does Network Structure 5 add?",
          options: [
            "Only access ISPs",
            "Content-provider networks like Google",
            "More regional ISPs",
            "End systems",
          ],
          correct: 1,
          translation: "ما الذي تضيفه بنية الشبكة 5؟",
          explanation:
            "شبكات مزوّدي المحتوى (زي Google و Netflix) — بقت لاعبين رئيسيين في بنية الإنترنت الحديثة.",
        },
        {
          q: "62. How does Google bypass upper tiers?",
          options: [
            "Using public Internet only",
            "Peering with lower-tier ISPs and IXPs",
            "Paying all tier-1",
            "No bypassing",
          ],
          correct: 1,
          translation: "كيف تتجاوز Google الطبقات العليا؟",
          explanation:
            "بالـ Peering مع مزوّدي المستوى الأدنى والاتصال عند IXPs — بيوفر تكلفة نقل وبيحسّن الأداء.",
        },
        {
          q: "63. What is twisted-pair copper wire used for?",
          options: [
            "Long-haul only",
            "LANs and residential access",
            "Satellite links",
            "Optical pulses",
          ],
          correct: 1,
          translation: "فيما يُستخدم السلك النحاسي المجدول؟",
          explanation:
            "شبكات LAN والوصول السكني — الأرخص والأكثر انتشاراً، لكنه أقل جودة من الألياف للمسافات البعيدة.",
        },
        {
          q: "64. What achieves data rates up to 10 Gbps over 100 meters?",
          options: [
            "Coaxial cable",
            "Category 6a twisted-pair",
            "Radio channels",
            "Satellite",
          ],
          correct: 1,
          translation:
            "ما الذي يحقق معدلات بيانات تصل إلى 10 Gbps عبر 100 متر؟",
          explanation:
            "كابل Cat 6a المجدول — نسخة متقدمة من الكابلات المجدولة، بتوصل لسرعات عالية لمسافات قصيرة.",
        },
        {
          q: "65. What is fiber optics preferred for?",
          options: [
            "Short-haul LANs",
            "Long-haul transmission",
            "Wireless",
            "Low bit rates",
          ],
          correct: 1,
          translation: "فيما تُفضَّل الألياف الضوئية؟",
          explanation:
            "النقل لمسافات طويلة (Long-haul) — بسبب انخفاض التوهين ومقاومة التداخل الكهرومغناطيسي.",
        },

        // ═══════════════════════════════════════════════════════
        // Essay (1-59, 128-134)
        // ═══════════════════════════════════════════════════════
        {
          type: "essay",
          q: "1. What are the two principal ways to describe the Internet?",
          translation: "ما الطريقتان الرئيسيتان لوصف الإنترنت؟",
          answer:
            "1. A nuts-and-bolts description of its hardware and software components.\n" +
            "2. A services description as an infrastructure that provides services to distributed applications.",
        },
        {
          type: "essay",
          q: "2. In Internet jargon, what are the billions of computing devices connected to the Internet called?",
          translation:
            "في مصطلحات الإنترنت، ماذا يُسمى مليارات أجهزة الحوسبة المتصلة بالإنترنت؟",
          answer: "Hosts or end systems.",
        },
        {
          type: "essay",
          q: "3. What are the two most prominent types of packet switches in today's Internet?",
          translation: "ما أبرز نوعين لمبدلات الحزم في الإنترنت اليوم؟",
          answer: "Routers and link-layer switches.",
        },
        {
          type: "essay",
          q: "4. What is the name for the sequence of communication links and packet switches traversed by a packet from sender to receiver?",
          translation:
            "ما اسم تتابع روابط الاتصال ومبدلات الحزم الذي تمر به الحزمة من المُرسِل للمستقبِل؟",
          answer: "A route or path.",
        },
        {
          type: "essay",
          q: "5. Through what do end systems access the Internet?",
          translation: "من خلال ماذا تصل الأنظمة الطرفية بالإنترنت؟",
          answer: "Internet Service Providers (ISPs).",
        },
        {
          type: "essay",
          q: "6. What is the collective name for the Internet's principal protocols?",
          translation: "ما الاسم الجماعي للبروتوكولات الرئيسية للإنترنت؟",
          answer: "TCP/IP.",
        },
        {
          type: "essay",
          q: "7. Which organization develops Internet standards, and what are its documents called?",
          translation: "أي منظمة تطوّر معايير الإنترنت، وماذا تُسمى وثائقها؟",
          answer:
            "The Internet Engineering Task Force (IETF). Its documents are called Requests for Comments (RFCs).",
        },
        {
          type: "essay",
          q: "8. Which committee specifies standards for Ethernet and WiFi?",
          translation: "أي لجنة تضع معايير Ethernet و WiFi؟",
          answer: "The IEEE 802 LAN Standards Committee.",
        },
        {
          type: "essay",
          q: "9. From a services perspective, the Internet is an infrastructure that provides services to what?",
          translation:
            "من منظور الخدمات، الإنترنت بنية تحتية بتقدم خدمات لماذا؟",
          answer: "Distributed applications.",
        },
        {
          type: "essay",
          q: "10. Where do Internet applications run?",
          translation: "أين تعمل تطبيقات الإنترنت؟",
          answer:
            "On end systems (hosts), not in the packet switches in the network core.",
        },
        {
          type: "essay",
          q: "11. What is the name of the interface that specifies how a program asks the Internet to deliver data to a destination program on another end system?",
          translation:
            "ما اسم الواجهة التي تحدد كيف يطلب برنامج من الإنترنت توصيل بياناته لبرنامج آخر على نظام طرفي بعيد؟",
          answer: "The socket interface.",
        },
        {
          type: "essay",
          q: "12. Using a human analogy for a protocol, what might a response of 'Don't bother me!' to a 'Hi' indicate?",
          translation:
            "باستخدام تشبيه بشري للبروتوكول، ماذا يعني رد 'لا تزعجني!' على 'Hi'؟",
          answer: "An unwillingness or inability to communicate.",
        },
        {
          type: "essay",
          q: "13. What three things does a network protocol define?",
          translation: "ما الثلاثة أشياء التي يعرّفها بروتوكول الشبكة؟",
          answer:
            "The format, the order of messages exchanged, and the actions taken on the transmission/receipt of a message or other event.",
        },
        {
          type: "essay",
          q: "14. What are the components located at the edge of the Internet called?",
          translation: "ماذا يُسمى المكونات الموجودة عند حافة الإنترنت؟",
          answer: "End systems or hosts.",
        },
        {
          type: "essay",
          q: "15. What is the equation given for hosts and end systems?",
          translation: "ما المعادلة المعطاة للمضيفين والأنظمة الطرفية؟",
          answer: "Host = End system.",
        },
        {
          type: "essay",
          q: "16. Into what two categories are hosts sometimes divided?",
          translation: "إلى أي فئتين يُصنَّف المضيفون أحياناً؟",
          answer: "Clients and servers.",
        },
        {
          type: "essay",
          q: "17. Where do many of the servers we use today reside?",
          translation: "أين توجد كثير من السيرفرات التي نستخدمها اليوم؟",
          answer: "In large data centers.",
        },
        {
          type: "essay",
          q: "18. What is the access network?",
          translation: "ما هي شبكة الوصول؟",
          answer:
            "The network that physically connects an end system to the first router (edge router) on a path to other end systems.",
        },
        {
          type: "essay",
          q: "19. What are the two most prevalent types of broadband residential access discussed?",
          translation:
            "ما أكثر نوعين انتشاراً للوصول السكني عريض النطاق المذكورَين؟",
          answer: "Digital Subscriber Line (DSL) and cable.",
        },
        {
          type: "essay",
          q: "20. What does a DSLAM do?",
          translation: "ماذا يفعل DSLAM؟",
          answer:
            "A Digital Subscriber Line Access Multiplexer (DSLAM) located in the telco's central office separates data and phone signals and sends data into the Internet.",
        },
        {
          type: "essay",
          q: "21. What does HFC stand for, and what two types of cable does it use?",
          translation: "ما اختصار HFC، وما نوعا الكابلات المستخدَمان فيه؟",
          answer: "Hybrid Fiber Coax. It uses fiber optics and coaxial cable.",
        },
        {
          type: "essay",
          q: "22. What is the device at the cable head end that serves a similar function to a DSLAM?",
          translation:
            "ما الجهاز في رأس شبكة الكابل الذي يؤدي وظيفة مشابهة لـ DSLAM؟",
          answer: "The Cable Modem Termination System (CMTS).",
        },
        {
          type: "essay",
          q: "23. Why is cable Internet access considered a shared broadcast medium?",
          translation: "لماذا يُعتبر الوصول بالكابل وسط بث مشترك؟",
          answer:
            "Because every packet sent by the head end travels downstream on every link to every home.",
        },
        {
          type: "essay",
          q: "24. What does FTTH stand for?",
          translation: "ما اختصار FTTH؟",
          answer: "Fiber To The Home.",
        },
        {
          type: "essay",
          q: "25. What is the dominant wired access technology in corporate, university, and home LANs?",
          translation:
            "ما تقنية الوصول السلكي السائدة في شبكات LAN للشركات والجامعات والمنازل؟",
          answer: "Ethernet.",
        },
        {
          type: "essay",
          q: "26. What is the common name for IEEE 802.11 wireless LAN technology?",
          translation: "ما الاسم الشائع لتقنية IEEE 802.11 اللاسلكية؟",
          answer: "WiFi.",
        },
        {
          type: "essay",
          q: "27. Compared to WiFi, what is the typical range for a user from a cellular base station?",
          translation:
            "مقارنةً بـ WiFi، ما المدى النموذجي للمستخدم من محطة الخلية الأساسية؟",
          answer:
            "A user need only be within a few tens of kilometers (as opposed to a few tens of meters for WiFi).",
        },
        {
          type: "essay",
          q: "28. What are the two categories of physical media?",
          translation: "ما فئتا الوسائط الفيزيائية؟",
          answer: "Guided media and unguided media.",
        },
        {
          type: "essay",
          q: "29. What is the least expensive and most commonly used guided transmission medium?",
          translation: "ما أقل الوسائط الموجّهة تكلفةً وأكثرها استخداماً؟",
          answer: "Twisted-pair copper wire.",
        },
        {
          type: "essay",
          q: "30. What is a key characteristic of coaxial cable that allows it to achieve high data rates?",
          translation:
            "ما السمة الرئيسية للكابل المحوري التي تسمح بتحقيق معدلات بيانات عالية؟",
          answer:
            "Its construction with two concentric conductors, special insulation, and shielding.",
        },
        {
          type: "essay",
          q: "31. What are three advantages of fiber optics as a transmission medium?",
          translation: "ما ثلاثة مزايا للألياف الضوئية كوسط نقل؟",
          answer:
            "It can support tremendous bit rates, is immune to electromagnetic interference, and has very low signal attenuation.",
        },
        {
          type: "essay",
          q: "32. What is a key reason fiber optics is not yet prevalent for short-haul transport like LANs?",
          translation:
            "ما السبب الرئيسي لعدم انتشار الألياف الضوئية في النقل قصير المدى زي LANs؟",
          answer:
            "The high cost of optical devices like transmitters, receivers, and switches.",
        },
        {
          type: "essay",
          q: "33. What are the three broad groups of terrestrial radio channels based on distance?",
          translation:
            "ما المجموعات الثلاث العريضة لقنوات الراديو الأرضية بناءً على المسافة؟",
          answer:
            "Those that operate over very short distances, in local areas, and in wide areas.",
        },
        {
          type: "essay",
          q: "34. What are the two types of satellites used in communications?",
          translation: "ما نوعا الأقمار الصناعية المستخدَمان في الاتصالات؟",
          answer:
            "Geostationary satellites and low-earth orbiting (LEO) satellites.",
        },
        {
          type: "essay",
          q: "35. What is a significant disadvantage of geostationary satellites?",
          translation:
            "ما العيب الكبير للأقمار الصناعية الثابتة بالنسبة للأرض؟",
          answer:
            "They introduce a substantial signal propagation delay of about 280 milliseconds due to their high altitude.",
        },
        {
          type: "essay",
          q: "36. What are the two fundamental approaches to moving data through a network?",
          translation: "ما المقاربتان الأساسيتان لنقل البيانات عبر الشبكة؟",
          answer: "Circuit switching and packet switching.",
        },
        {
          type: "essay",
          q: "37. In a network application, what do end systems exchange?",
          translation: "في تطبيق شبكي، ماذا تتبادل الأنظمة الطرفية؟",
          answer: "Messages.",
        },
        {
          type: "essay",
          q: "38. What are the smaller chunks of data that a long message is broken into called?",
          translation:
            "ماذا تُسمى الأجزاء الأصغر من البيانات التي تُقسَّم إليها رسالة طويلة؟",
          answer: "Packets.",
        },
        {
          type: "essay",
          q: "39. What does 'store-and-forward transmission' mean?",
          translation: "ماذا يعني 'النقل تخزين-ثم-تمرير'؟",
          answer:
            "The packet switch must receive the entire packet before it can begin to transmit the first bit of the packet onto the outbound link.",
        },
        {
          type: "essay",
          q: "40. In a simple two-end-system, one-router example, if a packet is L bits long and the link rate is R bits/sec, what is the total delay to get the packet to the destination?",
          translation:
            "في مثال بسيط بنظامين طرفيين وموجّه واحد، لو الحزمة طولها L بت ومعدل الرابط R بت/ث، ما التأخير الكلي لإيصال الحزمة للوجهة؟",
          answer: "2L/R seconds.",
        },
        {
          type: "essay",
          q: "41. For a path with N links, each of rate R, what is the end-to-end delay for one packet?",
          translation:
            "لمسار به N روابط، كل منها بمعدل R، ما التأخير من طرف لطرف لحزمة واحدة؟",
          answer:
            "N × (L / R) seconds (assuming only store-and-forward delay).",
        },
        {
          type: "essay",
          q: "42. What is the purpose of an output buffer (output queue) in a packet switch?",
          translation: "ما الغرض من المخزن الناتج (طابور الخرج) في مبدل الحزم؟",
          answer:
            "To store packets that the router is about to send into a link when that link is busy.",
        },
        {
          type: "essay",
          q: "43. What is the variable delay that packets suffer in addition to store-and-forward delays?",
          translation:
            "ما التأخير المتغير الذي تعانيه الحزم بالإضافة لتأخيرات التخزين والتمرير؟",
          answer: "Queuing delays.",
        },
        {
          type: "essay",
          q: "44. What happens if an arriving packet finds the output buffer full?",
          translation: "ماذا يحدث لو وصلت حزمة ولقت المخزن الناتج ممتلئ؟",
          answer:
            "Packet loss occurs—either the arriving packet or one of the already-queued packets is dropped.",
        },
        {
          type: "essay",
          q: "45. How does a router determine which outbound link to forward a packet onto?",
          translation: "كيف يحدد الموجّه أي رابط صادر لتمرير الحزمة عليه؟",
          answer:
            "It examines the packet's destination address and searches its forwarding table to find the appropriate outbound link.",
        },
        {
          type: "essay",
          q: "46. What are the special protocols used to automatically set forwarding tables called?",
          translation:
            "ماذا تُسمى البروتوكولات الخاصة المستخدمة لضبط جداول التمرير تلقائياً؟",
          answer: "Routing protocols.",
        },
        {
          type: "essay",
          q: "47. In circuit switching, what is reserved for the duration of a communication session?",
          translation: "في تبديل الدوائر، ما الذي يُحجز طوال مدة جلسة الاتصال؟",
          answer:
            "The resources needed along the path (buffers, link transmission rate).",
        },
        {
          type: "essay",
          q: "48. What are the two fundamental approaches to multiplexing a circuit in a link?",
          translation: "ما المقاربتان الأساسيتان لتقسيم الدائرة في الرابط؟",
          answer:
            "Frequency-division multiplexing (FDM) and time-division multiplexing (TDM).",
        },
        {
          type: "essay",
          q: "49. What is the main criticism of packet switching regarding real-time services?",
          translation:
            "ما الانتقاد الرئيسي لتبديل الحزم بخصوص الخدمات الفورية؟",
          answer: "Its variable and unpredictable end-to-end delays.",
        },
        {
          type: "essay",
          q: "50. What are two arguments made by proponents of packet switching?",
          translation: "ما الحجتان اللتان يطرحهما مؤيدو تبديل الحزم؟",
          answer:
            "1. It offers better sharing of transmission capacity.\n" +
            "2. It is simpler, more efficient, and less costly to implement.",
        },
        {
          type: "essay",
          q: "51. What is the overarching goal of interconnecting access ISPs?",
          translation: "ما الهدف الشامل من ربط مزوّدي الوصول ببعضهم؟",
          answer: "So that all end systems can send packets to each other.",
        },
        {
          type: "essay",
          q: "52. Why is directly connecting every access ISP to every other access ISP not a practical solution?",
          translation:
            "لماذا الربط المباشر بين كل مزوّدي الوصول ببعضهم غير عملي؟",
          answer:
            "It is much too costly, as it would require each access ISP to have a separate communication link to every other access ISP in the world.",
        },
        {
          type: "essay",
          q: "53. In a simple network structure (Structure 1), what interconnects all access ISPs?",
          translation:
            "في بنية الشبكة البسيطة (1)، ما الذي يربط كل مزوّدي الوصول؟",
          answer: "A single global transit ISP.",
        },
        {
          type: "essay",
          q: "54. In the hierarchy of ISPs, what are the approximately dozen very large ISPs called?",
          translation:
            "في التسلسل الهرمي لمزوّدي الخدمة، ماذا يُسمى العدد التقريبي (دستة) من كبار المزوّدين جداً؟",
          answer: "Tier-1 ISPs.",
        },
        {
          type: "essay",
          q: "55. What does it mean for an ISP to multi-home?",
          translation: "ماذا يعني أن يقوم مزوّد الخدمة بالـ Multi-homing؟",
          answer: "To connect to two or more provider ISPs.",
        },
        {
          type: "essay",
          q: "56. What is the primary benefit of multi-homing?",
          translation: "ما الفائدة الأساسية للـ Multi-homing؟",
          answer:
            "It allows an ISP to continue sending and receiving packets even if one of its providers has a failure.",
        },
        {
          type: "essay",
          q: "57. What does it mean for two ISPs to peer?",
          translation: "ماذا يعني أن يقوم مزوّدان بالـ Peering؟",
          answer:
            "They can directly connect their networks so that traffic between them passes over the direct connection rather than through upstream intermediaries.",
        },
        {
          type: "essay",
          q: "58. What is an IXP?",
          translation: "ما هو IXP؟",
          answer:
            "An Internet Exchange Point (IXP) is a meeting point where multiple ISPs can peer together.",
        },
        {
          type: "essay",
          q: "59. What is a key characteristic of content-provider networks like Google's?",
          translation: "ما السمة الرئيسية لشبكات مزوّدي المحتوى زي Google؟",
          answer:
            "They often use their own private networks to bypass upper tiers by peering with lower-tier ISPs and connecting at IXPs, while also connecting to tier-1 ISPs for reach.",
        },
        {
          type: "essay",
          q: "128. What is the fundamental difference between how resources are managed in packet switching versus circuit switching?",
          translation:
            "ما الفرق الجوهري في إدارة الموارد بين تبديل الحزم وتبديل الدوائر؟",
          answer:
            "In packet switching, resources are not reserved; they are used on demand, which can lead to congestion. In circuit switching, resources are reserved for the entire duration of the session.",
        },
        {
          type: "essay",
          q: "129. Why is packet switching considered more efficient for bursty data traffic?",
          translation:
            "لماذا يُعتبر تبديل الحزم أكثر كفاءةً لترافيك البيانات المتقطع (Bursty)؟",
          answer:
            "Because it allows multiple data flows to share the same links and switches statistically, rather than dedicating a fixed share of resources to a single flow that may be idle at times.",
        },
        {
          type: "essay",
          q: "130. How does the concept of 'statistical multiplexing' relate to packet switching?",
          translation: "كيف يرتبط مفهوم 'التقسيم الإحصائي' بتبديل الحزم؟",
          answer:
            "Statistical multiplexing is the core principle of packet switching, where packets from different sources are interleaved over a shared link, without a guaranteed reservation of bandwidth for any single source.",
        },
        {
          type: "essay",
          q: "131. What is the relationship between a host, an end system, and a server?",
          translation: "ما العلاقة بين المضيف والنظام الطرفي والسيرفر؟",
          answer:
            "A host is the same as an end system. A server is a type of host that typically provides a service (e.g., a web server). Not all hosts are servers; some are clients.",
        },
        {
          type: "essay",
          q: "133. In the context of access networks, what does 'asymmetric' mean?",
          translation:
            "في سياق شبكات الوصول، ماذا يعني 'غير متماثل' (Asymmetric)؟",
          answer:
            "The downstream transmission rate (from the ISP to the home) is typically much higher than the upstream rate (from the home to the ISP).",
        },
        {
          type: "essay",
          q: "134. How does a router differ from a link-layer switch in terms of the layers they implement?",
          translation:
            "كيف يختلف الموجّه عن مبدل طبقة الوصلة من ناحية الطبقات التي ينفذها؟",
          answer:
            "A router implements layers 1-3 (Physical, Link, Network) and can forward packets based on IP addresses. A link-layer switch implements only layers 1-2 (Physical, Link) and forwards frames based on MAC addresses.",
        },
      ],
    },
    {
      t: "المحاضرة الثانية",
      d: "تبديل الدوائر (Circuit Switching)، بنية شبكة الشبكات (Network of Networks)، وتحليل أداء الشبكات (أنواع التأخير العُقدي، كثافة الحركة La/R، وفقدان الحزم).",
      pdf: "Computer Networks/lectures/lec 2/Ch01 - Computer Networks - Lec 02.pdf",
      pdf2: "Computer Networks/Questions/Questions on each lecture/Chapter 1 - Questions - Computer Networks.pdf",
      linkCategories: [
        {
          category: "فيديوهات عربية",
          icon: "🇪🇬",
          description:
            "شروحات باللغة العربية لمفاهيم المحاضرة الثانية: تبديل الدوائر مقابل تبديل الحزم، بنية الإنترنت الهرمية، وحسابات التأخير العُقدي.",
          links: [
            {
              t: "شبكات الحاسوب - A Top-Down Approach (الكتاب نفسه)",
              d: "شرح عربي تفصيلي لكتاب Kurose & Ross: تبديل الدوائر FDM/TDM، هيكلية شبكة الشبكات (Tier-1, IXPs, Content Providers)، ومعادلات حساب Delays و Traffic Intensity  فديوهات (من 4 الي 5) ",
              icon: "🇪🇬",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://www.youtube.com/playlist?list=PL8v_bZALWLKE9Lo2BIy8nsdsakbSvQlEo",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "شبكات الحاسوب - A Top-Down Approach (الكتاب نفسه)",
              d: "شرح عربي لكتاب Kurose & Ross: يتناول الـ Network Core (مقارنة Packet Switching vs Circuit Switching، وهيكل A Network of Networks)، بالإضافة إلى أنواع التأخير في الشبكات (Overview of Delay in Packet-Switched Networks). [فيديوهات 3-4 | من دقيقة 23:20 في فيديو 3]",
              icon: "🇪🇬",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://youtube.com/playlist?list=PLYljoJMAPFLHrCVfzuMLkJOZHhCgfSXG-&si=c2A3_89g912REXOZ",
                  type: "view",
                  color: "red",
                },
              ],
            },
          ],
        },
        {
          category: "فيديوهات عالمية",
          icon: "🌍",
          description:
            "المحاضرات الرسمية المحددة بدقة من مؤلف الكتاب Jim Kurose والمطابقة لموضوعات المحاضرة الثانية",
          links: [
            {
              t: "Jim Kurose - Section 1.3: The Network Core",
              d: "الشرح المباشر لمؤلف الكتاب للفصل 1.3: Circuit Switching vs Packet Switching، التعدد FDM/TDM، وبنية شبكة الشبكات Network of Networks (مطابق لصفحات 1-22 من الملف)",
              icon: "🌍",
              actions: [
                {
                  label: "📖 Playlist كامل",
                  url: "https://www.youtube.com/playlist?list=PL1ya5dD_M8uX-BLUF1FEvUNsYWQL5_l0O",
                  type: "view",
                  color: "red",
                },
                {
                  label: "🎬 المحاضرة 1.3 مباشرة (Network Core)",
                  url: "https://www.youtube.com/watch?v=f1nUcCdQJ8Y",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "Jim Kurose - Section 1.4: Performance (Delay, Loss, Throughput)",
              d: "الشرح المباشر لمؤلف الكتاب للفصل 1.4: معادلات التأخير العُقدي d_proc, d_queue, d_trans, d_prop، كثافة الحركة Traffic Intensity La/R، وفقدان الحزم وأداة Traceroute (مطابق لصفحات 23-40 من الملف)",
              icon: "🌍",
              actions: [
                {
                  label: "🎬 المحاضرة 1.4 مباشرة (Performance)",
                  url: "https://www.youtube.com/watch?v=hm1y4LsphQQ",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "Neso Academy - Delays and Circuit Switching",
              d: "شرح أكاديمي شامل لحسابات Transmission Delay vs Propagation Delay وهيكلية Circuit Switches",
              icon: "🌍",
              actions: [
                {
                  label: "📖 الشرح",
                  url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgneraVKkEXrwyLVx2vJUvt",
                  type: "view",
                  color: "red",
                },
              ],
            },
          ],
        },
        {
          category: "مواقع ومراجع",
          icon: "📚",
          description:
            "مراجع أكاديمية وتطبيقية متوافقة مع مفاهيم تبديل الدوائر وتأخير الحزم",
          links: [
            {
              t: "Kurose & Ross Official Student Resources",
              d: "الموقع الرسمي للكتاب: شرائح PowerPoint للمحاضرة الثانية، تمارين Wireshark Labs، وتمارين مراجعة تفاعلية",
              icon: "📚",
              actions: [
                {
                  label: "🌐 فتح الموقع",
                  url: "https://gaia.cs.umass.edu/kurose_ross/",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "GeeksforGeeks - Circuit Switching in Computer Network",
              d: "مقالة مرجعية تشرح FDM و TDM والمراحل الثلاث لتبديل الدوائر (Establishment, Data Transfer, Disconnection)",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح المقال",
                  url: "https://www.geeksforgeeks.org/computer-networks/circuit-switching-in-computer-network/",
                  type: "view",
                  color: "green",
                },
              ],
            },
            {
              t: "GeeksforGeeks - Transmission Delay vs Propagation Delay",
              d: "مقارنة رياضية وشاملة بين تأخير الإرسال L/R وتأخير الانتشار d/s مع أمثلة محلولة وطبيعة وسائط النقل",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح المقال",
                  url: "https://www.geeksforgeeks.org/electronics-engineering/propagation-delay/",
                  type: "view",
                  color: "green",
                },
              ],
            },
          ],
        },
        {
          category: "أدوات ومحاكاة",
          icon: "🔧",
          description:
            "أدوات تفاعلية لحساب التأخير وتشخيص المسارات الشبكية الحية",
          links: [
            {
              t: "Kurose & Ross Interactive Delay & Queuing Problems",
              d: "تمارين تفاعلية رسمية لحساب Queuing Delay، Traffic Intensity La/R، والتأخير الكلي بين الطرفيات End-to-End Delay",
              icon: "🔧",
              actions: [
                {
                  label: "🚀 فتح التمارين",
                  url: "https://gaia.cs.umass.edu/kurose_ross/interactive/",
                  type: "view",
                  color: "orange",
                },
              ],
            },
            {
              t: "Wireshark - Packet Analyzer & Traceroute",
              d: "أداة تتبع الحزم وتجربة قياس أزمنة التأخير بين المحطات عبر أداة Traceroute التشخيصية",
              icon: "🔧",
              actions: [
                {
                  label: "⭳ تحميل الأداة",
                  url: "https://www.wireshark.org/",
                  type: "download",
                  color: "blue",
                },
              ],
            },
          ],
        },
      ],
      // ═══════════════════════════════════════════════════════════════════
      //  مادة: Computer Networks — شبكات الحاسوب
      //  المسار: datenew/networks/networks.js → lectures[1].questions
      //  المرجع: Kurose & Ross — Top-Down Approach (Sections 1.3.2, 1.3.3, 1.4)
      // ═══════════════════════════════════════════════════════════════════

      questions: [
        // ═══════════════════════════════════════════════════════
        // القسم 1: تبديل الدوائر والحزم (Circuit vs Packet Switching)
        // ═══════════════════════════════════════════════════════
        {
          q: "What are the two fundamental approaches to moving data through a network of links and switches?",
          options: [
            "Circuit switching and packet switching",
            "Analog and digital switching",
            "Wired and wireless switching",
            "Synchronous and asynchronous switching",
          ],
          correct: 0,
          translation:
            "ما المقاربتان الأساسيتان لنقل البيانات عبر شبكة من الروابط والمبدلات؟",
          explanation:
            "تبديل الدوائر (Circuit Switching) وتبديل الحزم (Packet Switching) — الفرق الأساسي في هل الموارد محجوزة مسبقاً أم لا.",
          tags: ["Circuit Switching", "Packet Switching"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "In circuit-switched networks, what is reserved for the duration of the communication session?",
          options: [
            "Only the buffers",
            "Only the link transmission rate",
            "The resources needed along a path (buffers, link transmission rate)",
            "Nothing is reserved",
          ],
          correct: 2,
          translation:
            "في شبكات تبديل الدوائر، ما الذي يُحجز طوال مدة جلسة الاتصال؟",
          explanation:
            "الموارد المطلوبة على طول المسار (المخازن + معدل نقل الروابط) — محجوزة كاملة للمستخدم مهما كان الاستخدام.",
          tags: ["Circuit Switching", "Resource Reservation"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "In packet-switched networks, resources are:",
          options: [
            "Reserved for the entire session",
            "Not reserved",
            "Reserved only for real-time services",
            "Reserved only for voice calls",
          ],
          correct: 1,
          translation: "في شبكات تبديل الحزم، الموارد:",
          explanation:
            "غير محجوزة — بتُستخدم عند الطلب. ده بيسمح بمشاركة أفضل، لكن ممكن يحصل ازدحام.",
          tags: ["Packet Switching", "Resource Reservation"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "Which restaurant analogy best describes circuit switching?",
          options: [
            "A restaurant that neither requires nor accepts reservations",
            "A restaurant that requires reservations",
            "A fast-food restaurant",
            "A self-service restaurant",
          ],
          correct: 1,
          translation: "أي تشبيه مطعم يصف تبديل الدوائر بأفضل شكل؟",
          explanation:
            "مطعم بيتطلب حجز — لازم تحجز قبل ما تيجي، والمكان محفوظ لك حتى لو مجيتش.",
          tags: ["Circuit Switching", "Analogy"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "Traditional telephone networks are examples of:",
          options: [
            "Packet-switched networks",
            "Circuit-switched networks",
            "Hybrid networks",
            "Wireless networks",
          ],
          correct: 1,
          translation: "شبكات الهاتف التقليدية أمثلة على:",
          explanation:
            "شبكات تبديل الدوائر — المكالمة بتحجز مسار كامل من البداية للنهاية.",
          tags: ["Circuit Switching", "Telephone Networks"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "A circuit in a link is implemented with either:",
          options: [
            "Frequency-division multiplexing (FDM) or time-division multiplexing (TDM)",
            "Packet switching or message switching",
            "Analog or digital modulation",
            "Wired or wireless transmission",
          ],
          correct: 0,
          translation: "الدائرة في الرابط تُنفَّذ بواسطة:",
          explanation:
            "FDM (تقسيم ترددي) أو TDM (تقسيم زمني) — طريقتان لمشاركة الرابط بين عدة دوائر.",
          tags: ["Circuit Switching", "Multiplexing", "FDM", "TDM"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "What is the main criticism of packet switching regarding real-time services?",
          options: [
            "It is too expensive",
            "It has variable and unpredictable end-to-end delays",
            "It cannot handle voice calls at all",
            "It requires too much bandwidth",
          ],
          correct: 1,
          translation:
            "ما الانتقاد الرئيسي لتبديل الحزم بخصوص الخدمات الفورية؟",
          explanation:
            "تأخيرات متغيرة وغير متوقعة — مشكلة للتطبيقات اللي بتحتاج توقيت ثابت زي المكالمات الصوتية.",
          tags: ["Packet Switching", "Real-Time Services", "Delay"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "What are two arguments made by proponents of packet switching?",
          options: [
            "It reserves resources and guarantees no delay",
            "It offers better sharing of transmission capacity and is simpler, more efficient, and less costly to implement",
            "It requires more bandwidth and is more complex",
            "It is only suitable for real-time services",
          ],
          correct: 1,
          translation: "ما الحجتان اللتان يطرحهما مؤيدو تبديل الحزم؟",
          explanation:
            "مشاركة أفضل للسعة + أبسط وأكفأ وأرخص في التنفيذ. ده اللي خلى الإنترنت يعتمد عليه.",
          tags: ["Packet Switching", "Advantages"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          q: "The trend in telecommunication networks has been moving toward:",
          options: [
            "Circuit switching",
            "Packet switching",
            "Satellite communication",
            "Analog networks",
          ],
          correct: 1,
          translation: "الاتجاه في شبكات الاتصالات كان نحو:",
          explanation:
            "تبديل الحزم — حتى الهاتف التقليدي بقى VoIP (صوت عبر IP)، وده بيوضح انتصار تبديل الحزم.",
          tags: ["Packet Switching", "Trends"],
          ref: "Lecture 2 — Section 1.3.2",
        },

        // ═══════════════════════════════════════════════════════
        // القسم 2: بنية الشبكات (Network of Networks)
        // ═══════════════════════════════════════════════════════
        {
          q: "In Network Structure 1, how are all access ISPs interconnected?",
          options: [
            "Directly to each other",
            "Via a single global transit ISP",
            "Through end systems",
            "Without any interconnection",
          ],
          correct: 1,
          translation: "في بنية الشبكة 1، كيف تت互联 كل مزوّدي الوصول؟",
          explanation:
            "عبر مزوّد نقل عالمي واحد — أبسط هيكل: كل مزوّدي الوصول بيتصلوا بمزوّد عالمي واحد.",
          tags: ["Network of Networks", "Network Structure 1"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "In the customer-provider relationship, the access ISP is the ______ and the global transit ISP is the ______.",
          options: [
            "Provider, customer",
            "Customer, provider",
            "Peer, peer",
            "Client, server",
          ],
          correct: 1,
          translation:
            "في علاقة العميل-المزوّد، مزوّد الوصول هو ______ والمزوّد العالمي هو ______.",
          explanation:
            "العميل (Customer) هو مزوّد الوصول، والمزوّد (Provider) هو المزوّد العالمي — علاقة تجارية بحتة.",
          tags: ["Network of Networks", "Customer-Provider"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What does Network Structure 2 add compared to Network Structure 1?",
          options: [
            "A single global ISP",
            "Multiple competing global transit ISPs",
            "Only access ISPs",
            "Content provider networks",
          ],
          correct: 1,
          translation: "ما الذي تضيفه بنية الشبكة 2 مقارنةً ببنية الشبكة 1؟",
          explanation:
            "عدة مزوّدين عالميين متنافسين — المنافسة بتحسّن الأسعار والخدمة.",
          tags: ["Network of Networks", "Network Structure 2"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "How many tier-1 ISPs exist approximately?",
          options: ["About 5", "About a dozen", "About 100", "About 1000"],
          correct: 1,
          translation: "كم عدد مزوّدي الطبقة الأولى (Tier-1) تقريباً؟",
          explanation:
            "حوالي دستة (12 تقريباً) — قلة قليلة من المزوّدين العالميين بيمثلوا قمة الهرم.",
          tags: ["Network of Networks", "Tier-1 ISPs"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "Which of the following is NOT an example of a tier-1 ISP?",
          options: ["Level 3 Communications", "AT&T", "Sprint", "Google"],
          correct: 3,
          translation: "أي مما يلي ليس مثالاً على مزوّد Tier-1؟",
          explanation:
            "Google شركة محتوى، مش مزوّد Tier-1. باقي الاختيارات مزوّدون عالميون تقليديون.",
          tags: ["Network of Networks", "Tier-1 ISPs"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "In Network Structure 3, what connects access ISPs in a region?",
          options: [
            "Global ISPs directly",
            "Regional ISPs that connect to tier-1 ISPs",
            "Peering points only",
            "Content providers",
          ],
          correct: 1,
          translation:
            "في بنية الشبكة 3، ما الذي يربط مزوّدي الوصول في المنطقة؟",
          explanation:
            "مزوّدو خدمة إقليميون بيتصلوا بـ Tier-1 — طبقة وسيطة بين الوصول والمستوى العالمي.",
          tags: ["Network of Networks", "Network Structure 3"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What is a PoP (Point of Presence)?",
          options: [
            "A protocol over protocol",
            "A group of one or more routers in the provider's network where customer ISPs can connect",
            "A packet of packets",
            "A point of peering between end systems",
          ],
          correct: 1,
          translation: "ما هو PoP؟",
          explanation:
            "مجموعة من الموجّهات في شبكة المزوّد حيث يمكن لمزوّدي الوصول الاتصال — نقطة دخول الشبكة.",
          tags: ["Network of Networks", "PoP"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What is multi-homing?",
          options: [
            "Connecting to a single provider ISP",
            "Connecting to two or more provider ISPs",
            "Using a single link for redundancy",
            "Having no redundancy",
          ],
          correct: 1,
          translation: "ما هو Multi-homing؟",
          explanation:
            "الاتصال بأكثر من مزوّد — بيدي مرونة واستمرارية في الخدمة لو حصل عطل.",
          tags: ["Network of Networks", "Multi-homing"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What is the primary benefit of multi-homing?",
          options: [
            "Lower cost",
            "Faster speed",
            "Continued sending and receiving of packets even if one provider fails",
            "Better security",
          ],
          correct: 2,
          translation: "ما الفائدة الأساسية للـ Multi-homing؟",
          explanation:
            "الاستمرارية في الإرسال والاستقبال حتى لو فشل مزوّد — مرونة تشغيلية عالية.",
          tags: ["Network of Networks", "Multi-homing"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What does it mean for two ISPs to peer?",
          options: [
            "They pay each other for traffic",
            "They directly connect their networks so traffic passes over the direct connection, settlement-free",
            "They connect only through tier-1 ISPs",
            "They use end systems to communicate",
          ],
          correct: 1,
          translation: "ماذا يعني أن يقوم مزوّدان بالـ Peering؟",
          explanation:
            "اتصال مباشر بين شبكاتهم بدون مقابل مالي — بيوفّر تكلفة النقل عبر المزوّدين العالميين.",
          tags: ["Network of Networks", "Peering"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What is an IXP?",
          options: [
            "Internet Exchange Point — a meeting point where multiple ISPs can peer together",
            "ISP Expansion Protocol",
            "Internal Exchange Protocol",
            "Internet Xylem Point",
          ],
          correct: 0,
          translation: "ما هو IXP؟",
          explanation:
            "نقطة تبادل إنترنت — مكان بيتجمع فيه عدة مزوّدين للـ Peering في موقع واحد.",
          tags: ["Network of Networks", "IXP"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "What does Network Structure 5 add on top of Network Structure 4?",
          options: [
            "Only access ISPs",
            "Content-provider networks like Google",
            "More regional ISPs",
            "End systems",
          ],
          correct: 1,
          translation: "ما الذي تضيفه بنية الشبكة 5 فوق بنية الشبكة 4؟",
          explanation:
            "شبكات مزوّدي المحتوى (زي Google) — بقت لاعبين رئيسيين في بنية الإنترنت الحديثة.",
          tags: [
            "Network of Networks",
            "Network Structure 5",
            "Content Providers",
          ],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          q: "How does Google bypass upper tiers of the Internet?",
          options: [
            "Using only the public Internet",
            "Peering with lower-tier ISPs and connecting at IXPs",
            "Paying all tier-1 ISPs",
            "Using satellite links only",
          ],
          correct: 1,
          translation: "كيف تتجاوز Google الطبقات العليا؟",
          explanation:
            "بالـ Peering مع مزوّدي المستوى الأدنى والاتصال عند IXPs — بتوفر تكلفة وبتخسّن الأداء.",
          tags: ["Network of Networks", "Content Providers", "Google"],
          ref: "Lecture 2 — Section 1.3.3",
        },

        // ═══════════════════════════════════════════════════════
        // القسم 3: تأخيرات العُقد (Nodal Delays)
        // ═══════════════════════════════════════════════════════
        {
          q: "What are the four types of nodal delays?",
          options: [
            "Processing, queuing, transmission, propagation",
            "Packet, message, segment, frame",
            "Link, route, path, switch",
            "Header, payload, buffer, bit",
          ],
          correct: 0,
          translation: "ما أنواع تأخيرات العُقد الأربعة؟",
          explanation:
            "معالجة (Processing) + انتظار (Queuing) + إرسال (Transmission) + انتشار (Propagation) — أساس تحليل أداء الشبكات.",
          tags: ["Delay", "Nodal Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is included in processing delay?",
          options: [
            "Transmitting bits into the link",
            "Examining the packet's header and determining where to direct the packet",
            "Waiting in the queue",
            "Propagating over the link",
          ],
          correct: 1,
          translation: "ما الذي يتضمنه تأخير المعالجة؟",
          explanation:
            "فحص ترويسة الحزمة وتحديد المسار — ممكن يشمل كشف الأخطاء على مستوى البت.",
          tags: ["Delay", "Processing Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "Processing delays in high-speed routers are typically on the order of:",
          options: [
            "Seconds",
            "Milliseconds",
            "Microseconds or less",
            "Minutes",
          ],
          correct: 2,
          translation:
            "تأخيرات المعالجة في الموجّهات عالية السرعة عادةً في حدود:",
          explanation:
            "ميكروثانية أو أقل — بفضل العتاد المتخصص (ASICs) اللي بيعالج الحزم بسرعة فائقة.",
          tags: ["Delay", "Processing Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What causes variable queuing delays?",
          options: [
            "Fixed buffer size",
            "The number of earlier-arriving packets queued and waiting for transmission",
            "Constant arrival rate",
            "Propagation speed",
          ],
          correct: 1,
          translation: "ما سبب تأخيرات الانتظار المتغيرة؟",
          explanation:
            "عدد الحزم اللي وصلت قبلها وبتنتظر الإرسال — كل ما الطابور أطول، الانتظار أطول.",
          tags: ["Delay", "Queuing Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "Queuing delays can be on the order of:",
          options: [
            "Microseconds to milliseconds",
            "Seconds to minutes",
            "Hours",
            "Nanoseconds only",
          ],
          correct: 0,
          translation: "تأخيرات الانتظار ممكن تكون في حدود:",
          explanation:
            "من ميكروثانية لميللي ثانية — حسب الازدحام. في أوقات الذروة بتبقى أعلى بكتير.",
          tags: ["Delay", "Queuing Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is transmission delay?",
          options: [
            "Time to propagate the signal",
            "L/R, the time required to push all of the packet's bits into the link",
            "Queue wait time",
            "Header processing time",
          ],
          correct: 1,
          translation: "ما هو تأخير الإرسال؟",
          explanation:
            "L/R — الوقت اللازم لدفع كل بتات الحزمة للرابط. L = طول الحزمة، R = معدل الإرسال.",
          tags: ["Delay", "Transmission Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is propagation delay?",
          options: [
            "d/s, distance divided by propagation speed",
            "Time in queue",
            "Bit pushing time",
            "Error checking time",
          ],
          correct: 0,
          translation: "ما هو تأخير الانتشار؟",
          explanation:
            "d/s — المسافة مقسومة على سرعة الانتشار. بيعتمد على المسافة الفيزيائية وسرعة الإشارة في الوسط.",
          tags: ["Delay", "Propagation Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "The propagation speed in a link is in the range of:",
          options: [
            "2×10^6 to 3×10^6 meters/sec",
            "2×10^8 to 3×10^8 meters/sec",
            "2×10^10 to 3×10^10 meters/sec",
            "2×10^4 to 3×10^4 meters/sec",
          ],
          correct: 1,
          translation: "سرعة الانتشار في الرابط في حدود:",
          explanation:
            "2×10^8 إلى 3×10^8 م/ث — قريبة من سرعة الضوء، وبتعتمد على الوسط (ألياف، نحاس، إلخ).",
          tags: ["Delay", "Propagation Delay", "Propagation Speed"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is the formula for total nodal delay?",
          options: [
            "d_proc + d_queue + d_trans + d_prop",
            "L/R only",
            "N-1",
            "Traffic intensity",
          ],
          correct: 0,
          translation: "ما معادلة التأخير الكلي للعقدة؟",
          explanation:
            "d_proc + d_queue + d_trans + d_prop — مجموع التأخيرات الأربعة. أساس تحليل أداء الشبكة.",
          tags: ["Delay", "Nodal Delay", "Formula"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "Which delay component can be the dominant term for a geostationary satellite link?",
          options: [
            "Processing delay",
            "Queuing delay",
            "Transmission delay",
            "Propagation delay",
          ],
          correct: 3,
          translation:
            "أي مكوّن تأخير ممكن يكون المسيطر في رابط قمر صناعي ثابت؟",
          explanation:
            "تأخير الانتشار — المسافة الكبيرة (36,000 كم) بتخلي تأخير الانتشار مهيمن (حوالي 280 مللي ثانية).",
          tags: ["Delay", "Propagation Delay", "Satellite"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is traffic intensity?",
          options: [
            "La/R, arrival rate times packet length divided by transmission rate",
            "End-to-end delay",
            "Packet loss probability",
            "Throughput",
          ],
          correct: 0,
          translation: "ما هي كثافة الترافيك؟",
          explanation:
            "La/R — متوسط معدل الوصول × طول الحزمة ÷ معدل الإرسال. مقياس رئيسي لتحديد ازدحام الشبكة.",
          tags: ["Delay", "Traffic Intensity"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What happens if traffic intensity > 1?",
          options: [
            "Zero delay",
            "The queue grows without bound and queuing delay approaches infinity",
            "No packet loss",
            "Fixed delay",
          ],
          correct: 1,
          translation: "ماذا يحدث لو كثافة الترافيك > 1؟",
          explanation:
            "الطابور بينمو بلا حدود وتأخير الانتظار يقترب من اللانهاية — النظام غير مستقر والانهيار حتمي.",
          tags: ["Delay", "Traffic Intensity"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "As traffic intensity approaches 1, what happens to average queuing delay?",
          options: [
            "Decreases",
            "Increases rapidly",
            "Stays constant",
            "Becomes zero",
          ],
          correct: 1,
          translation:
            "كلما اقتربت كثافة الترافيك من 1، ماذا يحدث لمتوسط تأخير الانتظار؟",
          explanation:
            "بيزيد بسرعة — سلوك غير خطي. الاقتراب من 1 معناه اقتراب النظام من الانهيار.",
          tags: ["Delay", "Queuing Delay", "Traffic Intensity"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What is the golden rule of traffic engineering?",
          options: [
            "Design your system so that traffic intensity is no greater than 1",
            "Always use circuit switching",
            "Maximize packet size",
            "Minimize propagation delay",
          ],
          correct: 0,
          translation: "ما القاعدة الذهبية في هندسة الترافيك؟",
          explanation:
            "صمّم نظامك بحيث كثافة الترافيك ما تتعداش 1 — عشان تضمن استقرار النظام.",
          tags: ["Delay", "Traffic Intensity", "Design"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What causes packet loss in real queues?",
          options: [
            "Infinite capacity",
            "Finite buffer space leading to drops when a packet arrives at a full queue",
            "No queuing",
            "Automatic retransmission",
          ],
          correct: 1,
          translation: "ما سبب فقدان الحزم في الطوابير الحقيقية؟",
          explanation:
            "سعة المخزن المحدودة — لما الطابور يمتلئ، الحزم الجديدة بتُسقَط، وده بيعني إعادة إرسال.",
          tags: ["Packet Loss", "Queuing"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "For N-1 routers, the uncongested end-to-end delay is:",
          options: [
            "N(d_proc + d_trans + d_prop)",
            "(N-1)(d_proc + d_trans + d_prop)",
            "L/R",
            "d_queue only",
          ],
          correct: 0,
          translation:
            "لـ N-1 من الموجّهات، التأخير من طرف لطرف بدون ازدحام هو:",
          explanation:
            "N × (d_proc + d_trans + d_prop) — N روابط، كل رابط بيضيف تأخيرات المعالجة والإرسال والانتشار.",
          tags: ["Delay", "End-to-End Delay"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          q: "What does Traceroute measure?",
          options: [
            "Throughput",
            "Delays to routers along the path",
            "Packet loss only",
            "Bandwidth",
          ],
          correct: 1,
          translation: "ماذا يقيس Traceroute؟",
          explanation:
            "التأخيرات لكل موجّه على المسار — أداة تشخيصية بتوضح المسار والتأخيرات لحد الوجهة.",
          tags: ["Traceroute", "Delay Measurement"],
          ref: "Lecture 2 — Section 1.4",
        },

        // ═══════════════════════════════════════════════════════
        // Essay (5 أسئلة)
        // ═══════════════════════════════════════════════════════
        {
          type: "essay",
          q: "Explain the four components of packet delay in detail.",
          translation: "اشرح مكونات تأخير الحزمة الأربعة بالتفصيل.",
          answer:
            "1) Processing Delay:\n" +
            "   The time required to examine the packet's header and determine where to direct the packet. " +
            "It can also include time needed to check for bit-level errors. Typically on the order of microseconds or less.\n\n" +
            "2) Queuing Delay:\n" +
            "   The time a packet waits in the queue before being transmitted onto the link. " +
            "Depends on the number of earlier-arriving packets queued. Can range from zero to milliseconds.\n\n" +
            "3) Transmission Delay:\n" +
            "   The time required to push all of the packet's bits into the link. " +
            "Formula: L/R, where L is packet length in bits and R is transmission rate in bits/sec.\n\n" +
            "4) Propagation Delay:\n" +
            "   The time required for a bit to propagate from the beginning of the link to the next router. " +
            "Formula: d/s, where d is distance and s is propagation speed (2×10^8 to 3×10^8 m/s).",
          tags: ["Delay", "Packet Switching", "Performance"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          type: "essay",
          q: "Compare and contrast circuit switching and packet switching.",
          translation: "قارن بين تبديل الدوائر وتبديل الحزم.",
          answer:
            "Circuit Switching:\n" +
            "- Resources (buffers, link transmission rate) are reserved for the duration of the communication session.\n" +
            "- Traditional telephone networks are examples.\n" +
            "- Uses FDM or TDM for multiplexing.\n" +
            "- Guarantees consistent performance but wastes resources during silent periods.\n" +
            "- Analogy: A restaurant that requires reservations.\n\n" +
            "Packet Switching:\n" +
            "- Resources are NOT reserved; they are shared on demand.\n" +
            "- The Internet is the primary example.\n" +
            "- Offers better sharing of transmission capacity.\n" +
            "- Simpler, more efficient, and less costly to implement.\n" +
            "- Suffers from variable and unpredictable queuing delays.\n" +
            "- Analogy: A restaurant that does not require reservations.\n\n" +
            "Trend: Telecommunication networks are migrating toward packet switching.",
          tags: ["Circuit Switching", "Packet Switching", "Comparison"],
          ref: "Lecture 2 — Section 1.3.2",
        },
        {
          type: "essay",
          q: "Describe the five network structures that lead to today's Internet.",
          translation: "صِف بنى الشبكات الخمس التي أدت إلى الإنترنت اليوم.",
          answer:
            "Network Structure 1:\n" +
            "- All access ISPs interconnected via a single global transit ISP.\n" +
            "- Access ISP is customer; global transit ISP is provider.\n\n" +
            "Network Structure 2:\n" +
            "- Multiple competing global transit ISPs.\n" +
            "- Access ISPs can choose among providers based on pricing and services.\n" +
            "- Two-tier hierarchy: global transit providers (top) and access ISPs (bottom).\n\n" +
            "Network Structure 3:\n" +
            "- Adds regional ISPs between access ISPs and tier-1 ISPs.\n" +
            "- Multi-tier hierarchy with customer-provider relationships at each level.\n" +
            "- Tier-1 ISPs do not pay anyone.\n\n" +
            "Network Structure 4:\n" +
            "- Adds PoPs, multi-homing, peering, and IXPs.\n" +
            "- Peering is settlement-free between nearby ISPs at the same level.\n" +
            "- Multi-homing provides redundancy.\n\n" +
            "Network Structure 5:\n" +
            "- Adds content-provider networks (e.g., Google).\n" +
            "- Content providers peer with lower-tier ISPs and connect to tier-1 ISPs.\n" +
            "- Describes today's Internet.",
          tags: ["Network of Networks", "Internet Structure", "ISPs"],
          ref: "Lecture 2 — Section 1.3.3",
        },
        {
          type: "essay",
          q: "Explain the concept of traffic intensity and its effect on queuing delay.",
          translation: "اشرح مفهوم كثافة الترافيك وتأثيره على تأخير الانتظار.",
          answer:
            "Traffic intensity is defined as La/R, where:\n" +
            "- L = packet length (bits)\n" +
            "- a = average packet arrival rate (packets/sec)\n" +
            "- R = transmission rate (bits/sec)\n\n" +
            "Effects:\n" +
            "1) If La/R > 1: The arrival rate exceeds the transmission rate. " +
            "The queue grows without bound and queuing delay approaches infinity.\n\n" +
            "2) If La/R ≤ 1: The system is stable.\n" +
            "   - If La/R ≈ 0: Packet arrivals are few and far between; average queuing delay is close to zero.\n" +
            "   - As La/R approaches 1: Average queuing delay increases rapidly.\n\n" +
            "Golden Rule: Design your system so that traffic intensity is no greater than 1.",
          tags: ["Traffic Intensity", "Queuing Delay", "Performance"],
          ref: "Lecture 2 — Section 1.4",
        },
        {
          type: "essay",
          q: "What is the difference between transmission delay and propagation delay?",
          translation: "ما الفرق بين تأخير الإرسال وتأخير الانتشار؟",
          answer:
            "Transmission Delay:\n" +
            "- The time required to push all of the packet's bits into the link.\n" +
            "- Formula: L/R (packet length / transmission rate).\n" +
            "- Depends on packet size and link transmission rate.\n" +
            "- Typically microseconds to milliseconds.\n\n" +
            "Propagation Delay:\n" +
            "- The time required for a single bit to travel from the beginning of the link to the next router.\n" +
            "- Formula: d/s (distance / propagation speed).\n" +
            "- Depends on physical distance and medium (fiber, copper, etc.).\n" +
            "- Propagation speed is 2×10^8 to 3×10^8 m/s.\n" +
            "- In wide-area networks, on the order of milliseconds.\n\n" +
            "Key Difference: Transmission delay is about pushing bits into the link; " +
            "propagation delay is about the bit traveling across the link.",
          tags: ["Transmission Delay", "Propagation Delay", "Comparison"],
          ref: "Lecture 2 — Section 1.4",
        },
      ],
    },
  ],
  chapters: [
    {
      t: "الفصل الأول: الأساسيات", // عنوان الفصل
      icon: "📘", // أيقونة (اختياري)
      d: "مقدمة وأساسيات", // وصف (اختياري)
      lectures: [0, 1, 2], // ← أرقام المحاضرات في الفصل
    },
  ],

  midtermsCategories: [
    {
      category: "Dr. Ebram Kamal",
      icon: "👨‍🏫",
      description: "Computer Networks midterms by Dr. Ebram Kamal",
      items: [
        {
          t: "MidTerm 2023 — Dr. Ebram",
          d: "Questions & answers — IT351, 2023",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2023/MidTerm 2023 - Questions - Networks-Answers.pdf",
          questions: [
            {
              q: "How many sockets are there in a TCP server communicating with 13 clients concurrently?",
              options: ["15", "None of the options", "13", "12", "14"],
              correct: 4,
              translation:
                "كم عدد الـ Sockets في سيرفر TCP بيتواصل مع 13 عميل في نفس الوقت؟",
              explanation:
                "14 — واحد للاستقبال (welcoming socket) + 13 واحد لكل عميل.",
            },
            {
              q: "Which statement is true about TCP and not true about UDP?",
              options: [
                "Provides timing service.",
                "Provides reliable transport service.",
                "Provides security service.",
                "Provides minimum throughput guarantee service.",
              ],
              correct: 1,
              translation: "أي عبارة صحيحة عن TCP وليست صحيحة عن UDP؟",
              explanation:
                "يوفر خدمة نقل موثوقة (Reliable Transport) — TCP يضمن الوصول، UDP لا.",
            },
            {
              q: "Top-level domain (TLD) servers are organization's own DNS server(s), providing authoritative hostname-to-IP mappings for organization's named hosts.",
              options: ["No", "Yes"],
              correct: 0,
              translation:
                "سيرفرات النطاق الأعلى (TLD) هي سيرفرات DNS الخاصة بالمنظمة.",
              explanation:
                "لا — TLD سيرفرات مسؤولة عن النطاقات (com, org)، مش عن المنظمات الفردية.",
            },
            {
              q: "Which layer doesn't appear in the Internet Protocol Stack?",
              options: [
                "Physical layer",
                "Session layer",
                "Application layer",
                "None of the options",
              ],
              correct: 1,
              translation: "أي طبقة لا تظهر في حزمة بروتوكولات الإنترنت؟",
              explanation:
                "طبقة الجلسة (Session) — غير موجودة في Internet Stack (5 طبقات فقط).",
            },
            {
              q: "Which statement is true about circuit switching?",
              options: [
                "The path between a source and a destination is not fixed",
                "Packet transmission can use the full link bandwidth",
                "None of the options",
                "Resources are pre-allocated regardless of demand",
                "All of the options",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة عن تبديل الدوائر؟",
              explanation:
                "الموارد تُخصص مسبقاً بغض النظر عن الطلب — ده جوهر Circuit Switching.",
            },
            {
              q: "What is the queuing delay? (packets L bits, link rate R bps, n waiting packets, x bits of current packet transmitted)",
              options: [
                "(nL + (L - x)) / R",
                "nL / R",
                "n(L - x) / R",
                "nL + (L - x) / R",
                "(nL + (x - L)) / R",
              ],
              correct: 0,
              translation: "ما هو تأخير الانتظار في الطابور؟",
              explanation:
                "(nL + (L-x))/R — مجموع بتات الحزم المنتظرة + الباقي من الحزمة الحالية ÷ معدل الرابط.",
            },
            {
              q: "In Go-back-N protocol, what are the sizes of the sender and receiver buffers required for a window size of N?",
              options: ["N; N", "N; 1", "1; 1", "N - 1; N - 1", "N - 1; 1"],
              correct: 1,
              translation:
                "في بروتوكول Go-back-N، ما أحجام مخازن المرسل والمستقبل لحجم نافذة N؟",
              explanation:
                "N; 1 — المرسل يحتاج N، المستقبل يحتاج 1 فقط لأن GBN يرفض خارج الترتيب.",
            },
            {
              q: "Which statement about DNS is TRUE?",
              options: [
                "None of the options",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
                "TLD servers store all the hostname to IP mappings of the Internet.",
              ],
              correct: 2,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation:
                "سيرفر DNS المحلي قد يقدم أحياناً تعيينات قديمة — بسبب الـ Caching.",
            },
            {
              q: "HTTP protocol keeps state information at the server side about past client requests.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "بروتوكول HTTP يحتفظ بمعلومات الحالة في السيرفر عن طلبات العميل السابقة.",
              explanation: "خطأ — HTTP بروتوكول عديم الحالة (Stateless).",
            },
            {
              q: "In Non-persistent HTTP, the client closes the TCP connection after fetching one object (one pair of HTTP request and HTTP response).",
              options: ["False", "True"],
              correct: 1,
              translation:
                "في HTTP غير المستمر، يُغلق العميل اتصال TCP بعد جلب كائن واحد.",
              explanation: "صح — اتصال TCP جديد لكل كائن.",
            },
            {
              q: "In circuit switching, a circuit segment is idle if not used by a call.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "في تبديل الدوائر، قطاع الدائرة يكون خاملاً إذا لم يُستخدم في مكالمة.",
              explanation: "صح — الموارد محجوزة حتى لو مش مستخدمة = هدر.",
            },
            {
              q: "Which statement is true about packet switching?",
              options: [
                "In packet switching, dedicated allocation is done between nodes.",
                "In packet switching, time is divided into 'slots' between the nodes.",
                "In packet switching, bandwidth is divided into 'pieces' between the nodes.",
                "In packet switching, resources are reserved for nodes.",
                "None of the options.",
              ],
              correct: 4,
              translation: "أي عبارة صحيحة عن تبديل الحزم؟",
              explanation:
                "لا شيء — كل الاختيارات الأخرى تصف Circuit Switching.",
            },
          ],
        },
        {
          t: "MidTerm 2024 — Dr. Ebram",
          d: "Midterm questions — 2024",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2024/MidTerm 2024 - Questions - Networks.pdf",
          questions: [
            {
              q: "Which statement is true about Client-Server Architecture?",
              options: [
                "In Client-Server Architecture, the server waits for incoming requests while the client initiates contact with server.",
                "In Client-Server Architecture, the client waits for incoming requests while the server initiates contact with server.",
                "In Client-Server Architecture, the server typically requests service from the client while the client provides requested service to server.",
                "All of the options.",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة عن معمارية العميل-السيرفر؟",
              explanation:
                "السيرفر ينتظر الطلبات والعميل يبدأ التواصل — التعريف الأساسي.",
            },
            {
              q: "Which layer doesn't appear in the Internet Protocol Stack?",
              options: [
                "Application layer",
                "Network layer",
                "Transport layer",
                "Session layer",
              ],
              correct: 3,
              translation: "أي طبقة لا تظهر في Internet Protocol Stack؟",
              explanation: "طبقة الجلسة (Session).",
            },
            {
              q: "In circuit switching, a circuit segment is idle if not used by a call.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "في تبديل الدوائر، قطاع الدائرة يكون خاملاً إذا لم يُستخدم.",
              explanation: "صح — موارد محجوزة حتى لو خاملة.",
            },
            {
              q: "Which statement about DNS is TRUE?",
              options: [
                "TLD servers store all the hostname-to-IP mappings of the Internet.",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
              ],
              correct: 2,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation:
                "سيرفر DNS المحلي قد يقدم بيانات قديمة بسبب الـ Caching.",
            },
            {
              q: "In Go-back-N protocol, what are the sizes of the sender and receiver buffers required for a window size of N?",
              options: ["1; 1", "N - 1; 1", "N - 1; N - 1", "N; 1"],
              correct: 3,
              translation: "في Go-back-N، أحجام المخازن لحجم نافذة N؟",
              explanation: "N; 1 — المرسل N والمستقبل 1.",
            },
            {
              q: "Using Conditional GET in HTTP Protocol, the number of RTT is reduced if the object is not modified since the date of the cached copy!",
              options: ["True", "False"],
              correct: 0,
              translation:
                "باستخدام Conditional GET في HTTP، عدد RTT يقل لو الكائن لم يتغير.",
              explanation: "صح — يوفر نقل الكائن كامل إذا لم يتغير.",
            },
            {
              q: "End-to-end delay is the time taken for a packet to travel from source to destination. It consists of which of the following delays?",
              options: [
                "Transmission delay.",
                "Propagation delay.",
                "Queuing and Processing delays.",
                "All of the options",
              ],
              correct: 3,
              translation: "تأخير النهاية-للنهاية يتكون من أي تأخيرات؟",
              explanation:
                "كل التأخيرات الأربعة: Transmission + Propagation + Queuing + Processing.",
            },
            {
              q: "Which statement is true?",
              options: [
                "Both the Internet and traditional telephone networks use packet-switching.",
                "Performance metrics such as end-to-end delay and throughput can be guaranteed in the Internet, if TCP is chosen as the transport layer protocol.",
                "The Internet uses packet switching and traditional telephone networks use circuit switching.",
                "In the Internet, packets from the same source always take the same path to reach destination.",
              ],
              correct: 2,
              translation: "أي عبارة صحيحة؟",
              explanation:
                "الإنترنت يستخدم packet switching، والهاتف التقليدي يستخدم circuit switching.",
            },
            {
              q: "HTTP protocol keeps state information at the server side about past client requests.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "HTTP يحتفظ بمعلومات الحالة في السيرفر عن الطلبات السابقة.",
              explanation: "خطأ — HTTP stateless.",
            },
            {
              q: "Which statement is true about TCP and not true about UDP?",
              options: [
                "Provides timing service.",
                "Provides minimum throughput guarantee service.",
                "Provides security service.",
                "Provides reliable transport service.",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة عن TCP وليست عن UDP؟",
              explanation: "يوفر نقل موثوق (Reliable transport).",
            },
            {
              q: "How many sockets are there in a TCP server communicating with 13 clients concurrently?",
              options: ["13", "14", "15", "12"],
              correct: 1,
              translation: "كم socket في سيرفر TCP يتواصل مع 13 عميل؟",
              explanation: "14 — 13 + 1 للاستقبال.",
            },
          ],
        },
        {
          t: "MidTerm 2024 — Dr. Ebram (Version 2)",
          d: "Midterm questions — 2024, second set",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2024/MidTerm 2024 - Questions - Networks(2).pdf",
          questions: [
            {
              q: "In BitTorrent, Alice requests small-size chunks first from her neighbors.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "في BitTorrent، أليس تطلب القطع الصغيرة أولاً من جيرانها.",
              explanation: "خطأ — تطلب الأندر (rarest first) أولاً.",
            },
            {
              q: "Which services can be guaranteed and cannot be guaranteed by TCP when it uses flow control and congestion control?",
              options: [
                "TCP only guarantees reliability but does not guarantee security, timing, or throughput.",
                "TCP guarantees security and timing.",
                "TCP guarantees throughput and delay.",
                "TCP guarantees all services.",
              ],
              correct: 0,
              translation: "أي الخدمات يضمنها TCP ولا يضمنها؟",
              explanation:
                "TCP يضمن الموثوقية فقط — لا يضمن الأمان ولا التوقيت ولا معدل النقل.",
            },
            {
              q: "Why is a Web cache considered both a server and a client at the same time?",
              options: [
                "It sends requested messages to clients (acts as server) and requests pages from the main server to cache them (acts as client).",
                "It only acts as a server.",
                "It only acts as a client.",
                "It acts as a router.",
              ],
              correct: 0,
              translation:
                "لماذا يُعتبر Web Cache سيرفراً وعميلاً في نفس الوقت؟",
              explanation:
                "يرسل للعملاء (كـ سيرفر) ويطلب من السيرفر الأصلي (كـ عميل).",
            },
            {
              q: "Why do Mail servers use SMTP handshaking in application layer although there is a TCP handshaking in the transport layer?",
              options: [
                "To check if the sender is not blocked and to check if the receiver mail is in the mail server.",
                "To encrypt the email.",
                "To compress the email.",
                "To route the email.",
              ],
              correct: 0,
              translation:
                "لماذا تستخدم سيرفرات البريد SMTP handshaking رغم وجود TCP handshaking؟",
              explanation:
                "للتحقق من أن المرسل غير محظور وأن بريد المستقبل موجود.",
            },
            {
              q: "Dial-up and DSL are both dedicated access technology, where HFC and FTTH(PON) are completely shared along the path.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "Dial-up و DSL كلاهما مخصص، و HFC و FTTH مشتركة بالكامل.",
              explanation:
                "خطأ — DSL مخصص لكن FTTH مش مشترك بالكامل، HFC مشترك جزئياً.",
            },
            {
              q: "Assume that a file of size F is to be distributed to N clients in client-server architecture. If the upload rate of the server's access link is us, then the time to distribute the file to N clients is equal to NF / us.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "بافتراض توزيع ملف حجمه F على N عميل في client-server. زمن التوزيع = NF/us.",
              explanation: "صح — السيرفر لازم يرسل الملف N مرة بمعدل us.",
            },
          ],
        },
        {
          t: "BIS 2025 — Dr. Ebram",
          d: "Fill in blanks + problems — 2025",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2025/BIS 2025 - Dr. Ebram - Computer Networks.pdf",
          questions: [
            {
              q: "In a host sending data to the network, UDP receives data from the Transport layer and sends data to the Network layer.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "في مضيف يرسل بيانات، UDP يستقبل من طبقة النقل ويرسل لطبقة الشبكة.",
              explanation: "صح — UDP بروتوكول نقل (Transport layer).",
            },
            {
              q: "HTTP is an Application layer protocol that typically runs on top of TCP.",
              options: ["True", "False"],
              correct: 0,
              translation: "HTTP بروتوكول طبقة تطبيق يعمل فوق TCP.",
              explanation: "صح — HTTP يستخدم TCP افتراضياً (منفذ 80).",
            },
            {
              q: "UDP is a connectionless de-multiplexing while TCP is a connection-oriented de-multiplexing to dispatch incoming packets to different processes in the same host.",
              options: ["True", "False"],
              correct: 0,
              translation: "UDP هو de-multiplexing بدون اتصال، TCP مع اتصال.",
              explanation: "صح — UDP يستخدم 2-tuple، TCP يستخدم 4-tuple.",
            },
            {
              q: "In client/server paradigm, the server must always be alive and offers service while the client requests for service from the server.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "في client/server، السيرفر يجب أن يكون حياً دائمًا ويقدم الخدمة.",
              explanation: "صح — السيرفر always-on.",
            },
            {
              q: "DNS provides hostname to IP address mapping and typically listens to port 53.",
              options: ["True", "False"],
              correct: 0,
              translation: "DNS يوفر تعيين اسم المضيف إلى IP ويستمع للمنفذ 53.",
              explanation: "صح — المنفذ 53 قياسي لـ DNS.",
            },
            {
              q: "The transport layer of the Internet protocol stack is responsible for delivering data from sending process to receiving process while the Application layer is responsible for delivering data from sending host to receiving host.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "طبقة النقل مسؤولة عن التسليم من عملية لعملية، وطبقة التطبيق من مضيف لمضيف.",
              explanation:
                "خطأ — التسليم من مضيف لمضيف هي مسؤولية طبقة الشبكة (Network layer).",
            },
          ],
        },
        {
          t: "Mid 2025 National — Dr. Ebram",
          d: "Midterm 2025 National — Dr. Ebram",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2025/Mid 2025 National Dr. Ebram.pdf",
          questions: [
            {
              q: "Which statement is true about Client-Server Architecture?",
              options: [
                "The server waits for incoming requests while the client initiates contact with server.",
                "The client waits for incoming requests while the server initiates contact with server.",
                "The server typically requests service from the client while the client provides requested service to server.",
                "All of the options.",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة عن Client-Server؟",
              explanation: "السيرفر ينتظر والعميل يبدأ التواصل.",
            },
            {
              q: "Which layer doesn't appear in the Internet Protocol Stack?",
              options: [
                "Application layer",
                "Network layer",
                "Transport layer",
                "Session layer",
              ],
              correct: 3,
              translation: "أي طبقة لا تظهر في Internet Protocol Stack؟",
              explanation: "طبقة الجلسة.",
            },
            {
              q: "In circuit switching, a circuit segment is idle if not used by a call.",
              options: ["True", "False"],
              correct: 0,
              translation: "قطاع الدائرة خامل لو لم يُستخدم.",
              explanation: "صح.",
            },
            {
              q: "Which statement about DNS is TRUE?",
              options: [
                "TLD servers store all the hostname-to-IP mappings of the Internet.",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
              ],
              correct: 2,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation: "بيانات قديمة بسبب الـ Caching.",
            },
          ],
        },
        {
          t: "Mid 2023 Summer — Dr. Ebram",
          d: "Summer midterm 2023",
          pdf: "Computer Networks/Questions/Mid/Dr. Ebram/2023/Mid 2023 Summer.pdf",
          questions: [
            {
              q: "Which layer doesn't appear in the Internet Protocol Stack?",
              options: [
                "Application layer",
                "Network layer",
                "Transport layer",
                "Session layer",
                "Physical layer",
              ],
              correct: 3,
              translation: "أي طبقة لا تظهر في Internet Protocol Stack؟",
              explanation: "طبقة الجلسة (Session).",
            },
            {
              q: "Which statement is true?",
              options: [
                "Both the Internet and traditional telephone networks use packet-switching.",
                "Performance metrics such as end-to-end delay and throughput can be guaranteed in the Internet, if TCP is chosen as the transport layer protocol.",
                "In the Internet, packets from the same source always take the same path to reach destination.",
                "The Internet uses packet switching and traditional telephone networks use circuit switching.",
                "None of the above",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة؟",
              explanation:
                "الإنترنت = packet switching، الهاتف = circuit switching.",
            },
            {
              q: "Which statement is true about circuit switching?",
              options: [
                "Resources are pre-allocated regardless of demand",
                "Packet transmission can use the full link bandwidth",
                "The path between a source and a destination is not fixed",
                "None of the above",
                "All of the above",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة عن circuit switching؟",
              explanation: "الموارد تُخصص مسبقاً بغض النظر عن الطلب.",
            },
            {
              q: "Which of the following is present in both HTTP request line and status line?",
              options: [
                "HTTP version number",
                "Request method",
                "Status code",
                "URL",
                "None of the above",
              ],
              correct: 0,
              translation:
                "أي مما يلي موجود في HTTP request line وstatus line معاً؟",
              explanation: "رقم إصدار HTTP — موجود في الاثنين.",
            },
            {
              q: "Which statement about DNS is TRUE?",
              options: [
                "TLD servers store all the hostname-to-IP mappings of the Internet.",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation: "بيانات قديمة بسبب Caching.",
            },
            {
              q: "What is the queuing delay? (packets L bits, link rate R bps, n waiting packets, x bits of current packet transmitted)",
              options: [
                "nL / R",
                "L / R",
                "n(L - x) / R",
                "nL + (L - x) / R",
                "(nL + (L - x)) / R",
                "(nL + (x - L)) / R",
              ],
              correct: 4,
              translation: "ما هو تأخير الانتظار؟",
              explanation: "(nL + (L - x)) / R.",
            },
          ],
        },
      ],
    },
    {
      category: "Dr. Nago",
      icon: "👨‍🏫",
      description: "Computer Networks midterms by Dr. Nago",
      items: [
        {
          t: "Review Before Exam — 2025",
          d: "Comprehensive review questions — Dr. Nago",
          pdf: "Computer Networks/Questions/Mid/Dr. Nago/2025/راجع نفسك قبل ما تفتحه.pdf",
          questions: [
            {
              q: "Which statement is correct about Distance Vector routing?",
              options: [
                "Nodes have to calculate the costs to only direct neighbouring nodes",
                "Nodes have to calculate the costs to all the nodes in the network",
                "None of the above",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة عن Distance Vector routing؟",
              explanation:
                "العقد تحسب التكاليف للجيران المباشرين فقط — وتعتمد على جيرانها لباقي الشبكة.",
            },
            {
              q: "Suppose there are M paths between server and client. Path k consists of N links with transmission rates R₁ᵏ, R₂ᵏ, …, Rₙᵏ. If server can use all M paths, the maximum throughput is:",
              options: [
                "min(R₁ᵏ, R₂ᵏ, …, Rₙᵏ)",
                "max(R₁ᵏ, R₂ᵏ, …, Rₙᵏ)",
                "∑ₖ₌₁ᴹ min(R₁ᵏ, R₂ᵏ, …, Rₙᵏ)",
                "max{min(R₁ᵏ, R₂ᵏ, …, Rₙᵏ), min(R₁ᵏ, R₂ᵏ, …, Rₙᵏ), …, min(R₁ᴹ, R₂ᴹ, …, Rₙᴹ)}",
                "∑ₖ₌₁ᴹ max(R₁ᵏ, R₂ᵏ, …, Rₙᵏ)",
                "None of the above",
              ],
              correct: 3,
              translation: "لو M مسارات متاحة، ما أقصى throughput؟",
              explanation: "max{min(...)} — أقصى قيمة لأدنى معدل في كل مسار.",
            },
            {
              q: "To perform load distribution, when clients make a DNS query for a name mapped to a set of addresses, the server responds with the entire set of IP addresses, but rotates the ordering of the addresses within each reply.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "لتوزيع الحمل، سيرفر DNS يرد بمجموعة IP كاملة مع تدوير الترتيب.",
              explanation: "صح — تقنية DNS Load Distribution.",
            },
            {
              q: "Suppose that the TCP receiver computes the internet checksum for the received TCP segment and finds that it matches the value carried in the checksum field. Accordingly, the receiver should be certain that no bit errors have occurred.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لو checksum تطابق، هل يمكن التأكد من عدم وجود أخطاء بتات؟",
              explanation: "خطأ — checksum قد يفشل في كشف بعض الأخطاء (نادرة).",
            },
            {
              q: "A switch is a plug and play device that builds its table automatically. For each incoming frame, the switch stores: (1) MAC address in the frame destination address field, (2) the interface from which the frame arrived, (3) current time.",
              options: ["True", "False"],
              correct: 0,
              translation: "الـ Switch جهاز plug-and-play يبني جدوله تلقائياً.",
              explanation: "صح — Self-learning switch.",
            },
            {
              q: "Consider that ISP has been allocated the address block 200.23.16.0/23 and wants to divide this block into 4 equal sized contiguous address blocks. Then the following are correct blocks addresses: 200.23.16.0/25; 200.23.16.128/25; 200.23.17.0/25; 200.23.17.128/25.",
              options: ["True", "False"],
              correct: 0,
              translation: "تقسيم 200.23.16.0/23 إلى 4 كتل /25.",
              explanation: "صح — كل /25 فيه 128 عنوان.",
            },
          ],
        },
      ],
    },
    {
      category: "Dr. Tarek Mohamed",
      icon: "👨‍🏫",
      description: "Computer Networks midterms by Dr. Tarek Mohamed",
      items: [
        {
          t: "MidTerm 2022 — Questions",
          d: "Introduction to Computer Networks — 2022 questions",
          pdf: "Computer Networks/Questions/Mid/Dr. Tarek/2022/MidTerm 2022 - Questions - Computer Networks.pdf",
          questions: [
            {
              q: "The number of layers in ISO/OSI reference model is",
              options: ["5", "7", "6", "10"],
              correct: 1,
              translation: "عدد الطبقات في نموذج ISO/OSI هو:",
              explanation: "7 طبقات — معيار OSI الكلاسيكي.",
            },
            {
              q: "A set of rules that governs data communication is called",
              options: ["Protocols", "Standards", "RFCs", "Servers"],
              correct: 0,
              translation: "مجموعة قواعد تحكم الاتصال تُسمى:",
              explanation: "بروتوكولات (Protocols).",
            },
            {
              q: "The structure or format of data is called",
              options: ["Syntax", "Semantics", "Struct", "Formatting"],
              correct: 0,
              translation: "هيكل أو تنسيق البيانات يُسمى:",
              explanation: "البنية (Syntax).",
            },
            {
              q: "A ______ is a physical path over which a message travels.",
              options: ["Path", "Medium", "Protocol", "Route"],
              correct: 1,
              translation: "______ هو مسار مادي ينتقل عبره الاتصال.",
              explanation: "الوسط (Medium).",
            },
            {
              q: "Which of these is not a network edge device?",
              options: ["PC", "Smartphones", "Servers", "Switch"],
              correct: 3,
              translation: "أي مما يلي ليس جهاز حافة الشبكة؟",
              explanation: "Switch — جهاز داخلي، مش حافة.",
            },
            {
              q: "A ______ is a device that forwards packets between networks by processing the routing information included in the packet.",
              options: ["bridge", "firewall", "router", "hub"],
              correct: 2,
              translation:
                "______ جهاز يمرر الحزم بين الشبكات بمعالجة معلومات التوجيه.",
              explanation: "الموجّه (Router).",
            },
            {
              q: "A list of protocols used by a system, one protocol per layer, is called ______",
              options: [
                "protocol architecture",
                "protocol stack",
                "protocol suite",
                "protocol system",
              ],
              correct: 1,
              translation: "قائمة بروتوكولات يستخدمها نظام، بروتوكول لكل طبقة:",
              explanation: "حزمة البروتوكولات (Protocol Stack).",
            },
            {
              q: "Network congestion occurs ______",
              options: [
                "in case of traffic overloading",
                "when a system terminates",
                "when connection between two nodes terminates",
                "in case of transfer failure",
              ],
              correct: 0,
              translation: "ازدحام الشبكة يحدث ______",
              explanation: "عند زيادة الحمل في الترافيك.",
            },
            {
              q: "P2P applications face the challenge",
              options: ["ISP Friendly", "Security", "all of the mentioned"],
              correct: 1,
              translation: "تطبيقات P2P تواجه تحدي:",
              explanation: "الأمان (Security) — بسبب الطبيعة الموزعة.",
            },
            {
              q: "The rate at which data is transferred is referred to as ______",
              options: [
                "transmission rate",
                "transfer ratio",
                "compression rate",
              ],
              correct: 0,
              translation: "المعدل الذي تُنقل به البيانات:",
              explanation: "معدل الإرسال (Transmission rate).",
            },
            {
              q: "End systems access the Internet through",
              options: [
                "Internet Service Providers ISPs",
                "Customer premises Equipment CBE",
                "Digital subscriber line DSL",
              ],
              correct: 0,
              translation: "الأنظمة الطرفية تصل للإنترنت عبر:",
              explanation: "مزوّدي خدمة الإنترنت (ISPs).",
            },
            {
              q: "The only control that the application developer has on the transport-layer side is",
              options: [
                "the choice of transport protocol",
                "perhaps the ability to fix a few transport-layer parameters",
                "all of the mentioned",
              ],
              correct: 2,
              translation: "التحكم الوحيد لمطور التطبيق في طبقة النقل:",
              explanation: "كل ما ذُكر — اختيار البروتوكول وبعض المعاملات.",
            },
          ],
        },
        {
          t: "MidTerm 2022 — Answers",
          d: "Introduction to Computer Networks — 2022 answers",
          pdf: "Computer Networks/Questions/Mid/Dr. Tarek/2022/MidTerm 2022 - Answers - Computer Networks.pdf",
          questions: [
            {
              q: "The number of layers in ISO/OSI reference model is",
              options: ["5", "7", "6", "10"],
              correct: 1,
              translation: "عدد الطبقات في ISO/OSI:",
              explanation: "7 طبقات.",
            },
            {
              q: "A set of rules that governs data communication is called",
              options: ["Protocols", "Standards", "RFCs", "Servers"],
              correct: 0,
              translation: "قواعد تحكم الاتصال:",
              explanation: "بروتوكولات.",
            },
            {
              q: "The structure or format of data is called",
              options: ["Syntax", "Semantics", "Struct", "Formatting"],
              correct: 0,
              translation: "هيكل البيانات:",
              explanation: "Syntax.",
            },
            {
              q: "A ______ is a physical path over which a message travels.",
              options: ["Path", "Medium", "Protocol", "Route"],
              correct: 1,
              translation: "مسار مادي للرسالة:",
              explanation: "Medium.",
            },
            {
              q: "Which of these is not a network edge device?",
              options: ["PC", "Smartphones", "Servers", "Switch"],
              correct: 3,
              translation: "ليس جهاز حافة:",
              explanation: "Switch.",
            },
          ],
        },
      ],
    },
    {
      category: "Other Midterms",
      icon: "📁",
      description: "Miscellaneous Computer Networks midterms",
      items: [
        {
          t: "Exam.pdf",
          d: "Mixed question bank — layers, protocols, delays",
          pdf: "Computer Networks/Questions/Mid/Other/Exam.pdf",
          questions: [
            {
              q: "The ......... moves the individual bits of a frame from one node to the next through communication links.",
              options: [
                "physical layer",
                "link layer",
                "network layer",
                "application layer",
              ],
              correct: 0,
              translation: "______ ينقل البتات الفردية من عقدة لأخرى:",
              explanation: "الطبقة الفيزيائية (Physical layer).",
            },
            {
              q: "Ethernet, 802.11 and PPP are ......... protocols.",
              options: [
                "application layer",
                "transport layer",
                "network layer",
                "link layer",
              ],
              correct: 3,
              translation: "Ethernet و 802.11 و PPP بروتوكولات ______:",
              explanation: "طبقة الوصلة (Link layer).",
            },
            {
              q: "The ......... provides synchronization, checkpointing and data exchange recovery during communication between applications.",
              options: [
                "application layer",
                "presentation layer",
                "session layer",
                "link layer",
              ],
              correct: 2,
              translation:
                "______ يوفر التزامن ونقاط التحقق واستعادة تبادل البيانات:",
              explanation: "طبقة الجلسة (Session layer).",
            },
            {
              q: "In the data link layer, what is the primary function of the framing process?",
              options: [
                "To encapsulate data with header information for addressing and error detection.",
                "To compress data for more efficient transmission.",
                "To route data packets across different networks.",
                "To establish and manage connections between applications.",
              ],
              correct: 0,
              translation: "في طبقة الوصلة، الوظيفة الأساسية للـ Framing:",
              explanation: "تغليف البيانات برأس للعنونة وكشف الأخطاء.",
            },
            {
              q: "What is port number for HTTP protocol?",
              options: ["80", "200", "25", "403"],
              correct: 0,
              translation: "ما رقم منفذ HTTP؟",
              explanation: "80.",
            },
            {
              q: "What is port number for HTTPS protocol?",
              options: ["200", "25", "403", "80"],
              correct: 2,
              translation: "ما رقم منفذ HTTPS؟",
              explanation: "443 — أو حسب الخيارات 403 خطأ مطبعي، الصحيح 443.",
            },
            {
              q: "What is port number for SMTP protocol?",
              options: ["200", "25", "403", "80"],
              correct: 1,
              translation: "ما رقم منفذ SMTP؟",
              explanation: "25.",
            },
            {
              q: "What are the main advantages of using a switched network compared to a shared media network?",
              options: [
                "Switched networks are less expensive to implement and require simpler cabling.",
                "Switched networks offer higher bandwidth and reduced collisions for individual devices.",
                "Switched networks are easier to manage and troubleshoot compared to shared media networks.",
                "Switched networks are inherently more secure due to isolated data paths.",
              ],
              correct: 1,
              translation: "مزايا الشبكة المُبدَّلة على المشتركة:",
              explanation: "عرض نطاق أعلى وتقليل التصادمات لكل جهاز.",
            },
          ],
        },
        {
          t: "Mid Answers.pdf",
          d: "Midterm answers — set 1",
          pdf: "Computer Networks/Questions/Mid/Other/Mid Answers.pdf",
          questions: [
            {
              q: "The number of layers in ISO OSI reference model is",
              options: ["5", "7", "6", "10"],
              correct: 1,
              translation: "عدد طبقات ISO OSI:",
              explanation: "7.",
            },
            {
              q: "A set of rules that governs data communication is called",
              options: ["Protocols", "Standards", "RFCs", "Servers"],
              correct: 0,
              translation: "قواعد الاتصال:",
              explanation: "Protocols.",
            },
            {
              q: "The structure or format of data is called",
              options: ["Syntax", "Semantics", "Struct", "Formatting"],
              correct: 0,
              translation: "هيكل البيانات:",
              explanation: "Syntax.",
            },
            {
              q: "A ______ is a physical path over which a message travels.",
              options: ["Path", "Medium", "Protocol", "Route"],
              correct: 1,
              translation: "مسار مادي:",
              explanation: "Medium.",
            },
            {
              q: "Which of these is not a network edge device?",
              options: ["PC", "Smartphones", "Servers", "Switch"],
              correct: 3,
              translation: "ليس جهاز حافة:",
              explanation: "Switch.",
            },
          ],
        },
        {
          t: "MidTerm 2023 - Assessment - Computer Networks.pdf",
          d: "Assessment midterm 2023",
          pdf: "Computer Networks/Questions/Mid/Other/MidTerm 2023 - Assessment - Computer Networks.pdf",
          questions: [
            {
              q: "Which of the following layers doesn't appear in the Internet Protocol Stack?",
              options: [
                "Application layer",
                "Network layer",
                "Transport layer",
                "Session layer",
              ],
              correct: 3,
              translation: "أي طبقة لا تظهر في Internet Protocol Stack؟",
              explanation: "طبقة الجلسة (Session).",
            },
            {
              q: "Which of the following statements is true?",
              options: [
                "Both the Internet and traditional telephone networks use packet-switching.",
                "Performance metrics such as end-to-end delay and throughput can be guaranteed in the Internet, if TCP is chosen as the transport layer protocol.",
                "In the Internet, packets from the same source always take the same path to reach destination.",
                "The Internet uses packet switching and traditional telephone networks use circuit switching.",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة؟",
              explanation:
                "الإنترنت = packet switching، الهاتف = circuit switching.",
            },
            {
              q: "Which of the following statements is true about circuit switching?",
              options: [
                "Resources are pre-allocated regardless of demand",
                "Packet transmission can use the full link bandwidth",
                "The path between a source and a destination is not fixed",
                "None of the above",
                "All of the above",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة عن Circuit Switching؟",
              explanation: "الموارد تُخصص مسبقاً.",
            },
            {
              q: "Which of the following is present in both HTTP request line and status line?",
              options: [
                "HTTP version number",
                "Request method",
                "Status code",
                "URL",
                "None of the above",
              ],
              correct: 0,
              translation: "موجود في request line وstatus line؟",
              explanation: "رقم إصدار HTTP.",
            },
            {
              q: "Which of the following statements about DNS is TRUE?",
              options: [
                "TLD servers store all the hostname to IP mappings of the Internet.",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation: "بيانات قديمة بسبب الـ Caching.",
            },
          ],
        },
      ],
    },
  ],
  finalsCategories: [
    {
      category: "Computer Networks 2026 - Credit - Dr. Ebram",
      icon: "🌐",
      description: "Final 2026 Computer Networks - Credit - Dr. Ebram",
      items: [
        {
          t: "فاينل 2026 - Credit - د. إبرام — Computer Networks",
          d: "اختبار الفاينل لمادة Computer Networks - Credit 2026 (د. إبرام)",
          pdf: "Computer Networks/Questions/Final/2026/Final 2026 - Computer Networks - Credit - Dr. Ebram.pdf",
          questions: [
            {
              q: "In Go-back-N protocol, what are the size of the respective sender and receiver buffers required for a window size of N?",
              options: ["1; 1", "N - 1; 1", "N; N", "N; 1"],
              correct: 3,
              translation: "في Go-back-N، أحجام المخازن لحجم نافذة N؟",
              explanation: "N; 1.",
            },
            {
              q: "Assume a sender and a receiver connected via one packet-switch. The sender sends a message of size 24 KBytes using packets of length 1000 Bytes. The bit rates are 2 kbps and 5 kbps for the first and the second link, respectively. Using store and forward, what is the end-to-end delay (in seconds)? You may ignore the propagation delay!",
              options: ["16.8", "134.4", "124", "16800"],
              correct: 1,
              translation: "زمن النهاية-للنهاية باستخدام store-and-forward؟",
              explanation:
                "24 حزمة × (1000/2000 + 1000/5000) = 24 × 0.7 = 16.8... لكن في store-and-forward نحسب: 24 × 8 × 1000/2000 + 24 × 8 × 1000/5000 = 96 + 38.4 = 134.4.",
            },
            {
              q: "Consider sending a 1500-byte IP datagram into a link that has an MTU of 500 bytes. Suppose that IP header is 20 bytes long. How many fragments will be generated?",
              options: ["3", "4", "5", "2"],
              correct: 1,
              translation: "كم عدد الأجزاء (Fragments)؟",
              explanation: "4 — كل جزء 500 بايت (480 بيانات + 20 رأس).",
            },
            {
              q: "The following diagram shows a simple network topology with 4 nodes. The links in the diagram are labeled with the cost of each link. The nodes run distance vector routing protocol. The protocol has just started, at node X, what is the cost to node z?",
              options: ["6", "3", "5", "23"],
              correct: 0,
              translation: "تكلفة المسار من X إلى z؟",
              explanation: "6 — حسب الطوبولوجيا.",
            },
            {
              q: "Router R3 received two datagrams, which router to deliver it to if the datagrams has a destination IP address 200.23.19.3 and 200.23.18.33?",
              options: ["R2, R1", "R2, R2", "R1, R1", "R1, R2"],
              correct: 3,
              translation: "أي موجّه يسلّم الحزمتين؟",
              explanation: "R1, R2 — حسب جدول التمرير.",
            },
            {
              q: "Which of the following protocols can be used to get the mappings of IP address and MAC address of other nodes in a different subnet?",
              options: ["ARP", "DNS", "DHCP", "None of the options"],
              correct: 0,
              translation:
                "أي بروتوكول يُستخدم لتعيين IP و MAC في شبكة فرعية مختلفة؟",
              explanation: "ARP — عبر الراوتر الوسيط.",
            },
            {
              q: "Consider the transmission between a UDP sender and a UDP receiver. Which of the following will never happen? You may assume that the application riding on UDP doesn't implement any reliability mechanisms.",
              options: [
                "UDP receiver fails to receive any packet from UDP sender.",
                "UDP receiver receives out-of-order packets from UDP sender.",
                "UDP receiver receives duplicate packets from UDP sender.",
                "UDP receiver receives corrupted packets from UDP sender but fails to detect bit errors.",
              ],
              correct: 3,
              translation: "أي مما يلي لن يحدث أبداً في UDP؟",
              explanation:
                "استقبال حزم تالفة دون كشف الأخطاء — لأن UDP يستخدم Checksum.",
            },
            {
              q: "Can HTTP response message contains an empty body? If yes, When can this happen?",
              options: [
                "No, an HTTP response message can never have an empty body.",
                "Yes, if the requested object has been moved to a new location.",
                "Yes, if the requested object is recently modified.",
                "Yes, if the requested object is very small in size.",
              ],
              correct: 3,
              translation:
                "هل يمكن أن تحتوي رسالة HTTP response على body فارغ؟",
              explanation: "نعم — لو الكائن صغير جداً أو في حالات معينة.",
            },
            {
              q: "Which of the following statements is true?",
              options: [
                "Both the Internet and traditional telephone networks use packet-switching.",
                "Performance metrics such as end-to-end delay and throughput can be guaranteed in the Internet, if TCP is chosen as the transport layer protocol.",
                "In the Internet, packets from the same source always take the same path to reach destination.",
                "The Internet uses packet switching and traditional telephone networks uses circuit switching.",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة؟",
              explanation:
                "الإنترنت = packet switching، الهاتف = circuit switching.",
            },
            {
              q: "Consider the following diagram, what is the destination MAC address in the frame transmitted from node A if node A is sending to node B?",
              options: [
                "74-29-9C-E8-FF-55",
                "E6-E9-00-17-BB-4B",
                "1A-23-F9-CD-06-9B",
                "49-BD-D2-C7-56-2A",
              ],
              correct: 3,
              translation: "ما عنوان MAC الوجهة في الإطار من A إلى B؟",
              explanation: "حسب الطوبولوجيا — عنوان واجهة B.",
            },
            {
              q: "Which of the following is present in both HTTP request line and status line?",
              options: [
                "HTTP version number",
                "Request method",
                "Status code",
                "URL",
              ],
              correct: 3,
              translation: "موجود في request line وstatus line؟",
              explanation: "رقم إصدار HTTP.",
            },
            {
              q: "Which of the following HTTP protocols does the given figure represent to fetch a web page with 2 reference objects?",
              options: [
                "Non-persistent HTTP.",
                "Persistent HTTP.",
                "Non-persistent HTTP with parallel connection.",
                "Persistent HTTP with pipelining.",
              ],
              correct: 3,
              translation: "أي بروتوكول HTTP يمثله الشكل؟",
              explanation: "Persistent HTTP with pipelining — حسب الرسم.",
            },
            {
              q: "Considering the operation of a learning switch and its forwarding table in the following figure. Which interface will the switch forward a frame transmitted from node D to node A?",
              options: ["1", "3", "4", "1, 2, 4"],
              correct: 3,
              translation: "أي واجهة سيمرر فيها السويتش الإطار؟",
              explanation: "حسب جدول التمرير.",
            },
            {
              q: "Consider a 4-bit generator G with value 1001, what is the CRC checksum R if data D has the value 10001100001?",
              options: ["011", "100", "110", "0110"],
              correct: 3,
              translation: "ما قيمة CRC checksum R؟",
              explanation: "0110 — حسب عملية القسمة على G.",
            },
            {
              q: "Given a subnet with network prefix 192.168.1.0/24, how many hosts can be connected to this subnet?",
              options: ["256", "255", "253", "254"],
              correct: 3,
              translation: "كم عدد الأجهزة الممكن توصيلها؟",
              explanation: "254 = 2^8 - 2 (عنوان الشبكة والبث محجوزان).",
            },
            {
              q: "Which of the following statements is true about TCP and not true about UDP?",
              options: [
                "Provides timing service.",
                "Provides minimum throughput guarantee service.",
                "Provides security service.",
                "Provides reliable transport service.",
              ],
              correct: 3,
              translation: "صحيحة عن TCP وليست عن UDP؟",
              explanation: "يوفر نقل موثوق (Reliable transport).",
            },
            {
              q: "Which of the following statements is true about circuit switching?",
              options: [
                "Resources are pre-allocated regardless of demand",
                "Packet transmission can use the full link bandwidth",
                "The path between a source and a destination is not fixed",
                "All of the options",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة عن Circuit Switching؟",
              explanation: "الموارد تُخصص مسبقاً.",
            },
            {
              q: "Which of the following layers doesn't appear in the Internet Protocol Stack?",
              options: [
                "Application layer",
                "Network layer",
                "Transport layer",
                "Session layer",
              ],
              correct: 3,
              translation: "أي طبقة لا تظهر؟",
              explanation: "Session layer.",
            },
            {
              q: "Which of the following statements about DNS is TRUE?",
              options: [
                "TLD servers store all the hostname to IP mappings of the Internet.",
                "Every Web server must have a canonical name.",
                "Local DNS server sometimes may provide out-of-date hostname-to-IP-address mapping.",
                "DNS server listens to TCP port 53.",
              ],
              correct: 3,
              translation: "أي عبارة عن DNS صحيحة؟",
              explanation: "بيانات قديمة بسبب Caching.",
            },
            {
              q: "Which of the following protocols can be used by routers for error signaling?",
              options: ["DHCP", "ICMP", "ARP", "NAT"],
              correct: 1,
              translation: "أي بروتوكول يستخدمه الموجّهات لإشارات الأخطاء؟",
              explanation: "ICMP.",
            },
            {
              q: "A Web server stores a webpage that comprises a base HTML file and 2 images referenced by the base HTML file. The HTML file is 100 bytes and each image is 200 bytes. A client is connected to the Web server through a direct link of 1 Mbps. Propagation delay between the Web server and the client is 50 milliseconds. The client downloads the webpage using persistent HTTP but without pipelining. Assume HTTP header, TCP header and ACK packets are of negligible size, transmission channel is perfectly reliable, time to establish and close TCP connection can be ignored. How long (in milliseconds) does it take for the client to download the entire webpage from the Web server?",
              options: ["404", "604", "204", "402.4"],
              correct: 3,
              translation: "كم يستغرق تحميل الصفحة كاملة؟",
              explanation:
                "402.4 — حسب الحسابات: 3 كائنات × (RTT + transmission).",
            },
            {
              q: "A source and a destination are separated by 3*10^5 kilometers and are connected by a direct link of 2 Kbps. The propagation speed over the link is 2*10^8 meters/second. The source sends 100 packets to the destination using RDT 2.2. Each packet is of 2*10^3 bits long. Suppose ACK packets are of negligible size and transmission channel is perfectly reliable. What is the throughput (in bps) of transmission?",
              options: ["200", "500", "100", "400"],
              correct: 3,
              translation: "ما معدل النقل (Throughput)؟",
              explanation: "400 — حسب حسابات RTT.",
            },
            {
              q: "A Selective Repeat sender just receives an ACK packet with ACK number 7. This ACK number falls within sender window which has the window size 3. Every data packet embeds a k-bit sequence number field (k is a constant unknown to you). Which of the following definitely CANNOT be the sequence number of the next packet transmitted by the sender?",
              options: ["0", "2", "3", "6"],
              correct: 3,
              translation: "أي رقم لا يمكن أن يكون رقم الحزمة التالية؟",
              explanation: "6 — لأنه سيكون خارج النافذة.",
            },
            {
              q: "Consider a sender and a receiver communicating using Selective Repeat protocol. Every packet embeds a 4-bit sequence number field. Sender window size is 4. None of the packets shown in the following figure are corrupted packets. However, the third data packet and the second ACK packet are lost. What is the sender window over the sequence number space at time t?",
              options: [
                "12, 13, 14, 15",
                "13, 14, 0, 1",
                "13, 14, 15, 0",
                "13, 14, 15, 16",
              ],
              correct: 3,
              translation: "ما هي نافذة المرسل؟",
              explanation: "حسب الشكل والحسابات.",
            },
            {
              q: "The router in the following figure is a NAT enabled router, what is the source IP address when the router forwards a datagram transmitted from the host with IP address 172.26.184.3 to a server with IP address 128.119.40.186.",
              options: [
                "172.26.184.3",
                "128.119.40.186",
                "172.26.184.1",
                "137.132.228.5",
              ],
              correct: 3,
              translation: "ما عنوان IP المصدر بعد NAT؟",
              explanation: "حسب جدول NAT — عنوان الراوتر العام.",
            },
          ],
        },
      ],
    },
    {
      category: "Computer Networks 2026 - Dr. Nago",
      icon: "🌐",
      description: "Final 2026 Computer Networks - Dr. Nago",
      items: [
        {
          t: "فاينل 2026 - د. ناجو — Computer Networks",
          d: "اختبار الفاينل لمادة Computer Networks - 2026 (د. ناجو)",
          pdf: "Computer Networks/Questions/Final/2026/Final 2026 - Computer Networks - Dr. Nago.pdf",
          questions: [
            {
              q: "A NAT translation table typically maps:",
              options: [
                "Public IP address → Private IP address only",
                "Public port number → Private port number only",
                "(Private IP address, Private port number) ↔ (Public IP address, Public port number)",
                "Private IP address → Public IP address only",
                "Private port number → Public port number only",
                "None of the above",
              ],
              correct: 5,
              translation: "جدول ترجمة NAT عادةً يعيّن:",
              explanation:
                "(Private IP, Private Port) ↔ (Public IP, Public Port) — كلاهما معاً.",
            },
            {
              q: 'Suppose that there is exactly one packet switch "X" between a sending host "A" and a receiving host "B". The transmission rate of the link between "A" and "X" as well as the link between "X" and "B" is R bps. Assume that the packet switch "X" uses cut-through. If the processing, queuing, and propagation delays are ignored, what is the total end-to-end delay to send a packet of length L bits from "A" to "B"?',
              options: [
                "Zero",
                "2L/R",
                "2R/L",
                "L/R",
                "R/L",
                "None of the above",
              ],
              correct: 3,
              translation: "في cut-through، زمن النهاية-للنهاية؟",
              explanation:
                "L/R — لأن Cut-through لا ينتظر استلام الحزمة كاملة.",
            },
            {
              q: "Which of the following statements correctly describe the advantages and disadvantages of switches and routers?",
              options: [
                "Switches always require manual configuration and cannot operate at full-duplex. Routers eliminate collisions and are faster because they process packets only up to link layer.",
                "Switches support hierarchical addressing and firewall protection. Routers are plug-and-play and eliminate collision.",
                "Switches are plug-and-play, do not offer any protection against broadcast storms, and the active topology of a switched network is restricted to spanning tree. Routers have a larger per-packet processing time than switches, support hierarchical addressing, but require configuration.",
                "There is no restriction on switched network topology. But the active topology of the network that uses routers is restricted to spanning tree.",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة تصف مزايا وعيوب السويتشات والراوترات؟",
              explanation:
                "السويتش plug-and-play، الراوتر يحتاج تهيئة لكن يدعم عنونة هرمية.",
            },
            {
              q: "Assume Host A sends five consecutive data segments to Host B using GBN, or TCP (no delayed ACK). The timeout values for all protocols are sufficiently long such that all five data segments and their corresponding ACKs can be received by both hosts before any timeout event, if not lost in the channel. Suppose the second ACK from host B is lost and no further losses or errors occur after that. In the end, all five data segments have been correctly received by Host B. Which of the following correctly describes the total segments sent by Host A and total ACKs sent by Host B?",
              options: [
                "(GBN→6, TCP→6); (GBN→5, TCP→5)",
                "(GBN→9, TCP→6); (GBN→7, TCP→5)",
                "(GBN→5, TCP→5); (GBN→6, TCP→6)",
                "(GBN→9, TCP→6); (GBN→5, TCP→5)",
                "(GBN→5, TCP→5); (GBN→5, TCP→5)",
                "(GBN→9, TCP→6); (GBN→8, TCP→5)",
                "None of the above",
              ],
              correct: 5,
              translation: "كم عدد الحزم و ACKs في GBN و TCP؟",
              explanation: "حسب السيناريو المحدد — حساب يدوي.",
            },
            {
              q: "Which of the following correctly describes the characteristics of switching fabrics inside a router?",
              options: [
                "Switching via memory and bus forwards multiple packets simultaneously.",
                "Switching via bus is faster than switching via interconnection network.",
                "Switching via bus forwards only one packet at a time, while switching via standard interconnection network can forward multiple packets in parallel unless they target the same output.",
                "Switching via memory forward packets without routing processor intervention.",
                "All of the above",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة تصف خصائص switching fabrics؟",
              explanation:
                "Bus يمرر حزمة واحدة، Interconnection Network يمرر عدة حزم بالتوازي.",
            },
            {
              q: "Which of the following best distinguishes forwarding from routing in the internet network layer?",
              options: [
                "Forwarding moves packets within a router; routing determines best end-to-end paths.",
                "Forwarding is network-wide; routing is router-local.",
                "Forwarding determines paths; routing moves packets between nodes on these paths.",
                "Forwarding is fixed; routing is dynamic.",
                "None of the above",
              ],
              correct: 0,
              translation: "الفرق بين Forwarding و Routing؟",
              explanation:
                "Forwarding محلي داخل الراوتر، Routing عالمي لتحديد المسارات.",
            },
            {
              q: "Why does a DHCP client initially send its discover message to 255.255.255.255?",
              options: [
                "Because the client does not yet know the IP address of DHCP server.",
                "Because the DHCP server only listens to broadcast messages with broadcast IPs.",
                "Because DHCP server does not know the IP address of the client.",
                "None of the above",
              ],
              correct: 0,
              translation:
                "لماذا يرسل عميل DHCP رسالة Discover إلى 255.255.255.255؟",
              explanation: "لأنه لا يعرف عنوان IP لسيرفر DHCP.",
            },
            {
              q: "Which of the following statements correctly describes circuit switching?",
              options: [
                "Circuit switching allows multiple users to share the same channel dynamically, providing high efficiency during idle periods, but it cannot guarantee bandwidth or delay.",
                "Circuit switching eliminates the need for a dedicated path, uses packet-based transmission, and is highly efficient, but it suffers from high delay during congestion.",
                "Circuit switching provides no dedicated resources, allows dynamic bandwidth allocation, and guarantees low delay, but is prone to packet loss.",
                "Circuit switching can provide a dedicated path with guaranteed bandwidth and low delay for the duration of the connection, but it can be inefficient if the circuit is idle, and call setup introduces additional delay.",
                "None of the above",
              ],
              correct: 3,
              translation: "أي عبارة تصف Circuit Switching؟",
              explanation: "مسار مخصص بضمان عرض النطاق لكن غير فعّال لو خامل.",
            },
            {
              q: "Which of the following is a disadvantage of TDM and FDM?",
              options: [
                "Collisions are frequent and unavoidable.",
                "Nodes must use random backoff algorithm.",
                "A master node is needed.",
                "A node is limited to use a fraction of the channel even if it is the only active node.",
                "None of the above",
              ],
              correct: 3,
              translation: "عيب TDM و FDM؟",
              explanation:
                "العقدة محدودة بجزء من القناة حتى لو كانت الوحيدة النشطة.",
            },
            {
              q: "Which of the following correctly lists Cookie technology components in the Web?",
              options: [
                "A cookie header in the HTTP response; a cookie header in the HTTP request; a proxy cache that stores cookies; and a DNS database at the server.",
                "A cookie file in the HTTP response message; a cookie file in the HTTP request message; a cookie file stored on the user's end system; and a back-end database at the Web site.",
                "A cookie header line in the HTTP response message; a cookie header line in the HTTP request message; a shared proxy cache managed by the ISP; and a back-end database at the Web site.",
                "A cookie header line in the HTTP response; a cookie header line in the HTTP request; a cookie file kept on the user's end system and managed by the user's browser; and a back-end database at the Web site.",
                "A cookie header line in the HTTP response; a cookie header line in the HTTP request; a cookie file kept on the user's end system; and a back-end DNS database at the server.",
                "None of the above",
              ],
              correct: 3,
              translation: "مكونات تقنية الكوكيز في الويب؟",
              explanation:
                "رأس كوكي في الاستجابة + رأس كوكي في الطلب + ملف كوكي على المستخدم + قاعدة بيانات خلفية.",
            },
            {
              q: "Which of the following correctly describes DNS servers?",
              options: [
                "Root servers store all DNS records; TLD servers map hostnames; authoritative servers are connected directly to local servers, which are connected to local users.",
                "Root servers provide the IP addresses of TLD servers; TLD servers provide the IP addresses of authoritative servers; authoritative servers maintain host-to-IP mappings; and local servers are connected to local users.",
                "Root servers map hostnames for TLD servers; TLD servers map hostnames for authoritative servers; and authoritative servers provide IP addresses of local servers.",
                "Root servers maintain host-to-IP mappings of TLD servers; TLD servers maintain host-to-IP mappings of authoritative servers; authoritative servers maintain host-to-IP mappings of local servers; and local servers maintain host-to-IP mappings of local users.",
                "None of the above",
              ],
              correct: 1,
              translation: "أي عبارة تصف سيرفرات DNS؟",
              explanation:
                "Roots → TLDs → Authoritative → Local — التسلسل الهرمي.",
            },
            {
              q: "A client retrieves a web page consisting of one base HTML file and two embedded objects, all stored on the same web server. The size of the HTML file and each embedded object is 100 Kbits. The round-trip time between the client and the server is 50 ms, and the data transmission rate is 10 Mbps. The client uses persistent HTTP with pipelining. Assume that the transmission time of control packets is negligible. What is the minimum time required for the client to completely receive the entire web page?",
              options: [
                "80 ms",
                "130 ms",
                "150 ms",
                "180 ms",
                "200 ms",
                "230 ms",
                "330 ms",
                "None of the above",
              ],
              correct: 2,
              translation: "أقل زمن لاستلام الصفحة كاملة؟",
              explanation: "150 ms — حساب مع RTT و persistent pipelining.",
            },
            {
              q: "In BitTorrent, why does a peer request the rarest chunk first from its neighbors?",
              options: [
                "To maximize the peer's individual download speed by selecting chunks that arrive fastest.",
                "To prioritize sending chunks to peers that upload the fastest to others.",
                "To give priority to chunks uploaded directly from the original server.",
                "To force peers to remain in the torrent until everyone finishes.",
                "To ensure that the rarest chunks are more quickly redistributed and are obtained early before the peers that own them leave the torrent.",
                "None of the above",
              ],
              correct: 4,
              translation: "لماذا يطلب Peer الأندر أولاً؟",
              explanation:
                "لضمان إعادة توزيع القطع النادرة قبل مغادرة أصحابها.",
            },
            {
              q: "In TCP, if the receiver window is zero, what can the sender do?",
              options: [
                "Stop sending segments until the receiver advertises a nonzero window",
                "Continue to send segments with one data byte until the receiver advertises a nonzero window",
                "Continue sending normal segment size",
                "Ask the receiver to increase its window size",
                "None of the above",
              ],
              correct: 0,
              translation: "لو نافذة المستقبل صفر؟",
              explanation:
                "يتوقف عن الإرسال حتى يُعلن المستقبل نافذة غير صفرية.",
            },
            {
              q: 'A host "X" on Subnet 1 wants to send a datagram to a host "Y" on Subnet 2. Which MAC address will the ARP module in host "X" request if it does not already have it?',
              options: [
                'The MAC address of the host "Y" interface',
                "The MAC address of the last-hop router interface on Subnet 2",
                "The MAC address of the first-hop router interface on Subnet 1",
                "None of the above",
              ],
              correct: 2,
              translation: "أي MAC يطلبه ARP من X؟",
              explanation:
                "MAC لواجهة الراوتر الأول على Subnet 1 — الوجهة الفعلية على نفس الشبكة.",
            },
            {
              q: "Which of the following statements about FTP is correct?",
              options: [
                "FTP uses a single TCP connection for both control and data.",
                "The FTP control connection is persistent, but a new data connection is created for each file.",
                "FTP data connection remains open throughout the session.",
                "Both FTP control connection and data connection remain open throughout the session.",
                "None of the above",
              ],
              correct: 1,
              translation: "أي عبارة عن FTP صحيحة؟",
              explanation: "اتصال التحكم مستمر، واتصال بيانات جديد لكل ملف.",
            },
            {
              q: "Which of the following best explains HTTP and SMTP?",
              options: [
                "HTTP connection can be persistent or non-persistent; SMTP connection is persistent.",
                "SMTP sends each object in a separate response message; HTTP sends all objects in one message.",
                "SMTP and HTTP require 7-bit ASCII encoding.",
                "HTTP is push protocol; SMTP is pull protocol.",
                "All of the above",
                "None of the above",
              ],
              correct: 0,
              translation: "أي عبارة عن HTTP و SMTP؟",
              explanation: "HTTP persistent/non-persistent، SMTP persistent.",
            },
            {
              q: "Consider that a switch has the following forwarding table: MAC address 62-FE-F7-11-89-A3 is associated with interface 1, and MAC address 7C-BA-B2-B4-91-10 is associated with interface 3. A frame with source MAC address AA-BB-CC-DD-EE-FF arrives at interface 2 and has destination MAC address 11-22-33-44-55-66. What action does the switch take?",
              options: [
                "The switch broadcasts the frame to all interfaces except interface 2 and adds a new entry to the forwarding table that associates the MAC address AA-BB-CC-DD-EE-FF with interface 2.",
                "The switch drops the frame (Filtering).",
                "The switch forwards the frame only to interface 2.",
                "The switch broadcasts the frame to all interfaces except interface 2 and adds a new entry to the forwarding table that associates the MAC address 11-22-33-44-55-66 with interface 2.",
                "None of the above",
              ],
              correct: 0,
              translation: "ماذا يفعل السويتش في هذه الحالة؟",
              explanation:
                "يبث الإطار لكل الواجهات ما عدا 2، ويضيف عنوان المصدر للجدول.",
            },
            {
              q: "Which of the following is a key difference between TCP and UDP from the transport layer services perspective?",
              options: [
                "TCP provides de-multiplexing; UDP does not.",
                "TCP provides reliable, connection-oriented service; UDP provides unreliable, connectionless service.",
                "UDP guarantees timing and throughput; TCP does not.",
                "UDP guarantees timing and throughput; TCP guarantees reliability and security.",
              ],
              correct: 1,
              translation: "الفرق الجوهري بين TCP و UDP؟",
              explanation: "TCP موثوق ومع اتصال، UDP غير موثوق وبدون اتصال.",
            },
            {
              q: "A router interconnects three subnets (A, B, and C), all using addresses from 192.168.10.0/24, where Subnet A requires at least 100 interfaces, Subnet B requires at least 50 interfaces, and Subnet C requires at least 20 interfaces. Which of the following sets of subnet network addresses satisfies all these constraints if oversized subnets are allowed?",
              options: [
                "Subnet A uses 192.168.10.0/26, Subnet B uses 192.168.10.64/25, and Subnet C uses 192.168.10.192/28.",
                "Subnet A uses 192.168.10.0/25, Subnet B uses 192.168.10.128/26, and Subnet C uses 192.168.10.192/26.",
                "Subnet A uses 192.168.10.0/25, Subnet B uses 192.168.10.64/26, and Subnet C uses 192.168.10.128/27.",
                "Subnet A uses 192.168.10.0/26, Subnet B uses 192.168.10.64/26, and Subnet C uses 192.168.10.128/27.",
                "None of the above",
              ],
              correct: 3,
              translation: "أي مجموعة من عناوين الشبكات تحقق القيود؟",
              explanation:
                "A يحتاج 100 = /25 على الأقل، B يحتاج 50 = /26، C يحتاج 20 = /27.",
            },
            {
              q: "Consider the GBN protocol with a sender window size of 4 and a sequence number range of 1,024. Suppose that at time t, the next in-order packet that the receiver is expecting has a sequence number of k. Assume that the medium does not reorder messages. Which of the following is possible set of sequence numbers inside the sender's window at time t?",
              options: [
                "{k,k+1,k+2,k+3}",
                "{k-1,k,k+1,k+2}",
                "{k-2,k-1,k,k+1}",
                "{k-3,k-2,k-1,k}",
                "{k-4,k-3,k-2,k-1}",
                "All of the above",
                "None of the above",
              ],
              correct: 5,
              translation: "أي مجموعة ممكنة في نافذة المرسل؟",
              explanation: "حسب سيناريو GBN — الحساب الدقيق.",
            },
            {
              q: "An IP datagram of 3000 bytes (no options header) is transmitted over a link with an MTU of 1500 bytes. Which of the following option is correct?",
              options: [
                "Number of Fragments = 3 ; Frag#1: Offset=0, MF=1 ; Frag#2: Offset=1500, MF=1 ; Frag#3: Offset=3000, MF=0",
                "Number of Fragments = 2 ; Frag#1: Offset=0, MF=1 ; Frag#2: Offset=185, MF=0",
                "Number of Fragments = 3 ; Frag#1: Offset=0, MF=0 ; Frag#2: Offset=1480, MF=0 ; Frag#3: Offset=2960, MF=1",
                "Number of Fragments = 2 ; Frag#1: Offset=0, MF=1 ; Frag#2: Offset=1500, MF=0",
                "Number of Fragments = 3 ; Frag#1: Offset=0, MF=1 ; Frag#2: Offset=185, MF=1 ; Frag#3: Offset=370, MF=0",
                "Number of Fragments = 2 ; Frag#1: Offset=0, MF=0 ; Frag#2: Offset=1500, MF=1",
                "None of the above",
              ],
              correct: 4,
              translation: "أي خيار صحيح عن الـ Fragmentation؟",
              explanation: "3 أجزاء — Offset بوحدات 8 بايت (185 = 1480/8).",
            },
            {
              q: "Consider TCP receiver waits for the segment with sequence number 1000. The sender sends two segments back-to-back with sequence numbers: 1000 contains 500 bytes, 1500 contains 500 bytes. If the first segment is lost and the second arrives, the receiver sends:",
              options: [
                "ACK 1000",
                "ACK 1500",
                "ACK 2000",
                "ACK 2500",
                "None of the above",
              ],
              correct: 0,
              translation: "ماذا يرسل المستقبل؟",
              explanation: "ACK 1000 — لأنه ينتظر الحزمة 1000.",
            },
            {
              q: "Which of the following is NOT true about RIP?",
              options: [
                "RIP counts the number of subnets traversed along the shortest path from source router to destination subnet including the destination subnet.",
                "The maximum cost of a path is limited to 15.",
                "Routing updates are exchanged between neighbors approximately every 30 seconds using RIP response message.",
                "RIP requires each node to first obtain a complete map of the network before running the algorithm.",
                "None of the above",
              ],
              correct: 3,
              translation: "أي عبارة غير صحيحة عن RIP؟",
              explanation: "RIP لا يحتاج خريطة كاملة — هو Distance Vector.",
            },
            {
              q: "A mail server runs an SMTP service on port 25. At a given time, the server has three active SMTP connections, all destined for port 25, established by three different clients. Which of the following is used to deliver incoming segments to the correct connection?",
              options: [
                "Matching only the destination IP address and destination port number",
                "Matching only the source IP address and source port number",
                "Matching only the source IP address and destination port number",
                "Matching only the source port number and destination IP address",
                "Matching the source IP address, source port number, destination IP address, and destination port number",
                "None of the above",
              ],
              correct: 4,
              translation: "كيف يُسلَّم لكل اتصال؟",
              explanation: "بمطابقة 4-tuple كامل.",
            },
            {
              q: "Which of the following is correct ?",
              options: [
                "IMAP provides commands to allow users to create folders and move messages from one folder to another.",
                "IMAP provides commands that allow users to search remote folders for messages matching specific criteria.",
                "Unlike POP3, an IMAP server maintains state information across IMAP sessions.",
                "IMAP has commands that permit a user agent to obtain components of messages.",
                "All of the above",
                "None of the above",
              ],
              correct: 4,
              translation: "أي مما يلي صحيح عن IMAP؟",
              explanation: "كل ما ذُكر صحيح — IMAP يوفر كل هذه الإمكانيات.",
            },
            {
              q: "Three nodes X, Y, and Z share a common broadcast channel and use CSMA/CD. Node X starts transmitting at 0 ms, Nodes Y and Z attempt to transmit at 2 ms and 3 ms, respectively. The propagation delays between X-Y, Y-Z, and X-Z are 1 ms, 1 ms, and 2 ms, respectively. Assume the packet transmission time is 4 ms. Which statement is correct?",
              options: [
                "Node Y postpones transmission, node Z postpones transmission, and no collision occurs.",
                "Node Y transmits at 2 ms, node Z transmits at 3 ms, and a collision occurs.",
                "Node Y postpones transmission, node Z transmits at 3 ms, and no collision occurs.",
                "Node Y transmits at 2 ms, node Z postpones transmission, and a collision occurs.",
                "None of the above",
              ],
              correct: 0,
              translation: "أي عبارة صحيحة؟",
              explanation: "Y و Z يؤجلان الإرسال — CSMA/CD يمنع التصادم.",
            },
            {
              q: "Which of the following is NOT a challenge of P2P application architecture?",
              options: [
                "Security due to the distributed and open nature",
                "Incentivizing users to share bandwidth, storage, and computation",
                "ISP friendliness and asymmetrical bandwidth usage",
                "Infrastructure-intensive requirements such as data centers",
                "All of the above",
                "None of the above",
              ],
              correct: 3,
              translation: "أي مما يلي ليس تحدياً لـ P2P؟",
              explanation:
                "متطلبات البنية التحتية (data centers) — P2P لا يحتاجها.",
            },
            {
              q: "Which of the following statements correctly describes ISP network structures?",
              options: [
                "Network Structure#1 consists of multiple global ISPs, and Network Structure#3 extends the hierarchy by adding IXPs networks.",
                "Network Structure#1 is based on dial-up access, Network Structure#2 is based on DSL access, Network Structure#3 uses cable networks, Network Structure#4 uses FTTH, and Network Structure#5 is entirely wireless.",
                "Network Structure#2 introduces multiple global transit ISPs, Network Structure#3 introduces multiple competing regional ISPs, and Network Structure#5 allows large content provider networks to connect directly to access ISPs.",
                "Network Structure#3 adds peering links through Internet Exchange Points, and Network Structure#4 allows content provider networks to connect directly to access ISPs.",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة تصف بنى شبكات ISP؟",
              explanation: "الوصف الصحيح لتطور البنى الخمس.",
            },
            {
              q: "Which of the following is a characteristic of P2P file distribution?",
              options: [
                "Distribution time increases linearly with the number of peers",
                "The server must send a complete copy of the file to each peer.",
                "Distribution is self-scalable due to peers acting as redistributors.",
                "More secure than client-server distribution.",
                "None of the above",
              ],
              correct: 2,
              translation: "خاصية توزيع الملفات P2P؟",
              explanation: "قابل للتوسع ذاتياً لأن الأقران تعمل كموزعين.",
            },
            {
              q: "Which statement correctly compares HFC, FTTH, DSL, and Dial-Up?",
              options: [
                "DSL and Dial-Up are shared, while HFC and FTTH are dedicated",
                "HFC and Dial-Up are dedicated, while DSL and FTTH are shared",
                "HFC is shared, DSL is dedicated, Point-to-Point (Direct) FTTH is dedicated, while Dial-Up is dedicated and has the lowest rate",
                "DSL and HFC are shared, while Dial-up and FTTH are dedicated",
                "None of the above",
              ],
              correct: 2,
              translation: "مقارنة HFC و FTTH و DSL و Dial-Up؟",
              explanation: "HFC مشترك، الباقي مخصص، Dial-Up الأبطأ.",
            },
            {
              q: "Consider router D, which is a neighbor of routers A and B. Router D has an existing path to subnet Z via router B with a hop count of 7 from D to Z. Later, router D receives a routing advertisement from router A indicating that subnet Z is 6 hops away from router A. In this case, classic RIP, which keeps the existing path unless the new one is better, will:",
              options: [
                "Keep the existing path.",
                "Update the routing table to route via router A instead of router B.",
                "Cause a count-to-infinity problem.",
                "Cause an oscillation problem.",
                "None of the above",
              ],
              correct: 1,
              translation: "ماذا يفعل RIP؟",
              explanation: "يحدّث ليوجه عبر A — لأن 7 hops الجديد أفضل من 8.",
            },
            {
              q: "Which of the following is correct about IP and MAC addresses?",
              options: [
                "MAC address allows communication across different subnets, while IP address is used within a LAN.",
                "IP address is used to identify interfaces on the same LAN, while MAC address is used globally.",
                "Unlike IP address, MAC address enables device to receive frames at the link layer without the host being interrupted by irrelevant frames.",
                "IP address has flat structure while MAC address has hierarchical structure.",
                "All of the above",
                "None of the above",
              ],
              correct: 2,
              translation: "أي عبارة صحيحة عن IP و MAC؟",
              explanation:
                "MAC يسمح باستقبال الإطارات بدون إزعاج المضيف بإطارات غير ذات صلة.",
            },
            {
              q: "IPv6/IPv4 Node A wants to send data to IPv6/IPv4 Node B through an IPv4-only router. Which statement is TRUE for Tunneling Scenario?",
              options: [
                "Node A drops the datagram.",
                "Node B must downgrade to IPv4.",
                "Node A automatically converts IPv6 headers to IPv4 headers.",
                "Node A encapsulates the IPv6 datagram inside an IPv4 datagram.",
                "None of the above",
              ],
              correct: 3,
              translation: "أي عبارة صحيحة عن Tunneling؟",
              explanation:
                "Node A يغلّف IPv6 داخل IPv4 للعبور عبر راوتر IPv4 فقط.",
            },
          ],
        },
      ],
    },
    {
      category: "Computer Networks 2026 - National - Dr.Tarek",
      icon: "🌐",
      description: "Final 2026 Computer Networks - National - Dr.Tarek",
      items: [
        {
          t: "فاينل 2026 - National - د. طارق — Computer Networks",
          d: "اختبار الفاينل لمادة Computer Networks - National 2026 (د. طارق)",
          pdf: "Computer Networks/Questions/Final/2026/Final 2026 - National - Dr.Tarek.pdf",
          questions: [
            {
              q: "What is an HTTP cookie used for?",
              options: [
                "Like dessert, cookies are used at the end of a transaction, to indicate the end of the transaction",
                "A cookies is a code used by a server, carried on a client's HTTP request, to access information the server had earlier stored about an earlier interaction with this person.",
                "A cookie is a code used by a server, carried on a client's HTTP request, to access information the server had earlier stored about an earlier interaction with this Web browser.",
                "A cookie is a code used by a client to authenticate a person's identity to an HTTP server.",
              ],
              correct: 2,
              translation: "فيم يُستخدم كوكي HTTP؟",
              explanation:
                "كود يستخدمه السيرفر عبر طلب العميل للوصول لمعلومات مخزنة عن تفاعل سابق مع المتصفح.",
            },
            {
              q: "an IPv4 datagram has a",
              options: ["4-byte header", "8-byte header", "20-byte header"],
              correct: 2,
              translation: "حزمة IPv4 لها:",
              explanation: "رأس 20 بايت (بدون خيارات).",
            },
            {
              q: "Which of the characteristics below are associated with a client-server approach to structuring network applications (as opposed to a P2P approach)",
              options: [
                "A process requests service from those it contacts and will provide service to processes that contact it.",
                "There is a server with a well known server IP address.",
                "There is not a server that is always on",
                "None of the above",
              ],
              correct: 1,
              translation: "خصائص نهج client-server؟",
              explanation: "يوجد سيرفر بعنوان IP معروف.",
            },
            {
              q: "Transfer of a bit into and out of a transmission media",
              options: [
                "Application Layer",
                "Transport layer",
                "Network layer",
                "Physical layer",
              ],
              correct: 3,
              translation: "نقل بت من وإلى وسط النقل؟",
              explanation: "الطبقة الفيزيائية (Physical).",
            },
            {
              q: "What specifies the format of packets that are sent and received among routers and end systems",
              options: ["TCP", "UDP", "IP", "DNS"],
              correct: 2,
              translation: "ما الذي يحدد تنسيق الحزم بين الراوترات والأنظمة؟",
              explanation: "IP.",
            },
            {
              q: 'Which of the following descriptions below correspond to a "services" view of the Internet?',
              options: [
                "A platform for building network applications",
                "A collection of billions of computing devices, and packet switches interconnected by links",
                'A "network of networks".',
                "A collection of hardware and software components executing protocols that define the format and the order of messages exchanged between two or more communicating entities, as well as the actions taken on the transmission and/or receipt of a message or other event.",
              ],
              correct: 0,
              translation: "أي وصف يمثل رؤية 'الخدمات' للإنترنت؟",
              explanation: "منصة لبناء تطبيقات الشبكة.",
            },
            {
              q: "Match the function of a server to a given type of DNS server in the DNS server hierarchy. Replies to DNS query by local host, by contacting other DNS servers to answer the query.",
              options: [
                "Local DNS server",
                "Authoritative DNS server",
                "DNS root servers",
                "Top Level Domain (TLD) servers",
              ],
              correct: 0,
              translation:
                "مطابقة وظيفة السيرفر مع نوعه: يرد على استعلام DNS بالاتصال بسيرفرات أخرى.",
              explanation: "سيرفر DNS المحلي (Local).",
            },
            {
              q: "Time spent transmitting packets bits into the link",
              options: [
                "Processing delay",
                "Propagation delay",
                "Transmission delay",
                "Queueing delay",
              ],
              correct: 2,
              translation: "الوقت المستغرق لإرسال بتات الحزمة في الرابط؟",
              explanation: "تأخير الإرسال (Transmission delay).",
            },
            {
              q: "Which of the following are changes between HTTP 1.1 and HTTP/2?",
              options: [
                "HTTP/2 allows a large object to be broken down into smaller pieces, and the transmission of those pieces to be interleaved with transmission other smaller objects, thus preventing a large object from forcing many smaller objects to wait their turn for transmission.",
                "HTTP/2 provides enhanced security by using transport layer security (TLS).",
                "HTTP/2 has many new HTTP methods and status codes.",
                "All of the above",
              ],
              correct: 0,
              translation: "أي تغييرات بين HTTP 1.1 و HTTP/2؟",
              explanation: "HTTP/2 يسمح بتقسيم الكائنات الكبيرة وتشبيك النقل.",
            },
            {
              q: "Match the name of an Internet layer with unit of data that is exchanged among protocol entities at that layer, Application layer",
              options: ["Datagram", "Message", "Bit", "Segment"],
              correct: 1,
              translation: "طابق الطبقة مع وحدة البيانات — طبقة التطبيق:",
              explanation: "رسالة (Message).",
            },
            {
              q: "Forwarding is the local action of moving arriving packets from router's input link to appropriate router output link, while routing is the global action of determining the source-destination paths taken by packets.",
              options: ["True", "False"],
              correct: 0,
              translation: "Forwarding محلي و Routing عالمي.",
              explanation: "صح — تعريف صحيح.",
            },
            {
              q: "When an application uses a UDP socket, what transport services are provided to the application by UDP?",
              options: [
                "Throughput guarantee.",
                "Congestion control.",
                "Best effort service.",
                "Flow Control.",
              ],
              correct: 2,
              translation: "ما الخدمات التي يوفرها UDP؟",
              explanation: "خدمة Best effort — لا ضمانات.",
            },
            {
              q: "What is the purpose of a cookie value in the HTTP GET request?",
              options: [
                "The cookie value encodes a default set of preferences that the user has previously specified for this web site",
                "The cookie value encodes the format of the reply preferred by the client in the response to this GET request",
                "The cookie value itself doesn't mean anything. It is just a value that was returned by a web server to this client during an earlier interaction",
                "The cookie value indicates whether the user wants to use HTTP/1, HTTP/1.1, or HTTP/2 for this GET request.",
              ],
              correct: 2,
              translation: "ما الغرض من قيمة الكوكي في HTTP GET؟",
              explanation:
                "قيمة أرجعها السيرفر للعميل في تفاعل سابق — لا معنى بحد ذاتها.",
            },
            {
              q: "What is the purpose of the HTTP GET message?",
              options: [
                "The HTTP GET request message is sent by a web server to a web client to get the identity of the web client.",
                "The HTTP GET request message is sent by a web server to a web client to get the next request from the web client.",
                "The HTTP GET request message is used by a web client to request a web server to send the requested object from the server to the client.",
                "The HTTP GET request message is used by a web client to post an object on a web server.",
              ],
              correct: 2,
              translation: "ما الغرض من رسالة HTTP GET؟",
              explanation: "العميل يطلب من السيرفر إرسال الكائن المطلوب.",
            },
            {
              q: "Which of the fields below are in a UDP segment header",
              options: [
                "Internet checksum",
                "Upper layer protocol",
                "Data (payload)",
                "Sequence number",
              ],
              correct: 0,
              translation: "أي حقول في رأس UDP؟",
              explanation: "Checksum — من حقول رأس UDP.",
            },
            {
              q: "Time spent waiting in packet buffers for link transmission",
              options: [
                "Processing delay",
                "Propagation delay",
                "Transmission delay",
                "Queueing delay",
              ],
              correct: 3,
              translation: "الوقت المستغرق في مخازن الحزم؟",
              explanation: "Queueing delay.",
            },
            {
              q: 'What do we mean when we say "HTTP is stateless"? In answering this question, assume that cookies are not used',
              options: [
                "The HTTP protocol is not licensed in any country.",
                "An HTTP client does not remember anything about what happened during earlier steps in interacting with any HTTP server.",
                "An HTTP server does not remember anything about what happened during earlier steps in interacting with this HTTP client",
                "An HTTP client does not remember the identities of the servers with which it has interacted.",
              ],
              correct: 2,
              translation: "ماذا يعني أن HTTP 'عديم الحالة'؟",
              explanation:
                "السيرفر لا يتذكر شيئاً عن التفاعلات السابقة مع العميل.",
            },
            {
              q: "Which of the characteristics below are associated with the technique of circuit switching?",
              options: [
                "This technique is used in the Internet",
                "Congestion loss and variable end-end delays are possible with this technique",
                "Resources are used on demand, not reserved in advance",
                "Frequency Division Multiplexing (FDM) and Time Division Multiplexing (TDM) are two approaches for implementing this technique",
              ],
              correct: 3,
              translation: "خصائص Circuit Switching؟",
              explanation: "FDM و TDM طريقتان لتنفيذها.",
            },
            {
              q: 'When we say that the Internet is a "network of networks," we mean?',
              options: [
                "The Internet is the largest network ever built",
                "The Internet is made up of a lot of different networks that are interconnected to each other",
                "The Internet is the fastest network ever built",
                "All of the above",
              ],
              correct: 1,
              translation: "ماذا يعني 'شبكة الشبكات'؟",
              explanation: "الإنترنت مكون من شبكات كثيرة مترابطة.",
            },
            {
              q: "What is the purpose of the conditional HTTP GET request message?",
              options: [
                "To allow a server to only send the requested object to the client if the server is not overloaded.",
                "To allow a server to only send the requested object to the client if this object has changed since the server last sent this object to the client",
                "To allow a server to only send the requested object to the client if the client is authorized to received that object.",
                "To allow a server to only send the requested object to the client if the client has never requested that object before",
              ],
              correct: 1,
              translation: "الغرض من Conditional HTTP GET؟",
              explanation: "إرسال الكائن فقط لو تغير منذ آخر مرة.",
            },
            {
              q: "Time need for bits to physically propagate through the transmission medium from end one of a link to the other",
              options: [
                "Processing delay",
                "Propagation delay",
                "Transmission delay",
                "Queueing delay",
              ],
              correct: 1,
              translation: "وقت انتشار البتات في الوسط؟",
              explanation: "Propagation delay.",
            },
            {
              q: "Match the name of an Internet layer with unit of data that is exchanged among protocol entities at that layer, Link layer",
              options: ["Datagram", "Message", "Segment", "Frame"],
              correct: 3,
              translation: "طبقة الوصلة — وحدة البيانات:",
              explanation: "إطار (Frame).",
            },
            {
              q: "Match the name of an Internet layer with unit of data that is exchanged among protocol entities at that layer, Transport layer",
              options: ["Datagram", "Message", "Bit", "Segment"],
              correct: 3,
              translation: "طبقة النقل — وحدة البيانات:",
              explanation: "مقطع (Segment).",
            },
            {
              q: "Delivery of datagrams from a source host to a destination host (typically)",
              options: [
                "Link layer",
                "Application Layer",
                "Transport layer",
                "Network layer",
              ],
              correct: 3,
              translation: "تسليم Datagrams من مصدر لوجهة؟",
              explanation: "Network layer.",
            },
            {
              q: "Which of the characteristics below are associated with the technique of packet switching?",
              options: [
                "Frequency Division Multiplexing (FDM) and Time Division Multiplexing (TDM) are two approaches for implementing this technique.",
                "This technique was the basis for the telephone call switching during the 20th century and into the beginning of this current century.",
                "Data may be queued before being transmitted due to other user's data that's also queueing for transmission.",
                "Reserves resources needed for a call from source to destination",
              ],
              correct: 2,
              translation: "خصائص Packet Switching؟",
              explanation:
                "البيانات قد تنتظر في طابور بسبب بيانات مستخدمين آخرين.",
            },
            {
              q: "P2P networks do not need a server",
              options: ["True", "False"],
              correct: 0,
              translation: "شبكات P2P لا تحتاج سيرفر.",
              explanation: "صح — الأقران تتعاون.",
            },
            {
              q: "Match the function of a server to a given type of DNS server in the DNS server hierarchy. Provides authoritative hostname to IP mappings for organization's named hosts.",
              options: [
                "Local DNS server",
                "Authoritative DNS server",
                "DNS root servers",
                "Top Level Domain (TLD) servers",
              ],
              correct: 1,
              translation: "يوفر تعيينات hostname إلى IP للمنظمة:",
              explanation: "Authoritative DNS server.",
            },
            {
              q: "Transfer of data between one process and another process (typically on different hosts)",
              options: [
                "Link layer",
                "Application Layer",
                "Transport layer",
                "Network layer",
              ],
              correct: 2,
              translation: "نقل البيانات من عملية لعملية:",
              explanation: "Transport layer.",
            },
            {
              q: 'Which of the following descriptions below correspond to a "nuts-and-bolts" view of the Internet?',
              options: [
                "A platform for building network applications",
                'A "network of networks"',
                "A place I go for information, entertainment, and to communicate with people",
                "All of the above",
              ],
              correct: 1,
              translation: "أي وصف يمثل رؤية 'Nuts and Bolts'؟",
              explanation: "'شبكة الشبكات'.",
            },
            {
              q: "Where is transport-layer functionality primarily implemented",
              options: [
                'Transport layer functions are implemented primarily at the hosts at the "edge" of the network',
                "Transport layer functions are implemented primarily at the routers and switches in the network",
                "Transport layer functions are implemented primarily at each end of a physical link connecting one host/router/switch to another one host/router/switch",
                "None of the above",
              ],
              correct: 0,
              translation: "أين تُنفَّذ وظائف طبقة النقل؟",
              explanation: "في المضيفين عند 'حافة' الشبكة.",
            },
            {
              q: "Match the name of an Internet layer with unit of data that is exchanged among protocol entities at that layer, Network layer",
              options: ["Datagram", "Message", "Segment", "Frame"],
              correct: 0,
              translation: "طبقة الشبكة — وحدة البيانات:",
              explanation: "Datagram.",
            },
            {
              q: "UDP packet has",
              options: [
                "2 byte header",
                "8 byte header",
                "12 byte header",
                "16 byte header",
              ],
              correct: 1,
              translation: "كم حجم رأس UDP؟",
              explanation: "8 بايت.",
            },
            {
              q: "Which of the characteristics below are associated with a P2P approach to structuring network applications (as opposed to a client-server approach)?",
              options: [
                "There is a server that is always on",
                "HTTP uses this application structure",
                "There is a server with a well known server IP address",
                "There is not a server that is always on",
              ],
              correct: 3,
              translation: "خصائص نهج P2P؟",
              explanation: "لا يوجد سيرفر دائم.",
            },
            {
              q: "Match the name of an Internet layer with unit of data that is exchanged among protocol entities at that layer, Physical layer",
              options: ["Datagram", "Message", "Bit", "Segment"],
              correct: 2,
              translation: "الطبقة الفيزيائية — وحدة البيانات:",
              explanation: "بت (Bit).",
            },
            {
              q: "Match the function of a server to a given type of DNS server in the DNS server hierarchy. Responsible for a domain (e.g., *.com, *.edu); knows how to contact authoritative name servers",
              options: [
                "Local DNS server",
                "Authoritative DNS server",
                "DNS root servers",
                "Top Level Domain (TLD) servers",
              ],
              correct: 3,
              translation:
                "مسؤول عن نطاق (com، edu) ويعرف كيف يتصل بسيرفرات authoritative:",
              explanation: "Top Level Domain (TLD) servers.",
            },
            {
              q: 'Which of the definitions below describe what is meant by the term "encapsulation"?',
              options: [
                "Determining the name of the destination host, translating that name to an IP address and then placing that value in a packet header field.",
                "Starting a transport layer timer for a transmitted segment, and then if an ACK segment isn't received before the timeout, placing that segment in a retransmission queue.",
                'Taking data from the layer above, adding header fields appropriate for this layer, and then placing the data in the payload field of the "packet" for that layer.',
                'Receiving a "packet" from the layer below, extracting the payload field, and after some internal actions possibly delivering that payload to an upper layer protocol.',
              ],
              correct: 2,
              translation: "ما تعريف Encapsulation؟",
              explanation:
                "أخذ البيانات من الطبقة الأعلى، إضافة رأس مناسب، ووضعها في حقل الحمولة.",
            },
            {
              q: "Match the function of a server to a given type of DNS server in the DNS server hierarchy. Highest level of the DNS hierarchy, knows how to reach servers responsible for a given domain (e.g., *.com, *.edu)",
              options: [
                "Local DNS server",
                "Authoritative DNS server",
                "DNS root servers",
                "Top Level Domain (TLD) servers",
              ],
              correct: 2,
              translation: "أعلى مستوى في هرمية DNS:",
              explanation: "DNS root servers.",
            },
            {
              q: "Which of the characteristics below are associated with a client-server approach to structuring network applications (as opposed to a P2P approach)",
              options: [
                "A process requests service from those it contacts and will provide service to processes that contact it.",
                "There is a server with a well known server IP address",
                "There is not a server that is always on",
                "All of the above",
              ],
              correct: 1,
              translation: "خصائص client-server؟",
              explanation: "سيرفر بعنوان IP معروف.",
            },
            {
              q: "Transfer of data between neighboring network devices",
              options: [
                "Link layer",
                "Application Layer",
                "Transport layer",
                "Network layer",
              ],
              correct: 0,
              translation: "نقل البيانات بين أجهزة شبكة متجاورة:",
              explanation: "Link layer.",
            },
            {
              q: "When there is not enough memory to buffer an incoming packet, a decision must be made to either drop the arriving packet (a policy known as drop-tail) or remove one or more already-queued packets to make room for the newly arrived packet.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عندما لا تتوفر ذاكرة كافية، إما إسقاط الحزمة الجديدة أو إزالة حزم من الطابور.",
              explanation: "صح — سياسة Drop-tail.",
            },
            {
              q: "Time needed to perform an integrity check, lookup packet information in a local table and move the packet from an input link to an output link in a router.",
              options: [
                "Processing delay",
                "Propagation delay",
                "Transmission delay",
                "Queueing delay",
              ],
              correct: 0,
              translation: "الوقت لفحص السلامة والبحث في الجدول والنقل:",
              explanation: "Processing delay.",
            },
            {
              q: "Protocols that are part of a distributed network application",
              options: [
                "Link layer",
                "Application Layer",
                "Transport layer",
                "Network layer",
              ],
              correct: 1,
              translation: "بروتوكولات جزء من تطبيق شبكي موزع:",
              explanation: "Application Layer.",
            },
            {
              q: "Which of the following physical layer technologies has the highest transmission rate and lowest bit error rate in practice?",
              options: [
                "Twisted pair (e.g., CAT5, CAT6)",
                "Coaxial cable",
                "Satellite channel",
                "Fiber optic cable",
              ],
              correct: 3,
              translation: "أعلى معدل نقل وأقل معدل خطأ؟",
              explanation: "Fiber optic cable.",
            },
            {
              q: "When an application uses a TCP socket, what transport services are provided to the application by TCP?",
              options: [
                "Throughput guarantee.",
                "Real-time delivery.",
                "Congestion control.",
                "Best effort service.",
              ],
              correct: 2,
              translation: "خدمات TCP؟",
              explanation: "Congestion control — التحكم في الازدحام.",
            },
          ],
        },
      ],
    },
  ],
  testBanks: [
    {
      t: "Test Bank - Computer Networks - Final",
      d: "Final Question Bank - Computer Networks",
      pdf: "Computer Networks/Questions/Test Bank/Test Bank - Computer Networks - Final.pdf",
      questions: [
        {
          q: "What are the two most prominent types of packet switches in today's Internet?",
          options: [
            "Modems and switches",
            "Hubs and bridges",
            "Routers and link-layer switches",
            "Servers and clients",
          ],
          correct: 2,
          translation: "ما أبرز نوعين لمبدلات الحزم في الإنترنت اليوم؟",
          explanation: "الموجّهات (Routers) ومبدلات طبقة الوصلة.",
        },
        {
          q: "In the Internet protocol stack, application-layer protocols such as HTTP and SMTP are almost always implemented in software in the end systems.",
          options: ["True", "False"],
          correct: 0,
          translation:
            "بروتوكولات طبقة التطبيق تُنفَّذ في البرمجيات في الأنظمة الطرفية.",
          explanation: "صح.",
        },
        {
          q: "Which of the following is NOT a type of delay experienced by packets in packet-switched networks?",
          options: [
            "Processing delay",
            "Queuing delay",
            "Compilation delay",
            "Propagation delay",
          ],
          correct: 2,
          translation: "أي مما يلي ليس نوعاً من التأخير؟",
          explanation: "Compilation delay — ليس تأخير شبكي.",
        },
        {
          q: "Which access technology uses a combination of fiber optics and coaxial cable, often referred to as HFC?",
          options: [
            "DSL",
            "FTTH",
            "Cable Internet access",
            "5G Fixed Wireless",
          ],
          correct: 2,
          translation: "أي تقنية وصول تستخدم HFC؟",
          explanation: "Cable Internet access.",
        },
        {
          q: "The propagation delay in a network is calculated as d/s, where d is the distance between routers and s is the propagation speed of the link.",
          options: ["True", "False"],
          correct: 0,
          translation: "تأخير الانتشار = d/s.",
          explanation: "صح.",
        },
        {
          q: "Which type of multiplexing is used in circuit-switched networks?",
          options: [
            "Packet multiplexing",
            "Frequency-division multiplexing (FDM) or time-division multiplexing (TDM)",
            "Code-division multiplexing",
            "Statistical multiplexing",
          ],
          correct: 1,
          translation: "أي نوع من التقسيم في Circuit Switching؟",
          explanation: "FDM أو TDM.",
        },
        {
          q: "In the five-layer Internet protocol stack, which layers are typically implemented by link-layer switches?",
          options: [
            "Layers 1 and 2",
            "Layers 1, 2, and 3",
            "All five layers",
            "Only layer 1",
          ],
          correct: 0,
          translation: "أي طبقات تُنفَّذ في link-layer switches؟",
          explanation: "طبقتان فقط: 1 و 2.",
        },
        {
          q: "Consider a simple network with two end systems connected by a single router. If the source has three packets, each consisting of L bits, to send to the destination over links with transmission rate R, what is the total time for the destination to receive all three packets?",
          options: ["3L/R", "2L/R", "4L/R", "6L/R"],
          correct: 2,
          translation: "زمن إرسال 3 حزم عبر راوتر؟",
          explanation: "4L/R — 3 حزم × L/R + تأخير إضافي للحزمة الأولى.",
        },
        {
          q: "In a network with N links between server and client, where each link has transmission rates R1, R2, ..., RN, what determines the throughput for a file transfer?",
          options: [
            "The average of all transmission rates",
            "The sum of all transmission rates",
            "min{R1, R2, ..., RN}, which is the transmission rate of the bottleneck link",
            "The maximum transmission rate among all links",
          ],
          correct: 2,
          translation: "ما يحدد معدل النقل؟",
          explanation: "min{R1...RN} — معدل الرابط العنق الزجاجة.",
        },
        {
          q: "Which of the following statements about packet switching versus circuit switching is correct?",
          options: [
            "Circuit switching offers better sharing of transmission capacity",
            "Packet switching is more suitable for voice calls due to predictable delays",
            "Packet switching offers better sharing of transmission capacity and is simpler, more efficient, and less costly to implement than circuit switching",
            "Circuit switching has variable end-to-end delays",
          ],
          correct: 2,
          translation: "أي عبارة صحيحة؟",
          explanation: "Packet switching أفضل في المشاركة وأبسط وأرخص.",
        },
        {
          q: "Tier-1 ISPs do not pay anyone as they are at the top of the hierarchy in the Internet's network structure.",
          options: ["True", "False"],
          correct: 0,
          translation: "Tier-1 ISPs لا تدفع لأحد.",
          explanation: "صح.",
        },
        {
          q: "What is encapsulation in the context of network protocols?",
          options: [
            "Encrypting data for security",
            "Compressing data to reduce size",
            "The process where each layer adds its header information to the packet from the layer above, creating a new packet",
            "Removing unnecessary data from packets",
          ],
          correct: 2,
          translation: "ما هي Encapsulation؟",
          explanation: "إضافة رأس من كل طبقة للحزمة القادمة من الأعلى.",
        },
        {
          q: "Which physical medium is described as immune to electromagnetic interference, has very low signal attenuation up to 100 kilometers, and is very hard to tap?",
          options: [
            "Twisted-pair copper wire",
            "Coaxial cable",
            "Fiber optics",
            "Terrestrial radio channels",
          ],
          correct: 2,
          translation: "أي وسط فيزيائي محصن ضد التداخل الكهرومغناطيسي؟",
          explanation: "Fiber optics.",
        },
        {
          q: "In Network Structure 5, which describes today's Internet, content-provider networks like Google attempt to bypass upper-tier ISPs by doing what?",
          options: [
            "Building their own satellite networks",
            "Using only wireless connections",
            "Peering with lower-tier ISPs directly or at Internet Exchange Points (IXPs) and connecting to tier-1 ISPs for remaining access",
            "Eliminating the need for any ISP connections",
          ],
          correct: 2,
          translation: "كيف تتجاوز Google الطبقات العليا؟",
          explanation: "Peering مع ISPs المستوى الأدنى و IXPs.",
        },
        {
          q: "A distributed denial-of-service (DDoS) attack is harder to detect and defend against than a DoS attack from a single host.",
          options: ["True", "False"],
          correct: 0,
          translation: "DDoS أصعب في الكشف من DoS.",
          explanation: "صح.",
        },
        {
          q: "Which of the following best describes the socket interface in Internet communication?",
          options: [
            "A hardware component for network connections",
            "A physical port on end systems",
            "A set of rules that a sending program must follow so that the Internet can deliver data to a destination program on another end system",
            "A type of packet switch",
          ],
          correct: 2,
          translation: "ما واجهة Socket؟",
          explanation: "قواعد يجب اتباعها لتسليم البيانات لبرنامج آخر.",
        },
        {
          q: "End systems are also referred to as hosts because they host application programs such as Web browsers and email clients.",
          options: ["True", "False"],
          correct: 0,
          translation: "الأنظمة الطرفية تُسمى مضيفين لأنها تستضيف تطبيقات.",
          explanation: "صح.",
        },
        {
          q: "The Internet Engineering Task Force (IETF) develops Internet standards documented as RFCs (Requests for Comments).",
          options: ["True", "False"],
          correct: 0,
          translation: "IETF تطوّر معايير الإنترنت كـ RFCs.",
          explanation: "صح.",
        },
        {
          q: "What happens when the traffic intensity (La/R) exceeds 1 in a packet-switched network?",
          options: [
            "The network operates at optimal efficiency",
            "Packets are transmitted faster",
            "The queue will tend to increase without bound and queuing delay will approach infinity",
            "The network automatically reduces packet size",
          ],
          correct: 2,
          translation: "ماذا يحدث لو La/R > 1؟",
          explanation:
            "الطابور ينمو بلا حدود وتأخير الانتظار يقترب من اللانهاية.",
        },
        {
          q: "DSL technology is expressly designed for short distances, and generally requires that residences be located within what distance of the central office (CO)?",
          options: [
            "1 to 2 miles",
            "5 to 10 miles",
            "15 to 20 miles",
            "25 to 30 miles",
          ],
          correct: 1,
          translation: "ما مدى DSL؟",
          explanation: "5-10 أميال من CO.",
        },
        {
          q: "socket is referred to as the.....between the application and the network",
          options: ["isp", "Api", "dns", "vpn"],
          correct: 1,
          translation: "الـ Socket يُشار إليه كـ..... بين التطبيق والشبكة.",
          explanation: "API — واجهة برمجة التطبيقات.",
        },
        {
          q: "many multimedia applications are considered to be",
          options: [
            "bandwidth-sensitive application",
            "real time-sensitive application",
            "elastic application",
            "jitter-intolerant application",
          ],
          correct: 0,
          translation: "تطبيقات الوسائط المتعددة تُعتبر:",
          explanation: "حساسة لعرض النطاق (bandwidth-sensitive).",
        },
        {
          q: "TCP connection is a half-duplex connection",
          options: ["true", "false"],
          correct: 1,
          translation: "اتصال TCP هو half-duplex.",
          explanation: "خطأ — TCP full-duplex.",
        },
        {
          q: "The TCP flow-control mechanism throttles a sending process (client or server) when the network is congested between sender and receiver",
          options: ["true", "false"],
          correct: 1,
          translation:
            "آلية Flow Control في TCP تخنق المرسل عند ازدحام الشبكة.",
          explanation:
            "خطأ — Flow Control يتحكم في المستقبل، Congestion Control يتحكم في الشبكة.",
        },
        {
          q: "The default mode of HTTP uses ....",
          options: [
            "persistent connections with pipelining",
            "persistent connections with non-parallel",
            "non-persistent with non-parallel",
            "non-persistent with parallel",
          ],
          correct: 0,
          translation: "الوضع الافتراضي لـ HTTP:",
          explanation: "اتصالات مستمرة مع pipelining (HTTP/1.1).",
        },
        {
          q: "status codes 400 means ...",
          options: [
            "The requested document does not exist on this server.",
            "The requested HTTP protocol version is not supported by the server.",
            "There is a generic error code indicating that the request could not be understood by the server.",
            "Request succeeded and the information is returned in the response",
          ],
          correct: 2,
          translation: "ماذا يعني status code 400؟",
          explanation: "خطأ عام — الطلب غير مفهوم.",
        },
        {
          q: "A client sends the following HTTP request to the server: GET /styles/main.css HTTP/1.1 Host: example.com If-Modified-Since: Tue, 02 Dec 2025 10:00:00 GMT. The file main.css on the server has a Last-Modified date of: Tue, 01 Dec 2025 15:00:00 GMT. What status code should the server return?",
          options: ["304", "200", "505", "301"],
          correct: 0,
          translation: "ما رمز الحالة الذي سيرجعه السيرفر؟",
          explanation: "304 Not Modified — لأن الملف لم يتغير.",
        },
        {
          q: "how can http/1.1 overcoming the Head of Line (HOL) blocking problem?",
          options: [
            "by opening multiple parallel TCP connections",
            "by using framing mechanism",
            "by using congestion mechanism",
            "none of the above",
          ],
          correct: 0,
          translation: "كيف يتغلب HTTP/1.1 على مشكلة HOL؟",
          explanation: "بفتح عدة اتصالات TCP متوازية.",
        },
        {
          q: "The primary goals for HTTP/2 ...",
          options: [
            "HTTP/2 are to reduce perceived latency by enabling request and response multiplexing over a single TCP connection",
            "to get rid of (or at least reduce the number of) parallel TCP connections for transporting a single Web page",
            "using framing mechanism to avoid (HOL) blocking",
            "all of the above",
          ],
          correct: 3,
          translation: "الأهداف الأساسية لـ HTTP/2:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "HTTP require multimedia data to be ASCII encoded before transfer.",
          options: ["true", "false"],
          correct: 1,
          translation: "HTTP يتطلب ترميز ASCII للوسائط المتعددة.",
          explanation: "خطأ — SMTP فقط.",
        },
        {
          q: "The DNS protocol runs over ... and uses port ....",
          options: ["TCP, 35", "TCP, 80", "UDP, 53", "UDP, 80"],
          correct: 2,
          translation: "DNS يعمل عبر..... ويستخدم منفذ.....",
          explanation: "UDP، منفذ 53.",
        },
        {
          q: "Which type of DNS query involves a DNS server contacting other DNS servers on behalf of the client to resolve a domain name?",
          options: ["Recursive", "Iterative", "Parallel", "Static"],
          correct: 0,
          translation:
            "أي نوع من استعلامات DNS يتضمن اتصال السيرفر بسيرفرات أخرى؟",
          explanation: "Recursive.",
        },
        {
          q: "A network entity that stores copies of recently requested objects in its local storage and satisfies HTTP requests on behalf of an origin server, often used by ISPs to reduce response time and traffic?",
          options: ["cookies", "proxy server", "DNS server", "DNS caching"],
          correct: 1,
          translation:
            "كيان شبكي يخزن نسخاً من الكائنات ويلبي الطلبات نيابةً عن السيرفر؟",
          explanation: "Proxy server.",
        },
        {
          q: "UDP include a congestion-control mechanism",
          options: ["true", "false"],
          correct: 1,
          translation: "UDP يتضمن آلية تحكم في الازدحام.",
          explanation: "خطأ — لا يوجد.",
        },
        {
          q: "TCP is a no-frills, lightweight transport protocol",
          options: ["true", "false"],
          correct: 1,
          translation: "TCP بروتوكول نقل بسيط وخفيف.",
          explanation: "خطأ — UDP هو الخفيف.",
        },
        {
          q: "The RTT includes .... (multi choice)",
          options: [
            "queuing delays",
            "processing delays",
            "propagation delays",
            "transmission delays",
          ],
          correct: 2,
          translation: "RTT يشمل:",
          explanation: "Propagation delays — من بين الخيارات المعروضة.",
        },
        {
          q: "What is the primary function of cookies in the context of web browsing?",
          options: [
            "Storing the entire webpage on the user's computer.",
            "Compressing webpage data for faster loading.",
            "Verifying user identity using encryption.",
            "Allowing the website to track user activity across multiple requests.",
          ],
          correct: 3,
          translation: "ما الوظيفة الأساسية للكوكيز؟",
          explanation:
            "السماح للموقع بتتبع نشاط المستخدم عبر الطلبات المتعددة.",
        },
        {
          q: "What type of protocol is the Simple Mail Transfer Protocol (SMTP) primarily classified as?",
          options: [
            "A \"push\" protocol, used to send email from the sender's mail server to the recipient's mail server.",
            "A peer-to-peer protocol for direct email exchange between users.",
            "A protocol for formatting the content of email messages.",
            'A "pull" protocol, used by a user agent to retrieve emails from the mailbox.',
          ],
          correct: 0,
          translation: "كيف يُصنَّف SMTP؟",
          explanation:
            "بروتوكول Push — يدفع البريد من سيرفر المرسل لسيرفر المستقبل.",
        },
        {
          q: "Why does a user agent need a protocol like IMAP or HTTP in addition to SMTP to manage email?",
          options: [
            "SMTP cannot handle attachments, so IMAP is used for files.",
            "SMTP is not secure, so HTTP with TLS is used instead.",
            "SMTP is for sending mail to the server, while IMAP or HTTP is needed to retrieve and manage mail from the server.",
            "IMAP is a newer and more efficient version of SMTP.",
          ],
          correct: 2,
          translation: "لماذا نحتاج IMAP أو HTTP مع SMTP؟",
          explanation: "SMTP للإرسال، IMAP/HTTP للاسترجاع والإدارة.",
        },
        {
          q: 'What is the main reason why peer-to-peer (P2P) file distribution architectures are considered "self-scaling"?',
          options: [
            "Because every peer who joins to download a file also contributes their upload capacity to distribute the file to others.",
            "The file size is reduced for each peer that joins the network.",
            "All peers are required to have the same high-speed internet connection.",
            "The central server's capacity automatically increases as more peers join.",
          ],
          correct: 0,
          translation: "لماذا P2P 'ذاتية التوسع'؟",
          explanation: "كل قرين يساهم بسعة الرفع.",
        },
        {
          q: "...is the principal application-layer protocol for Internet electronic mail.",
          options: ["FTP", "SMTP", "SIP", "Telnet"],
          correct: 1,
          translation:
            "...... هو بروتوكول طبقة التطبيق الرئيسي للبريد الإلكتروني.",
          explanation: "SMTP.",
        },
        {
          q: "The transport layer provides logical communication between processes running on different hosts, while the network layer provides logical communication between hosts.",
          options: ["True", "False"],
          correct: 0,
          translation:
            "طبقة النقل توفر تواصلاً منطقياً بين العمليات، وطبقة الشبكة بين المضيفين.",
          explanation: "صح.",
        },
        {
          q: "Which of the following statements about UDP and TCP is correct?",
          options: [
            "UDP provides connection-oriented service while TCP provides connectionless service",
            "Both UDP and TCP provide reliable data transfer services to applications",
            "UDP provides unreliable, connectionless service while TCP provides reliable, connection-oriented service",
            "None of the above",
          ],
          correct: 2,
          translation: "أي عبارة صحيحة عن UDP و TCP؟",
          explanation: "UDP غير موثوق وبدون اتصال، TCP موثوق ومع اتصال.",
        },
        {
          q: "The process of delivering data in a transport-layer segment to the correct socket is called:",
          options: [
            "Encapsulation",
            "Multiplexing",
            "Demultiplexing",
            "Segmentation",
          ],
          correct: 2,
          translation: "عملية تسليم البيانات للـ socket الصحيح:",
          explanation: "Demultiplexing.",
        },
        {
          q: "Well-known port numbers range from 0 to 1023 and are reserved for well-known application protocols such as HTTP and FTP.",
          options: ["True", "False"],
          correct: 0,
          translation: "المنافذ المعروفة 0-1023 مخصصة لبروتوكولات معروفة.",
          explanation: "صح.",
        },
        {
          q: "In UDP, a socket is identified by which of the following?",
          options: [
            "A two-tuple consisting of destination IP address and destination port number",
            "A four-tuple consisting of source IP address, source port number, destination IP address, and destination port number",
            "Only the destination port number",
            "A three-tuple consisting of source port number, destination IP address, and destination port number",
          ],
          correct: 0,
          translation: "كيف يُعرَّف UDP socket؟",
          explanation: "2-tuple: عنوان IP الوجهة ورقم منفذ الوجهة.",
        },
        {
          q: "Which of the following is NOT an advantage of UDP over TCP?",
          options: [
            "No connection establishment delay",
            "No connection state maintenance",
            "Guaranteed reliable data transfer",
            "Smaller packet header overhead",
          ],
          correct: 2,
          translation: "أي مما يلي ليس ميزة UDP؟",
          explanation: "ضمان النقل الموثوق — ميزة TCP.",
        },
        {
          q: "A TCP socket is identified by a four-tuple consisting of source IP address, source port number, destination IP address, and destination port number.",
          options: ["True", "False"],
          correct: 0,
          translation: "TCP socket يُعرَّف بـ 4-tuple.",
          explanation: "صح.",
        },
        {
          q: "The UDP segment header consists of how many fields?",
          options: ["Two fields", "Four fields", "Six fields", "Eight fields"],
          correct: 1,
          translation: "كم عدد حقول رأس UDP؟",
          explanation: "4 حقول: Source Port, Dest Port, Length, Checksum.",
        },
        {
          q: "Why does UDP provide a checksum for error detection even though many link-layer protocols also provide error checking?",
          options: [
            "Because UDP wants to be redundant",
            "Because there is no guarantee that all links between source and destination provide error checking, and bit errors could be introduced when a segment is stored in a router's memory",
            "Because link-layer protocols are unreliable",
            "None of the above",
          ],
          correct: 1,
          translation: "لماذا يوفر UDP Checksum؟",
          explanation: "لأنه لا يوجد ضمان أن كل الروابط توفر فحص الأخطاء.",
        },
        {
          q: "In the rdt2.0 protocol, which type of acknowledgments are used?",
          options: [
            "Only positive acknowledgments (ACK)",
            "Only negative acknowledgments (NAK)",
            "Both positive acknowledgments (ACK) and negative acknowledgments (NAK)",
            "Neither ACK nor NAK",
          ],
          correct: 2,
          translation: "في rdt2.0، أي نوع من الإقرارات؟",
          explanation: "ACK و NAK.",
        },
        {
          q: "The stop-and-wait protocol can have poor performance because the sender must wait for acknowledgment before sending the next packet.",
          options: ["True", "False"],
          correct: 0,
          translation: "Stop-and-wait له أداء ضعيف.",
          explanation: "صح — الانتظار يقلل الاستخدام.",
        },
        {
          q: "In the rdt2.1 protocol, what is the purpose of adding sequence numbers to data packets?",
          options: [
            "To ensure packets arrive in order",
            "To allow the receiver to determine whether a received packet is a retransmission or contains new data",
            "To implement flow control",
            "To detect corrupted packets",
          ],
          correct: 1,
          translation: "الغرض من أرقام التسلسل في rdt2.1؟",
          explanation: "تمييز إعادة الإرسال عن البيانات الجديدة.",
        },
        {
          q: "For a simple stop-and-wait protocol, a 1-bit sequence number is sufficient because:",
          options: [
            "It's the smallest possible sequence number",
            "It allows the receiver to distinguish between a new packet and a retransmission in modulo-2 arithmetic",
            "It reduces header overhead",
            "All of the above",
          ],
          correct: 3,
          translation: "لماذا 1-bit يكفي في stop-and-wait؟",
          explanation: "كل ما ذُكر — التمييز، تقليل الحمل، الأصغر.",
        },
        {
          q: "In the rdt3.0 protocol (alternating-bit protocol), which mechanism is used to handle packet loss?",
          options: [
            "Negative acknowledgments only",
            "Checksums only",
            "A timeout/retransmit mechanism where the sender retransmits if an ACK is not received within a timeout interval",
            "Forward error correction",
          ],
          correct: 2,
          translation: "آلية معالجة الفقد في rdt3.0؟",
          explanation: "Timeout/retransmit.",
        },
        {
          q: "Pipelining techniques allow the sender to send multiple packets without waiting for acknowledgments, which significantly improves utilization compared to stop-and-wait protocols.",
          options: ["True", "False"],
          correct: 0,
          translation: "Pipelining يحسّن الاستخدام.",
          explanation: "صح.",
        },
        {
          q: "In a Go-Back-N (GBN) protocol, when a timeout occurs, the sender:",
          options: [
            "Retransmits only the packet that timed out",
            "Retransmits all packets that have been previously sent but not yet acknowledged",
            "Sends a negative acknowledgment to the receiver",
            "Waits for another timeout before retransmitting",
          ],
          correct: 1,
          translation: "في GBN عند timeout؟",
          explanation: "يعيد إرسال كل الحزم غير المُقرّة.",
        },
        {
          q: "In GBN protocol, the receiver discards out-of-order packets because:",
          options: [
            "It simplifies receiver buffering since the receiver doesn't need to buffer any out-of-order packets",
            "Out-of-order packets are always corrupted",
            "The protocol specification requires it",
            "It improves network throughput",
          ],
          correct: 0,
          translation: "لماذا يرفض GBN خارج الترتيب؟",
          explanation: "بسّاطة المخزن.",
        },
        {
          q: "Which statement about Selective Repeat (SR) protocol is correct?",
          options: [
            "SR retransmits all unacknowledged packets when a timeout occurs",
            "SR retransmits only those packets that it suspects were received in error, requiring the receiver to individually acknowledge correctly received packets",
            "SR does not use acknowledgments",
            "SR is identical to GBN",
          ],
          correct: 1,
          translation: "أي عبارة عن SR صحيحة؟",
          explanation: "يعيد فقط الحزم المشكوك فيها، ويقرّ كل حزمة.",
        },
        {
          q: "TCP provides full-duplex service, meaning application-layer data can flow from Process A to Process B at the same time as data flows from Process B to Process A.",
          options: ["True", "False"],
          correct: 0,
          translation: "TCP full-duplex.",
          explanation: "صح.",
        },
        {
          q: "The three-way handshake in TCP connection establishment involves:",
          options: [
            "One segment from client to server",
            "Two segments exchanged between client and server",
            "Three segments exchanged where the client sends a SYN segment, the server responds with a SYNACK segment, and the client sends a final acknowledgment segment",
            "Four segments to ensure reliability",
          ],
          correct: 2,
          translation: "مصافحة TCP الثلاثية:",
          explanation: "SYN، SYNACK، ACK.",
        },
        {
          q: "The Maximum Segment Size (MSS) in TCP refers to:",
          options: [
            "The maximum size of the TCP segment including all headers",
            "The maximum amount of application-layer data in the segment, not including headers",
            "The maximum size of the TCP header",
            "The maximum size of the IP datagram",
          ],
          correct: 1,
          translation: "MSS في TCP:",
          explanation: "الحد الأقصى لبيانات طبقة التطبيق في المقطع.",
        },
        {
          q: "TCP provides cumulative acknowledgments, which means:",
          options: [
            "TCP acknowledges every single packet individually",
            "TCP only acknowledges bytes up to the first missing byte in the stream",
            "TCP acknowledges only the last received packet",
            "TCP does not use acknowledgments",
          ],
          correct: 1,
          translation: "TCP يقر بشكل تراكمي:",
          explanation: "يقر البايتات حتى أول بايت مفقود.",
        },
        {
          q: "When a TCP sender receives three duplicate ACKs for the same data, it performs a fast retransmit by retransmitting the missing segment before that segment's timer expires.",
          options: ["True", "False"],
          correct: 0,
          translation: "Fast retransmit بعد 3 ACKs مكررة.",
          explanation: "صح.",
        },
        {
          q: "The TCP timeout interval (Timeout Interval) is calculated as:",
          options: [
            "EstimatedRTT only",
            "SampleRTT × 2",
            "EstimatedRTT + 4 × DevRTT",
            "DevRTT × 4",
          ],
          correct: 2,
          translation: "حساب Timeout في TCP:",
          explanation: "EstimatedRTT + 4 × DevRTT.",
        },
        {
          q: "TCP's error-recovery mechanism is best categorized as:",
          options: [
            "Pure Go-Back-N protocol",
            "Pure Selective Repeat protocol",
            "A hybrid of GBN and SR protocols",
            "None of the above",
          ],
          correct: 2,
          translation: "تصنيف TCP:",
          explanation: "مزيج من GBN و SR.",
        },
        {
          q: "Flow control in TCP is implemented to:",
          options: [
            "Control congestion in the network",
            "Match the rate at which the sender is sending against the rate at which the receiving application is reading, preventing the sender from overflowing the receiver's buffer",
            "Ensure packets arrive in order",
            "Detect errors in transmitted segments",
          ],
          correct: 1,
          translation: "Flow Control في TCP:",
          explanation: "مطابقة معدل الإرسال مع قراءة المستقبل.",
        },
        {
          q: "The receive window (rwnd) in TCP is used to give the sender an idea of how much free buffer space is available at the receiver.",
          options: ["True", "False"],
          correct: 0,
          translation: "rwnd تعطي المرسل فكرة عن المساحة المتاحة.",
          explanation: "صح.",
        },
        {
          q: "When the TCP timeout interval expires and a segment is retransmitted, TCP sets the next timeout interval to:",
          options: [
            "The same value as before",
            "Half the previous value",
            "Twice the previous value, causing intervals to grow exponentially after each retransmission",
            "A random value",
          ],
          correct: 2,
          translation: "بعد timeout، الفاصل التالي:",
          explanation: "يُضاعف — نمو أُسّي.",
        },
        {
          q: "During TCP connection teardown, the TIME_WAIT state exists to:",
          options: [
            "Allow the server to close properly",
            "Ensure all data has been transmitted",
            "Let the TCP client resend the final acknowledgment in case the ACK is lost",
            "Prevent new connections from starting",
          ],
          correct: 2,
          translation: "لماذا TIME_WAIT؟",
          explanation: "للسماح بإعادة إرسال ACK النهائي.",
        },
        {
          q: "When a host receives a TCP segment whose port numbers or source IP address do not match with any ongoing sockets in the host, the host:",
          options: [
            "Silently discards the segment",
            "Sends an ICMP error message",
            "Sends a special reset segment with the RST flag bit set to 1 telling the source not to resend the segment",
            "Buffers the segment for future processing",
          ],
          correct: 2,
          translation: "ماذا يحدث لقطاع TCP غير مطابق؟",
          explanation: "يرسل RST.",
        },
        {
          q: "The network layer in H1 encapsulates transport-layer segments into datagrams before sending them to the router.",
          options: ["True", "False"],
          correct: 0,
          translation: "طبقة الشبكة تغلّف المقاطع في datagrams.",
          explanation: "صح.",
        },
        {
          q: "Routing is typically done in hardware because it must operate at nanosecond timescales.",
          options: ["True", "False"],
          correct: 1,
          translation: "Routing في العتاد.",
          explanation: "خطأ — Forwarding في العتاد، Routing في البرمجيات.",
        },
        {
          q: "A router uses its forwarding table by",
          options: [
            "Examining packet header fields and using them to select the correct output interface",
            "Determining end-to-end routes between H1 and H2",
            "Broadcasting to all ports",
            "Running the routing protocol",
          ],
          correct: 0,
          translation: "كيف يستخدم الراوتر جدول التمرير؟",
          explanation: "بفحص حقول رأس الحزمة واختيار واجهة الخرج.",
        },
        {
          q: "In the traditional approach, each router runs a routing algorithm that communicates with other routers' routing algorithms.",
          options: ["True", "False"],
          correct: 0,
          translation: "في النهج التقليدي، كل راوتر يشغل خوارزمية توجيه.",
          explanation: "صح.",
        },
        {
          q: "In the SDN approach, which component is responsible for computing and distributing forwarding tables?",
          options: [
            "Each individual router",
            "A centralized remote controller",
            "The transport-layer protocol",
            "DNS servers",
          ],
          correct: 1,
          translation: "في SDN، من يحسب ويوزع جداول التمرير؟",
          explanation: "متحكم مركزي بعيد.",
        },
        {
          q: "Which statement best describes a key difference between the traditional control plane and the SDN control plane?",
          options: [
            "SDN removes the need for forwarding tables entirely.",
            "Traditional routing relies on a centralized controller instead of distributed routers.",
            "SDN separates routing logic from routers, relocating it to a software-based controller.",
            "Traditional routing algorithms run slower than SDN controllers.",
          ],
          correct: 2,
          translation: "الفرق بين Control Plane التقليدي و SDN؟",
          explanation: "SDN يفصل منطق التوجيه عن الراوترات.",
        },
        {
          q: "Which router component is responsible for consulting the forwarding table to determine the correct output port?",
          options: [
            "Routing processor",
            "Input port",
            "Switching fabric",
            "Output port",
          ],
          correct: 1,
          translation: "من يستشير جدول التمرير؟",
          explanation: "Input port.",
        },
        {
          q: "Which statement best describes the division of hardware vs. software responsibilities in a router?",
          options: [
            "Input ports, output ports, and switching fabric are implemented in software; routing protocols run in hardware.",
            "Data-plane forwarding operates on millisecond timescales and is implemented in software.",
            "Control-plane functions run on the routing processor and operate at slower timescales compared to data-plane forwarding.",
            "The switching fabric is controlled entirely by a remote SDN controller.",
          ],
          correct: 2,
          translation: "تقسيم العتاد والبرمجيات في الراوتر؟",
          explanation: "Control plane على المعالج بوتيرة أبطأ.",
        },
        {
          q: "The routing processor handles physical- and link-layer functions for incoming packets.",
          options: ["True", "False"],
          correct: 1,
          translation: "معالج التوجيه يتولى وظائف الطبقة الفيزيائية والوصلة.",
          explanation: "خطأ — Input ports تتولاها.",
        },
        {
          q: "Why is a complete forwarding table with one entry for each possible 32-bit IP address impossible?",
          options: [
            "It would require too much memory",
            "IP addresses do not use 32-bit values",
            "Forwarding tables cannot be stored on line cards",
            "The routing processor cannot compute them",
          ],
          correct: 0,
          translation: "لماذا جدول تمرير كامل غير ممكن؟",
          explanation: "يتطلب ذاكرة ضخمة.",
        },
        {
          q: "Which of the following is NOT performed during input port processing?",
          options: [
            "Checking and updating the packet's TTL field",
            "Performing physical- and link-layer processing",
            "Running the routing protocol to compute forwarding tables",
            "Updating network management counters",
          ],
          correct: 2,
          translation: "أي مما يلي لا يتم في input port processing؟",
          explanation: "تشغيل بروتوكول التوجيه.",
        },
        {
          q: "A router has the following forwarding table: Prefix 1100 → Interface 0, 110010 → Interface 1, 11001000 → Interface 2, (default) → Interface 3. A packet arrives with destination address starting with 1100100011010110. Which interface will the router forward the packet to?",
          options: ["Interface 0", "Interface 1", "Interface 2", "Interface 3"],
          correct: 2,
          translation: "أي واجهة يمرر إليها؟",
          explanation: "Interface 2 — أطول تطابق للبادئة.",
        },
        {
          q: "In switching via a shared bus, multiple packets from different input ports can be transmitted simultaneously without waiting.",
          options: ["True", "False"],
          correct: 1,
          translation: "في bus مشترك، حزم متعددة ترسل معاً.",
          explanation: "خطأ — حزمة واحدة في المرة.",
        },
        {
          q: "Which statement is true regarding switching via memory compared to switching via bus?",
          options: [
            "Memory switching allows multiple packets to cross the bus simultaneously.",
            "Bus switching requires the routing processor to copy packets.",
            "Memory switching is limited by memory bandwidth, and only one packet can be read/written at a time.",
            "Bus switching can forward multiple packets in parallel without limitation.",
          ],
          correct: 2,
          translation: "الفرق بين switching via memory و bus؟",
          explanation: "Memory محدود بعرض نطاق الذاكرة.",
        },
        {
          q: "Even if the switching fabric is N times faster than the input line speeds, output port queues can still form.",
          options: ["True", "False"],
          correct: 0,
          translation: "حتى لو كان fabric أسرع، طوابير الخرج قد تتشكل.",
          explanation: "صح — بسبب تنافس المدخلات.",
        },
        {
          q: "A router has 3 input ports and 1 output port. All input ports operate at the same line speed Rline, and the switch fabric operates at 3× Rline. At a given time, one packet arrives at each input port, all destined for the single output port. How many packets will be queued at the output port after the first time unit?",
          options: ["0", "1", "2", "3"],
          correct: 2,
          translation: "كم حزمة ستنتظر في الطابور؟",
          explanation: "2 — واحدة تُرسل و2 تنتظر.",
        },
        {
          q: "Which of the following statements about buffering in routers is true?",
          options: [
            "Larger buffers always reduce delay in the network.",
            "Buffering can absorb short-term traffic fluctuations but may increase queueing delay.",
            "Output port queues never experience packet loss if the switch fabric is fast enough.",
            "Head-of-the-line blocking occurs only at output queues.",
          ],
          correct: 1,
          translation: "أي عبارة عن buffering صحيحة؟",
          explanation: "يستوعب التقلبات لكن يزيد التأخير.",
        },
        {
          q: "In non-preemptive priority queuing, a higher-priority packet can interrupt the transmission of a currently transmitting lower-priority packet.",
          options: ["True", "False"],
          correct: 1,
          translation: "في non-preemptive، حزمة أولوية أعلى تقاطع الحالية.",
          explanation: "خطأ — non-preemptive لا تقاطع.",
        },
        {
          q: 'In CIDR notation, the "/24" in the address 223.1.1.0/24 indicates:',
          options: [
            "The address has 24 host bits",
            "The network portion of the address is 24 bits",
            "There are 24 subnets",
            "There are 24 total addresses",
          ],
          correct: 1,
          translation: "ما معنى /24 في CIDR؟",
          explanation: "جزء الشبكة 24 بت.",
        },
        {
          q: "The broadcast IP address 255.255.255.255 can be used to send a datagram to all hosts on a subnet.",
          options: ["True", "False"],
          correct: 0,
          translation: "عنوان البث 255.255.255.255 يرسل لكل المضيفين.",
          explanation: "صح.",
        },
        {
          q: "When a DHCP server responds to a client's discover message, the server:",
          options: [
            "Sends the response only to the client's MAC address",
            "Broadcasts the offer to all nodes on the subnet",
            "Sends the response directly to the next-hop router",
            "Waits for the client to request the IP before responding",
          ],
          correct: 1,
          translation: "عند رد DHCP server؟",
          explanation: "يبث العرض لكل العقد.",
        },
        {
          q: "Which of the following is NOT included in a DHCP offer message?",
          options: [
            "Proposed IP address for the client",
            "Subnet mask",
            "Lease time",
            "MAC address of all other hosts",
          ],
          correct: 3,
          translation: "ما الذي ليس في DHCP offer؟",
          explanation: "MAC لكل المضيفين الآخرين.",
        },
        {
          q: "When a NAT router forwards a datagram from an internal host to the Internet, it typically:",
          options: [
            "Changes only the source IP address",
            "Changes only the destination IP address",
            "Changes both the source IP address and source port number",
            "Leaves the datagram unchanged",
          ],
          correct: 2,
          translation: "ماذا يغير NAT؟",
          explanation: "عنوان IP المصدر ورقم المنفذ.",
        },
        {
          q: "Which of the following is a main reason for developing IPv6?",
          options: [
            "IPv4 addresses were running out",
            "To reduce the size of TCP headers",
            "To eliminate the need for routers",
            "To replace DNS",
          ],
          correct: 0,
          translation: "لماذا طُوِّر IPv6؟",
          explanation: "نقص عناوين IPv4.",
        },
        {
          q: "IPv6 routers perform fragmentation and reassembly of datagrams at intermediate routers, just like IPv4.",
          options: ["True", "False"],
          correct: 1,
          translation: "IPv6 يقوم بالتجزئة في الراوترات الوسيطة.",
          explanation: "خطأ — فقط المرسل.",
        },
        {
          q: "How does tunneling help in the IPv4-to-IPv6 transition?",
          options: [
            "By allowing IPv6 datagrams to be sent inside IPv4 datagrams across IPv4 routers",
            "By converting IPv6 addresses to IPv4 addresses permanently",
            "By replacing all IPv4 routers with IPv6 routers instantly",
            "By compressing IPv6 headers to fit IPv4",
          ],
          correct: 0,
          translation: "كيف يساعد Tunneling؟",
          explanation: "IPv6 داخل IPv4.",
        },
        {
          q: "How does a NAT router know which internal host should receive a returning datagram from the Internet?",
          options: [
            "By checking the destination IP address alone",
            "By checking the destination IP address and destination port number against its NAT translation table",
            "By using DNS lookup",
            "By sending the datagram to all hosts in the private network",
          ],
          correct: 1,
          translation: "كيف يعرف NAT أي مضيف داخلي؟",
          explanation: "بفحص عنوان IP والمنفذ.",
        },
        {
          q: "If a subnet does not have a DHCP server, what component helps the client communicate with a DHCP server on another subnet?",
          options: [
            "Default gateway",
            "DHCP relay agent",
            "DNS server",
            "ARP cache",
          ],
          correct: 1,
          translation: "من يساعد العميل في حالة عدم وجود DHCP server؟",
          explanation: "DHCP relay agent.",
        },
        {
          q: "Which IPv6 header field is similar in purpose to the TTL field in IPv4?",
          options: ["Traffic class", "Hop limit", "Flow label", "Next header"],
          correct: 1,
          translation: "ما الحقل المكافئ لـ TTL في IPv6؟",
          explanation: "Hop limit.",
        },
        {
          q: "Which organization is responsible for the global allocation of IP addresses?",
          options: ["IEEE", "ICANN", "IETF", "ISO"],
          correct: 1,
          translation: "من المسؤول عن التخصيص العالمي لعناوين IP؟",
          explanation: "ICANN.",
        },
        {
          q: "A NAT-enabled router allows multiple devices on a private network to share a single public IP address.",
          options: ["True", "False"],
          correct: 0,
          translation: "NAT يسمح بمشاركة IP عام واحد.",
          explanation: "صح.",
        },
        {
          q: "Increasing buffer size at a router always reduces packet loss without affecting delay.",
          options: ["True", "False"],
          correct: 1,
          translation: "زيادة المخزن دائمًا تقلل الفقد بدون تأخير.",
          explanation: "خطأ — قد يزيد التأخير.",
        },
        {
          q: "In priority queuing, what happens to packets with lower priority when high-priority packets continuously arrive?",
          options: [
            "They are transmitted first",
            "They may experience starvation",
            "They are dropped immediately",
            "They increase the link bandwidth",
          ],
          correct: 1,
          translation: "ماذا يحدث للحزم ذات الأولوية المنخفضة؟",
          explanation: "قد تعاني من التجويع (Starvation).",
        },
      ],
    },
    {
      t: "Test Bank - Answers - Computer Networks",
      d: "Test Bank Answers - Computer Networks",
      pdf: "Computer Networks/Questions/Test Bank/Test Bank - Answers - Computer Networks.pdf",
      questions: [
        {
          q: "check bit errors.",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 0,
          translation: "فحص أخطاء البتات.",
          explanation: "nodal processing.",
        },
        {
          q: "determine output link.",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 0,
          translation: "تحديد رابط الخرج.",
          explanation: "nodal processing.",
        },
        {
          q: "time waiting at output link for transmission.",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 1,
          translation: "وقت الانتظار على رابط الخرج.",
          explanation: "queueing delay.",
        },
        {
          q: "depends on congestion level of router.",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 1,
          translation: "يعتمد على مستوى ازدحام الراوتر.",
          explanation: "queueing delay.",
        },
        {
          q: "= L/R (L: packet length (bits), R: link bandwidth (bps)).",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 2,
          translation: "= L/R.",
          explanation: "transmission delay.",
        },
        {
          q: "= d/s (d: length of physical link, s: propagation speed in medium).",
          options: [
            "nodal processing",
            "queueing delay",
            "transmission delay",
            "propagation delay",
          ],
          correct: 3,
          translation: "= d/s.",
          explanation: "propagation delay.",
        },
        {
          q: "self-replicating infection by receiving/executing object (e.g., e-mail attachment)",
          options: ["virus", "worm", "spyware", "botnet"],
          correct: 0,
          translation: "عدوى ذاتية التكرار عند استقبال/تنفيذ كائن.",
          explanation: "virus.",
        },
        {
          q: "self-replicating infection by passively receiving object that gets itself executed",
          options: ["virus", "worm", "spyware", "botnet"],
          correct: 1,
          translation: "عدوى ذاتية التكرار عند استقبال كائن يتم تنفيذه سلبياً.",
          explanation: "worm.",
        },
        {
          q: "malware can record keystrokes, web sites visited, upload info to collection site.",
          options: ["virus", "worm", "spyware", "botnet"],
          correct: 2,
          translation: "برمجيات تسجل ضغطات المفاتيح.",
          explanation: "spyware.",
        },
        {
          q: "attackers make resources (server, bandwidth) unavailable to legitimate traffic by overwhelming resource with bogus traffic.",
          options: ["virus", "worm", "spyware", "DoS"],
          correct: 3,
          translation: "مهاجمون يجعلون الموارد غير متاحة.",
          explanation: "DoS.",
        },
        {
          q: "RFC stands for Request for comments.",
          options: ["True", "False"],
          correct: 0,
          translation: "RFC = Request for comments.",
          explanation: "صح.",
        },
        {
          q: "IETF stands for Internet Engineering Task Force.",
          options: ["True", "False"],
          correct: 0,
          translation: "IETF = Internet Engineering Task Force.",
          explanation: "صح.",
        },
        {
          q: "protocols define format, order of msgs sent and received among network entities, and actions taken on msg transmission, receipt.",
          options: ["True", "False"],
          correct: 0,
          translation: "البروتوكولات تعرّف التنسيق والترتيب والإجراءات.",
          explanation: "صح.",
        },
        {
          q: "voice over DSL phone line goes to Internet.",
          options: ["True", "False"],
          correct: 1,
          translation: "الصوت عبر خط DSL يذهب للإنترنت.",
          explanation: "خطأ — للهاتف.",
        },
        {
          q: "data over DSL phone line goes to telephone net.",
          options: ["True", "False"],
          correct: 1,
          translation: "البيانات عبر خط DSL تذهب لشبكة الهاتف.",
          explanation: "خطأ — للإنترنت.",
        },
        {
          q: "In DSL, voice, data transmitted at different frequencies over dedicated line to central office.",
          options: ["True", "False"],
          correct: 0,
          translation: "في DSL، الصوت والبيانات بترددات مختلفة على خط مخصص.",
          explanation: "صح.",
        },
        {
          q: "DSL stands for digital subscriber line.",
          options: ["True", "False"],
          correct: 0,
          translation: "DSL = digital subscriber line.",
          explanation: "صح.",
        },
        {
          q: "In cable network, data, TV transmitted at different frequencies over shared cable distribution network.",
          options: ["True", "False"],
          correct: 0,
          translation: "في شبكة الكابل، البيانات والتلفزيون بترددات مختلفة.",
          explanation: "صح.",
        },
        {
          q: "link transmission rate, aka link capacity, aka link bandwidth.",
          options: ["True", "False"],
          correct: 0,
          translation: "معدل نقل الرابط = السعة = عرض النطاق.",
          explanation: "صح.",
        },
        {
          q: "packet transmission delay = time needed to transmit L-bit packet into link.",
          options: ["True", "False"],
          correct: 0,
          translation: "تأخير إرسال الحزمة.",
          explanation: "صح.",
        },
        {
          q: "twisted pair (TP) is two insulated copper wires.",
          options: ["True", "False"],
          correct: 0,
          translation: "TP = سلكان نحاسيان معزولان.",
          explanation: "صح.",
        },
        {
          q: "In packet-switching hosts break application-layer messages into packets.",
          options: ["True", "False"],
          correct: 0,
          translation: "المضيفون يقسمون الرسائل لحزم.",
          explanation: "صح.",
        },
        {
          q: "If arrival rate (in bits) to link exceeds transmission rate of link for a period of time: packets will queue, wait to be transmitted on link.",
          options: ["True", "False"],
          correct: 0,
          translation: "لو تجاوز معدل الوصول معدل الإرسال، الحزم تنتظر.",
          explanation: "صح.",
        },
        {
          q: "If arrival rate (in bits) to link exceeds transmission rate of link for a period of time: packets can be dropped (lost) if memory (buffer) fills up.",
          options: ["True", "False"],
          correct: 0,
          translation: "الحزم قد تُسقَط لو امتلأ المخزن.",
          explanation: "صح.",
        },
        {
          q: "forwarding: determines source-destination route taken by packets.",
          options: ["True", "False"],
          correct: 1,
          translation: "Forwarding يحدد المسار.",
          explanation: "خطأ — Routing يحدد المسار.",
        },
        {
          q: "routing: move packets from router's input to appropriate router output.",
          options: ["True", "False"],
          correct: 1,
          translation: "Routing ينقل الحزم من الإدخال للخرج.",
          explanation: "خطأ — Forwarding يفعل ذلك.",
        },
        {
          q: "connecting each access ISP to each other directly does scale.",
          options: ["True", "False"],
          correct: 1,
          translation: "ربط كل ISPs مباشرة يتوسع.",
          explanation: "خطأ — لا يتوسع.",
        },
        {
          q: "R: link bandwidth (bps), L: packet length (bits), a: average packet arrival rate, La/R ~ 0: avg. queueing delay small.",
          options: ["True", "False"],
          correct: 0,
          translation: "La/R ~ 0: تأخير صغير.",
          explanation: "صح.",
        },
        {
          q: "R: link bandwidth (bps), L: packet length (bits), a: average packet arrival rate, La/R ~ 1: avg. queueing delay large.",
          options: ["True", "False"],
          correct: 0,
          translation: "La/R ~ 1: تأخير كبير.",
          explanation: "صح.",
        },
        {
          q: 'R: link bandwidth (bps), L: packet length (bits), a: average packet arrival rate, La/R > 1: more "work" arriving than can be serviced, average delay infinite!',
          options: ["True", "False"],
          correct: 0,
          translation: "La/R > 1: تأخير لانهائي.",
          explanation: "صح.",
        },
        {
          q: "lost packet may be retransmitted by previous node, by source end system, or not at all.",
          options: ["True", "False"],
          correct: 0,
          translation: "الحزمة المفقودة قد تُعاد.",
          explanation: "صح.",
        },
        {
          q: "throughput: rate (bits/time unit) at which bits transferred between sender/receiver.",
          options: ["True", "False"],
          correct: 0,
          translation: "Throughput: معدل نقل البتات.",
          explanation: "صح.",
        },
        {
          q: "In ISO/OSI reference model, presentation: allow applications to interpret meaning of data, e.g., encryption, compression, machine-specific conventions.",
          options: ["True", "False"],
          correct: 0,
          translation: "طبقة العرض: تسمح بتفسير معنى البيانات.",
          explanation: "صح.",
        },
        {
          q: "Internet stack missing the layers presentation and session.",
          options: ["True", "False"],
          correct: 0,
          translation: "Internet Stack يفتقد طبقتَي العرض والجلسة.",
          explanation: "صح.",
        },
        {
          q: "infected host can be enrolled in botnet, used for spam.",
          options: ["True", "False"],
          correct: 0,
          translation: "المضيف المصاب قد يُجنَّد في botnet.",
          explanation: "صح.",
        },
        {
          q: "IP spoofing: send packet with true source address.",
          options: ["True", "False"],
          correct: 1,
          translation: "IP spoofing: إرسال حزمة بعنوان مصدر حقيقي.",
          explanation: "خطأ — بعنوان مزيف.",
        },
        {
          q: "server not always-on host.",
          options: ["True", "False"],
          correct: 1,
          translation: "السيرفر ليس مضيفاً دائماً.",
          explanation: "خطأ — السيرفر دائم.",
        },
        {
          q: "server has permanent IP address.",
          options: ["True", "False"],
          correct: 0,
          translation: "السيرفر له عنوان IP دائم.",
          explanation: "صح.",
        },
        {
          q: "In client-server architecture, clients communicate with server.",
          options: ["True", "False"],
          correct: 0,
          translation: "في client-server، العملاء يتواصلون مع السيرفر.",
          explanation: "صح.",
        },
        {
          q: "In client-server architecture, clients may be intermittently connected.",
          options: ["True", "False"],
          correct: 0,
          translation: "العملاء قد يكونون متصلين بشكل متقطع.",
          explanation: "صح.",
        },
      ],
    },
    {
      t: "Test Bank Dr. Tarek",
      d: "Test Bank - Dr. Tarek",
      pdf: "Computer Networks/Questions/Test Bank/Test Bank Dr. Tarek.pdf",
      questions: [
        {
          q: "A computer network:",
          options: [
            "Is a collection of hardware components and computers",
            "Is interconnected by communication channels",
            "Allows sharing of resources and information",
            "All of the above",
          ],
          correct: 3,
          translation: "شبكة الحاسوب:",
          explanation: "كل ما ذُكر — عتاد + قنوات + مشاركة.",
        },
        {
          q: "What is a firewall in a computer network?",
          options: [
            "The physical boundary of the network",
            "An operating system of a computer network",
            "A system designed to prevent unauthorized access",
            "A web browsing software",
          ],
          correct: 2,
          translation: "ما هو الجدار الناري؟",
          explanation: "نظام لمنع الوصول غير المصرح.",
        },
        {
          q: "What is the use of Bridge in the network?",
          options: [
            "To connect LANs",
            "To separate LANs",
            "To control network speed",
            "All of the above",
          ],
          correct: 0,
          translation: "استخدام Bridge؟",
          explanation: "ربط شبكات LAN.",
        },
        {
          q: "Each IP packet must contain:",
          options: [
            "Only Source address",
            "Only Destination address",
            "Source and Destination address",
            "Source or Destination address",
          ],
          correct: 2,
          translation: "كل حزمة IP يجب أن تحتوي:",
          explanation: "عنوان المصدر والوجهة.",
        },
        {
          q: "Which of these is not a communication channel?",
          options: ["Satellite", "Microwave", "Radio wave", "Wi-Fi"],
          correct: 3,
          translation: "أي مما يلي ليس قناة اتصال؟",
          explanation: "Wi-Fi — تقنية، مش قناة.",
        },
        {
          q: "MAN Stands for",
          options: [
            "Metropolitan Area Network",
            "Main Area Network",
            "Metropolitan Access Network",
            "Metro Access Network",
          ],
          correct: 0,
          translation: "MAN =",
          explanation: "Metropolitan Area Network.",
        },
        {
          q: "Which of these is not an example of unguided media?",
          options: [
            "Optical Fibre Cable",
            "Radio wave",
            "Bluetooth",
            "Satellite",
          ],
          correct: 0,
          translation: "أي مما يلي ليس وسطاً غير موجّه؟",
          explanation: "Optical Fibre — موجّه.",
        },
        {
          q: "In which topology is all the nodes connected through a single Coaxial cable?",
          options: ["Star", "Tree", "Bus", "Ring"],
          correct: 2,
          translation: "أي طوبولوجيا تستخدم كابل محوري واحد؟",
          explanation: "Bus.",
        },
        {
          q: "Which of the following is the smallest network?",
          options: ["WAN", "MAN", "LAN", "Wi-Fi"],
          correct: 2,
          translation: "أصغر شبكة؟",
          explanation: "LAN.",
        },
        {
          q: "Which protocol is used for the transfer of hypertext content over the web?",
          options: ["HTML", "HTTP", "TCP/IP", "FTP"],
          correct: 1,
          translation: "بروتوكول نقل النص التشعبي؟",
          explanation: "HTTP.",
        },
        {
          q: "Two devices are in network if",
          options: [
            "a process in one device is able to exchange information with a process in another device",
            "a process is running on both devices",
            "the processes running of different devices are of same type",
            "none of the mentioned",
          ],
          correct: 0,
          translation: "جهازان في شبكة إذا:",
          explanation: "عملية في جهاز تتبادل المعلومات مع عملية في آخر.",
        },
        {
          q: "What is a standalone computer?",
          options: [
            "A computer that is not connected to a network",
            "A computer that is being used as a server",
            "A computer that does not have any peripherals attached to it",
            "A computer that is used by only one person",
          ],
          correct: 0,
          translation: "ما هو الحاسوب المستقل؟",
          explanation: "غير متصل بشبكة.",
        },
        {
          q: "Central Computer which is powerful than other computers in the network is called as",
          options: ["Client", "Server", "Hub", "Switch"],
          correct: 1,
          translation: "الحاسوب المركزي الأقوى:",
          explanation: "Server.",
        },
        {
          q: "Network in which every computer is capable of playing the role of a client, or a server or both at same time is called",
          options: [
            "peer-to-peer network",
            "local area network",
            "dedicated server network",
            "wide area network",
          ],
          correct: 0,
          translation: "شبكة حيث كل حاسوب يؤدي دور عميل/سيرفر:",
          explanation: "peer-to-peer.",
        },
        {
          q: "In peer-to-peer network, each computer in a network is referred as",
          options: ["server", "client", "peer", "sender"],
          correct: 2,
          translation: "في P2P، كل حاسوب يُسمى:",
          explanation: "peer.",
        },
        {
          q: "Which transmission media is capable of having a much higher bandwidth (data capacity)?",
          options: [
            "Coaxial",
            "Twisted pair cable",
            "Untwisted cable",
            "Fiber optic",
          ],
          correct: 3,
          translation: "أي وسط نقل بعرض نطاق أعلى؟",
          explanation: "Fiber optic.",
        },
        {
          q: "Which type of transmission media is the least expensive to manufacture?",
          options: [
            "Coaxial",
            "Twisted pair cable",
            "CAT cable",
            "Fiber optic",
          ],
          correct: 1,
          translation: "أرخص وسط نقل؟",
          explanation: "Twisted pair.",
        },
        {
          q: "Which of these components is internal to a computer and is required to connect the computer to a network?",
          options: [
            "Wireless Access Point",
            "Network Interface card",
            "Switch",
            "Hub",
          ],
          correct: 1,
          translation: "مكوّن داخلي لربط الحاسوب بشبكة:",
          explanation: "NIC.",
        },
        {
          q: "A device that forwards data packet from one network to another is called a",
          options: ["Bridge", "Router", "Hub", "Gateway"],
          correct: 1,
          translation: "جهاز يمرر الحزم بين الشبكات:",
          explanation: "Router.",
        },
        {
          q: "Which of the following is the fastest media of data transfer?",
          options: [
            "Co-axial Cable",
            "Untwisted Wire",
            "Telephone Lines",
            "Fiber Optic",
          ],
          correct: 3,
          translation: "أسرع وسط نقل؟",
          explanation: "Fiber Optic.",
        },
        {
          q: "Hub is a",
          options: [
            "Broadcast device",
            "Uni-cast device",
            "Multi-cast device",
            "None of the above",
          ],
          correct: 0,
          translation: "Hub هو:",
          explanation: "Broadcast device.",
        },
        {
          q: "Switch is a",
          options: [
            "Broadcast device",
            "Uni-cast device",
            "Multi-cast device",
            "None of the above",
          ],
          correct: 1,
          translation: "Switch هو:",
          explanation: "Uni-cast device.",
        },
        {
          q: "The device that can operate in place of a hub is a:",
          options: ["Switch", "Bridge", "Router", "Gateway"],
          correct: 0,
          translation: "الجهاز الذي يحل محل Hub:",
          explanation: "Switch.",
        },
        {
          q: "A repeater takes a weak and corrupted signal and it.",
          options: ["Amplifies", "Regenerates", "Resembles", "Reroutes"],
          correct: 1,
          translation: "المكرر يأخذ إشارة ضعيفة و......ها.",
          explanation: "Regenerates — يعيد توليدها.",
        },
        {
          q: "Which of the following is not a type of cloud?",
          options: ["Private", "Public", "Protected", "Hybrid"],
          correct: 2,
          translation: "ليس نوعاً من السحابة:",
          explanation: "Protected.",
        },
        {
          q: "Protocols are",
          options: [
            "Agreements on how communication components and devices are to communicate",
            "Logical communication channels for transferring data",
            "Physical communication channels used for transferring data",
            "None of above",
          ],
          correct: 0,
          translation: "البروتوكولات هي:",
          explanation: "اتفاقيات على كيفية التواصل.",
        },
        {
          q: "In computer, converting a digital signal into an analog signal is called",
          options: [
            "modulation",
            "demodulation",
            "conversion",
            "transformation",
          ],
          correct: 0,
          translation: "تحويل إشارة رقمية إلى تناظرية:",
          explanation: "modulation.",
        },
        {
          q: "Protocol/Standard that is used to transfer data among computers on the Internet",
          options: ["FTP", "Archie", "TCP", "Gopher"],
          correct: 2,
          translation: "بروتوكول نقل البيانات بين الحواسيب:",
          explanation: "TCP.",
        },
        {
          q: "Which address is used in an internet employing the TCP/IP protocols?",
          options: [
            "physical address and logical address",
            "port address",
            "specific address",
            "all of the mentioned",
          ],
          correct: 3,
          translation: "أي عناوين تستخدم في TCP/IP؟",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "Which address identifies a process on a host?",
          options: [
            "physical address",
            "logical address",
            "port address",
            "specific address",
          ],
          correct: 2,
          translation: "أي عنوان يعرّف عملية على مضيف؟",
          explanation: "port address.",
        },
        {
          q: "Transmission data rate is decided by",
          options: [
            "network layer",
            "physical layer",
            "data link layer",
            "transport layer",
          ],
          correct: 1,
          translation: "معدل نقل البيانات يحدده:",
          explanation: "الطبقة الفيزيائية.",
        },
        {
          q: "When collection of various computers seems a single coherent system to its client, then it is called",
          options: [
            "computer network",
            "distributed system",
            "both (a) and (b)",
            "none of the mentioned",
          ],
          correct: 1,
          translation: "عندما تبدو مجموعة حواسيب نظاماً واحداً:",
          explanation: "نظام موزع.",
        },
        {
          q: "Which one of the following computer network is built on the top of another network?",
          options: [
            "prior network",
            "chief network",
            "prime network",
            "overlay network",
          ],
          correct: 3,
          translation: "شبكة مبنية فوق شبكة أخرى:",
          explanation: "overlay network.",
        },
        {
          q: "Bluetooth is an example of",
          options: [
            "personal area network",
            "local area network",
            "virtual private network",
            "none of the mentioned",
          ],
          correct: 0,
          translation: "Bluetooth مثال على:",
          explanation: "personal area network.",
        },
        {
          q: "A is a device that forwards packets between networks by processing the routing information included in the packet.",
          options: ["bridge", "firewall", "routers", "all of the mentioned"],
          correct: 2,
          translation: "جهاز يمرر الحزم بين الشبكات:",
          explanation: "Router.",
        },
        {
          q: "A list of protocols used by a system, one protocol per layer, is called",
          options: [
            "protocol architecture",
            "protocol stack",
            "protocol suit",
            "none of the mentioned",
          ],
          correct: 1,
          translation: "قائمة بروتوكولات، بروتوكول لكل طبقة:",
          explanation: "protocol stack.",
        },
        {
          q: "Network congestion occurs",
          options: [
            "in case of traffic overloading",
            "when a system terminates",
            "when connection between two nodes terminates",
            "none of the mentioned",
          ],
          correct: 0,
          translation: "ازدحام الشبكة يحدث:",
          explanation: "عند زيادة الحمل.",
        },
        {
          q: "Which one of the following extends a private network across public networks?",
          options: [
            "local area network",
            "virtual private network",
            "enterprise private network",
            "storage area network",
          ],
          correct: 1,
          translation: "يمدد شبكة خاصة عبر الشبكات العامة:",
          explanation: "VPN.",
        },
        {
          q: "The structure or format of data is called",
          options: ["Syntax", "Semantics", "Struct", "None of the mentioned"],
          correct: 0,
          translation: "هيكل البيانات:",
          explanation: "Syntax.",
        },
        {
          q: "Which of this is not a network edge device?",
          options: ["PC", "Smartphones", "Servers", "Switch"],
          correct: 3,
          translation: "ليس جهاز حافة:",
          explanation: "Switch.",
        },
        {
          q: "Delimiting and synchronization of data exchange is provided by",
          options: [
            "Application layer",
            "Session layer",
            "Transport layer",
            "Link layer",
          ],
          correct: 1,
          translation: "التحديد والمزامنة توفرها:",
          explanation: "Session layer.",
        },
        {
          q: "The address identifies a process on a host.",
          options: ["physical", "IP", "port", "specific"],
          correct: 2,
          translation: "عنوان يعرّف عملية:",
          explanation: "port.",
        },
        {
          q: "The address uniquely defines a host on the Internet.",
          options: ["physical", "IP", "port", "specific"],
          correct: 1,
          translation: "عنوان يعرّف مضيفاً بشكل فريد:",
          explanation: "IP.",
        },
        {
          q: "A connection provides a dedicated link between two devices.",
          options: ["point-to-point", "multipoint", "primary", "secondary"],
          correct: 0,
          translation: "اتصال يوفر رابطاً مخصصاً:",
          explanation: "point-to-point.",
        },
        {
          q: "Devices may be arranged in a topology.",
          options: ["ring", "mesh", "bus", "all of the above"],
          correct: 3,
          translation: "يمكن ترتيب الأجهزة في طوبولوجيا:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "A is a data communication system within a building, plant, or campus, or between nearby buildings.",
          options: ["LAN", "MAN", "WAN", "none of the above"],
          correct: 0,
          translation: "نظام اتصال داخل مبنى:",
          explanation: "LAN.",
        },
        {
          q: "Which of the following is required to communicate between two computers?",
          options: [
            "communications software",
            "protocol",
            "communication hardware",
            "all of above including access to transmission medium",
          ],
          correct: 3,
          translation: "ما المطلوب للتواصل بين حاسوبين؟",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "What is NIC used for?",
          options: [
            "To remotely access PC",
            "To connect computer to a network",
            "It is used in junipers routers for gateway card",
            "None",
          ],
          correct: 1,
          translation: "استخدام NIC:",
          explanation: "ربط الحاسوب بالشبكة.",
        },
        {
          q: "In a type of computer network, what does MAN stands for?",
          options: [
            "Major area network",
            "Mini area network",
            "Metropolitan area network",
            "Micro area network",
          ],
          correct: 2,
          translation: "MAN =",
          explanation: "Metropolitan area network.",
        },
        {
          q: "Which of the following is the type of the computer network?",
          options: [
            "Metropolitan area network (MAN)",
            "Local area network (LAN)",
            "Personal area network (PAN)",
            "All of the above",
          ],
          correct: 3,
          translation: "أنواع شبكات الحاسوب:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "How many layers does OSI have?",
          options: ["4", "7", "5", "6"],
          correct: 1,
          translation: "كم طبقة في OSI؟",
          explanation: "7.",
        },
        {
          q: "Collection of network or networks is called",
          options: ["Intranet", "Internet", "Extranet", "LAN network"],
          correct: 1,
          translation: "مجموعة شبكات:",
          explanation: "Internet.",
        },
        {
          q: "What is a Firewall in Computer Network?",
          options: [
            "The physical boundary of Network",
            "An operating System of Computer Network",
            "A system designed to prevent unauthorized access",
            "A web browsing Software",
          ],
          correct: 2,
          translation: "الجدار الناري:",
          explanation: "نظام لمنع الوصول غير المصرح.",
        },
        {
          q: "What is the meaning of Bandwidth in Network?",
          options: [
            "Transmission capacity of a communication channels",
            "Connected Computers in the Network",
            "Class of IP used in Network",
            "None of Above",
          ],
          correct: 0,
          translation: "معنى Bandwidth:",
          explanation: "سعة نقل قناة الاتصال.",
        },
        {
          q: "ADSL is the abbreviation of",
          options: [
            "Asymmetric Dual Subscriber Line",
            "Asymmetric Digital System Line",
            "Asymmetric Dual System Line",
            "Asymmetric Digital Subscriber Line",
          ],
          correct: 3,
          translation: "ADSL =",
          explanation: "Asymmetric Digital Subscriber Line.",
        },
        {
          q: "The Internet is an example of",
          options: [
            "Cell switched network",
            "circuit switched network",
            "Packet switched network",
            "All of above",
          ],
          correct: 2,
          translation: "الإنترنت مثال على:",
          explanation: "Packet switched.",
        },
        {
          q: "Which of the following includes the benefit of the Networking?",
          options: [
            "File Sharing",
            "Easier access to Resources",
            "Easier Backups",
            "All of the Above",
          ],
          correct: 3,
          translation: "فوائد الشبكة:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "Which of the following is not the Networking Devices?",
          options: ["Gateways", "Linux", "Routers", "Firewalls"],
          correct: 1,
          translation: "ليس جهاز شبكة:",
          explanation: "Linux — نظام تشغيل.",
        },
        {
          q: "We can divide today's networks into broad categories based on switching.",
          options: ["four", "three", "five", "two"],
          correct: 3,
          translation: "نقسم الشبكات إلى ...... فئات حسب التبديل:",
          explanation: "اثنتين — Circuit و Packet.",
        },
        {
          q: "A is a device that operates only in the physical layer.",
          options: ["passive hub", "repeater", "bridge", "router"],
          correct: 1,
          translation: "جهاز يعمل في الطبقة الفيزيائية فقط:",
          explanation: "repeater.",
        },
        {
          q: "Which protocol assigns IP address to the client connected in the internet?",
          options: ["DHCP", "IP", "RPC", "none of the above"],
          correct: 0,
          translation: "بروتوكول يعيّن IP للعميل:",
          explanation: "DHCP.",
        },
        {
          q: "is a network that covers geographic areas that are larger, such as districts or cities.",
          options: ["LAN", "MAN", "WAN", "PAN"],
          correct: 1,
          translation: "شبكة تغطي مناطق جغرافية أكبر:",
          explanation: "MAN.",
        },
        {
          q: "HTTP is the acronym of",
          options: [
            "Hyper Text Transfer Protocol",
            "Hyper Test Transfer Protocol",
            "Hyper Text Transport Protocol",
            "Hyper Text Transport Program",
          ],
          correct: 0,
          translation: "HTTP =",
          explanation: "Hyper Text Transfer Protocol.",
        },
        {
          q: "DHCP is the abbreviation of",
          options: [
            "Dynamic Host Control Protocol",
            "Dynamic Host Configuration Protocol",
            "Dynamic Hyper Control Protocol",
            "Dynamic Hyper Configuration Protocol",
          ],
          correct: 1,
          translation: "DHCP =",
          explanation: "Dynamic Host Configuration Protocol.",
        },
        {
          q: "In DSL telco provides these services",
          options: [
            "Wired phone access",
            "ISP",
            "All of the mentioned",
            "None of the mentioned",
          ],
          correct: 2,
          translation: "في DSL شركة الاتصالات تقدم:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "Physical or logical arrangement of network is",
          options: [
            "Topology",
            "Routing",
            "Networking",
            "None of the mentioned",
          ],
          correct: 0,
          translation: "الترتيب المادي أو المنطقي للشبكة:",
          explanation: "Topology.",
        },
        {
          q: "In which topology there is a central controller or hub?",
          options: ["Star", "Mesh", "Ring", "Bus"],
          correct: 0,
          translation: "طوبولوجيا بها متحكم مركزي:",
          explanation: "Star.",
        },
        {
          q: "This topology requires multi point connection",
          options: ["Star", "Mesh", "Ring", "Bus"],
          correct: 3,
          translation: "هذه الطوبولوجيا تتطلب اتصالاً متعدد النقاط:",
          explanation: "Bus.",
        },
        {
          q: "Data communication system within a building or campus is",
          options: ["LAN", "WAN", "MAN", "None of the mentioned"],
          correct: 0,
          translation: "نظام اتصال داخل مبنى أو حرم:",
          explanation: "LAN.",
        },
        {
          q: "DNS is the abbreviation of",
          options: [
            "Dynamic Name System",
            "Dynamic Network System",
            "Domain Name System",
            "Domain Network Service",
          ],
          correct: 2,
          translation: "DNS =",
          explanation: "Domain Name System.",
        },
        {
          q: "How many layers are in the TCP/IP model?",
          options: ["4 layers", "5 layers", "6 layers", "7 layers"],
          correct: 1,
          translation: "كم طبقة في TCP/IP؟",
          explanation: "5 طبقات.",
        },
        {
          q: "Each IP packet must contain",
          options: [
            "Only Source address",
            "Only Destination address",
            "Source and Destination address",
            "Source or Destination address",
          ],
          correct: 2,
          translation: "كل حزمة IP تحتوي:",
          explanation: "عنوان المصدر والوجهة.",
        },
        {
          q: "Bridge works in which layer of the OSI model?",
          options: [
            "Application layer",
            "Transport layer",
            "Network layer",
            "Datalink layer",
          ],
          correct: 3,
          translation: "Bridge يعمل في أي طبقة؟",
          explanation: "Datalink.",
        },
        {
          q: "provides a connection-oriented reliable service for sending messages",
          options: ["TCP", "IP", "UDP", "All of the above"],
          correct: 0,
          translation: "يوفر خدمة موثوقة مع اتصال:",
          explanation: "TCP.",
        },
        {
          q: "Which layers of the OSI model are host-to-host layers?",
          options: [
            "Transport, Session, Presentation, Application",
            "Network, Transport, Session, Presentation",
            "Datalink, Network, Transport, Session",
            "Physical, Datalink, Network, Transport",
          ],
          correct: 0,
          translation: "طبقات host-to-host:",
          explanation: "Transport, Session, Presentation, Application.",
        },
        {
          q: "The last address of IP address represents",
          options: [
            "Unicast address",
            "Network address",
            "Broadcast address",
            "None of above",
          ],
          correct: 2,
          translation: "آخر عنوان IP يمثل:",
          explanation: "Broadcast.",
        },
        {
          q: "Which of the following layer of OSI model also called end-to-end layer?",
          options: [
            "Presentation layer",
            "Network layer",
            "Session layer",
            "Transport layer",
          ],
          correct: 3,
          translation: "طبقة OSI تُسمى end-to-end:",
          explanation: "Transport layer.",
        },
        {
          q: "Which is not a application layer protocol?",
          options: ["HTTP", "SMTP", "FTP", "TCP"],
          correct: 3,
          translation: "ليس بروتوكول طبقة تطبيق:",
          explanation: "TCP — بروتوكول نقل.",
        },
        {
          q: "The packet of information at the application layer is called",
          options: ["Packet", "Message", "Segment", "Frame"],
          correct: 1,
          translation: "حزمة البيانات في طبقة التطبيق:",
          explanation: "Message.",
        },
        {
          q: "Which one of the following is an architecture paradigms?",
          options: [
            "Peer to peer",
            "Client-server",
            "HTTP",
            "Both Peer-to-Peer & Client-Server",
          ],
          correct: 3,
          translation: "نماذج معمارية:",
          explanation: "P2P و Client-Server.",
        },
        {
          q: "Application developer has permission to decide the following on transport layer side",
          options: [
            "Transport layer protocol",
            "Maximum buffer size",
            "Both Transport layer protocol and Maximum buffer size",
            "None of the mentioned",
          ],
          correct: 2,
          translation: "المطور يقرر في طبقة النقل:",
          explanation: "البروتوكول وحجم المخزن.",
        },
        {
          q: "Application layer offers service.",
          options: [
            "End to end",
            "Process to process",
            "Both End to end and Process to process",
            "None of the mentioned",
          ],
          correct: 1,
          translation: "طبقة التطبيق تقدم خدمة:",
          explanation: "Process to process.",
        },
        {
          q: "E-mail is",
          options: [
            "Loss-tolerant application",
            "Bandwidth-sensitive application",
            "Elastic application",
            "None of the mentioned",
          ],
          correct: 2,
          translation: "البريد الإلكتروني:",
          explanation: "Elastic application.",
        },
        {
          q: "Which of the following is an application layer service?",
          options: [
            "Network virtual terminal",
            "File transfer, access, and management",
            "Mail service",
            "All of the mentioned",
          ],
          correct: 3,
          translation: "خدمات طبقة التطبيق:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "The time required to examine the packet's header and determine where to direct the packet is part of",
          options: [
            "Processing delay",
            "Queuing delay",
            "Transmission delay",
            "Propagation delay",
          ],
          correct: 0,
          translation: "فحص الرأس وتحديد الاتجاه:",
          explanation: "Processing delay.",
        },
        {
          q: "In a network, If P is the only packet being transmitted and there was no earlier transmission, which of the following delays could be zero?",
          options: [
            "Propagation delay",
            "Queuing delay",
            "Transmission delay",
            "Processing delay",
          ],
          correct: 1,
          translation: "أي تأخير قد يكون صفراً؟",
          explanation: "Queuing delay.",
        },
        {
          q: "Transmission delay does not depend on",
          options: [
            "Packet length",
            "Distance between the routers",
            "Transmission rate",
            "Bandwidth of medium",
          ],
          correct: 1,
          translation: "تأخير الإرسال لا يعتمد على:",
          explanation: "المسافة بين الراوترات.",
        },
        {
          q: "Propagation delay depends on",
          options: [
            "Packet length",
            "Transmission rate",
            "Distance between the routers",
            "Speed of the CPU",
          ],
          correct: 2,
          translation: "تأخير الانتشار يعتمد على:",
          explanation: "المسافة.",
        },
        {
          q: "The attacker using a network of compromised devices is known as",
          options: ["Internet", "Botnet", "Telnet", "D-net"],
          correct: 1,
          translation: "مهاجم يستخدم شبكة أجهزة مخترقة:",
          explanation: "Botnet.",
        },
        {
          q: "Which of this is not a guided media?",
          options: [
            "Fiber optical cable",
            "Coaxial cable",
            "Wireless LAN",
            "Copper wire",
          ],
          correct: 2,
          translation: "ليس وسطاً موجهاً:",
          explanation: "Wireless LAN.",
        },
        {
          q: "The number of objects in a Web page which consists of 4 jpeg images and HTML text is",
          options: ["4", "1", "5", "7"],
          correct: 2,
          translation: "عدد الكائنات في صفحة ويب:",
          explanation: "5 — 4 صور + 1 HTML.",
        },
        {
          q: "The default connection type used by HTTP is",
          options: [
            "Persistent",
            "Non-persistent",
            "Can be either persistent or non-persistent depending on connection request",
            "None of the mentioned",
          ],
          correct: 0,
          translation: "نوع الاتصال الافتراضي لـ HTTP:",
          explanation: "Persistent (HTTP/1.1).",
        },
        {
          q: "The method when used in the method field, leaves entity body empty.",
          options: ["POST", "SEND", "GET", "PUT"],
          correct: 2,
          translation: "طريقة تترك جسم الكيان فارغاً:",
          explanation: "GET.",
        },
        {
          q: "The values GET, POST, HEAD etc are specified in of HTTP message",
          options: [
            "Request line",
            "Header line",
            "Status line",
            "Entity body",
          ],
          correct: 0,
          translation: "قيم GET, POST, HEAD في:",
          explanation: "Request line.",
        },
        {
          q: "The first line of HTTP request message is called",
          options: [
            "Request line",
            "Header line",
            "Status line",
            "Entity line",
          ],
          correct: 0,
          translation: "أول سطر في HTTP request:",
          explanation: "Request line.",
        },
        {
          q: "The HTTP response message leaves out the requested object when method is used",
          options: ["GET", "POST", "HEAD", "PUT"],
          correct: 2,
          translation: "HTTP response يستثني الكائن عند استخدام:",
          explanation: "HEAD.",
        },
        {
          q: "Find the oddly matched HTTP status codes",
          options: [
            "200 OK",
            "400 Bad Request",
            "301 Moved permanently",
            "304 Not Found",
          ],
          correct: 3,
          translation: "أي رمز حالة غير متطابق؟",
          explanation: "304 Not Modified، مش Not Found.",
        },
        {
          q: "Which of the following is present in both an HTTP request line and a status line?",
          options: [
            "HTTP version number",
            "URL",
            "Method",
            "None of the mentioned",
          ],
          correct: 0,
          translation: "موجود في request line وstatus line:",
          explanation: "HTTP version number.",
        },
        {
          q: "The conditional GET mechanism",
          options: [
            "Imposes conditions on the objects to be requested",
            "Limits the number of response from a server",
            "Helps to keep a cache upto date",
            "None of the mentioned",
          ],
          correct: 2,
          translation: "آلية Conditional GET:",
          explanation: "تبقي الـ cache محدثاً.",
        },
        {
          q: "The physical layer is concerned with",
          options: [
            "bit-by-bit delivery",
            "process to process delivery",
            "application to application delivery",
            "port to port delivery",
          ],
          correct: 0,
          translation: "الطبقة الفيزيائية تهتم بـ:",
          explanation: "bit-by-bit delivery.",
        },
        {
          q: "The portion of physical layer that interfaces with the media access control sublayer is called",
          options: [
            "physical signalling sublayer",
            "physical data sublayer",
            "physical address sublayer",
            "physical transport sublayer",
          ],
          correct: 0,
          translation: "الجزء من الطبقة الفيزيائية الذي يتفاعل مع MAC:",
          explanation: "physical signalling sublayer.",
        },
        {
          q: "The physical layer provides",
          options: [
            "mechanical specifications of electrical connectors and cables",
            "electrical specification of transmission line signal level",
            "specification for IR over optical fiber",
            "all of the mentioned",
          ],
          correct: 3,
          translation: "الطبقة الفيزيائية توفر:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "The physical layer is responsible for",
          options: [
            "line coding",
            "channel coding",
            "modulation",
            "all of the mentioned",
          ],
          correct: 3,
          translation: "الطبقة الفيزيائية مسؤولة عن:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "The physical layer translates logical communication requests from the ______ into hardware specific operations.",
          options: [
            "data link layer",
            "network layer",
            "transport layer",
            "application layer",
          ],
          correct: 0,
          translation: "الطبقة الفيزيائية تترجم الطلبات من:",
          explanation: "Data link layer.",
        },
        {
          q: "A single channel is shared by multiple signals by",
          options: [
            "analog modulation",
            "digital modulation",
            "multiplexing",
            "phase modulation",
          ],
          correct: 2,
          translation: "قناة واحدة تشاركها إشارات متعددة بـ:",
          explanation: "multiplexing.",
        },
        {
          q: "Wireless transmission of signals can be done via",
          options: [
            "radio waves",
            "microwaves",
            "infrared",
            "all of the mentioned",
          ],
          correct: 3,
          translation: "الإرسال اللاسلكي يمكن عبر:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "The network layer is concerned with of data.",
          options: ["bits", "frames", "packets", "bytes"],
          correct: 2,
          translation: "طبقة الشبكة تهتم بـ:",
          explanation: "packets.",
        },
        {
          q: "Which one of the following is not a function of network layer?",
          options: [
            "routing",
            "inter-networking",
            "congestion control",
            "error control",
          ],
          correct: 3,
          translation: "ليس من وظائف طبقة الشبكة:",
          explanation: "error control.",
        },
        {
          q: "A 4 byte IP address consists of",
          options: [
            "only network address",
            "only host address",
            "network address & host address",
            "network address & MAC address",
          ],
          correct: 2,
          translation: "عنوان IP رباعي البايت يتكون من:",
          explanation: "network + host address.",
        },
        {
          q: "Which of the following is not correct in relation to multi-destination routing?",
          options: [
            "is same as broadcast routing",
            "contains the list of all destinations",
            "data is not sent by packets",
            "there are multiple receivers",
          ],
          correct: 2,
          translation: "غير صحيح عن multi-destination routing:",
          explanation:
            "data is not sent by packets — خطأ، البيانات تُرسَل كحزم.",
        },
        {
          q: "The network layer protocol for internet is",
          options: [
            "ethernet",
            "internet protocol",
            "hypertext transfer protocol",
            "file transfer protocol",
          ],
          correct: 1,
          translation: "بروتوكول طبقة الشبكة للإنترنت:",
          explanation: "IP.",
        },
        {
          q: "Transport layer aggregates data from different applications into a single stream before passing it to",
          options: [
            "network layer",
            "data link layer",
            "application layer",
            "physical layer",
          ],
          correct: 0,
          translation: "طبقة النقل تجمع البيانات لتمررها إلى:",
          explanation: "Network layer.",
        },
        {
          q: "Which of the following are transport layer protocols used in networking?",
          options: [
            "TCP and FTP",
            "UDP and HTTP",
            "TCP and UDP",
            "HTTP and FTP",
          ],
          correct: 2,
          translation: "بروتوكولات طبقة النقل:",
          explanation: "TCP و UDP.",
        },
        {
          q: "User datagram protocol is called connectionless because",
          options: [
            "all UDP packets are treated independently by transport layer",
            "it sends data as a stream of related packets",
            "it is received in the same order as sent order",
            "it sends data very quickly",
          ],
          correct: 0,
          translation: "UDP بدون اتصال لأن:",
          explanation: "كل الحزم تُعالَج باستقلالية.",
        },
        {
          q: "Transmission control protocol",
          options: [
            "is a connection-oriented protocol",
            "uses a three way handshake to establish a connection",
            "receives data from application as a single stream",
            "all of the mentioned",
          ],
          correct: 3,
          translation: "TCP:",
          explanation: "كل ما ذُكر.",
        },
        {
          q: "An endpoint of an inter-process communication flow across a computer network is called",
          options: ["socket", "pipe", "port", "machine"],
          correct: 0,
          translation: "نقطة نهاية تدفق التواصل بين العمليات:",
          explanation: "socket.",
        },
        {
          q: "A is a TCP name for a transport service access point.",
          options: ["port", "pipe", "node", "protocol"],
          correct: 0,
          translation: "اسم TCP لنقطة وصول خدمة النقل:",
          explanation: "port.",
        },
        {
          q: "Transport layer protocols deals with",
          options: [
            "application to application communication",
            "process to process communication",
            "node to node communication",
            "man to man communication",
          ],
          correct: 1,
          translation: "بروتوكولات طبقة النقل تتعامل مع:",
          explanation: "process to process communication.",
        },
        {
          q: "Which of the following is a transport layer protocol?",
          options: [
            "stream control transmission protocol",
            "internet control message protocol",
            "neighbor discovery protocol",
            "dynamic host configuration protocol",
          ],
          correct: 0,
          translation: "بروتوكول طبقة نقل:",
          explanation: "SCTP.",
        },
      ],
    },
  ],
});



