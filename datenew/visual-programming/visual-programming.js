// ═══════════════════════════════════════════════════════════════════
//  مادة: Visual Programming — البرمجة المرئية
//  المسار: data/visual-programming/visual-programming.js
// ═══════════════════════════════════════════════════════════════════

subjects.push({
  name: "البرمجة المرئية",
  en: "Visual Programming",
  icon: "🧩",
  lectures: [
    {
      t: "المحاضرة الأولى",
      d: "مقدمة في البرمجة المرئية وواجهات المستخدم الرسومية (GUI).",
      pdf: "Visual Programming/lectures/Chapter 1.pdf",
      pdf2: "Visual Programming/Questions/Questions on each lecture/Chapter 1 - Questions - Visual Programming.pdf",

      // فئات روابط ومنهج منظّم - Chapter 1: Introduction to Visual C# (د. سارة طارق)

      linkCategories: [
        {
          category: "فيديوهات عربية",
          icon: "🇪🇬",
          description:
            "شروحات باللغة العربية لأساسيات C# وWindows Forms والـ Controls — من المصادر الرسمية لـ Microsoft والمحتوى العربي المُتحقّق منه",
          links: [
            {
              t: "أساسيات #C للمبتدئين الأوليين - Microsoft Learn (بالعربي)",
              d: "سلسلة Microsoft الرسمية بالعربية (25 حلقة): الحصول على الأدوات، كتابة الكود، تصحيح الأخطاء، وفهم بنية البرنامج",
              icon: "🇪🇬",
              actions: [
                {
                  label: "📖 السلسلة الكاملة",
                  url: "https://learn.microsoft.com/ar-sa/shows/c-fundamentals-for-absolute-beginners",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "إنشاء أول برنامج C# - Microsoft Learn بالعربي",
              d: "الحلقة الثالثة: إنشاء أول برنامج C# وفهم Visual Studio — يطابق بداية الفصل",
              icon: "🇪🇬",
              actions: [
                {
                  label: "🎬 الحلقة 3",
                  url: "https://learn.microsoft.com/ar-sa/shows/c-fundamentals-for-absolute-beginners/03",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "تشريح أول برنامج C# - فهم بنية الكود",
              d: "الحلقة الرابعة: فهم مكونات الكود، Namespaces وClasses — يطابق قسم Introduction to C# Code",
              icon: "🇪🇬",
              actions: [
                {
                  label: "🎬 الحلقة 4",
                  url: "https://learn.microsoft.com/ar-sa/shows/c-fundamentals-for-absolute-beginners/04",
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
            "محاضرات عالمية مُتحقّق منها تغطي Windows Forms والـ Controls والـ Event Handlers",
          links: [
            {
              t: "Intro to Windows Forms (WinForms) - IAmTimCorey",
              d: "شرح شامل (313K مشاهدة، 1:35 ساعة): ما هو WinForms، كيفية البناء، أفضل الممارسات — **مطابق لمحتوى الفصل**",
              icon: "🌍",
              actions: [
                {
                  label: "🎬 المحاضرة",
                  url: "https://www.youtube.com/watch?v=0zLZQesgV5o",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "Windows Forms and Event Handlers - AngelSix",
              d: "شرح عملي (309K مشاهدة): إنشاء Calculator UI مع Button Event Handlers — يطابق مثال Hello World والـ Click Events",
              icon: "🌍",
              actions: [
                {
                  label: "🎬 المحاضرة",
                  url: "https://www.youtube.com/watch?v=W6vJ_c9Mt6A",
                  type: "view",
                  color: "red",
                },
              ],
            },
            {
              t: "Complete Guide to Windows Forms - 3CodeCamp",
              d: "كورس شامل (3+ ساعات): تحميل Visual Studio، الـ Toolbox Components، بناء تطبيق عملي — مرجع كامل",
              icon: "🌍",
              actions: [
                {
                  label: "🎬 الكورس الكامل",
                  url: "https://www.youtube.com/watch?v=SD1VbUYUO7U",
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
            "التوثيق الرسمي من Microsoft — يغطي كل مفاهيم الفصل بالتفصيل",
          links: [
            {
              t: "Create a Windows Forms app with C# - Visual Studio Tutorial",
              d: "التوثيق الرسمي: إنشاء مشروع، إضافة Controls، التعامل مع Events — **مطابق لخطوات الفصل بالضبط**",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح الـ Tutorial",
                  url: "https://learn.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio",
                  type: "view",
                  color: "green",
                },
              ],
            },
            {
              t: "C# Documentation - Official Reference",
              d: "المرجع الرسمي للغة C#: Fundamentals, Language Reference, Tutorials — لفهم Namespaces وClasses وMethods",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح المرجع",
                  url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "General Structure of a C# Program",
              d: "شرح رسمي لبنية برنامج C#: Namespaces, Types, Statements — يطابق قسم Introduction to C# Code",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح الشرح",
                  url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "Windows Forms Designer Overview",
              d: "شرح رسمي للـ Designer: إضافة وترتيب Controls، تعديل Properties، كتابة Event Handlers",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح الشرح",
                  url: "https://learn.microsoft.com/en-us/visualstudio/designers/windows-forms-designer-overview",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "Add Controls to a Form",
              d: "شرح رسمي لإضافة Controls إلى Form — يطابق قسم Adding Controls to a Form",
              icon: "📚",
              actions: [
                {
                  label: "🚀 فتح الشرح",
                  url: "https://learn.microsoft.com/en-us/dotnet/desktop/winforms/controls/how-to-add-to-a-form",
                  type: "view",
                  color: "green",
                },
              ],
            },
          ],
        },
        {
          category: "Events & Event Handlers",
          icon: "⚡",
          description:
            "مصادر للجزء الخاص بالـ Event Handler مثل displayButton_Click وMessageBox.Show",
          links: [
            {
              t: "C# Events - Official Documentation",
              d: "شرح رسمي لمفهوم Events في C# وكيف تتعامل Controls مع الأحداث",
              icon: "⚡",
              actions: [
                {
                  label: "🚀 فتح الشرح",
                  url: "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/events/",
                  type: "view",
                  color: "orange",
                },
              ],
            },
            {
              t: "How to Handle Control Events",
              d: "شرح رسمي لإنشاء وربط Event Handlers مع Controls في Windows Forms",
              icon: "⚡",
              actions: [
                {
                  label: "🚀 فتح الشرح",
                  url: "https://learn.microsoft.com/en-us/dotnet/desktop/winforms/controls/how-to-add-an-event-handler",
                  type: "view",
                  color: "orange",
                },
              ],
            },
            {
              t: "Picture Viewer Tutorial - Adding Code",
              d: "تطبيق عملي: إضافة Event Handlers وكتابة الكود — يطابق مثال Hello World",
              icon: "⚡",
              actions: [
                {
                  label: "🚀 فتح الـ Tutorial",
                  url: "https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-windows-forms-picture-viewer-code",
                  type: "view",
                  color: "orange",
                },
              ],
            },
          ],
        },
        {
          category: "مشاريع تطبيقية",
          icon: "🚀",
          description:
            "مشاريع عملية من Microsoft تطبق كل مفاهيم الفصل: إنشاء مشروع، تصميم GUI، إضافة Controls، كتابة Events",
          links: [
            {
              t: "Hello World Windows Forms App",
              d: "تطبيق Hello World الرسمي — **مطابق تماماً** لمثال الفصل: إنشاء Button، تغيير Text، كتابة MessageBox.Show",
              icon: "👋",
              actions: [
                {
                  label: "🚀 ابدأ التطبيق",
                  url: "https://learn.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio",
                  type: "view",
                  color: "green",
                },
              ],
            },
            {
              t: "Picture Viewer - Complete Project",
              d: "مشروع متكامل: إنشاء Layout، إضافة Controls، كتابة Event Handlers — تطبيق شامل لمفاهيم الفصل",
              icon: "🖼️",
              actions: [
                {
                  label: "🚀 ابدأ المشروع",
                  url: "https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-windows-forms-picture-viewer-layout",
                  type: "view",
                  color: "blue",
                },
              ],
            },
            {
              t: "Windows Forms Math Quiz",
              d: "مشروع تطبيقي: إنشاء مشروع، إضافة Labels وButtons، التعامل مع Controls — يعزز فهم الفصل",
              icon: "🧮",
              actions: [
                {
                  label: "🚀 ابدأ المشروع",
                  url: "https://learn.microsoft.com/en-us/visualstudio/get-started/csharp/tutorial-windows-forms-math-quiz-create-project-add-controls",
                  type: "view",
                  color: "purple",
                },
              ],
            },
          ],
        },
        {
          category: "أدوات التطوير",
          icon: "🔧",
          description: "الأدوات المطلوبة لتطبيق مفاهيم الفصل عملياً",
          links: [
            {
              t: "Visual Studio Community - Free Download",
              d: "تحميل بيئة التطوير المتكاملة (IDE) المجانية — الأداة الأساسية المطلوبة في الفصل",
              icon: "🔧",
              actions: [
                {
                  label: "⭳ تحميل Visual Studio",
                  url: "https://visualstudio.microsoft.com/downloads/",
                  type: "download",
                  color: "blue",
                },
              ],
            },
            {
              t: ".NET Fiddle - Online C# Compiler",
              d: "محرر أونلاين لتجربة كود C# مباشرة — مفيد لفهم Namespaces وClasses بدون تثبيت",
              icon: "🔧",
              actions: [
                {
                  label: "🚀 فتح المحرر",
                  url: "https://dotnetfiddle.net/",
                  type: "view",
                  color: "orange",
                },
              ],
            },
          ],
        },
      ],

      // ═══════════════════════════════════════════════════════════════════
      //  مادة: Visual Programming — البرمجة المرئية
      //  المسار: datenew/visual-programming/visual-programming.js
      //  المرجع: Visual Studio and C# Windows Forms
      // ═══════════════════════════════════════════════════════════════════

      questions: [
        {
          q: "What is Visual Studio primarily described as in the lecture?",
          options: [
            "A simple text editor",
            "A professional integrated development environment (IDE)",
            "A web browser",
            "A graphics design tool",
          ],
          correct: 1,
          translation: "ما هو Visual Studio بشكل أساسي كما وُصف في المحاضرة؟",
          explanation:
            "بيئة تطوير متكاملة احترافية (IDE) — مش محرر نصوص بسيط، ولا متصفح، ولا أداة تصميم رسومات.",
        },
        {
          q: "Which languages can Visual Studio be used to create applications with, besides Visual C#?",
          options: [
            "Java and Python",
            "Visual Basic and C++",
            "HTML and CSS",
            "SQL and PHP",
          ],
          correct: 1,
          translation:
            "بجانب Visual C#، ما اللغات التي يمكن استخدام Visual Studio لإنشاء تطبيقات بها؟",
          explanation:
            "Visual Basic و C++ — دي اللغات الأساسية المدعومة في Visual Studio بجانب C#.",
        },
        {
          q: "What is the first step to creating a new project in Visual Studio?",
          options: [
            "Click Save All",
            "Open Visual Studio and select Create a new project from the Start Window",
            "Open the Toolbox",
            "Change the form's Text property",
          ],
          correct: 1,
          translation: "ما الخطوة الأولى لإنشاء مشروع جديد في Visual Studio؟",
          explanation:
            "افتح Visual Studio واختر Create a new project من نافذة البدء — دي نقطة البداية لأي مشروع جديد.",
        },
        {
          q: "What type of application is selected in the lecture for creating a new project?",
          options: [
            "Console App",
            "Windows Forms Application",
            "Web Application",
            "Class Library",
          ],
          correct: 1,
          translation:
            "ما نوع التطبيق الذي تم اختياره في المحاضرة لإنشاء مشروع جديد؟",
          explanation:
            "تطبيق Windows Forms — لأنه بيوفر واجهة رسومية سهلة التعلم للمبتدئين.",
        },
        {
          q: "What is the default name filled in the project name text box when creating a new Windows Forms App?",
          options: [
            "MyFirstProject",
            "Project1",
            "WindowsFormsApp1",
            "AppDefault",
          ],
          correct: 2,
          translation:
            "ما الاسم الافتراضي المعبأ في مربع نص اسم المشروع عند إنشاء تطبيق Windows Forms جديد؟",
          explanation:
            "WindowsFormsApp1 — الاسم الافتراضي اللي بيقترحه Visual Studio تلقائياً.",
        },
        {
          q: "What is a solution in Visual Studio?",
          options: [
            "A single file containing code",
            "A container that holds a project",
            "A type of control",
            "An event handler",
          ],
          correct: 1,
          translation: "ما هو الحل (Solution) في Visual Studio؟",
          explanation:
            "حاوية بتحمل المشروع — ممكن تحتوي على مشروع واحد أو أكثر.",
        },
        {
          q: "By default, what is the relationship between the solution name and project name?",
          options: [
            "They are always different",
            "The solution name is the same as the project name",
            "The solution name is longer",
            "There is no relationship",
          ],
          correct: 1,
          translation: "افتراضياً، ما العلاقة بين اسم الحل واسم المشروع؟",
          explanation:
            "اسم الحل هو نفسه اسم المشروع — Visual Studio بيخليهم متطابقين افتراضياً.",
        },
        {
          q: "Where is the project name displayed after creating a new project?",
          options: [
            "In the Toolbox",
            "In the title bar at the top of the Visual Studio window",
            "In the Properties window",
            "In the menu bar",
          ],
          correct: 1,
          translation: "أين يظهر اسم المشروع بعد إنشاء مشروع جديد؟",
          explanation:
            "في شريط العنوان بأعلى نافذة Visual Studio — بيعرض اسم المشروع الحالي.",
        },
        {
          q: "Which windows appear within the Visual Studio environment as mentioned in the lecture?",
          options: [
            "Code Editor, Debugger, Compiler",
            "Designer window, Solution Explorer window, Properties window",
            "Toolbox, Menu Bar, Toolbar",
            "Form, Button, Label",
          ],
          correct: 1,
          translation:
            "أي نوافذ تظهر داخل بيئة Visual Studio كما ذُكر في المحاضرة؟",
          explanation:
            "نافذة المصمم (Designer) + مستكشف الحلول (Solution Explorer) + نافذة الخصائص (Properties).",
        },
        {
          q: "How do you open the Solution Explorer window if it is not visible?",
          options: [
            "Click File > Open",
            "Click View on the menu bar, then Solution Explorer",
            "Press F5",
            "Double-click the form",
          ],
          correct: 1,
          translation:
            "كيف تفتح نافذة مستكشف الحلول (Solution Explorer) إذا لم تكن ظاهرة؟",
          explanation:
            "اضغط View من شريط القوائم ثم Solution Explorer — أو استخدم اختصار لوحة المفاتيح Ctrl+Alt+L.",
        },
        {
          q: "What feature allows windows in Visual Studio to be displayed as tabs along the edges when turned on?",
          options: ["Auto Save", "Auto Hide", "Auto Size", "Auto Align"],
          correct: 1,
          translation:
            "ما الميزة التي تسمح بعرض النوافذ في Visual Studio كتبويبات على الحواف عند تشغيلها؟",
          explanation:
            "الإخفاء التلقائي (Auto Hide) — بيخلي النافذة تتحول لتاب على الحافة لما مش مستخدمة.",
        },
        {
          q: "How do you turn Auto Hide on or off for a window?",
          options: [
            "Click the pushpin icon in the window's title bar",
            "Press Ctrl+H",
            "Right-click the window and select Hide",
            "Change the Visible property",
          ],
          correct: 0,
          translation: "كيف تشغّل أو تطفئ الإخفاء التلقائي (Auto Hide) لنافذة؟",
          explanation:
            "اضغط أيقونة الدبوس (pushpin) في شريط عنوان النافذة — بتثبّت النافذة أو تخليها تختفي تلقائياً.",
        },
        {
          q: "What appears below the menu bar in Visual Studio?",
          options: [
            "The Toolbox",
            "The standard toolbar",
            "The Designer window",
            "The code editor",
          ],
          correct: 1,
          translation: "ماذا يظهر أسفل شريط القوائم في Visual Studio؟",
          explanation:
            "شريط الأدوات القياسي (Standard Toolbar) — بيحتوي على أزرار سريعة للأوامر الشائعة.",
        },
        {
          q: "Which toolbar button moves to the previously active tab in the Designer window?",
          options: [
            "Navigate Forward",
            "New Project",
            "Navigate Backward",
            "Save All",
          ],
          correct: 2,
          translation:
            "أي زر في شريط الأدوات ينقلك للتاب النشط السابق في نافذة المصمم؟",
          explanation: "Navigate Backward — بيرجعك للتاب اللي كنت فيه قبل كده.",
        },
        {
          q: "What does the Undo button on the toolbar do?",
          options: [
            "Saves the project",
            "Undoes the most recent operation",
            "Starts debugging",
            "Configures the project",
          ],
          correct: 1,
          translation: "ماذا يفعل زر التراجع (Undo) في شريط الأدوات؟",
          explanation: "يلغي آخر عملية — بترجع لآخر حالة قبل التعديل الأخير.",
        },
        {
          q: "Which button lets you select the platform on which the application will run?",
          options: [
            "Solution Configurations",
            "Solution Platform",
            "Start Debugging",
            "Find",
          ],
          correct: 1,
          translation: "أي زر يسمح لك باختيار المنصة التي سيعمل عليها التطبيق؟",
          explanation:
            "Solution Platform — بيحدد المنصة المستهدفة (x86, x64, Any CPU).",
        },
        {
          q: "What is the purpose of the Toolbox window?",
          options: [
            "To edit code",
            "To select controls for the user interface",
            "To view properties",
            "To explore solutions",
          ],
          correct: 1,
          translation: "ما الغرض من نافذة صندوق الأدوات (Toolbox)؟",
          explanation:
            "اختيار عناصر التحكم (Controls) لواجهة المستخدم — زي الأزرار والتسميات.",
        },
        {
          q: "Where does the Toolbox typically appear in Visual Studio?",
          options: [
            "On the right side",
            "On the bottom",
            "On the left side",
            "On the top",
          ],
          correct: 2,
          translation: "أين يظهر صندوق الأدوات عادةً في Visual Studio؟",
          explanation: "على الجانب الأيسر — افتراضياً بيكون في الشمال.",
        },
        {
          q: "What is a ToolTip in Visual Studio?",
          options: [
            "A button on the toolbar",
            "A small box with a description that pops up when hovering over a button",
            "A property in the Properties window",
            "A control in the Toolbox",
          ],
          correct: 1,
          translation: "ما هو التلميح (ToolTip) في Visual Studio؟",
          explanation:
            "مربع صغير بوصف يظهر عند تمرير الماوس فوق زر — بيشرح وظيفة الزر.",
        },
        {
          q: "What is a Visual C# project composed of?",
          options: [
            "Only code files",
            "Several related files such as code and images",
            "A single image",
            "Only forms",
          ],
          correct: 1,
          translation: "مما يتكون مشروع Visual C#؟",
          explanation:
            "عدة ملفات مترابطة زي الكود والصور — مش ملف واحد ولا صور فقط.",
        },
        {
          q: "What can a solution hold in Visual Studio?",
          options: [
            "Only one project",
            "One or more Visual C# projects",
            "Only images",
            "Only code files",
          ],
          correct: 1,
          translation: "ماذا يمكن أن يحتوي الحل (Solution) في Visual Studio؟",
          explanation:
            "مشروع واحد أو أكثر من مشاريع Visual C# — بيسمح بدمج مشاريع مترابطة.",
        },
        {
          q: "Why might you store several related projects in the same solution?",
          options: [
            "For small organizations only",
            "For convenience in large organizations",
            "To reduce file size",
            "To hide code",
          ],
          correct: 1,
          translation: "لماذا قد تخزّن عدة مشاريع مترابطة في نفس الحل؟",
          explanation:
            "للراحة في المؤسسات الكبيرة — بيسمح بإدارة المشاريع المرتبطة معاً.",
        },
        {
          q: "How do you display a project's form in the Designer if it's not shown?",
          options: [
            "Double-click the form",
            "Right-click Form1.cs in Solution Explorer and click View Designer",
            "Press F5",
            "Click the Toolbox",
          ],
          correct: 1,
          translation: "كيف تعرض نموذج المشروع في المصمم إذا لم يكن ظاهراً؟",
          explanation:
            "اضغط بزر الماوس الأيمن على Form1.cs في مستكشف الحلول ثم اختر View Designer.",
        },
        {
          q: "What is the initial size of a form in pixels?",
          options: ["200 x 200", "300 x 300", "400 x 400", "100 x 100"],
          correct: 1,
          translation: "ما الحجم الابتدائي للنموذج بالبكسل؟",
          explanation: "300 × 300 بكسل — الحجم الافتراضي للنموذج الجديد.",
        },
        {
          q: "What indicates that an object is selected in the Designer?",
          options: [
            "A solid line around it",
            "A bounding box with sizing handles",
            "A red color",
            "A tooltip",
          ],
          correct: 1,
          translation: "ما الذي يشير إلى أن كائناً محدد في المصمم؟",
          explanation:
            "مربع إحاطة بمقابض تحجيم (Bounding box with sizing handles) — بتحيط بالكائن المحدد.",
        },
        {
          q: "What is the default name of the blank form created in a new project?",
          options: ["MainForm", "Form1", "MyForm", "DefaultForm"],
          correct: 1,
          translation:
            "ما الاسم الافتراضي للنموذج الفارغ الذي يتم إنشاؤه في مشروع جديد؟",
          explanation: "Form1 — الاسم الافتراضي لأول نموذج في المشروع.",
        },
        {
          q: "What determines the appearance and characteristics of a GUI object?",
          options: ["Its name", "Its properties", "Its code", "Its location"],
          correct: 1,
          translation:
            "ما الذي يحدد مظهر وخصائص كائن واجهة المستخدم الرسومية (GUI)؟",
          explanation: "خصائصه (Properties) — زي الحجم واللون والنص وغيرها.",
        },
        {
          q: "Where are an object's properties displayed when selected?",
          options: [
            "In the Toolbox",
            "In the Properties window",
            "In the code editor",
            "In the menu bar",
          ],
          correct: 1,
          translation: "أين تُعرض خصائص الكائن عند تحديده؟",
          explanation:
            "في نافذة الخصائص (Properties window) — على اليمين افتراضياً.",
        },
        {
          q: "What does the Text property of a form determine?",
          options: [
            "The form's size",
            "The text in the title bar",
            "The form's color",
            "The form's name",
          ],
          correct: 1,
          translation: "ماذا يحدد خاصية النص (Text) للنموذج؟",
          explanation:
            "النص في شريط العنوان — اللي بيظهر للمستخدم في أعلى النافذة.",
        },
        {
          q: "Changing a form's Text property does what to its name?",
          options: [
            "Changes the name",
            "Does not change the name",
            "Deletes the name",
            "Hides the name",
          ],
          correct: 1,
          translation: "تغيير خاصية النص (Text) للنموذج ماذا يفعل باسمه؟",
          explanation:
            "لا يغيّر الاسم — الاسم (Name) خاصية منفصلة عن النص (Text).",
        },
        {
          q: "How can you change a form's size using the Properties window?",
          options: [
            "Edit the Name property",
            "Edit the Size property",
            "Edit the Text property",
            "Edit the Visible property",
          ],
          correct: 1,
          translation: "كيف يمكنك تغيير حجم النموذج باستخدام نافذة الخصائص؟",
          explanation:
            "عدّل خاصية الحجم (Size) — بتحدد العرض والارتفاع بالبكسل.",
        },
        {
          q: "How do you add a control to a form from the Toolbox?",
          options: [
            "Right-click it",
            "Double-click it or drag it",
            "Press Enter",
            "Change its properties",
          ],
          correct: 1,
          translation: "كيف تضيف عنصر تحكم إلى النموذج من صندوق الأدوات؟",
          explanation:
            "انقر نقراً مزدوجاً عليه أو اسحبه — الطريقتان تضيفان العنصر للنموذج.",
        },
        {
          q: "How do you delete a control from a form?",
          options: [
            "Select it and press Delete",
            "Change its Visible property to False",
            "Resize it to zero",
            "Change its name",
          ],
          correct: 0,
          translation: "كيف تحذف عنصر تحكم من النموذج؟",
          explanation: "حدده واضغط Delete — الحذف الفعلي من النموذج.",
        },
        {
          q: "What is the default name for the first Button control created?",
          options: ["button Default", "button1", "myButton", "clickButton"],
          correct: 1,
          translation: "ما الاسم الافتراضي لأول زر (Button) يتم إنشاؤه؟",
          explanation:
            "button1 — Visual Studio بيسمي الأزرار button1, button2, إلخ.",
        },
        {
          q: "What property holds the text displayed on a Button's face?",
          options: ["Name", "Size", "Text", "Visible"],
          correct: 2,
          translation: "ما الخاصية التي تحمل النص المعروض على وجه الزر؟",
          explanation:
            "خاصية النص (Text) — هي اللي بتحدد الكلام اللي يظهر على الزر.",
        },
        {
          q: "Changing a Button's Text property affects what?",
          options: [
            "Its name",
            "The text on its face",
            "Its size",
            "Its visibility",
          ],
          correct: 1,
          translation: "تغيير خاصية النص (Text) للزر يؤثر على ماذا؟",
          explanation: "النص على وجهه — مش الاسم ولا الحجم ولا الرؤية.",
        },
        {
          q: "What is the first character rule for C# identifiers (control names)?",
          options: [
            "Must be a digit",
            "Must be a letter or underscore",
            "Must be a space",
            "Must be a symbol",
          ],
          correct: 1,
          translation: "ما قاعدة الحرف الأول لمعرّفات C# (أسماء عناصر التحكم)؟",
          explanation: "يجب أن يكون حرفاً أو شرطة سفلية (_) — مش رقم أو رمز.",
        },
        {
          q: "Can control names contain spaces in C#?",
          options: ["Yes", "No", "Only at the end", "Only if quoted"],
          correct: 1,
          translation: "هل يمكن أن تحتوي أسماء عناصر التحكم على مسافات في C#؟",
          explanation:
            "لا — المسافات ممنوعة في المعرّفات. استخدم camelCase بدلاً منها.",
        },
        {
          q: "What naming convention is recommended for multi-word control names?",
          options: ["Snake case", "Camel case", "Pascal case", "Kebab case"],
          correct: 1,
          translation:
            "ما اصطلاح التسمية الموصى به لأسماء عناصر التحكم متعددة الكلمات؟",
          explanation: "camelCase — أول كلمة صغيرة والكلمات التالية بحرف كبير.",
        },
        {
          q: "In camelCase, how is the first word written?",
          options: [
            "All uppercase",
            "All lowercase",
            "First letter uppercase",
            "With underscores",
          ],
          correct: 1,
          translation: "في camelCase، كيف تُكتب الكلمة الأولى؟",
          explanation: "كلها حروف صغيرة (All lowercase) — مثال: displayButton.",
        },
        {
          q: "What file contains the application's start-up code in a C# project?",
          options: ["Form1.cs", "Program.cs", "Main.cs", "Startup.cs"],
          correct: 1,
          translation:
            "ما الملف الذي يحتوي على كود بدء تشغيل التطبيق في مشروع C#؟",
          explanation:
            "Program.cs — بيحتوي على نقطة الدخول Main() وبيبدأ تشغيل النموذج.",
        },
        {
          q: "What should you not modify in the Program.cs file?",
          options: [
            "The comments",
            "The contents, as it could prevent execution",
            "The namespace",
            "The class name",
          ],
          correct: 1,
          translation: "ما الذي يجب عدم تعديله في ملف Program.cs؟",
          explanation:
            "محتوياته — لأن التعديل ممكن يمنع التنفيذ. سيبها زي ما هي.",
        },
        {
          q: "Which file contains code associated with the Form1 form?",
          options: ["Program.cs", "Form1.cs", "Designer.cs", "App.cs"],
          correct: 1,
          translation: "أي ملف يحتوي على الكود المرتبط بنموذج Form1؟",
          explanation: "Form1.cs — فيه كود النموذج ومعالجات الأحداث.",
        },
        {
          q: "How is C# code primarily organized?",
          options: [
            "Functions, loops, variables",
            "Namespaces, classes, methods",
            "Forms, controls, properties",
            "Files, folders, projects",
          ],
          correct: 1,
          translation: "كيف يتم تنظيم كود C# بشكل أساسي؟",
          explanation:
            "مساحات الأسماء (Namespaces) ثم الفئات (Classes) ثم الدوال (Methods).",
        },
        {
          q: "What do using directives at the top of a C# file indicate?",
          options: [
            "Classes to create",
            "Namespaces from .NET Framework to use",
            "Methods to call",
            "Controls to add",
          ],
          correct: 1,
          translation: "ماذا تشير توجيهات using في أعلى ملف C#؟",
          explanation:
            "مساحات الأسماء من .NET Framework التي سيتم استخدامها — زي System و System.Windows.Forms.",
        },
        {
          q: "What marks the beginning of a namespace in code?",
          options: [
            "class namespaceName",
            "namespace namespaceName",
            "using namespaceName",
            "public namespaceName",
          ],
          correct: 1,
          translation: "ما الذي يحدد بداية مساحة اسم (Namespace) في الكود؟",
          explanation:
            "كلمة namespace متبوعة باسم المساحة — مثال: namespace MyProject.",
        },
        {
          q: "What is a class declaration in C#?",
          options: [
            "A container for methods",
            "A container for namespaces",
            "A group of statements",
            "An event handler",
          ],
          correct: 0,
          translation: "ما هو تعريف الفئة (Class) في C#؟",
          explanation:
            "حاوية للدوال (Methods) — الفئة بتجمع الدوال والبيانات المرتبطة.",
        },
        {
          q: "What is the entry point method in a form class?",
          options: [
            "Main()",
            "public Form1()",
            "InitializeComponent()",
            "Click()",
          ],
          correct: 1,
          translation: "ما هي دالة نقطة الدخول في فئة النموذج؟",
          explanation:
            "public Form1() — الباني (Constructor) اللي بيتم استدعاؤه عند إنشاء النموذج.",
        },
        {
          q: "How do you switch between the code editor and Designer using tabs?",
          options: [
            "Click Form1.cs for code, Form1.cs [Design] for Designer",
            "Press F7 for code, F6 for Designer",
            "Right-click and select",
            "Use the menu bar",
          ],
          correct: 0,
          translation: "كيف تنتقل بين محرر الكود والمصمم باستخدام التبويبات؟",
          explanation:
            "اضغط Form1.cs للكود، Form1.cs [Design] للمصمم — تبويبان منفصلان.",
        },
        {
          q: "How can you detach the code editor to see it and the Designer simultaneously?",
          options: [
            "Press Ctrl + D",
            "Drag the code editor tab to another location",
            "Click View > Detach",
            "Change Auto Hide",
          ],
          correct: 1,
          translation: "كيف يمكنك فصل محرر الكود لرؤيته والمصمم في نفس الوقت؟",
          explanation:
            "اسحب تبويب محرر الكود لمكان آخر — بيفصل في نافذة مستقلة.",
        },
        {
          q: "What is an event handler?",
          options: [
            "A property of a control",
            "A method that executes when a specific event occurs",
            "A namespace",
            "A class declaration",
          ],
          correct: 1,
          translation: "ما هو معالج الحدث (Event Handler)؟",
          explanation: "دالة تُنفَّذ عند وقوع حدث معين — زي الضغط على زر.",
        },
        {
          q: "How do you create a Click event handler for a button?",
          options: [
            "Write it manually in code",
            "Double-click the button in the Designer",
            "Change the Click property",
            "Use the Toolbox",
          ],
          correct: 1,
          translation: "كيف تنشئ معالج حدث النقر (Click) لزر؟",
          explanation:
            "انقر نقراً مزدوجاً على الزر في المصمم — بيولّد معالج الحدث تلقائياً.",
        },
        {
          q: "What method displays a message box?",
          options: [
            "Label.Show()",
            "MessageBox.Show()",
            "Form.Message()",
            "Button.Display()",
          ],
          correct: 1,
          translation: "ما الدالة التي تعرض مربع رسالة؟",
          explanation: "MessageBox.Show() — دالة ثابتة تعرض مربع حوار برسالة.",
        },
        {
          q: "In the Hello World app, what is the form's Text property set to?",
          options: [
            "Hello World",
            "My First Program",
            "Display Message",
            "Form1",
          ],
          correct: 1,
          translation:
            "في تطبيق Hello World، ما قيمة خاصية النص (Text) للنموذج؟",
          explanation: "My First Program — النص الظاهر في شريط العنوان.",
        },
        {
          q: "What is the Button's Name property in the Hello World app?",
          options: ["button1", "displayButton", "messageButton", "helloButton"],
          correct: 2,
          translation: "ما اسم خاصية الاسم (Name) للزر في تطبيق Hello World؟",
          explanation: "messageButton — اسم وصفي يوضح وظيفة الزر.",
        },
        {
          q: "What statement is written in the Hello World app's event handler?",
          options: [
            'MessageBox.Show("Hello World");',
            'Label.Text = "Hello World";',
            "this.Close();",
            "Visible = true;",
          ],
          correct: 0,
          translation: "ما العبارة المكتوبة في معالج الحدث لتطبيق Hello World؟",
          explanation:
            'MessageBox.Show("Hello World"); — بتعرض مربع رسالة بكلمة Hello World.',
        },
        {
          q: "What is a Label control used for?",
          options: [
            "To input text",
            "To display text",
            "To show images",
            "To close the form",
          ],
          correct: 1,
          translation: "فيم يُستخدم عنصر التحكم Label؟",
          explanation: "لعرض النص — مش لإدخال النص ولا لعرض الصور.",
        },
        {
          q: "How do you change the font of a Label's text?",
          options: [
            "Edit Text property",
            "Click ellipses in Font property",
            "Set AutoSize to True",
            "Change BorderStyle",
          ],
          correct: 1,
          translation: "كيف تغيّر خط نص التسمية (Label)؟",
          explanation:
            "اضغط النقاط الثلاث (...) في خاصية الخط (Font) — بيفتح مربع حوار الخط.",
        },
        {
          q: "What BorderStyle value outlines the Label's text with a thin border?",
          options: ["None", "FixedSingle", "Fixed3D", "Auto"],
          correct: 1,
          translation: "ما قيمة BorderStyle التي تحيط نص التسمية بإطار رفيع؟",
          explanation: "FixedSingle — إطار خط واحد رفيع حول النص.",
        },
        {
          q: "What happens when a Label's AutoSize is True?",
          options: [
            "It cannot be resized manually",
            "It becomes invisible",
            "It centers the text",
            "It adds a border",
          ],
          correct: 0,
          translation:
            "ماذا يحدث عندما تكون خاصية AutoSize للتسمية مساوية لـ True؟",
          explanation:
            "لا يمكن تغيير حجمها يدوياً — الحجم بيتكيف تلقائياً مع النص.",
        },
        {
          q: "What TextAlign value aligns text in the middle center of a Label?",
          options: ["TopLeft", "MiddleCenter", "BottomRight", "MiddleLeft"],
          correct: 1,
          translation: "ما قيمة TextAlign التي تحاذي النص في منتصف التسمية؟",
          explanation: "MiddleCenter — توسيط أفقي ورأسي.",
        },
        {
          q: "Can numbers be assigned directly to a Label's Text property without quotes?",
          options: [
            "Yes",
            "No, they must be strings",
            "Only if positive",
            "Only in code",
          ],
          correct: 1,
          translation:
            "هل يمكن تعيين أرقام مباشرة إلى خاصية النص (Text) للتسمية بدون علامات تنصيص؟",
          explanation: "لا، يجب أن تكون نصوصاً — خاصية Text من نوع string.",
        },
        {
          q: "How do you clear a Label's text in code?",
          options: [
            "label.Text = null;",
            'label.Text = "";',
            "label.Visible = false;",
            "label.AutoSize = false;",
          ],
          correct: 1,
          translation: "كيف تمسح نص التسمية في الكود؟",
          explanation: 'label.Text = ""; — تعيين سلسلة فارغة.',
        },
        {
          q: "In Example 1, what is displayed when the button is clicked?",
          options: [
            "Hello World",
            "Fundamentals of Programming 2",
            "Course Name",
            "Show Answer",
          ],
          correct: 1,
          translation: "في المثال 1، ماذا يُعرض عند النقر على الزر؟",
          explanation:
            "Fundamentals of Programming 2 — اسم المادة يظهر في التسمية.",
        },
        {
          q: "What is the purpose of a PictureBox control?",
          options: [
            "To display text",
            "To display a graphic image",
            "To input data",
            "To close the form",
          ],
          correct: 1,
          translation: "ما الغرض من عنصر التحكم PictureBox؟",
          explanation: "لعرض صورة رسومية — مش نص ولا إدخال بيانات.",
        },
        {
          q: "How do you select an image for a PictureBox?",
          options: [
            "Edit Text property",
            "Click ellipses in Image property and import",
            "Set Visible to true",
            "Change SizeMode",
          ],
          correct: 1,
          translation: "كيف تختار صورة لـ PictureBox؟",
          explanation:
            "اضغط النقاط الثلاث (...) في خاصية الصورة (Image) ثم Import — لاستيراد صورة.",
        },
        {
          q: "What SizeMode value resizes the image to fit without stretching?",
          options: ["Normal", "StretchImage", "Zoom", "AutoSize"],
          correct: 2,
          translation:
            "ما قيمة SizeMode التي تغيّر حجم الصورة لتناسب دون تمدد؟",
          explanation:
            "Zoom — تحافظ على نسبة الأبعاد وتكبر/تصغر لتناسب المساحة.",
        },
        {
          q: "What does the Visible property do for a PictureBox?",
          options: [
            "Changes its size",
            "Determines if it's shown at runtime",
            "Sets the image",
            "Aligns the text",
          ],
          correct: 1,
          translation: "ماذا تفعل خاصية Visible لـ PictureBox؟",
          explanation:
            "تحدد ما إذا كانت تظهر في وقت التشغيل — true تظهر، false تختفي.",
        },
        {
          q: "In Example 2, what happens when clicking the cat image?",
          options: [
            'Displays "Hello World"',
            'Displays "Hello I\'m a cat"',
            "Flips the card",
            "Shows a flag",
          ],
          correct: 1,
          translation: "في المثال 2، ماذا يحدث عند النقر على صورة القطة؟",
          explanation: 'تظهر رسالة "Hello I\'m a cat" — تفاعل مع الصورة.',
        },
        {
          q: "In Example 3, how many PictureBox controls are used?",
          options: ["1", "2", "3", "4"],
          correct: 2,
          translation: "في المثال 3، كم عدد عناصر PictureBox المستخدمة؟",
          explanation: "3 عناصر — لعرض ثلاث صور (أعلام).",
        },
        {
          q: "What is displayed when clicking the Egypt flag in Example 3?",
          options: ["Palestine", "UAE", "Egypt", "Flag"],
          correct: 2,
          translation: "ماذا يُعرض عند النقر على علم مصر في المثال 3؟",
          explanation: "Egypt — يظهر اسم الدولة في التسمية.",
        },
        {
          q: "In Example 4, what is the initial Visible setting for cardFace PictureBox?",
          options: ["True", "False", "Auto", "None"],
          correct: 1,
          translation:
            "في المثال 4، ما قيمة Visible الأولية لـ cardFace PictureBox؟",
          explanation: "False — الوجه مخفي في البداية، ويظهر عند النقر.",
        },
        {
          q: "What statement closes an application's form?",
          options: [
            "this.Exit();",
            "this.Close();",
            "Form.Close();",
            "Application.Close();",
          ],
          correct: 1,
          translation: "ما العبارة التي تغلق نموذج التطبيق؟",
          explanation: "this.Close(); — تغلق النموذج الحالي وتنهي التطبيق.",
        },
        {
          q: "What starts a single-line comment in C#?",
          options: ["/*", "//", "#", "--"],
          correct: 1,
          translation: "ما الذي يبدأ تعليقاً من سطر واحد في C#؟",
          explanation: "// — أي شيء بعدها في نفس السطر يعتبر تعليقاً.",
        },
        {
          q: "What encloses a block comment in C#?",
          options: ["// and //", "/* and */", "# and #", "-- and --"],
          correct: 1,
          translation: "ما الذي يحيط بتعليق كتلة في C#؟",
          explanation: "/* و */ — كل ما بينهما يعتبر تعليقاً متعدد الأسطر.",
        },
        {
          q: "In the lecture, what is the email in the template?",
          options: [
            "info@example.com",
            "example@example.com",
            "support@example.com",
            "admin@example.com",
          ],
          correct: 1,
          translation: "في المحاضرة، ما البريد الإلكتروني في القالب؟",
          explanation: "example@example.com — عنوان بريد تجريبي.",
        },
        {
          q: "What button saves all files in the current project?",
          options: ["Save", "Save All", "Undo", "Redo"],
          correct: 1,
          translation: "ما الزر الذي يحفظ كل الملفات في المشروع الحالي؟",
          explanation: "Save All — يحفظ كل الملفات المعدلة مرة واحدة.",
        },
        {
          q: "What does the Find button on the toolbar do?",
          options: [
            "Starts debugging",
            "Searches for text in code",
            "Creates a new project",
            "Configures platform",
          ],
          correct: 1,
          translation: "ماذا يفعل زر البحث (Find) في شريط الأدوات؟",
          explanation: "يبحث عن نص في الكود — أداة بحث سريعة.",
        },
        {
          q: "Why should you not modify Program.cs?",
          options: [
            "It prevents compilation",
            "It could prevent execution",
            "It deletes the project",
            "It hides the form",
          ],
          correct: 1,
          translation: "لماذا يجب عدم تعديل Program.cs؟",
          explanation:
            "لأن التعديل قد يمنع تنفيذ التطبيق — بيحتوي على كود البدء الحساس.",
        },
        {
          q: "What is the default AutoSize for a Label?",
          options: ["False", "True", "None", "Auto"],
          correct: 1,
          translation: "ما القيمة الافتراضية لـ AutoSize للتسمية؟",
          explanation: "True — افتراضياً التسمية تتكيف مع حجم النص.",
        },
        {
          q: "What TextAlign is default for Labels?",
          options: ["MiddleCenter", "TopLeft", "BottomRight", "MiddleLeft"],
          correct: 1,
          translation: "ما قيمة TextAlign الافتراضية للتسميات؟",
          explanation: "TopLeft — افتراضياً النص في أعلى اليسار.",
        },
        {
          q: "In Example 1, what is answerLabel's initial Text?",
          options: [
            "Fundamentals of Programming 2",
            "Empty",
            "What is the name of this course?",
            "Show the Answer",
          ],
          correct: 1,
          translation: "في المثال 1، ما النص الأولي لـ answerLabel؟",
          explanation:
            "فارغ (Empty) — التسمية فاضية في البداية، ويظهر النص بعد النقر.",
        },
        {
          q: "What is the SizeMode for flags in Example 3?",
          options: ["Normal", "StretchImage", "Zoom", "CenterImage"],
          correct: 2,
          translation: "ما قيمة SizeMode للأعلام في المثال 3؟",
          explanation: "Zoom — لضبط حجم الأعلام مع الحفاظ على التناسب.",
        },
        {
          q: "In Example 4, what happens when clicking Show the Card Face?",
          options: [
            "Hides back, shows face",
            "Shows back, hides face",
            "Closes form",
            "Displays message",
          ],
          correct: 0,
          translation:
            "في المثال 4، ماذا يحدث عند النقر على Show the Card Face؟",
          explanation: "يخفي الظهر ويظهر الوجه — تبديل الرؤية بين الصورتين.",
        },
        {
          q: "What is the web address in the template?",
          options: [
            "www.example.org",
            "www.example.com",
            "www.example.net",
            "www.example.edu",
          ],
          correct: 1,
          translation: "ما عنوان الويب في القالب؟",
          explanation: "www.example.com — عنوان موقع تجريبي.",
        },
        {
          q: "What is the pushpin icon for?",
          options: [
            "Saving files",
            "Turning Auto Hide on/off",
            "Resizing windows",
            "Adding controls",
          ],
          correct: 1,
          translation: "ما وظيفة أيقونة الدبوس (pushpin)؟",
          explanation: "تشغيل/إيقاف الإخفاء التلقائي (Auto Hide) للنافذة.",
        },
        {
          q: "What is the default BorderStyle for Labels?",
          options: ["FixedSingle", "Fixed3D", "None", "Auto"],
          correct: 2,
          translation: "ما قيمة BorderStyle الافتراضية للتسميات؟",
          explanation: "None — افتراضياً بدون إطار.",
        },
        {
          q: "How do you import an image for PictureBox?",
          options: [
            "Drag from desktop",
            "Click Import in Select Resource",
            "Edit Text property",
            "Set Visible",
          ],
          correct: 1,
          translation: "كيف تستورد صورة لـ PictureBox؟",
          explanation:
            "اضغط Import في نافذة Select Resource — لاختيار الصورة من الملفات.",
        },
        {
          q: "What SizeMode clips large images?",
          options: ["Zoom", "Normal", "AutoSize", "StretchImage"],
          correct: 1,
          translation: "ما قيمة SizeMode التي تقص الصور الكبيرة؟",
          explanation: "Normal — تعرض الصورة بحجمها الأصلي، وتقص الزائد.",
        },
        {
          q: "What does CenterImage SizeMode do?",
          options: [
            "Resizes to fit",
            "Centers without resizing",
            "Stretches",
            "Auto resizes control",
          ],
          correct: 1,
          translation: "ماذا تفعل قيمة SizeMode = CenterImage؟",
          explanation:
            "توسّط الصورة دون تغيير حجمها — لو الصورة أكبر من الصندوق، تُقص الحواف.",
        },
        {
          q: "To make a PictureBox clickable, what do you create?",
          options: [
            "Text property",
            "Click event handler",
            "SizeMode",
            "BorderStyle",
          ],
          correct: 1,
          translation: "لجعل PictureBox قابلاً للنقر، ماذا تنشئ؟",
          explanation:
            "معالج حدث النقر (Click event handler) — لتنفيذ كود عند النقر.",
        },
        {
          q: "In Example 2, what is the PictureBox name?",
          options: ["imageBox", "catPictureBox", "clickableImage", "petBox"],
          correct: 1,
          translation: "في المثال 2، ما اسم PictureBox؟",
          explanation: "catPictureBox — اسم وصفي يدل على صورة القطة.",
        },
        {
          q: "What is countryLabel's TextAlign in Example 3?",
          options: ["TopLeft", "MiddleCenter", "BottomRight", "MiddleLeft"],
          correct: 1,
          translation: "ما قيمة TextAlign لـ countryLabel في المثال 3؟",
          explanation: "MiddleCenter — لتوسيط اسم الدولة في التسمية.",
        },
        {
          q: "In Example 4, what is cardBackPictureBox's initial Visible?",
          options: ["False", "True", "Hidden", "None"],
          correct: 1,
          translation:
            "في المثال 4، ما قيمة Visible الأولية لـ cardBackPictureBox؟",
          explanation: "True — الظهر ظاهر في البداية، ثم يختفي عند النقر.",
        },
        {
          q: "What statement sets Visible to false?",
          options: [
            "control.Visible = true;",
            "control.Visible = false;",
            "control.Hide();",
            "control.Show();",
          ],
          correct: 1,
          translation: "ما العبارة التي تجعل Visible = false؟",
          explanation: "control.Visible = false; — إخفاء عنصر التحكم.",
        },
        {
          q: "What is a block comment example?",
          options: [
            "// Comment",
            "/* Multi line comment */",
            "# Comment",
            "-- Comment",
          ],
          correct: 1,
          translation: "ما مثال تعليق الكتلة؟",
          explanation: "/* Multi line comment */ — تعليق متعدد الأسطر.",
        },
        {
          q: "In the Hello World writing code part, what is the event handler name?",
          options: [
            "button_Click",
            "messageButton_Click",
            "form_Load",
            "app_Run",
          ],
          correct: 1,
          translation: "في جزء كتابة كود Hello World، ما اسم معالج الحدث؟",
          explanation:
            "messageButton_Click — الاسم المشتق من اسم الزر وحدث النقر.",
        },
        {
          q: "How do you run an application in Visual Studio?",
          options: [
            "Press F1",
            "Press F5 or click Start Debugging",
            "Press Ctrl + S",
            "Click Save All",
          ],
          correct: 1,
          translation: "كيف تشغّل تطبيقاً في Visual Studio؟",
          explanation:
            "اضغط F5 أو انقر Start Debugging — لبدء تشغيل التطبيق في وضع التصحيح.",
        },
      ],
    },
  ],

  midtermsCategories: [
    {
      category: " Dr. Sara 2026",
      icon: "👨‍🏫",
      description: "Dr. Sara 2026  mid tirm",
      items: [
        {
          t: "أسئلة مادة PPIS — د. سارة",
          d: "مجموعة من الأسئلة والأجوبة حول مفاهيم Windows Forms و C#",
          pdf: "Visual Programming/Questions/Mid/2026/Important - PPIS - Q & A.pdf",
          questions: [
            {
              q: "How can you determine the number of items in a ListBox?",
              options: [
                "ListBox.Count",
                "ListBox.ItemCount",
                "ListBox.Length",
                "ListBox.Size",
              ],
              correct: 0,
              translation: "كيف يمكنك تحديد عدد العناصر في ListBox؟",
              explanation: "خاصية Count بترجع عدد العناصر — أبسط طريقة للعد.",
            },
            {
              q: "What happens if the user enters a non-numeric value in a TextBox and the code tries to convert it using int.Parse(textBox1.Text)?",
              options: [
                "It will return 0",
                "It will display an error message automatically",
                "It will throw a FormatException",
                "It will ignore the input",
              ],
              correct: 2,
              translation:
                "ماذا يحدث لو أدخل المستخدم قيمة غير رقمية في TextBox وحاول الكود تحويلها بـ int.Parse(textBox1.Text)؟",
              explanation:
                "int.Parse بترمي FormatException لو النص مش رقم صحيح — عشان كده TryParse أفضل للتحقق.",
            },
            {
              q: "What does the TryParse() method return when it fails to convert a string to an integer?",
              options: ["-1", "Throws an exception", "False", "Null"],
              correct: 2,
              translation:
                "ماذا ترجع دالة TryParse() عند فشل تحويل نص إلى رقم صحيح؟",
              explanation:
                "ترجع false — ومش بترمي استثناء، وده الفرق الأساسي بينها وبين Parse.",
            },
            {
              q: "Which property of the Label control is used to set the displayed text?",
              options: ["TextContent", "Text", "LabelText", "Content"],
              correct: 1,
              translation:
                "أي خاصية من خصائص Label تُستخدم لتعيين النص المعروض؟",
              explanation: "خاصية Text — هي المسؤولة عن النص الظاهر في Label.",
            },
            {
              q: "What will happen if you use File.CreateText() on a file that already exists?",
              options: [
                "It will throw an exception",
                "It will append new text",
                "It will overwrite the file's content",
                "It will open the file in read-only mode",
              ],
              correct: 2,
              translation:
                "ماذا يحدث لو استخدمت File.CreateText() على ملف موجود بالفعل؟",
              explanation: "بيستبدل محتوى الملف — بيمسح القديم ويكتب من جديد.",
            },
            {
              q: "What is the return value of the IndexOf method if the substring is not found?",
              options: ["0", "-1", "Null", "Throws an exception"],
              correct: 1,
              translation:
                "ما القيمة المرجعة من IndexOf لو النص الفرعي مش موجود؟",
              explanation: "ترجع -1 — قيمة اصطلاحية تعني 'غير موجود'.",
            },
            {
              q: "If you want a specific control to be the first one to receive focus when the form loads, what should its TabIndex be?",
              options: ["0", "1", "Any positive number"],
              correct: 0,
              translation:
                "لو عايز عنصر تحكم معين يكون أول من يستقبل التركيز عند تحميل النموذج، لازم TabIndex يكون كام؟",
              explanation:
                "0 — لأن TabIndex بيبدأ من الصفر، والعنصر صاحب الرقم 0 بياخد التركيز الأول.",
            },
            {
              q: "What happens if you set a GroupBox's Text property to an empty string?",
              options: [
                "The GroupBox shows no title",
                "An exception is thrown",
                'The title becomes "Untitled"',
                "The GroupBox is hidden",
              ],
              correct: 0,
              translation:
                "ماذا يحدث لو ضبطت خاصية Text لـ GroupBox على نص فارغ؟",
              explanation: "GroupBox مش بيعرض أي عنوان — بس الإطار بيفضل ظاهر.",
            },
            {
              q: 'What will be the output when the button is clicked twice?\n\nprivate int counter = 0;\nprivate void button1_Click(object sender, EventArgs e)\n{\n    counter++;\n    MessageBox.Show("Button clicked " + counter + " times");\n}',
              options: [
                "Shows 1 on first click, 2 on second click",
                "Shows 1 every time",
                "Compile-time error",
                "Nothing happens",
              ],
              correct: 0,
              translation: "ماذا سيكون الناتج عند النقر على الزر مرتين؟",
              explanation:
                "الـ counter متغير على مستوى الكلاس — بيتزود كل نقرة، فيعرض 1 ثم 2.",
            },
            {
              q: "What is the default keyboard shortcut to open the Output window in Visual Studio?",
              options: ["Alt+0", "Alt+N", "Ctrl+O", "Shift+O"],
              correct: 0,
              translation:
                "ما اختصار لوحة المفاتيح الافتراضي لفتح نافذة Output في Visual Studio؟",
              explanation: "Alt+0 — اختصار قياسي لفتح نافذة Output.",
            },
            {
              q: "Which property of a ListBox is used to get the selected item?",
              options: [
                "ListBox.Items",
                "ListBox.SelectedItem",
                "ListBox.Text",
                "ListBox.Value",
              ],
              correct: 1,
              translation:
                "أي خاصية من خصائص ListBox تُستخدم للحصول على العنصر المحدد؟",
              explanation:
                "SelectedItem — بترجع العنصر المحدد حالياً (أو null لو مفيش تحديد).",
            },
            {
              q: "What is the default value of the AutoSize property for a Label control?",
              options: ["True", "False", "None", "0"],
              correct: 0,
              translation: "ما القيمة الافتراضية لخاصية AutoSize لعنصر Label؟",
              explanation: "True — Label افتراضياً بيتكيف مع حجم النص.",
            },
            {
              q: 'What will the following code output?\n\nstring str = "C# Programming";\nstring result = str.Substring(3);\nConsole.WriteLine(result);',
              options: ["C# P", "Programming", "Progr", "C#"],
              correct: 1,
              translation: "ماذا سيكون ناتج الكود التالي؟",
              explanation:
                "Substring(3) بترجع النص من الفهرس 3 لآخره = Programming.",
            },
            {
              q: "Which namespace is required to handle file operations like File.CreateText?",
              options: [
                "System.Collections",
                "System.IO",
                "System.Data",
                "System.Text",
              ],
              correct: 1,
              translation:
                "أي مساحة أسماء مطلوبة للتعامل مع عمليات الملفات زي File.CreateText؟",
              explanation:
                "System.IO — مساحة الأسماء المخصصة لعمليات الإدخال/الإخراج.",
            },
          ],
        },
        {
          t: "ميدتيرم 2026 - National — د. سارة",
          d: "أسئلة اختبار الميدتيرم لمادة PPIS - أحدث نموذج",
          pdf: "Visual Programming/Questions/Mid/2026/MidTerm-2026-National-Dr.Sara.pdf",
          questions: [
            {
              q: "Which property determines the tab order of a control?",
              options: ["IndexOrder", "TabOrder", "TabIndex", "Index"],
              correct: 2,
              translation: "أي خاصية تحدد ترتيب التنقل بالتاب لعنصر التحكم؟",
              explanation:
                "TabIndex — رقم يحدد ترتيب استقبال التركيز عند الضغط على Tab.",
            },
            {
              q: "If the file specified in File.AppendText() does not exist, it is automatically created.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "لو الملف المحدد في File.AppendText() غير موجود، يتم إنشاؤه تلقائياً.",
              explanation:
                "صح — AppendText بيعمل الملف الجديد لو مش موجود ثم يبدأ الكتابة فيه.",
            },
            {
              q: "Which method is used to create a color from Red, Green, and Blue values?",
              options: [
                "Color.RGB()",
                "Color.FromRgb()",
                "Color.FromArgb()",
                "Color.Rgb()",
              ],
              correct: 2,
              translation:
                "أي دالة تُستخدم لإنشاء لون من قيم الأحمر والأخضر والأزرق؟",
              explanation:
                "Color.FromArgb() — بتاخد قيم ARGB أو RGB وترجع كائن لون.",
            },
            {
              q: "In saveFileDialog control the FileName property only contains the file name, not the folder path.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "في saveFileDialog، خاصية FileName تحتوي على اسم الملف فقط، وليس مسار المجلد.",
              explanation:
                "خطأ — FileName بتحتوي على المسار الكامل مع اسم الملف.",
            },
            {
              q: "What will be the output?\n\nRandom r = new Random();\nint x = r.Next(5);\nMessageBox.Show(x.ToString());\n\nPossible output:",
              options: ["0 to 4", "0 to 5", "Only 5", "1 to 4", "1 to 5"],
              correct: 0,
              translation: "ماذا سيكون الناتج؟",
              explanation:
                "r.Next(5) بترجع رقم من 0 إلى 4 (لا يشمل 5) — الطرف العلوي حصري.",
            },
            {
              q: 'If two RadioButtons (radioButton1 and radioButton2) are placed directly on the same Form. What will be the output of the following code when the goButton is clicked?\n\nprivate void goButton_Click(object sender, EventArgs e)\n{\n    radioButton1.Checked = true;\n    radioButton2.Checked = true;\n    if (radioButton1.Checked)\n        MessageBox.Show("Radio 1");\n    else\n        MessageBox.Show("Radio 2");\n}',
              options: [
                'A message box showing "Radio 1"',
                'A message box showing "Radio 2"',
                'A message box showing "Radio 1", then A message box showing "Radio 2"',
              ],
              correct: 1,
              translation:
                "لو زرين راديو على نفس النموذج، ماذا سيكون الناتج عند النقر على goButton؟",
              explanation:
                "لما radioButton2.Checked = true، بيرفع التحديد عن radioButton1 (لأنهم على نفس الأب)، فيعرض Radio 2.",
            },
            {
              q: "The method used to show the ColorDialog is ShowColor()",
              options: ["True", "False"],
              correct: 1,
              translation: "الدالة المستخدمة لعرض ColorDialog هي ShowColor().",
              explanation: "خطأ — الدالة الصحيحة هي ShowDialog().",
            },
            {
              q: "To perform a case-insensitive comparison, you can write String.Compare(s1, s2)",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لإجراء مقارنة لا تفرق بين حالة الأحرف، يمكنك كتابة String.Compare(s1, s2).",
              explanation:
                "خطأ — لازم تمرير true كمعامل ثالث: String.Compare(s1, s2, true).",
            },
            {
              q: "ListBox controls have an _______ method that erases all the items in the Items property.",
              options: [
                "Items.Erase",
                "Items.Remove",
                "Items.Clear",
                "Items.Empty",
              ],
              correct: 2,
              translation:
                "عناصر ListBox لها دالة _______ تمسح كل العناصر من خاصية Items.",
              explanation: "Items.Clear() — الدالة القياسية لمسح كل العناصر.",
            },
            {
              q: "What will happen if this code is in the button event handler and the button is clicked?\n\nlabel1.Focus();",
              options: [
                "The label receives focus",
                "The Focus() call does nothing",
                "The program crashes",
              ],
              correct: 1,
              translation: "ماذا يحدث لو الكود ده في معالج حدث الزر وتم النقر؟",
              explanation: "Label مش بيقبل التركيز — فالدالة مش بتعمل حاجة.",
            },
            {
              q: "When you use the Properties window to change a control's Visible property to false at design time, the control will still be visible in the Designer.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عند تغيير خاصية Visible لعنصر تحكم إلى false من نافذة الخصائص وقت التصميم، العنصر يبقى ظاهر في المصمم.",
              explanation:
                "صح — الإخفاء بيتم في وقت التشغيل فقط، المصمم بيفضل يعرضه.",
            },
            {
              q: 'If you write: Button1.Text = "&File"; What shortcut activates the button?',
              options: ["Ctrl + F", "Alt + F", "Shift + F", "Ctrl + Alt + F"],
              correct: 1,
              translation:
                'لو كتبت Button1.Text = "&File"، إيه الاختصار اللي ينشّط الزر؟',
              explanation: "Alt + F — علامة & بتحدد مفتاح الوصول (Access Key).",
            },
            {
              q: 'What does the method File.CreateText("data.txt") return?',
              options: [
                "FileInfo object",
                "StreamWriter object",
                "FileStream object",
                "StreamReader object",
              ],
              correct: 1,
              translation: 'ماذا ترجع دالة File.CreateText("data.txt")؟',
              explanation: "StreamWriter — كائن للكتابة في الملف النصي.",
            },
            {
              q: "GroupBox has a Title property to display text at the top.",
              options: ["True", "False"],
              correct: 1,
              translation: "GroupBox لها خاصية Title لعرض النص في الأعلى.",
              explanation: "خطأ — الخاصية اسمها Text مش Title.",
            },
            {
              q: 'The correct way to read a file until the end is:\n\nStreamReader reader;\nreader = File.OpenText("Test.txt");\nwhile (reader.EndOfStream != null)\n{\n    string line = reader.ReadLine();\n}',
              options: ["True", "False"],
              correct: 1,
              translation:
                "الطريقة الصحيحة لقراءة ملف حتى النهاية هي الكود التالي.",
              explanation:
                "خطأ — الشرط الصح: while (!reader.EndOfStream) أو while (reader.EndOfStream == false).",
            },
            {
              q: "The default value of the AutoSize property of a Label control is False.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "القيمة الافتراضية لخاصية AutoSize لعنصر Label هي False.",
              explanation: "خطأ — القيمة الافتراضية هي True.",
            },
            {
              q: "What is the default value of the BorderStyle property of a Panel control?",
              options: ["FixedSingle", "None", "Fixed3D", "Dashed"],
              correct: 1,
              translation:
                "ما القيمة الافتراضية لخاصية BorderStyle لعنصر Panel؟",
              explanation: "None — بدون إطار افتراضياً.",
            },
            {
              q: "The CheckedChanged event occurs only when the CheckBox is checked",
              options: ["True", "False"],
              correct: 1,
              translation:
                "حدث CheckedChanged يقع فقط عندما يتم تحديد CheckBox.",
              explanation:
                "خطأ — الحدث يقع عند أي تغيير في الحالة (تحديد أو إلغاء).",
            },
            {
              q: 'What will be the output of the following code when button1 is clicked twice?\n\nprivate int counter = 0;\nprivate void button1_Click(object sender, EventArgs e)\n{\n    counter++;\n    MessageBox.Show("Button clicked " + counter + " times");\n}',
              options: [
                'A message box showing "Button clicked 1 times" on the first click, and "Button clicked 2 times" on the second click.',
                'A message box showing "Button clicked 1 times" every time.',
                'Only one A message box showing "Button clicked 2 times"',
              ],
              correct: 0,
              translation: "ماذا سيكون الناتج عند النقر على button1 مرتين؟",
              explanation:
                "الـ counter على مستوى الكلاس — بيتزود كل نقرة ويعرض القيمة الحالية.",
            },
            {
              q: "If no item is selected in ListBox1 and the following code runs:\n\nMessageBox.Show(listBox1.SelectedItem.ToString());\n\nWhat will happen?",
              options: [
                "A blank MessageBox will be displayed",
                "Nothing happens",
                "It will cause a runtime error",
                'A MessageBox displays "-1"',
              ],
              correct: 2,
              translation:
                "لو مفيش عنصر محدد في ListBox1 وتم تشغيل الكود، ماذا يحدث؟",
              explanation:
                "SelectedItem بترجع null، و null.ToString() بترمي NullReferenceException.",
            },
          ],
        },
      ],
    },
    {
      category: "other Mid",
      icon: "👩‍🏫",
      description: "other Mid",
      items: [
        {
          t: "ميدتيرم 2022 — د. محمد مصطفى درويش",
          d: "أسئلة اختبار الميدتيرم لمادة البرمجة المرئية (CS341) - جامعة أسيوط",
          pdf: "Visual Programming/Questions/Mid/2022/MidTerm-2022-Questions-Visual-Programming.pdf",
          questions: [
            {
              q: "What will be the output of the following C# code?\n\nint a, b;\na = (b = 10) + 5;",
              options: [
                "b = 10, a = 5",
                "b = 15, a = 5",
                "a = 15, b = 10",
                "a = 10, b = 10",
              ],
              correct: 2,
              translation: "ماذا سيكون ناتج الكود التالي؟",
              explanation:
                "b بتاخد 10، ثم a = 10 + 5 = 15. فالنتيجة a=15, b=10.",
            },
            {
              q: "Declare variables c, thisIsAVariable, q76354 and number to be of type int.",
              options: [
                "int c, thisIsAVariable, q76354, number;",
                "integer c, thisIsAVariable, q76354, number;",
                "int c; int thisIsAVariable; int q76354; int number;",
              ],
              correct: 0,
              translation:
                "عرّف المتغيرات c، thisIsAVariable، q76354، number من نوع int.",
              explanation:
                "int c, thisIsAVariable, q76354, number; — الإعلان الجماعي في سطر واحد.",
            },
            {
              q: 'Display "This is a C# app" on two lines in the console window. The first line should end with C#. Use method Console.WriteLine.',
              options: [
                'Console.WriteLine("This is a C#\\napp");',
                'Console.WriteLine("This is a C# app");',
              ],
              correct: 0,
              translation:
                'اعرض "This is a C# app" على سطرين في نافذة الكونسول. السطر الأول ينتهي بـ C#.',
              explanation: "\\n هو رمز السطر الجديد — بيقسّم النص على سطرين.",
            },
            {
              q: "The statement while is used to execute one action when a condition is true and another when that condition is false.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "عبارة while تُستخدم لتنفيذ إجراء عندما يكون الشرط صحيحاً وآخر عندما يكون خاطئاً.",
              explanation:
                "خطأ — while بتنفذ إجراء واحد فقط عندما الشرط صحيح. اللي بتعمل كده هي if-else.",
            },
            {
              q: "PictureBoxes typically display images.",
              options: ["True", "False"],
              correct: 0,
              translation: "PictureBoxes عادةً بتعرض صور.",
              explanation: "صح — ده الغرض الأساسي منها.",
            },
            {
              q: 'If the variable number is not equal to 7, display "The variable number is not equal to 7".',
              options: [
                'if (number != 7) Console.WriteLine("The variable number is not equal to 7");',
                'if (number == 7) Console.WriteLine("The variable number is not equal to 7");',
              ],
              correct: 0,
              translation:
                'لو المتغير number مش بيساوي 7، اعرض "The variable number is not equal to 7".',
              explanation: "!= معناها 'لا يساوي' — الشرط الصح.",
            },
            {
              q: 'What does the following app display?\n\nusing System;\nclass Calculate\n{\n    static void Main()\n    {\n        int sum = 0;\n        int x = 1;\n        while (x <= 10)\n        {\n            sum += x;\n            x++;\n        }\n        Console.WriteLine($"The sum is: {sum}");\n    }\n}',
              options: ["The sum is: 55", "The sum is: 45", "The sum is: 10"],
              correct: 0,
              translation: "ماذا يعرض التطبيق التالي؟",
              explanation: "مجموع الأرقام من 1 إلى 10 = 55.",
            },
            {
              q: "Calculate the value of 2.5 raised to the power of 3, using the Pow method.",
              options: ["Math.Pow(2.5, 3)", "Math.Pow(3, 2.5)", "Pow(2.5, 3)"],
              correct: 0,
              translation: "احسب قيمة 2.5 مرفوعة للقوة 3 باستخدام دالة Pow.",
              explanation: "Math.Pow(2.5, 3) — الأساس أولاً ثم الأس.",
            },
            {
              q: "Write a statement that uses string interpolation to display the sum of the variables x and y. Assume variables x and y of type int exist and already have values.",
              options: [
                'Console.WriteLine($"The sum is {x + y}");',
                'Console.WriteLine("The sum is {x + y}");',
              ],
              correct: 0,
              translation:
                "اكتب عبارة تستخدم String Interpolation لعرض مجموع x و y.",
              explanation: "الـ $ قبل النص ضرورية لتفعيل Interpolation.",
            },
            {
              q: "Determine the values of the variables in the following statement after it executes. Assume that when the statement begins executing, all variables are type int and have the value 5:\n\nproduct *= x++;",
              options: [
                "product = 25, x = 6",
                "product = 30, x = 6",
                "product = 25, x = 5",
              ],
              correct: 0,
              translation:
                "حدد قيم المتغيرات بعد تنفيذ العبارة. بافتراض أن كل المتغيرات int وقيمتها 5 عند البداية.",
              explanation:
                "x++ بترجع 5 الأول (Post-increment)، فـ product = 5 × 5 = 25، ثم x = 6.",
            },
            {
              q: "The _______ statement, when executed in an iteration statement, skips the remaining statements in the loop body and proceeds with the next iteration of the loop.",
              options: ["break", "continue", "foreach", "while"],
              correct: 1,
              translation:
                "عبارة _______ عند تنفيذها في حلقة، تتخطى باقي العبارات في جسم الحلقة وتنتقل للتكرار التالي.",
              explanation:
                "continue — بتتخطى باقي التكرار الحالي وتنتقل للتالي.",
            },
            {
              q: "Vary the control variable over the sequence 99, 88, 77, 66, 55, 44, 33, 22, 11, 0.",
              options: [
                "for (int i = 99; i >= 0; i -= 11)",
                "for (int i = 0; i <= 99; i += 11)",
              ],
              correct: 0,
              translation:
                "غيّر متغير التحكم على التسلسل: 99، 88، 77، 66، 55، 44، 33، 22، 11، 0.",
              explanation: "البداية 99 والتناقص بـ 11 حتى 0 (شامل).",
            },
            {
              q: "The switch statement does not provide a mechanism for testing ranges of values, so you must list every value to test in a separate case label.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عبارة switch لا توفر آلية لاختبار نطاقات القيم، لذا يجب إدراج كل قيمة في حالة منفصلة.",
              explanation: "صح — switch بتختبر قيم محددة، مش نطاقات.",
            },
            {
              q: "Use the _______ method to output the tab character.",
              options: [
                "Console.WriteLine()",
                "Console.Write('\\t')",
                'Console.Write("\\r")',
                'Console.Write("\\\'")',
              ],
              correct: 1,
              translation: "استخدم دالة _______ لإخراج رمز الجدولة (Tab).",
              explanation: "\\t هو رمز الجدولة (Tab character).",
            },
            {
              q: "What will be the output of the following C# code?\n\nclass Program\n{\n    public static void Main(string[] args)\n    {\n        int i, j;\n        i = (j = 5) + 10;\n        Console.WriteLine(i);\n        Console.WriteLine(j);\n        Console.ReadLine();\n    }\n}",
              options: ["15\n5", "5\n15", "10\n5"],
              correct: 0,
              translation: "ماذا سيكون ناتج الكود التالي؟",
              explanation: "j = 5، ثم i = 5 + 10 = 15. فيعرض 15 ثم 5.",
            },
            {
              q: "Prompt the user to enter an integer.",
              options: [
                'Console.Write("Enter an integer: ");',
                'Console.ReadLine("Enter an integer: ");',
              ],
              correct: 0,
              translation: "اطلب من المستخدم إدخال رقم صحيح.",
              explanation:
                "Console.Write بتعرض رسالة بدون سطر جديد، ثم Console.ReadLine للقراءة.",
            },
            {
              q: "Command-line arguments are separated by commas.",
              options: ["True", "False"],
              correct: 1,
              translation: "معطيات سطر الأوامر مفصولة بفواصل.",
              explanation: "خطأ — مفصولة بمسافات (spaces) مش فواصل.",
            },
            {
              q: 'Identify and correct the errors in the following statement:\n\nif (c < 7)\n{\n    Console.WriteLine("c is less than 7");',
              options: [
                'Missing closing parenthesis in condition and closing brace: if (c < 7) { Console.WriteLine("c is less than 7"); }',
                "No error",
              ],
              correct: 0,
              translation: "حدد وصحح الأخطاء في العبارة التالية.",
              explanation: "ناقص قوس إغلاق للشرط و قوس إغلاق للكتلة.",
            },
            {
              q: "Control properties can be modified only by writing code.",
              options: ["True", "False"],
              correct: 1,
              translation: "خصائص عناصر التحكم يمكن تعديلها فقط بكتابة الكود.",
              explanation: "خطأ — يمكن تعديلها من نافذة الخصائص أيضاً.",
            },
            {
              q: "Calculate the remainder after q is divided by divisor, and assign the result to q. Write this statement in two different ways.",
              options: [
                "q %= divisor; and q = q % divisor;",
                "q = q / divisor; and q /= divisor;",
              ],
              correct: 0,
              translation:
                "احسب الباقي بعد قسمة q على divisor، وأسند الناتج إلى q. اكتب العبارة بطريقتين مختلفتين.",
              explanation: "الـ % هي معامل الباقي (Modulo).",
            },
            {
              q: "C# considers the variables number and NuMbEr to be identical.",
              options: ["True", "False"],
              correct: 1,
              translation: "C# تعتبر المتغيرين number و NuMbEr متطابقين.",
              explanation: "خطأ — C# حساسة لحالة الأحرف (Case-sensitive).",
            },
            {
              q: "The break statement is required in every case of a switch statement.",
              options: ["True", "False"],
              correct: 1,
              translation: "عبارة break مطلوبة في كل حالة من حالات switch.",
              explanation:
                "خطأ — مطلوبة فقط لو عايز تمنع Fall-through. ممكن تتجاهلها عن قصد.",
            },
            {
              q: "Assign the sum of x and y to z, and increment x by 1 with ++. Use only one statement and ensure that the original value of x is used in the statement.",
              options: ["z = x++ + y;", "z = ++x + y;"],
              correct: 0,
              translation:
                "أسند مجموع x و y إلى z، وزِد x بمقدار 1 بـ ++. استخدم عبارة واحدة فقط مع ضمان استخدام القيمة الأصلية لـ x.",
              explanation:
                "x++ تستخدم القيمة الأصلية أولاً ثم تزيد — Post-increment.",
            },
            {
              q: "A Form's background color is set using the BackColor property.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "لون خلفية النموذج يتم تعيينه باستخدام خاصية BackColor.",
              explanation: "صح — BackColor هي الخاصية الصحيحة.",
            },
            {
              q: "Specifying the order in which statements (actions) execute in an app is called program control.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "تحديد ترتيب تنفيذ العبارات في التطبيق يسمى التحكم البرمجي (Program Control).",
              explanation: "صح — ده تعريف Program Control.",
            },
          ],
        },
        {
          t: "ميدتيرم 2023 — د. أحمد حسني",
          d: "أسئلة اختبار الميدتيرم لمادة البرمجة المرئية (CS341) - جامعة أسيوط (عام + علوم)",
          pdf: "files/Visual Programming/Questions/Mid/2023/MidTerm-2023-Questions-Visual-Programming.pdf",
          questions: [
            {
              q: "Which of the following is considered Specialized Methods in C#?",
              options: [
                "Static method",
                "Operation method",
                "Constructor",
                "Operator method",
                "ToString method",
                "Protected method",
              ],
              correct: 3,
              translation:
                "أي مما يلي يُعتبر من الدوال المتخصصة (Specialized Methods) في C#؟",
              explanation:
                "Operator method — الدوال المخصصة لتحميل المعاملات (Operator Overloading).",
            },
            {
              q: "What of the following tools can be used to debug the network requests from the browser?",
              options: [
                "Setting - Network Tab",
                "Developer Tools - Network Tab",
                "Developer Tools - Source Tab",
                "Browser start page",
                "Browser status bar",
              ],
              correct: 1,
              translation:
                "أي من الأدوات التالية يمكن استخدامها لتصحيح طلبات الشبكة من المتصفح؟",
              explanation:
                "Developer Tools ← Network Tab — الأداة القياسية لمراقبة طلبات الشبكة.",
            },
            {
              q: "OOP Concepts includes (Choose all that apply)",
              options: [
                "Inheritance and Abstraction",
                "Encapsulation",
                "Classes",
                "Polymorphism",
              ],
              correct: 0,
              translation: "مفاهيم البرمجة كائنية التوجه (OOP) تشمل:",
              explanation:
                "Inheritance, Abstraction, Encapsulation, Polymorphism — الأربعة الأساسية.",
            },
            {
              q: "Server program can (Choose all that apply)",
              options: [
                "Generate Reasonable Response",
                "Receive Responses",
                "Receive Requests",
                "Send Requests",
              ],
              correct: 2,
              translation: "برنامج السيرفر يمكنه:",
              explanation:
                "السيرفر بيستقبل الطلبات (Receive Requests) ويرد عليها — مش يرسلها.",
            },
            {
              q: "C# supports multiple inheritance",
              options: [
                "False, every class can have only one parent or none",
                "True, every class must have at least one parent",
                "True, every class must inherit from a base class",
                "False, every class must have exactly one parent",
              ],
              correct: 0,
              translation: "C# تدعم الوراثة المتعددة.",
              explanation:
                "خطأ — كل كلاس له أب واحد على الأكثر (أو لا شيء). الوراثة المتعددة تُحقق عبر الواجهات.",
            },
            {
              q: "Using top-level statement in C# means",
              options: [
                "Using namespaces starts at the beginning of the file",
                "None of the above",
                "Main method exists implicitly",
                "There is no main method",
                "Main method exists explicitly",
              ],
              correct: 2,
              translation: "استخدام Top-level Statements في C# يعني:",
              explanation:
                "Main method موجودة ضمنياً — من غير ما تكتبها صراحةً.",
            },
            {
              q: "In Web development, HSTS mode",
              options: [
                "Enable using encrypted requests and HTTPS as an option",
                "Enforces all requests to use HTTPS",
                "Enforces all websites to use HTTPS",
                "Enable the client to receive invalid certificates",
                "None",
              ],
              correct: 1,
              translation: "في تطوير الويب، وضع HSTS:",
              explanation:
                "يفرض على كل الطلبات استخدام HTTPS — حماية من هجمات التخفيض.",
            },
            {
              q: "What is True in relevant to Read-only attributes in the class?",
              options: [
                "They cannot change after compile time.",
                "The data never changes.",
                "They can only be calculated or initialized at the time of instantiation",
                "They can change after compile time.",
              ],
              correct: 2,
              translation:
                "ما الصحيح بخصوص الخصائص للقراءة فقط (Read-only) في الكلاس؟",
              explanation:
                "يمكن حسابها أو تهيئتها فقط في وقت إنشاء الكائن (Instantiation).",
            },
            {
              q: "Which of the following can be a class name based on best practices and naming conventions?",
              options: ["Car", "car", "carType", "BMW", "CAR"],
              correct: 0,
              translation:
                "أي مما يلي يمكن أن يكون اسم كلاس وفقاً لأفضل الممارسات واصطلاحات التسمية؟",
              explanation:
                "Car — PascalCase، لأن أسماء الكلاسات تبدأ بحرف كبير.",
            },
            {
              q: "Which of the following is NOT a C# keyword?",
              options: ["None", "init", "static", "var", "record"],
              correct: 0,
              translation: "أي مما يلي ليس كلمة مفتاحية في C#؟",
              explanation:
                "None — كل الكلمات التانية (init, static, var, record) كلمات مفتاحية فعلية.",
            },
            {
              q: "To enable Razor pages in your .NET web application, which of the following methods is invoked in Program.cs?",
              options: [
                "None",
                "app.Services.AddRazorPages();",
                "app.UseDefaultFiles();",
                "builder.Services.AddRazorPages();",
                "builder.MapRazorPages();",
                "app.UseStaticFiles();",
              ],
              correct: 3,
              translation:
                "لتفعيل صفحات Razor في تطبيق .NET الويب، أي دالة تُستدعى في Program.cs؟",
              explanation:
                "builder.Services.AddRazorPages(); — تُستدعى على الـ builder قبل بناء التطبيق.",
            },
            {
              q: "For Web request, Put the request journey in the correct order:\n1. DNS request asking for IP\n2. DNS response with an IP\n3. HTTP request to the server\n4. Webserver routing the request to correct Server Application",
              options: [
                "1 -> 2 -> 3 -> 4",
                "2 -> 1 -> 3 -> 4",
                "1 -> 3 -> 2 -> 4",
                "3 -> 1 -> 2 -> 4",
              ],
              correct: 0,
              translation: "لطلب الويب، رتّب رحلة الطلب بالترتيب الصحيح.",
              explanation:
                "DNS request ← DNS response ← HTTP request ← Routing — الترتيب المنطقي.",
            },
            {
              q: "What is the output of the following code? Consider `-` as new line:\n\npublic class Person\n{\n    public double Age;\n    public static int PersonCount;\n}\n\npublic class Program\n{\n    static void Main(string[] a)\n    {\n        Person p1 = new();\n        Person p2 = new();\n        p1.Age = 20;\n        p2.PersonCount = 3;\n        Console.WriteLine(p1.PersonCount);\n        Console.WriteLine(p2.Age);\n    }\n}",
              options: ["0-20", "Error", "3-0", "0-0", "3-20"],
              correct: 2,
              translation: "ماذا سيكون ناتج الكود التالي؟",
              explanation:
                "PersonCount ثابت (Static) ومشترك = 3. Age خاص بـ p2 ولم تُعيَّن = 0. فالناتج 3 ثم 0.",
            },
            {
              q: "Common Type System (CTS) in .NET refers to (Choose all that apply)",
              options: [
                "event",
                "enumeration",
                "class",
                "structure",
                "interface",
                "delegate",
              ],
              correct: 2,
              translation: "نظام الأنواع المشترك (CTS) في .NET يشير إلى:",
              explanation:
                "الـ CTS بيشمل: class, structure, enumeration, interface, delegate — مش event.",
            },
            {
              q: "Which of the following URL components constructs the shortest URL that can be used to do a web request?",
              options: [
                "Scheme - Domain - Query String",
                "Scheme - Domain - Fragment",
                "Scheme - Domain - Path",
                "Scheme - Domain",
                "All of the above",
              ],
              correct: 3,
              translation:
                "أي من مكونات URL التالية يبني أقصر URL يمكن استخدامه لعمل طلب ويب؟",
              explanation:
                "Scheme + Domain فقط كافيين — زي https://example.com.",
            },
            {
              q: 'What is the output of the following code when the user inputs nothing (just pressing enter)? Consider `-` refers to a new line:\n\nConsole.WriteLine("Before parsing");\nConsole.Write("What is your age? ");\nstring? input = Console.ReadLine();\ntry\n{\n    int age = int.Parse(input);\n    Console.WriteLine($"You are {age} years old.");\n}\ncatch\n{\n    Console.WriteLine("The age you entered is not valid");\n}\nConsole.WriteLine("After parsing");',
              options: [
                "Before Parsing - What is your age? - You are 0 years old - After parsing",
                "None of the above",
                "Error",
                "Before Parsing - What is your age? - The age you entered is not valid - After parsing",
              ],
              correct: 3,
              translation:
                "ماذا سيكون ناتج الكود لو المستخدم أدخل لا شيء (ضغط Enter فقط)؟",
              explanation:
                "int.Parse للنص الفارغ بترمي استثناء، فيروح لـ catch ويعرض الرسالة.",
            },
            {
              q: 'Given the following method implementation, which of the following is a right method invocation syntax? (choose all that apply)\n\npublic void Method1(string command = "Run!", double number = 0)\n{\n    Console.WriteLine($"{command}, with {number}");\n}',
              options: [
                "Method1(number: 20);",
                'Method1(number = 20, command = "Test");',
                "Method1(number = 20);",
                'Method1(number: 20, command: "Test");',
                "Method1();",
              ],
              correct: 0,
              translation:
                "بالنظر لتنفيذ الدالة التالي، أي من الاستدعاءات صحيح؟",
              explanation:
                "Method1(number: 20); — استخدام Named Arguments مع الاعتماد على القيمة الافتراضية للأول.",
            },
            {
              q: 'Considering a main method that contains the following lines, what is the output?\n\nstring name = "Challenge";\nConsole.WriteLine($"""Hello, {{{name}}}!""");',
              options: [
                "Hello, {Challenge}!",
                "Hello, {{Challenge}}!",
                "error",
                "Hello, {{{Challenge}}}!",
                "Hello, Challenge!",
              ],
              correct: 0,
              translation:
                "بالنظر لدالة main اللي فيها السطور التالية، ماذا سيكون الناتج؟",
              explanation:
                "في Raw String Interpolation، {{ و }} بيعرضوا أقواس حرفية — فالناتج {Challenge}.",
            },
          ],
        },
        {
          t: "ميدتيرم 2024 - National — البرمجة المرئية",
          d: "اختبار الميدتيرم لمادة البرمجة المرئية - البرنامج الأهلي 2024",
          pdf: "files/Visual Programming/Questions/Mid/2024/MidTerm-2024-National-Visual-Programming.pdf",
          questions: [
            {
              q: "How can you change the text color of a GroupBox's title?",
              options: [
                "By setting the ForeColor property",
                "By changing the BackColor property",
                "GroupBox title color cannot be changed",
                "By setting the TextColor property",
              ],
              correct: 0,
              translation: "كيف يمكنك تغيير لون نص عنوان GroupBox؟",
              explanation: "خاصية ForeColor — بتحدد لون النص الأمامي.",
            },
            {
              q: "To store items in a ListBox, you add them to the control's Text property.",
              options: ["True", "False"],
              correct: 1,
              translation: "لتخزين عناصر في ListBox، تضيفها إلى خاصية Text.",
              explanation: "خطأ — يتم إضافتها إلى Items، مش Text.",
            },
            {
              q: "To handle the click event of a PictureBox named pictureBox1, which of the following is the correct method?",
              options: [
                "private void pictureBox1_Click(object sender, EventArgs e)",
                "public void PictureBox1Click(object sender)",
                "private void OnClick_PictureBox1(object sender, EventArgs e)",
                "private void Click_PictureBox1(object sender, MouseEventArgs e)",
              ],
              correct: 0,
              translation:
                "للتعامل مع حدث النقر لـ PictureBox اسمه pictureBox1، أي دالة صحيحة؟",
              explanation:
                "private void pictureBox1_Click(object sender, EventArgs e) — التوقيع القياسي.",
            },
            {
              q: "Which of the following statements allows you to select the item at index 2 in a ListBox?",
              options: [
                "ListBox.SelectedIndex = 2;",
                "ListBox.Items[2].Selected = true;",
                "ListBox.Select(2);",
                "ListBox.SelectItem(2);",
              ],
              correct: 0,
              translation:
                "أي العبارات التالية تسمح بتحديد العنصر في الفهرس 2 في ListBox؟",
              explanation: "ListBox.SelectedIndex = 2; — أبسط وأشهر طريقة.",
            },
            {
              q: 'string str1 = "hello";\nstring str2 = "HELLO";\nString.Compare(str1, str2, true);\n\nThe method returns:',
              options: ["0", "True", "False", "Error"],
              correct: 0,
              translation:
                "لو str1 = hello و str2 = HELLO و String.Compare(str1, str2, true)، ماذا ترجع الدالة؟",
              explanation:
                "0 — لأن true معناها مقارنة لا تفرق بين حالة الأحرف.",
            },
            {
              q: "How can you determine the number of items in a ListBox?",
              options: [
                "ListBox.Count",
                "ListBox.Items.Count",
                "ListBox.Length",
                "ListBox.Size",
              ],
              correct: 1,
              translation: "كيف تحدد عدد العناصر في ListBox؟",
              explanation: "ListBox.Items.Count — الخاصية الصحيحة للعدد.",
            },
            {
              q: "The ShowDialog() method will throw an exception if no file is selected by the user.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "دالة ShowDialog() سترمي استثناء لو لم يختر المستخدم أي ملف.",
              explanation: "خطأ — بترجع DialogResult.Cancel بدون استثناء.",
            },
            {
              q: "A(n) _______ can have an uninitialized value passed into it, but it must be set to some value before the method it belongs to finishes executing.",
              options: [
                "output parameter",
                "reference parameter",
                "default parameter",
                "input parameter",
              ],
              correct: 0,
              translation:
                "_______ يمكن تمرير قيمة غير مهيأة لها، لكن يجب تعيين قيمة قبل انتهاء الدالة.",
              explanation:
                "Output parameter — زي out — لازم تُعيَّن داخل الدالة.",
            },
            {
              q: "How can you concatenate text from two TextBox controls (textBox1 and textBox2) and display the result in a Label (label1)?",
              options: [
                "label1.Text = textBox1.Add(textBox2);",
                "label1.Text = textBox1.Text + textBox2.Text;",
                "label1.Text = textBox1.Text & textBox2.Text;",
                "label1.Text = textBox1.Append(textBox2);",
              ],
              correct: 1,
              translation:
                "كيف تجمع النص من TextBox1 و TextBox2 وتعرض الناتج في Label؟",
              explanation:
                "label1.Text = textBox1.Text + textBox2.Text; — المعامل + للدمج.",
            },
            {
              q: "What will happen if you use File.CreateText on a file that already exists?",
              options: [
                "It will throw an exception.",
                "It will add a new text to the file.",
                "It will overwrite the file's content.",
                "It will open the file in read-only mode.",
              ],
              correct: 2,
              translation:
                "ماذا يحدث لو استخدمت File.CreateText على ملف موجود؟",
              explanation: "بيستبدل محتوى الملف — بيمسح القديم.",
            },
            {
              q: "How can you programmatically set the access key for a button named button1?",
              options: [
                'button1.Text = "&File";',
                'button1.AccessKey = "F";',
                "button1.ShortcutKeys = Keys.F;",
                'button1.Key = "&File";',
              ],
              correct: 0,
              translation:
                "كيف تعيّن مفتاح الوصول (Access Key) لزر اسمه button1 برمجياً؟",
              explanation:
                'button1.Text = "&File"; — علامة & قبل الحرف تحدد مفتاح الوصول.',
            },
            {
              q: "Multiple CheckBox controls in the same GroupBox can be selected at the same time.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عدة عناصر CheckBox في نفس GroupBox يمكن تحديدها في نفس الوقت.",
              explanation: "صح — عكس RadioButton.",
            },
            {
              q: "What is the visual indicator of an access key on a button?",
              options: [
                "The letter is bold",
                "The letter is highlighted",
                "The button text is grayed out",
                "The letter is underlined",
              ],
              correct: 3,
              translation:
                "ما المؤشر البصري لمفتاح الوصول (Access Key) على زر؟",
              explanation:
                "الحرف تحته خط (Underlined) — المؤشر البصري القياسي.",
            },
            {
              q: "Which method is used to generate a random floating-point number between 0.0 (inclusive) and 1.0 (exclusive)?",
              options: [
                "random.NextFloat()",
                "random.NextDouble()",
                "random.Double()",
                "random.Float()",
              ],
              correct: 1,
              translation:
                "أي دالة تولد رقماً عشرياً عشوائياً بين 0.0 (شامل) و 1.0 (حصري)؟",
              explanation: "random.NextDouble() — الدالة الصحيحة.",
            },
            {
              q: "You add your own code to the Program.cs file as you develop an application.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "أنت تضيف الكود الخاص بك في ملف Program.cs أثناء تطوير التطبيق.",
              explanation:
                "خطأ — Program.cs يحتوي كود البدء فقط، ومينفعش تعدّله.",
            },
            {
              q: "How can you programmatically set focus to a TextBox control named textBox1?",
              options: [
                "textBox1.SetFocus();",
                "textBox1.Focus();",
                "SetFocus(textBox1);",
                "textBox1.Active = true;",
              ],
              correct: 1,
              translation:
                "كيف تعيّن التركيز برمجياً على TextBox اسمه textBox1؟",
              explanation: "textBox1.Focus(); — الدالة الصحيحة.",
            },
            {
              q: "What does the SizeMode property of the PictureBox control determine?",
              options: [
                "The position of the PictureBox on the form",
                "How the image is displayed within the PictureBox",
                "The size of the PictureBox itself",
                "The border size of the PictureBox",
              ],
              correct: 1,
              translation: "ماذا تحدد خاصية SizeMode لعنصر PictureBox؟",
              explanation: "كيفية عرض الصورة داخل PictureBox.",
            },
            {
              q: "How can you check which RadioButton is selected in a group?",
              options: [
                "Iterate through each RadioButton and check its Checked property.",
                "Use groupBox.SelectedRadioButton.",
                "Use radioButton.GroupCheck.",
                "Call CheckedRadioButton() method.",
              ],
              correct: 0,
              translation: "كيف تتحقق من أي RadioButton محدد في مجموعة؟",
              explanation: "المرور على كل RadioButton وفحص خاصية Checked.",
            },
            {
              q: "How can you programmatically adjust the Label size automatically to fit the content in code?",
              options: [
                "label1.AutoSize = 1;",
                'label1.AutoSize = "True";',
                "label1.AutoSize = true;",
                "label1.SetAutoSize(true);",
              ],
              correct: 2,
              translation:
                "كيف تضبط حجم Label تلقائياً ليناسب المحتوى برمجياً؟",
              explanation: "label1.AutoSize = true; — القيمة المنطقية الصحيحة.",
            },
            {
              q: "Which property is used to set the tab order of a control?",
              options: ["TabPosition", "TabControl", "TabIndex", "TabOrder"],
              correct: 2,
              translation: "أي خاصية تُستخدم لضبط ترتيب التاب لعنصر التحكم؟",
              explanation: "TabIndex — الرقم الذي يحدد الترتيب.",
            },
          ],
        },
      ],
    },
  ],
  finalsCategories: [
    {
      category: " Dr. Sara 2026",
      icon: "📅",
      description: "Dr. Sara 2026  final ",
      items: [
        {
          t: "فاينل 2026 - العام والساعات المعتمدة — البرمجة المرئية",
          d: "اختبار الفاينل لمادة البرمجة المرئية - العام والساعات المعتمدة 2026",
          pdf: "Visual Programming/Questions/Final/2026/Final 2026 - General & Credit - Visual Programming.pdf",
          questions: [
            {
              q: 'What will be displayed if the check is removed from the CheckBox?\n\nprivate void checkBox1_CheckedChanged(object sender, EventArgs e)\n{\n    if (!checkBox1.Checked)\n        MessageBox.Show("Please check me!");\n}',
              options: [
                'MessageBox.Show("Please check me!")',
                "Please check me!",
                "No message until user checks it",
              ],
              correct: 1,
              translation: "ماذا سيُعرض لو تم إزالة التحديد من CheckBox؟",
              explanation:
                "!checkBox1.Checked معناها إنه غير محدد، فيعرض الرسالة.",
            },
            {
              q: "Trim() method removes whitespace in the middle of a string.",
              options: ["True", "False"],
              correct: 1,
              translation: "دالة Trim() تزيل المسافات في وسط النص.",
              explanation: "خطأ — بتزيل المسافات من البداية والنهاية فقط.",
            },
            {
              q: "By default, a label's text is aligned with the top and left edges of the label's bounding box.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "افتراضياً، نص Label يكون محاذياً للحافتين العلوية واليسرى.",
              explanation: "صح — TopLeft هي القيمة الافتراضية لـ TextAlign.",
            },
            {
              q: "Which property of a ScrollBar determines the current position of the scroll box?",
              options: ["Position", "Location", "CurrentScroll", "Value"],
              correct: 3,
              translation:
                "أي خاصية من ScrollBar تحدد الموضع الحالي لصندوق التمرير؟",
              explanation: "Value — الرقم الحالي للموضع.",
            },
            {
              q: 'If the user clicks the button twice. What happens?\n\nprivate void button1_Click(object sender, EventArgs e)\n{\n    button1.Enabled = false;\n    MessageBox.Show("Clicked");\n}',
              options: [
                "Two MessageBoxes appear",
                "Only one MessageBox appears",
                "Error occurs",
                "No MessageBox appears",
              ],
              correct: 1,
              translation: "لو نقر المستخدم الزر مرتين، ماذا يحدث؟",
              explanation:
                "بعد النقرة الأولى بيتم تعطيل الزر (Enabled = false)، فالنقرة الثانية مش بتشتغل.",
            },
            {
              q: "The property that determines how a background image is displayed on a form is:",
              options: [
                "BackgroundLayout",
                "BackgroundImageDisplayMode",
                "BackgroundImageLayout",
                "BackgroundImageStyle",
              ],
              correct: 2,
              translation:
                "الخاصية التي تحدد كيفية عرض صورة الخلفية على النموذج هي:",
              explanation: "BackgroundImageLayout — الخاصية الصحيحة.",
            },
            {
              q: "Which property of ToolTip sets the time it remains visible?",
              options: [
                "InitialDelay",
                "AutoPopDelay",
                "ReshowDelay",
                "ShowAlways",
              ],
              correct: 1,
              translation:
                "أي خاصية من ToolTip تحدد المدة التي يبقى فيها ظاهراً؟",
              explanation: "AutoPopDelay — مدة ظهور التلميح.",
            },
            {
              q: "You can select all text in a TextBox by the following code:\nTextBox.SelectionStart = 0;\nTextBox.SelectionLength = TextBox.Length;",
              options: ["True", "False"],
              correct: 1,
              translation: "يمكنك تحديد كل النص في TextBox بالكود التالي.",
              explanation: "خطأ — لازم TextBox.Text.Length مش TextBox.Length.",
            },
            {
              q: "How do you add items to a ComboBox at runtime?",
              options: [
                'comboBox1.Add("Item1");',
                'comboBox1.Items.Add("Item1");',
                'comboBox1.Items.Insert("Item1");',
                'comboBox1.Insert("Item1");',
              ],
              correct: 1,
              translation: "كيف تضيف عناصر لـ ComboBox في وقت التشغيل؟",
              explanation: 'comboBox1.Items.Add("Item1"); — الطريقة الصحيحة.',
            },
            {
              q: "Which of the following is a correct use of using with a file?",
              options: [
                'using (File file = new File("data.txt")) { file.WriteLine("Hello"); }',
                'using (StreamWriter sw = new StreamWriter("data.txt")) { sw.WriteLine("Hello"); }',
                'using StreamWriter("data.txt") { WriteLine("Hello"); }',
                'using ("data.txt") { WriteLine("Hello"); }',
              ],
              correct: 1,
              translation: "أي مما يلي استخدام صحيح لـ using مع ملف؟",
              explanation:
                "الصيغة الصحيحة لـ using هي مع كائن ينفذ IDisposable.",
            },
            {
              q: "char.Parse(textBox1.Text) is safe even if the TextBox is empty.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "char.Parse(textBox1.Text) آمنة حتى لو كان TextBox فارغاً.",
              explanation: "خطأ — لو النص فارغ أو أكثر من حرف، بترمي استثناء.",
            },
            {
              q: "Which statement is used to add a new TabPage at runtime?",
              options: [
                "tabControl1.Controls.Add(tabPage1);",
                "tabControl1.TabPages.Add(tabPage1);",
                "tabControl1.Items.Add(tabPage1);",
                "tabControl1.Tab.Add(tabPage1);",
              ],
              correct: 1,
              translation:
                "أي عبارة تُستخدم لإضافة TabPage جديد في وقت التشغيل؟",
              explanation:
                "tabControl1.TabPages.Add(tabPage1); — الطريقة الصحيحة.",
            },
            {
              q: "What does String.Compare(str1, str2) return if both strings are equal?",
              options: ["True", "0", "1", "False"],
              correct: 1,
              translation:
                "ماذا ترجع String.Compare(str1, str2) لو النصان متساويان؟",
              explanation: "0 — يعني متساويان.",
            },
            {
              q: "Which of the following is a valid use of LastIndexOf() with a TextBox?",
              options: [
                'String.textBox1.LastIndexOf("a")',
                'textBox1.LastIndexOf("a")',
                'textBox1.Text.LastIndexOf("a")',
                'String.LastIndexOf(textBox1, "a")',
              ],
              correct: 2,
              translation:
                "أي مما يلي استخدام صحيح لـ LastIndexOf() مع TextBox؟",
              explanation:
                'textBox1.Text.LastIndexOf("a") — نطبقها على خاصية Text.',
            },
            {
              q: "A(n) _______ can have an uninitialized value passed into it, but it must be set to some value before the method it belongs to finishes executing.",
              options: [
                "output parameter",
                "reference parameter",
                "default parameter",
                "input parameter",
              ],
              correct: 0,
              translation:
                "_______ يمكن تمرير قيمة غير مهيأة لها، لكن يجب تعيين قيمة قبل انتهاء الدالة.",
              explanation: "output parameter — زي out.",
            },
            {
              q: "To give a menu item in MenuStrip the ability to become checked or unchecked when it is clicked by the user, you set the item's Checked property to True.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لإعطاء عنصر قائمة في MenuStrip القدرة على أن يُحدد أو يُلغى عند النقر عليه، تعيّن خاصية Checked إلى True.",
              explanation: "خطأ — لازم تعيّن CheckOnClick = true، مش Checked.",
            },
            {
              q: "In MenuStrip, what happens if ShowShortcutKeys property is set to false?",
              options: [
                "The menu item cannot be clicked",
                "The keyboard shortcut no longer works",
                "The shortcut key text is not displayed next to the menu item",
                "The menu item is hidden",
              ],
              correct: 2,
              translation:
                "في MenuStrip، ماذا يحدث لو ضبطت ShowShortcutKeys على false؟",
              explanation:
                "نص اختصار لوحة المفاتيح لا يظهر بجانب العنصر — لكن الاختصار نفسه يشتغل.",
            },
            {
              q: "The Exists method can be used without creating an object of the File class.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "دالة Exists يمكن استخدامها بدون إنشاء كائن من File.",
              explanation: "صح — لأنها Static method.",
            },
            {
              q: "What happens if the file specified in File.AppendText() does not exist?",
              options: [
                "An exception is thrown",
                "The file is created",
                "AppendText() calls does nothing",
              ],
              correct: 1,
              translation:
                "ماذا يحدث لو الملف المحدد في File.AppendText() غير موجود؟",
              explanation: "يتم إنشاء الملف تلقائياً.",
            },
            {
              q: 'What will happen when this code is executed in Form1?\n\nForm2 f2 = new Form2();\nf2.Show();\nMessageBox.Show("Form2 opened");',
              options: [
                "Only Form2 opens, no message box",
                "Message box shows, then Form2 opens",
                "Both Form2 and message box appear simultaneously",
                "Form2 opens, and the message box appears after Form2 is closed",
              ],
              correct: 2,
              translation: "ماذا يحدث لو تم تنفيذ الكود التالي في Form1؟",
              explanation: "Show() غير معطِّل — فالاتنين بيظهروا في نفس الوقت.",
            },
            {
              q: 'If two RadioButtons (radioButton1 and radioButton2) are placed directly on the same Form:\n\nradioButton1.Checked = true;\nradioButton2.Checked = true;\nif (radioButton1.Checked)\n    MessageBox.Show("Radio 1");\nelse\n    MessageBox.Show("Radio 2");\n\nWhat will be the output?',
              options: ["Radio 1", "Radio 2", "Both messages appear", "Error"],
              correct: 1,
              translation: "لو زرين راديو على نفس النموذج، ماذا سيكون الناتج؟",
              explanation:
                "لما radioButton2.Checked = true، بيرفع التحديد عن radioButton1 — فيعرض Radio 2.",
            },
            {
              q: "The default color of ColorDialog.Color (if the user does not select a color and clicks OK) is Black.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "اللون الافتراضي لـ ColorDialog.Color (لو المستخدم لم يختر لوناً وضغط OK) هو الأسود.",
              explanation: "صح — القيمة الافتراضية Black.",
            },
            {
              q: "What will happen if this code is in the button event handler and the button is clicked?\n\nlabel1.Focus();",
              options: [
                "The label receives focus",
                "The Focus() call does nothing",
                "The program crashes",
              ],
              correct: 1,
              translation: "ماذا يحدث لو الكود ده في معالج حدث الزر وتم النقر؟",
              explanation: "Label مش بيقبل التركيز — الدالة مش بتعمل حاجة.",
            },
            {
              q: "How do you display a blinking error icon for a TextBox named textBox1?",
              options: [
                'errorProvider1.SetError(textBox1, "Invalid input");',
                'textBox1.Error("Invalid input");',
                'errorProvider1.textBox1.Show("Invalid input");',
                'textBox1.SetError("Invalid input");',
              ],
              correct: 0,
              translation:
                "كيف تعرض أيقونة خطأ وامضة لـ TextBox اسمه textBox1؟",
              explanation:
                'errorProvider1.SetError(textBox1, "Invalid input"); — الطريقة الصحيحة.',
            },
            {
              q: "Which property sets the size of images in the ImageList?",
              options: ["Size", "ImageSize", "IconSize", "SizeMode"],
              correct: 1,
              translation: "أي خاصية تحدد حجم الصور في ImageList؟",
              explanation: "ImageSize — الخاصية الصحيحة.",
            },
            {
              q: "Which value of the SizeMode property should you use to make an image in a PictureBox fit the control's size proportionally?",
              options: ["AutoSize", "CenterImage", "Normal", "Zoom"],
              correct: 3,
              translation:
                "أي قيمة من SizeMode تجعل الصورة في PictureBox تناسب حجم العنصر مع الحفاظ على التناسب؟",
              explanation: "Zoom — تكبّر/تصغّر مع الحفاظ على الأبعاد.",
            },
            {
              q: "To retrieve the full path of the selected file after the user clicks OK with the Open dialog box, you can write openFileDialog1.Name",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لاسترجاع المسار الكامل للملف المحدد بعد النقر على OK، يمكنك كتابة openFileDialog1.Name",
              explanation: "خطأ — الخاصية الصحيحة هي FileName.",
            },
            {
              q: "MessageBox.Show(radioButton1.Checked.ToString());\nIf radioButton1 is not selected, what will be the output?",
              options: [
                "MessageBox shows True",
                "MessageBox shows False",
                "MessageBox shows null",
                "Error",
              ],
              correct: 1,
              translation: "لو radioButton1 غير محدد، ماذا سيكون الناتج؟",
              explanation: "False — القيمة المنطقية للحالة.",
            },
            {
              q: "What does the first parameter of Insert() represent?",
              options: [
                "Length of string",
                "Index position",
                "Number of characters",
                "string to be inserted",
              ],
              correct: 1,
              translation: "ماذا يمثل المعامل الأول لـ Insert()؟",
              explanation: "موضع الفهرس (Index position).",
            },
            {
              q: "What will be the output?\n\nRandom r = new Random();\nint x = r.Next(6);\nMessageBox.Show(x.ToString());\n\nPossible output:",
              options: ["0 to 5", "0 to 6", "Only 6", "1 to 5", "1 to 6"],
              correct: 0,
              translation: "ماذا سيكون الناتج المحتمل؟",
              explanation: "r.Next(6) بترجع 0 إلى 5 — الطرف العلوي حصري.",
            },
            {
              q: "Controls with a higher TabIndex value receive focus before those with lower values.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "عناصر التحكم ذات TabIndex الأعلى تستقبل التركيز قبل الأقل.",
              explanation: "خطأ — العكس: الأقل يستقبل التركيز أولاً.",
            },
            {
              q: "If comboBox has no items, and code calls: comboBox1.SelectedItem.ToString(), what will be the output?",
              options: ["Null", "Empty string", "0", "Runtime Error"],
              correct: 3,
              translation:
                "لو ComboBox بدون عناصر وتم استدعاء comboBox1.SelectedItem.ToString()، ماذا يحدث؟",
              explanation: "خطأ وقت التشغيل — لأن SelectedItem بترجع null.",
            },
            {
              q: "What is the default value of the BorderStyle property for a Label control?",
              options: ["FixedSingle", "Fixed3D", "None"],
              correct: 2,
              translation:
                "ما القيمة الافتراضية لخاصية BorderStyle لعنصر Label؟",
              explanation: "None — بدون إطار افتراضياً.",
            },
            {
              q: 'When the button is clicked, a message box shows "20":\n\nprivate void button1_Click(object sender, EventArgs e)\n{\n    int x;\n    Display(ref x);\n    MessageBox.Show(x.ToString());\n}\n\nprivate void Display(ref int x)\n{\n    x = 20;\n}',
              options: ["True", "False"],
              correct: 0,
              translation: 'عند النقر على الزر، يظهر مربع رسالة "20".',
              explanation: "صح — ref بتخلي التعديل ينعكس على المتغير الأصلي.",
            },
            {
              q: "Which of the following is correct to extract the first 5 characters of a string?",
              options: [
                "Substring(0, 5)",
                "Substring(5, 0)",
                "Substring(5)",
                "Substring(1, 5)",
              ],
              correct: 0,
              translation: "أي مما يلي صحيح لاستخراج أول 5 أحرف من نص؟",
              explanation: "Substring(0, 5) — من الفهرس 0، طول 5.",
            },
            {
              q: "The Load event is executed when the form is opened, and if the form is hidden and shown again, the Load event runs again.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "حدث Load يُنفَّذ عند فتح النموذج، ولو تم إخفاؤه وإظهاره مرة أخرى، يُنفَّذ الحدث مرة أخرى.",
              explanation: "خطأ — Load بيشتغل مرة واحدة فقط عند أول تحميل.",
            },
            {
              q: "Clearing a selection of Items in listBox manually by setting SelectedIndex = -1 in code always triggers SelectedIndexChanged.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "مسح تحديد العناصر في ListBox يدوياً بضبط SelectedIndex = -1 يؤدي دائماً لتفعيل SelectedIndexChanged.",
              explanation: "صح — أي تغيير في SelectedIndex بيرفع الحدث.",
            },
            {
              q: "In a Windows Forms application, what is the visual indicator of an access key on a button?",
              options: [
                "The letter is bold",
                "The letter is underlined",
                "The letter is highlighted",
                "The letter is grayed out",
              ],
              correct: 1,
              translation:
                "في تطبيق Windows Forms، ما المؤشر البصري لمفتاح الوصول على زر؟",
              explanation: "الحرف تحته خط.",
            },
            {
              q: "The Timer control executes code at regular intervals defined by its Time property.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "عنصر Timer ينفذ الكود على فترات منتظمة محددة بخاصية Time.",
              explanation: "خطأ — الخاصية اسمها Interval مش Time.",
            },
            {
              q: "What is the type of result in this code?\n\nstring s = \"Hello, World\";\nvar result = s.Split(', ');",
              options: ["string", "string[]", "List<string>", "char[]"],
              correct: 1,
              translation: "ما نوع result في الكود التالي؟",
              explanation: "Split بترجع مصفوفة من النصوص (string[]).",
            },
            {
              q: "Can a PictureBox control display multiple images at once?",
              options: ["Yes, using a list", "Yes, using an array", "No"],
              correct: 2,
              translation: "هل يمكن لـ PictureBox عرض عدة صور في وقت واحد؟",
              explanation: "لا — صورة واحدة فقط في المرة.",
            },
            {
              q: "Assigning one structure variable to another creates a copy of the structure in C#.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "إسناد متغير هيكل (structure) لآخر ينشئ نسخة من الهيكل في C#.",
              explanation: "صح — الهياكل من نوع Value Type.",
            },
          ],
        },
        {
          t: "فاينل 2026 - البرنامج الأهلي - د. سارة — البرمجة المرئية",
          d: "اختبار الفاينل لمادة البرمجة المرئية - البرنامج الأهلي 2026 (د. سارة)",
          pdf: "Visual Programming/Questions/Final/2026/Final 2026 - National - Visual Programming - Dr.Sara.pdf",
          questions: [
            {
              q: "How do you split a string str by multiple delimiters?",
              options: [
                'str.Split(",", ";")',
                "str.Split(new char[] {',', ';'})",
                'str.Split(new string[]{",", ";"})',
              ],
              correct: 1,
              translation: "كيف تقسّم النص str بعدة فواصل؟",
              explanation:
                "str.Split(new char[] {',', ';'}) — الطريقة الصحيحة لمصفوفة من الفواصل.",
            },
            {
              q: "Which of the following is TRUE about modal forms?",
              options: [
                "Modal forms allow interaction with both the modal form and the parent form.",
                "Modal forms prevent the user from interacting with the parent form until the modal form is closed.",
                "Modal forms automatically close the parent form.",
              ],
              correct: 1,
              translation: "أي مما يلي صحيح بخصوص النماذج الوسيطة (Modal)؟",
              explanation:
                "النموذج الوسيط يمنع التفاعل مع النموذج الأب حتى يُغلق.",
            },
            {
              q: 'If you have a button with the Text property set to "&Open", which key combination will activate it?',
              options: ["Alt + O", "Ctrl + O", "Shift + O", "Ctrl + Alt + O"],
              correct: 0,
              translation: 'لو زر بخاصية Text = "&Open"، أي مفتاح ينشّطه؟',
              explanation: "Alt + O — لأن &O بتحدد O كمفتاح وصول.",
            },
            {
              q: "To give a menu item in MenuStrip the ability to become checked or unchecked when it is clicked by the user, you set the item's Checked property to True.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لإعطاء عنصر قائمة في MenuStrip القدرة على أن يُحدد أو يُلغى، تعيّن خاصية Checked على True.",
              explanation: "خطأ — الصحيح CheckOnClick = true.",
            },
            {
              q: 'What will be the output?\n\nstring str1 = "Hello";\nchar str2 = str1.Remove(1);\nMessageBox.Show(str2);',
              options: ["H", "ello", "Error", "Hllo"],
              correct: 2,
              translation: "ماذا سيكون الناتج؟",
              explanation: "خطأ — Remove بترجع string مش char.",
            },
            {
              q: "What happens if the specified file already exists when using File.CreateText()?",
              options: [
                "The file is appended",
                "The file is overwritten",
                "An exception is thrown",
              ],
              correct: 1,
              translation:
                "ماذا يحدث لو الملف المحدد موجود بالفعل عند استخدام File.CreateText()؟",
              explanation: "يتم استبدال الملف.",
            },
            {
              q: "What does the int.TryParse() method return when it fails to convert a string to an integer?",
              options: [
                "It returns -1",
                "It throws an exception",
                "It returns false",
                "It returns null",
              ],
              correct: 2,
              translation: "ماذا ترجع int.TryParse() عند فشل التحويل؟",
              explanation: "ترجع false — بدون استثناء.",
            },
            {
              q: "Which method of the ErrorProvider component is used to display an error message for a specific control?",
              options: ["SetError", "ShowError", "DisplayError", "SetMessage"],
              correct: 0,
              translation:
                "أي دالة من ErrorProvider تُستخدم لعرض رسالة خطأ لعنصر معين؟",
              explanation: "SetError — الطريقة الصحيحة.",
            },
            {
              q: "The File.AppendText method creates a new file if the specified file does not exist.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "دالة File.AppendText تنشئ ملفاً جديداً لو الملف غير موجود.",
              explanation: "صح — بيعمل الملف تلقائياً.",
            },
            {
              q: "Setting TabIndex to a -1 will make the control the first to receive focus when the form Load.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "ضبط TabIndex على -1 يجعل العنصر أول من يستقبل التركيز عند تحميل النموذج.",
              explanation:
                "خطأ — -1 معناه عدم المشاركة في ترتيب التاب. الأول هو 0.",
            },
            {
              q: "To set form's BackColor to default color, we use:",
              options: [
                "SystemColors.Default",
                "System.Colors",
                "SystemColors.Control",
                "System.Colors.Default",
              ],
              correct: 2,
              translation:
                "لضبط BackColor للنموذج على اللون الافتراضي، نستخدم:",
              explanation: "SystemColors.Control — اللون الافتراضي للنموذج.",
            },
            {
              q: 'What will happen if this code runs in Form1?\n\nForm2 f2 = new Form2();\nf2.ShowDialog();\nf2.Text = "New Title";',
              options: [
                'Form2 title is immediately "New Title"',
                "Form2 opens with default title; after closing, title changes",
                "Error",
              ],
              correct: 1,
              translation: "ماذا يحدث لو تم تنفيذ الكود في Form1؟",
              explanation:
                "ShowDialog() معطِّل — الكود بيتوقف لحد ما Form2 يتقفل، وبعدها بيتغير العنوان.",
            },
            {
              q: 'What will be the output of the following code when the button is clicked twice?\n\nprivate int counter = 0;\nprivate void button1_Click(object sender, EventArgs e)\n{\n    counter++;\n    MessageBox.Show("Button clicked " + counter + " times");\n}',
              options: [
                'A message box showing "Button clicked 1 times" on the first click, and "Button clicked 2 times" on the second click.',
                'A message box showing "Button clicked 1 times" every time',
              ],
              correct: 0,
              translation: "ماذا سيكون الناتج عند النقر مرتين؟",
              explanation: "counter على مستوى الكلاس — يتزايد كل نقرة.",
            },
            {
              q: 'int num = 100;\nusing (StreamWriter sw = new StreamWriter("numbers.txt", append: true))\n{\n    sw.WriteLine(num);\n}\n\nWhat happens here?',
              options: [
                "Number 100 is appended to the file, and the file is closed automatically.",
                "Number 100 is appended to the file, and the file remains open after writing.",
                "Causes runtime error",
              ],
              correct: 0,
              translation: "ماذا يحدث هنا؟",
              explanation: "using بيضمن إغلاق الملف تلقائياً بعد الاستخدام.",
            },
            {
              q: "Which method of the Random class generates a floating-point number between 0.0 (inclusive) and 1.0 (exclusive)?",
              options: ["Next()", "NextDouble()", "Double()", "NextFloat()"],
              correct: 1,
              translation:
                "أي دالة من Random تولد رقماً عشرياً بين 0.0 (شامل) و 1.0 (حصري)؟",
              explanation: "NextDouble() — الدالة الصحيحة.",
            },
            {
              q: "string s = \"banana\";\nint index = s.LastIndexOf('a', 3);\n\nWhat is the value of index?",
              options: ["1", "3", "5", "-1"],
              correct: 1,
              translation: "ما قيمة index؟",
              explanation:
                "LastIndexOf بيبدأ البحث من الفهرس 3 نزولاً، فيلاقي 'a' عند 3.",
            },
            {
              q: "How do you get the text of the currently selected item in comboBox1?",
              options: [
                "comboBox1.SelectedItem.ToString()",
                "comboBox1.SelectedText",
                "comboBox1.Text",
                "Both comboBox1.Text and comboBox1.SelectedItem.ToString()",
              ],
              correct: 3,
              translation: "كيف تحصل على نص العنصر المحدد حالياً في comboBox1؟",
              explanation: "كلاهما يشتغل — Text و SelectedItem.ToString().",
            },
            {
              q: "Which of the following properties is not available in Panel control?",
              options: ["BackColor", "BorderStyle", "Text", "Visible"],
              correct: 2,
              translation: "أي من الخصائص التالية غير متوفرة في عنصر Panel؟",
              explanation: "Text — Panel مش بيعرض نص.",
            },
            {
              q: 'What will be the output?\n\nstring s = "Hello World";\nMessageBox.Show(s.Substring(6));',
              options: ["Hello", "World", "W"],
              correct: 1,
              translation: "ماذا سيكون الناتج؟",
              explanation: "Substring(6) من الفهرس 6 (بعد المسافة) = World.",
            },
            {
              q: "When you use the Properties window to change a control's Visible property to false at design time, the control will still be visible in the Designer.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عند تغيير خاصية Visible إلى false من نافذة الخصائص، العنصر يبقى ظاهر في المصمم.",
              explanation: "صح — الإخفاء بيتم في وقت التشغيل فقط.",
            },
            {
              q: "How do you close a form programmatically?",
              options: [
                "Form.Close();",
                "this.Close();",
                "Form.Exit();",
                "Application.Close();",
              ],
              correct: 1,
              translation: "كيف تغلق نموذجاً برمجياً؟",
              explanation: "this.Close(); — تغلق النموذج الحالي.",
            },
            {
              q: 'The correct way to read a file until the end is:\n\nStreamReader sr = File.OpenText("data.txt");\nwhile (sr.EndOfStream != true)\n{\n    string line = sr.ReadLine();\n    MessageBox.Show(line);\n}\nsr.Close();',
              options: ["True", "False"],
              correct: 0,
              translation:
                "الطريقة الصحيحة لقراءة ملف حتى النهاية هي الكود التالي.",
              explanation: "صح — sr.EndOfStream != true شرط صحيح.",
            },
            {
              q: "Which of the following is correct for declaring a jagged array of integers?",
              options: [
                "int[][] arr = new int[][];",
                "int[][] arr = new int[3][];",
                "int[][] arr = new int[][3];",
                "int[,] arr = new int[3][3];",
              ],
              correct: 1,
              translation:
                "أي مما يلي صحيح لإعلان Jagged Array من الأعداد الصحيحة؟",
              explanation: "int[][] arr = new int[3][]; — الطريقة الصحيحة.",
            },
            {
              q: "The Load event takes place after the form is displayed on the screen.",
              options: ["True", "False"],
              correct: 1,
              translation: "حدث Load يقع بعد عرض النموذج على الشاشة.",
              explanation: "خطأ — Load يقع قبل العرض.",
            },
            {
              q: "What happens if the DropDownStyle property of a ComboBox is set to Simple?",
              options: [
                "The ComboBox displays a list of items that is always visible.",
                "The ComboBox cannot display a list of items until the user clicks the down arrow.",
                "The ComboBox allows only pre-defined items to be selected.",
                "The ComboBox becomes non-editable.",
              ],
              correct: 0,
              translation:
                "ماذا يحدث لو ضبطت DropDownStyle لـ ComboBox على Simple؟",
              explanation: "القائمة تفضل ظاهرة دائماً.",
            },
            {
              q: "What does the SizeMode property of the PictureBox control determine?",
              options: [
                "The position of the control on the form",
                "How the image is displayed within the PictureBox",
                "The size of the PictureBox itself",
                "The border style of the PictureBox",
              ],
              correct: 1,
              translation: "ماذا تحدد خاصية SizeMode لـ PictureBox؟",
              explanation: "كيفية عرض الصورة.",
            },
            {
              q: "Increasing AutomaticDelay will make ToolTips appear faster.",
              options: ["True", "False"],
              correct: 1,
              translation: "زيادة AutomaticDelay تجعل التلميحات تظهر أسرع.",
              explanation: "خطأ — زيادة التأخير تجعله يظهر أبطأ.",
            },
            {
              q: 'What will be the output?\n\nstring a = "Hello";\nstring b = "hello";\nint result = String.Compare(a, b, true);\nMessageBox.Show(result.ToString());',
              options: ["-1", "0", "1"],
              correct: 1,
              translation: "ماذا سيكون الناتج؟",
              explanation:
                "0 — لأن true معناها مقارنة لا تفرق بين حالة الأحرف.",
            },
            {
              q: "What are the two types of ScrollBars available in C# Windows Forms?",
              options: [
                "VerticalScroll and HorizontalScroll",
                "HScrollBar and VScrollBar",
                "AutoScroll and ManualScroll",
                "HSBar and VSBar",
              ],
              correct: 1,
              translation: "ما نوعا ScrollBar المتاحان في C# Windows Forms؟",
              explanation: "HScrollBar و VScrollBar — الأفقي والعمودي.",
            },
            {
              q: "Clearing a selection of Items in listBox manually by setting SelectedIndex = -1 in code always triggers SelectedIndexChanged.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "مسح تحديد العناصر بضبط SelectedIndex = -1 يؤدي دائماً لتفعيل SelectedIndexChanged.",
              explanation: "صح — أي تغيير في الفهرس يرفع الحدث.",
            },
            {
              q: "How can you determine the number of items in a ListBox?",
              options: [
                "ListBox.Count",
                "ListBox.Items.Count",
                "ListBox.Item.Count",
                "ListBox.Size",
              ],
              correct: 1,
              translation: "كيف تحدد عدد العناصر في ListBox؟",
              explanation: "ListBox.Items.Count.",
            },
            {
              q: "What does the Trim() method do in C#?",
              options: [
                "Removes all spaces in a string",
                "Removes leading and trailing spaces",
                "Removes only trailing spaces",
                "Removes only leading spaces",
              ],
              correct: 1,
              translation: "ماذا تفعل Trim() في C#؟",
              explanation: "تزيل المسافات من البداية والنهاية.",
            },
            {
              q: "What is the default value of the Checked property of a CheckBox?",
              options: ["True", "False", "null"],
              correct: 1,
              translation: "ما القيمة الافتراضية لخاصية Checked في CheckBox؟",
              explanation: "False — غير محدد افتراضياً.",
            },
            {
              q: "ToolTips are visible only when the control is clicked.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "التلميحات (ToolTips) تظهر فقط عند النقر على العنصر.",
              explanation: "خطأ — تظهر عند تمرير الماوس (hover).",
            },
            {
              q: "Does Insert() method modify the original string?",
              options: ["Yes", "No"],
              correct: 1,
              translation: "هل دالة Insert() تعدّل النص الأصلي؟",
              explanation:
                "لا — النصوص في C# غير قابلة للتغيير (Immutable)، بترجع نصاً جديداً.",
            },
            {
              q: "What is the default value of ImageSize property in ImageList control?",
              options: ["16X16", "32X32", "64X64", "128X128"],
              correct: 0,
              translation: "ما القيمة الافتراضية لـ ImageSize في ImageList؟",
              explanation: "16X16 — الحجم الافتراضي.",
            },
            {
              q: "Which property of a TabControl contains the collection of tabs?",
              options: ["Tabs", "TabPages", "TabCollection", "Pages"],
              correct: 1,
              translation: "أي خاصية من TabControl تحتوي على مجموعة التبويبات؟",
              explanation: "TabPages — المجموعة الصحيحة.",
            },
            {
              q: "The default behavior of a TextBox is to select all text when it gains focus.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "السلوك الافتراضي لـ TextBox هو تحديد كل النص عند استقبال التركيز.",
              explanation: "خطأ — المؤشر بس بيتحط، مش بيعمل تحديد كامل.",
            },
            {
              q: "What will happen if this code is in button2 event handler and the button is clicked?\n\nbutton1.Focus();\ntextBox1.Focus();",
              options: [
                "Both control will have the focus at the same time",
                "only button1 will have focus",
                "only textbox1 will have focus",
                "button1 will have focus, and by clicking Tab the textbox1 will have focus",
              ],
              correct: 2,
              translation:
                "ماذا يحدث لو الكود ده في معالج حدث button2 وتم النقر؟",
              explanation:
                "التركيز على عنصر واحد فقط — textBox1 هو الأخير اللي بياخده.",
            },
            {
              q: "The default value of the AutoSize property of a Label control is False.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "القيمة الافتراضية لـ AutoSize لعنصر Label هي False.",
              explanation: "خطأ — الافتراضي True.",
            },
            {
              q: "If an error is set using the ErrorProvider, it is automatically cleared when the control's Validating event succeeds.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "لو تم تعيين خطأ عبر ErrorProvider، يُمسح تلقائياً عند نجاح حدث Validating.",
              explanation: "خطأ — لازم تمسحه يدوياً بـ SetError مع نص فارغ.",
            },
            {
              q: "When the button is clicked many times without closing the form, what will be displayed in textBox1?\n\nTimer Properties: Interval = 1000\nint i = 10;\n\nprivate void button1_Click(object sender, EventArgs e)\n{\n    timer1.Start();\n}\n\nprivate void timer1_Tick(object sender, EventArgs e)\n{\n    i--;\n    textBox1.Text = i.ToString();\n    if (i == 7)\n        timer1.Stop();\n}",
              options: [
                "9 for each click",
                "9 then 8 then 7 for each click",
                "9 for first click, 8 for second click, 7 for third click",
                "9 then 8 then 7 for first click, 6, 5, 4, 3, 2, 1, 0, ... for the second click",
              ],
              correct: 3,
              translation:
                "ماذا سيُعرض في textBox1 عند النقر عدة مرات بدون إغلاق النموذج؟",
              explanation:
                "i متغير على مستوى الكلاس — كل نقرة تكمل التناقص من حيث توقف.",
            },
            {
              q: 'private void checkBox1_CheckedChanged(object sender, EventArgs e)\n{\n    MessageBox.Show("Checked ");\n}\n\nWhen the checkBox1 is unchecked by the user, what will happen?',
              options: ["MessageBox Show Checked", "Nothing happens", "Error"],
              correct: 0,
              translation:
                "عند إلغاء تحديد checkBox1 بواسطة المستخدم، ماذا يحدث؟",
              explanation:
                "الحدث CheckedChanged بيشتغل عند أي تغيير — تحديد أو إلغاء.",
            },
            {
              q: 'openFileDialog1.FileName = "test.txt";\nopenFileDialog1.ShowDialog();\n\nWhat is the effect of setting FileName before ShowDialog()?',
              options: [
                "Opens the file automatically",
                "Shows the default file name (test.txt) in the open dialog",
                "Causes an error",
                "Prevents file selection",
              ],
              correct: 1,
              translation: "ما تأثير تعيين FileName قبل ShowDialog()؟",
              explanation: "يعرض اسم الملف الافتراضي في نافذة الفتح.",
            },
          ],
        },
        {
          t: "فاينل 2026 - برنامج PPIS - د. سارة — البرمجة المرئية",
          d: "اختبار الفاينل لمادة البرمجة المرئية - برنامج PPIS 2026 (د. سارة)",
          pdf: "Visual Programming/Questions/Final/2026/Final 2026 - PPIS - Dr. Sara.pdf",
          questions: [
            {
              q: "Which method is used to programmatically add an item to a ListBox?",
              options: [
                "ListBox.AddItem()",
                "ListBox.Items.Add()",
                "ListBox.Append()",
                "ListBox.Items.Insert()",
              ],
              correct: 1,
              translation: "أي دالة تُستخدم لإضافة عنصر لـ ListBox برمجياً؟",
              explanation: "ListBox.Items.Add() — الطريقة الصحيحة للإضافة.",
            },
            {
              q: 'Which of the following is the correct syntax for TryParse on a string value "45.67" to parse as a double?',
              options: [
                'double.TryParse(out result, "45.67")',
                'double.Parse("45.67", result)',
                'TryParse("45.67", result)',
                'double.TryParse("45.67", out result)',
              ],
              correct: 3,
              translation:
                'أي من الصيغ التالية صحيحة لـ TryParse على القيمة "45.67" لتحويلها إلى double؟',
              explanation:
                'double.TryParse("45.67", out result) — القيمة أولاً ثم out.',
            },
            {
              q: "Which of the following methods would you use to add new lines to a file without overwriting its contents?",
              options: [
                "File.AppendText",
                "File.CreateText",
                "File.WriteAllText",
                "File.ReadAllText",
              ],
              correct: 0,
              translation:
                "أي دالة تستخدم لإضافة سطور جديدة لملف بدون استبدال محتواه؟",
              explanation: "File.AppendText — للإضافة بدون استبدال.",
            },
            {
              q: "To close an application's form in code, use the statement this.Close();",
              options: ["True", "False"],
              correct: 0,
              translation:
                "لإغلاق نموذج التطبيق في الكود، استخدم العبارة this.Close();",
              explanation: "صح — الطريقة الصحيحة.",
            },
            {
              q: "Which property controls how the background image is displayed on the form?",
              options: [
                "ImageLayout",
                "SizeMode",
                "BackgroundImageLayout",
                "Image",
              ],
              correct: 2,
              translation:
                "أي خاصية تتحكم في كيفية عرض صورة الخلفية على النموذج؟",
              explanation: "BackgroundImageLayout.",
            },
            {
              q: "What will be the output of the following code?\nstring str = \"Hello\"; MessageBox.Show(str.IndexOf('h').ToString());",
              options: ["0", "1", "-1", "Error"],
              correct: 2,
              translation: "ماذا سيكون ناتج الكود؟",
              explanation:
                "-1 — لأن 'h' الصغيرة غير موجودة في 'Hello' (حساسية لحالة الأحرف).",
            },
            {
              q: "The Load event takes place after the form is displayed on the screen.",
              options: ["True", "False"],
              correct: 1,
              translation: "حدث Load يقع بعد عرض النموذج على الشاشة.",
              explanation: "خطأ — Load يقع قبل العرض.",
            },
            {
              q: "How can you programmatically set focus to a TextBox control named textBox1?",
              options: [
                "textBox1.SetFocus()",
                "textBox1.Focus()",
                "SetFocus(textBox1)",
                "textBox1.Focus=true",
              ],
              correct: 1,
              translation: "كيف تعيّن التركيز على TextBox اسمه textBox1؟",
              explanation: "textBox1.Focus() — الطريقة الصحيحة.",
            },
            {
              q: "When you call a string object's Split method, the method divides the string into substrings and returns them as an array of strings.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "عند استدعاء Split على string، الدالة تقسم النص وتُرجع مصفوفة من النصوص.",
              explanation: "صح — النوع المُرجَع string[].",
            },
            {
              q: "Which property of the GroupBox is used to set the title displayed at the top of the box?",
              options: ["Text", "Title", "Header", "Name"],
              correct: 0,
              translation:
                "أي خاصية من GroupBox تُستخدم لضبط العنوان في الأعلى؟",
              explanation: "Text — الخاصية الصحيحة.",
            },
            {
              q: "Which property controls how the image is sized or stretched within the PictureBox?",
              options: ["AutoSize", "ImageMode", "Stretch", "SizeMode"],
              correct: 3,
              translation:
                "أي خاصية تتحكم في حجم الصورة أو تمددها داخل PictureBox؟",
              explanation: "SizeMode — الخاصية المسؤولة.",
            },
            {
              q: "EndOfFile property is used to checks whether the end of the file has been reached?",
              options: ["True", "False"],
              correct: 1,
              translation:
                "خاصية EndOfFile تُستخدم للتحقق من الوصول لنهاية الملف.",
              explanation: "خطأ — الخاصية اسمها EndOfStream.",
            },
            {
              q: "What is returned when the user clicks the Open button in OpenFileDialog?",
              options: [
                "Dialog.Open",
                "Dialog.OK",
                "DialogResult.Open",
                "DialogResult.OK",
              ],
              correct: 3,
              translation:
                "ماذا يُرجع عند النقر على زر Open في OpenFileDialog؟",
              explanation: "DialogResult.OK — النتيجة القياسية.",
            },
            {
              q: "The .... file format is commonly used to export spreadsheet data to a text file.",
              options: ["SDV", "CSV", "XML", "PDF"],
              correct: 1,
              translation:
                "صيغة .... تُستخدم عادةً لتصدير بيانات الجداول إلى ملف نصي.",
              explanation: "CSV — Comma Separated Values.",
            },
            {
              q: "In a Windows Forms application, where should you declare a field variable if you need to access it from multiple event handlers (e.g., button clicks)?",
              options: [
                "Inside each method where it is used",
                "As a parameter in each method",
                "At the class level, outside any methods",
                "In the Main method",
              ],
              correct: 2,
              translation:
                "في تطبيق Windows Forms، أين تُعلن متغير حقل للوصول إليه من عدة معالجات أحداث؟",
              explanation:
                "على مستوى الكلاس خارج الدوال — ليكون متاحاً لكل الدوال.",
            },
            {
              q: "Forms and most controls have a ForeColor property that allows you to change the object's background color.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "النماذج ومعظم عناصر التحكم لها خاصية ForeColor لتغيير لون الخلفية.",
              explanation: "خطأ — ForeColor للنص الأمامي، و BackColor للخلفية.",
            },
            {
              q: "rand.Next(10) returns",
              options: ["0 to 9", "1 to 10", "0 to 10", "-10 to 10"],
              correct: 0,
              translation: "rand.Next(10) ترجع:",
              explanation: "0 إلى 9 — الطرف العلوي حصري.",
            },
            {
              q: "String.Compare() returns a Boolean value.",
              options: ["True", "False"],
              correct: 1,
              translation: "String.Compare() ترجع قيمة منطقية (Boolean).",
              explanation: "خطأ — ترجع int (سالب، صفر، موجب).",
            },
            {
              q: 'What will be the output of the following code?\ndouble x = 123.41; MessageBox.Show(x.ToString("n1"));',
              options: ["123.41", "123.4", "$123.41", "$123.4"],
              correct: 1,
              translation: "ماذا سيكون الناتج؟",
              explanation: 'تنسيق "n1" بيعرض رقم عشري واحد = 123.4.',
            },
            {
              q: "Trim() removes whitespace in the middle of a string.",
              options: ["True", "False"],
              correct: 1,
              translation: "Trim() تزيل المسافات في وسط النص.",
              explanation: "خطأ — من البداية والنهاية فقط.",
            },
            {
              q: 'What will be the output of the following code?\nstring str1 = "Hello"; string str2 = str1.Remove(1); MessageBox.Show(str2);',
              options: ["H", "ello", "Hllo", "e"],
              correct: 0,
              translation: "ماذا سيكون الناتج؟",
              explanation: "Remove(1) بتحذف من الفهرس 1 لآخر النص، فتبقى H.",
            },
            {
              q: "You add your own code to the Program.cs file as you develop an application.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "أنت تضيف الكود الخاص بك في Program.cs أثناء التطوير.",
              explanation: "خطأ — Program.cs لكود البدء فقط.",
            },
            {
              q: "What would you use to determine if any RadioButton in a group is selected?",
              options: [
                "if (radioButton.Checked == true)",
                'if (radioButton.Text == "Selected")',
                "radioButton.IsChecked",
                "radioButton.Selected == true",
              ],
              correct: 0,
              translation:
                "ماذا تستخدم لتحديد ما إذا كان أي RadioButton في مجموعة محدداً؟",
              explanation: "المرور على كل زر وفحص خاصية Checked.",
            },
            {
              q: "Which of the following is NOT a valid value for the BorderStyle property of a Label control?",
              options: ["FixedSingle", "Fixed3D", "FixedDouble", "None"],
              correct: 2,
              translation: "أي مما يلي ليس قيمة صالحة لـ BorderStyle في Label؟",
              explanation: "FixedDouble — قيمة غير موجودة.",
            },
            {
              q: "The default value of the AutoSize property of a Label control is True.",
              options: ["True", "False"],
              correct: 0,
              translation: "القيمة الافتراضية لـ AutoSize لـ Label هي True.",
              explanation: "صح — الافتراضي True.",
            },
            {
              q: "Which property hides the characters typed in a TextBox (for passwords)?",
              options: [
                "Hidden",
                "UseSystemPasswordChar",
                "Password",
                "PasswordChar",
              ],
              correct: 3,
              translation:
                "أي خاصية تخفي الأحرف المكتوبة في TextBox (لكلمات المرور)؟",
              explanation: "PasswordChar — الحرف اللي بيظهر بدل النص الفعلي.",
            },
            {
              q: "You can clear the contents of a TextBox control in the same way that you clear the contents of a Label control.",
              options: ["True", "False"],
              correct: 0,
              translation: "يمكنك مسح محتوى TextBox بنفس طريقة مسح Label.",
              explanation: 'صح — كلاهما بـ Text = "".',
            },
            {
              q: "Which of the following statements allows you to select the item at index 2 in a ListBox?",
              options: [
                "ListBox.SelectItem(2);",
                "ListBox.Items[2].Selected = true;",
                "ListBox.Select(2);",
                "ListBox.SelectedIndex = 2;",
              ],
              correct: 3,
              translation:
                "أي مما يلي يسمح بتحديد العنصر في الفهرس 2 في ListBox؟",
              explanation: "ListBox.SelectedIndex = 2; — الطريقة الأشهر.",
            },
            {
              q: "Consider the code for checkBox1_CheckedChanged. How many times is the message shown when the user checks and then unchecks the CheckBox1?",
              options: ["0", "1", "2", "None of these"],
              correct: 2,
              translation:
                "كم مرة تظهر الرسالة عند تحديد ثم إلغاء تحديد CheckBox1؟",
              explanation: "2 — مرة عند التحديد ومرة عند الإلغاء.",
            },
            {
              q: "Multiple RadioButton controls in the same GroupBox can be selected at the same time.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "عدة RadioButtons في نفس GroupBox يمكن تحديدها في نفس الوقت.",
              explanation: "خطأ — واحد فقط.",
            },
            {
              q: "What is the output of the following code?\nstatic void Test(int a, int b = 5, int c = 3) { Console.WriteLine(a + b + c); }\n...\nTest(2, 3);",
              options: ["5", "8", "10", "Error"],
              correct: 1,
              translation: "ماذا سيكون ناتج الكود؟",
              explanation: "a=2، b=3، c=3 (افتراضي) → 2+3+3 = 8.",
            },
            {
              q: "Which of the following is NOT considered an overload of the method void Sum(int number1, int number2)?",
              options: [
                "void Sum(int number1)",
                "int Sum(int number1, int number2)",
                "void Sum(double number1, int number2)",
                "void Sum(double number1, double number2)",
              ],
              correct: 1,
              translation: "أي مما يلي ليس Overload للدالة void Sum(int, int)؟",
              explanation:
                "int Sum(int, int) — نفس التوقيع لكن نوع الإرجاع مختلف — مش Overload.",
            },
            {
              q: "Which of the following is NOT the correct way to define and initialize an array of 3 integers?",
              options: [
                "int[] a = {5, 3, 4};",
                "int[] a; a = new int[3]{5, 3, 4};",
                "int[] a; a = new int[3]; a[0]=5; a[1]=3; a[2]=4;",
                "int[] a; a = new int{5, 3, 4};",
              ],
              correct: 3,
              translation:
                "أي مما يلي ليس طريقة صحيحة لتعريف وتهيئة مصفوفة من 3 أعداد صحيحة؟",
              explanation: "new int{5, 3, 4} ناقصة الأقواس المربعة [].",
            },
            {
              q: "What is the output of the foreach loop code when trying to modify the iteration variable inside the loop?",
              options: [
                "Increments values successfully",
                "Skips execution",
                "Compile Error",
                "Runtime Error",
              ],
              correct: 2,
              translation:
                "ماذا يحدث لو حاولت تعديل متغير التكرار داخل حلقة foreach؟",
              explanation: "خطأ في الترجمة — foreach مش بيسمح بالتعديل.",
            },
          ],
        },
        {
          t: "فاينل 2025 - الإجابات - د. سارة — البرمجة المرئية",
          d: "إجابات اختبار الفاينل لمادة البرمجة المرئية - البرنامج الأهلي 2025 (د. سارة)",
          pdf: "Visual Programming/Questions/Final/2025/Final 2025 - Answers - Visual Programming - Dr.Sara.pdf",
          questions: [
            {
              q: "How do you create a jagged array that contains strings?",
              options: [
                "string jaggedStrings = new string[];",
                "string[] jaggedStrings = new string;",
                "string[][] jaggedStrings = new string[][];",
                "string[] jaggedStrings = new string[];",
              ],
              correct: 2,
              translation: "كيف تنشئ Jagged Array من النصوص؟",
              explanation:
                "string[][] jaggedStrings = new string[][]; — الصيغة الصحيحة.",
            },
            {
              q: "The ToolTip will always remain visible until the user clicks on the control.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "التلميح يبقى ظاهراً دائماً حتى ينقر المستخدم على العنصر.",
              explanation: "خطأ — يختفي تلقائياً بعد فترة.",
            },
            {
              q: "You call the SetError method with an empty string as the error message.",
              options: [
                "The error icon is hidden for the specified control",
                "The error icon is displayed with no message",
                "An exception is thrown",
              ],
              correct: 0,
              translation: "تستدعي SetError بنص فارغ كرسالة خطأ.",
              explanation: "أيقونة الخطأ تختفي للعنصر المحدد.",
            },
            {
              q: "Which property of a ScrollBar determines the current position of the scroll box?",
              options: ["Position", "Value", "Location", "CurrentScroll"],
              correct: 1,
              translation: "أي خاصية من ScrollBar تحدد الموضع الحالي؟",
              explanation: "Value — الخاصية الحالية.",
            },
            {
              q: "Given the following method: public void DisplayMessage(string title, string content, int duration = 5). Which call is invalid?",
              options: [
                'DisplayMessage("Warning", content: "Low Battery");',
                'DisplayMessage(title: "Warning", content: "Low Battery", duration: 10);',
                'DisplayMessage(content: "Low Battery", "Warning", 10);',
                'DisplayMessage("Warning", "Low Battery", duration: 10);',
              ],
              correct: 2,
              translation: "بالنظر للدالة، أي استدعاء غير صالح؟",
              explanation:
                'displayMessage(content: "Low Battery", "Warning", 10) — Named Argument قبل Positional غير مسموح.',
            },
            {
              q: 'What will the following code output?\nstring str1 = "Hello "; char str2 = str1.Remove(1);\nMessageBox.Show(str2.ToString());',
              options: ["Hello", "H", "Space", "Error"],
              correct: 3,
              translation: "ماذا سيكون الناتج؟",
              explanation: "خطأ — Remove بترجع string مش char.",
            },
            {
              q: "Which method is used to programmatically add an item to a ListBox?",
              options: [
                "ListBox.AddItem()",
                "ListBox.Items.Add()",
                "ListBox.Items.Insert()",
                "ListBox.Items.Item.adds",
              ],
              correct: 1,
              translation: "أي دالة تُستخدم لإضافة عنصر لـ ListBox برمجياً؟",
              explanation: "ListBox.Items.Add().",
            },
            {
              q: "The default value of the AutoSize property of a Label control is False.",
              options: ["True", "False"],
              correct: 1,
              translation: "القيمة الافتراضية لـ AutoSize لـ Label هي False.",
              explanation: "خطأ — الافتراضي True.",
            },
            {
              q: "What will be the output of the following code when the button is clicked twice?",
              options: [
                '"Button clicked 1 times" on the first click, and "Button clicked 2 times" on the second click.',
                'A message box showing "Button clicked 1 times" every time.',
                "Error.",
              ],
              correct: 0,
              translation: "ماذا سيكون الناتج عند النقر مرتين؟",
              explanation: "counter على مستوى الكلاس — يتزايد.",
            },
            {
              q: "Which property of the Label control is used to align the text within the Label?",
              options: ["TextAlign", "Alignment", "TextPosition", "Layout"],
              correct: 0,
              translation: "أي خاصية تُستخدم لمحاذاة النص داخل Label؟",
              explanation: "TextAlign.",
            },
            {
              q: "The Load event takes place after the form is displayed on the screen.",
              options: ["True", "False"],
              correct: 1,
              translation: "حدث Load يقع بعد عرض النموذج على الشاشة.",
              explanation: "خطأ — قبل العرض.",
            },
            {
              q: "Which property of a TabControl contains the collection of tabs?",
              options: ["Tabs", "TabPages", "TabCollection", "Pages"],
              correct: 1,
              translation: "أي خاصية تحتوي على مجموعة التبويبات؟",
              explanation: "TabPages.",
            },
            {
              q: "You can use an ImageList control to store images of different sizes.",
              options: ["True", "False"],
              correct: 1,
              translation: "يمكنك استخدام ImageList لتخزين صور بأحجام مختلفة.",
              explanation: "خطأ — كل الصور بنفس الحجم (ImageSize).",
            },
            {
              q: 'For a button with the Text property set to "&Open", which key combination will activate it?',
              options: ["Alt + O", "Ctrl + O", "Shift + O", "Ctrl + Alt + O"],
              correct: 0,
              translation: 'زر بخاصية Text = "&Open"، أي مفتاح ينشطه؟',
              explanation: "Alt + O.",
            },
            {
              q: "When the button is clicked, what will be the output? (points[0].X.ToString())",
              options: ["0", "5", "10", "Error"],
              correct: 0,
              translation: "ماذا سيكون الناتج عند النقر؟",
              explanation: "0 — القيمة الافتراضية.",
            },
            {
              q: "How can you disable a ToolStripMenuItem in a MenuStrip control?",
              options: [
                "Set the Enabled property of the ToolStripMenuItem to false",
                "Set the Visible property of the ToolStripMenuItem to false",
                "Set the Enabled property of the MenuStrip to false",
                "Set the Text property of the ToolStripMenuItem to disabled",
              ],
              correct: 0,
              translation: "كيف تعطل ToolStripMenuItem في MenuStrip؟",
              explanation: "Enabled = false على العنصر نفسه.",
            },
            {
              q: "The Text property of a ComboBox always corresponds to the value of the selected item.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "خاصية Text لـ ComboBox تتوافق دائماً مع قيمة العنصر المحدد.",
              explanation: "خطأ — لو ComboBox قابل للتحرير، ممكن النص مختلف.",
            },
            {
              q: "Which method is used to generate a random floating-point number between 0.0 and 1.0 (exclusive)?",
              options: [
                "random.NextFloat()",
                "random.NextDouble()",
                "random.Double()",
                "random.Float()",
              ],
              correct: 1,
              translation: "أي دالة تولد رقماً عشرياً بين 0.0 و 1.0 (حصري)؟",
              explanation: "NextDouble().",
            },
            {
              q: "You can specify a path as well as a filename in the argument that you pass to the File.CreateText method, but not to File.AppendText method.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "يمكنك تحديد مسار واسم ملف في معامل File.CreateText، لكن ليس في File.AppendText.",
              explanation: "خطأ — كلاهما يقبلان المسار.",
            },
            {
              q: "In a Windows Forms application, what is the visual indicator of an access key on a button?",
              options: [
                "Letter is bold",
                "Underlined",
                "Highlighted",
                "Grayed out",
              ],
              correct: 1,
              translation: "ما المؤشر البصري لمفتاح الوصول على زر؟",
              explanation: "الحرف تحته خط.",
            },
            {
              q: 'string str1 = "hello"; string str2 = "HELLO"; String.Compare(str1, str2, true); The method returns:',
              options: ["0", "True", "False", "Error"],
              correct: 0,
              translation: "ماذا ترجع الدالة؟",
              explanation: "0 — لأن true للمقارنة بدون حساسية لحالة الأحرف.",
            },
            {
              q: "How can you retrieve an image from the ImageList?",
              options: [
                "ImageList.GetImage(index)",
                "ImageList.Images[index]",
                "ImageList[index]",
                "ImageList.Image(index)",
              ],
              correct: 1,
              translation: "كيف تسترجع صورة من ImageList؟",
              explanation: "ImageList.Images[index].",
            },
            {
              q: 'What will the following code output?\nstring text = "C# Programming"; string result = text.Substring(3);',
              options: ["#C", "Programming", "Programming #", "P"],
              correct: 1,
              translation: "ماذا سيكون الناتج؟",
              explanation: "من الفهرس 3 لآخر النص = Programming.",
            },
            {
              q: "You can assign either decimal or int values to decimal variables, but you cannot assign double values to decimal variables.",
              options: ["True", "False"],
              correct: 0,
              translation:
                "يمكنك إسناد قيم decimal أو int لمتغيرات decimal، لكن لا يمكن إسناد قيم double.",
              explanation: "صح — لازم cast صريح لـ double.",
            },
            {
              q: "Which namespace must be included to use the File.CreateText method?",
              options: [
                "System.Windows.Forms",
                "System.IO",
                "System.Text",
                "System.Collections",
              ],
              correct: 1,
              translation:
                "أي مساحة أسماء يجب تضمينها لاستخدام File.CreateText؟",
              explanation: "System.IO.",
            },
            {
              q: "What will the following code output?\nstring text = \"Hello, World!\"; int position = text.IndexOf('o', 5);",
              options: ["4", "8", "5", "-1"],
              correct: 1,
              translation: "ماذا سيكون الناتج؟",
              explanation: "8 — أول 'o' بعد الفهرس 5 موجودة عند 8.",
            },
            {
              q: "Which event is typically used to detect when a RadioButton has been selected?",
              options: ["Click", "Selected", "CheckedChanged", "Checked"],
              correct: 2,
              translation: "أي حدث يُستخدم عادةً للكشف عن تحديد RadioButton؟",
              explanation: "CheckedChanged.",
            },
            {
              q: "To ensure a TextBox control receives focus first when the form loads, what would you do?",
              options: [
                "Set its TabIndex property to -1",
                "Set its TabIndex property to 0",
                "Set its TabOrder property to -1",
                "Set its TabOrder property to 0",
              ],
              correct: 1,
              translation:
                "لضمان استقبال TextBox التركيز أولاً عند تحميل النموذج، ماذا تفعل؟",
              explanation: "ضبط TabIndex على 0.",
            },
            {
              q: "How can you define multiple delimiters for tokenizing a string using the Split method?",
              options: [
                "By passing a string containing all delimiters",
                "By passing a char array of delimiters",
                "By passing a List<char> of delimiters",
                "By passing a delimiter string separated by commas",
              ],
              correct: 1,
              translation: "كيف تعرّف عدة فواصل لتقسيم نص باستخدام Split؟",
              explanation: "بتمرير مصفوفة char من الفواصل.",
            },
            {
              q: "The AppendText method creates a new file if the specified file does not exist.",
              options: ["True", "False"],
              correct: 0,
              translation: "AppendText تنشئ ملفاً جديداً لو الملف غير موجود.",
              explanation: "صح.",
            },
            {
              q: "The default behavior of a TextBox is to select all text when it gains focus.",
              options: ["True", "False"],
              correct: 1,
              translation:
                "السلوك الافتراضي لـ TextBox هو تحديد كل النص عند استقبال التركيز.",
              explanation: "خطأ.",
            },
            {
              q: "How can you open a second form as a modal form from the main form?",
              options: ["Show()", "ShowDialog()", "Open()", "Run()"],
              correct: 1,
              translation: "كيف تفتح نموذجاً ثانياً كنموذج وسيط (Modal)؟",
              explanation: "ShowDialog().",
            },
            {
              q: "The property that determines how a background image is displayed on a form is:",
              options: [
                "BackgroundImageAlignment",
                "BackgroundImageDisplayMode",
                "BackgroundImageLayout",
                "BackgroundImageStyle",
              ],
              correct: 2,
              translation: "الخاصية التي تحدد كيفية عرض صورة الخلفية:",
              explanation: "BackgroundImageLayout.",
            },
            {
              q: "Which method do you use to ensure a control retains focus after an event such as a button click?",
              options: [
                "Control.Focus();",
                "Control.Select();",
                "Control.SetFocus();",
                "Control.GainFocus();",
              ],
              correct: 0,
              translation:
                "أي دالة تستخدم لضمان بقاء التركيز على عنصر بعد حدث مثل النقر؟",
              explanation: "Control.Focus().",
            },
            {
              q: "What will the following code output?\nstring Name = \"hmed\"; Name[0] = 'A'; MessageBox.Show(Name);",
              options: ["Ahmed", "hmed", "A", "Error"],
              correct: 3,
              translation: "ماذا سيكون الناتج؟",
              explanation: "خطأ — النصوص غير قابلة للتغيير (Immutable).",
            },
            {
              q: "A ComboBox can display multiple columns of data simultaneously.",
              options: ["True", "False"],
              correct: 1,
              translation: "ComboBox يمكنه عرض عدة أعمدة في وقت واحد.",
              explanation: "خطأ — عمود واحد فقط.",
            },
          ],
        },
      ],
    },
  ],
});
