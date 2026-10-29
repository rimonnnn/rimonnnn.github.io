/* =========================================================
   projects-data.js
   Project details displayed in the project modal.

   Must load BEFORE project-modal.js.

   English is the default content. Arabic content lives inside
   each project's translations.ar object. Keep technology names
   and URLs unchanged unless a genuine localized label is needed.
========================================================= */

window.projectDetails = {

  /* =======================================================
     MASITER
  ======================================================= */

  masiter: {
    label: 'Business Management · Mobile & Web',
    title: 'Masiter | مسيطر',
    image: 'assets/masiter.jpeg',
    imageAlt: 'Masiter business management application collage.',

    overview:
      'Masiter is a Flutter business management application for shops and small businesses. It brings product inventory, customer records, outstanding balances, and sales invoices into one application, with support for mobile and web, Arabic and English, and light and dark themes.',

    purpose:
      'Build a practical business management tool that helps shop owners organize inventory, customer balances, and invoices through a clear interface.',

    role:
      'Contributed to developing the Flutter application with a teammate, working on the user interface, state management, data integration, and core business workflows.',

    features: [
      'Product and inventory management',
      'Customer records and outstanding balances',
      'Sales invoices and purchase history',
      'Invoice layouts for 58mm, 80mm, and A4 formats',
      'Low-stock notifications',
      'Morning reminders for outstanding receivables',
      'Shared business data and account access',
      'Arabic and English localization',
      'Light and dark themes',
      'Mobile and web support'
    ],

    technical: [
      'Flutter and Dart for cross-platform development',
      'Cubit / Bloc for state management',
      'Firebase Authentication for account access',
      'Cloud Firestore for business data',
      'Supabase for product image storage',
      'GetIt for dependency injection',
      'GoRouter for navigation',
      'Easy Localization for Arabic and English',
      'SharedPreferences for local preferences',
      'Responsive layouts for mobile and web'
    ],

    challenges:
      'Organizing products, customers, invoices, and outstanding balances into maintainable workflows while supporting shared business data and consistent experiences across mobile and web.',

    tech: [
      'Flutter',
      'Dart',
      'Cubit',
      'Bloc',
      'Firebase Auth',
      'Cloud Firestore',
      'Supabase',
      'GetIt',
      'GoRouter',
      'Easy Localization',
      'SharedPreferences',
      'Responsive UI'
    ],

    links: [
      {
        label: 'Live Web App',
        url: 'https://masiter.web.app/',
        primary: true,
        type: 'live'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/rimonnnn/masiter',
        type: 'github'
      }
    ],

    translations: {
      ar: {
        label: 'إدارة الأعمال · الموبايل والويب',
        title: 'مسيطر | Masiter',
        imageAlt: 'مجموعة صور من تطبيق مسيطر لإدارة الأعمال.',

        overview:
          'مسيطر هو تطبيق لإدارة الأعمال والمحلات الصغيرة باستخدام Flutter. يجمع إدارة المنتجات والمخزون والعملاء والأرصدة المستحقة وفواتير البيع في تطبيق واحد، مع دعم الموبايل والويب واللغتين العربية والإنجليزية والمظهرين الفاتح والداكن.',

        purpose:
          'تطوير أداة عملية تساعد أصحاب المحلات على تنظيم المخزون وأرصدة العملاء والفواتير من خلال واجهة واضحة.',

        role:
          'ساهمت في تطوير التطبيق بالتعاون مع أحد زملائي، من خلال العمل على واجهات المستخدم وإدارة الحالة والتكامل مع البيانات ومسارات العمل الأساسية.',

        features: [
          'إدارة المنتجات والمخزون',
          'سجلات العملاء والأرصدة المستحقة',
          'فواتير البيع وسجل المشتريات',
          'تنسيقات الفواتير بمقاسات 58mm و80mm وA4',
          'إشعارات انخفاض المخزون',
          'تذكيرات صباحية بالمبالغ المستحقة',
          'مشاركة بيانات النشاط التجاري وإتاحة الوصول للحساب',
          'دعم اللغتين العربية والإنجليزية',
          'المظهر الفاتح والداكن',
          'دعم الموبايل والويب'
        ],

        technical: [
          'استخدام Flutter وDart لتطوير التطبيق على أكثر من منصة',
          'إدارة الحالة باستخدام Cubit / Bloc',
          'Firebase Authentication لإدارة الوصول إلى الحسابات',
          'Cloud Firestore لتخزين بيانات النشاط التجاري',
          'Supabase لتخزين صور المنتجات',
          'GetIt لحقن الاعتماديات (Dependency Injection)',
          'GoRouter للتنقل بين الشاشات',
          'Easy Localization لدعم العربية والإنجليزية',
          'SharedPreferences لحفظ التفضيلات المحلية',
          'واجهات متجاوبة للموبايل والويب'
        ],

        challenges:
          'تنظيم المنتجات والعملاء والفواتير والأرصدة المستحقة ضمن مسارات عمل سهلة الصيانة، مع دعم مشاركة بيانات النشاط التجاري وتقديم تجربة متناسقة على الموبايل والويب.',

        links: [
          {
            label: 'التطبيق المباشر',
            url: 'https://masiter.web.app/',
            primary: true,
            type: 'live'
          },
          {
            label: 'GitHub',
            url: 'https://github.com/rimonnnn/masiter',
            type: 'github'
          }
        ]
      }
    }
  },


  /* =======================================================
     SHOPINO
  ======================================================= */

  shopino: {
    label: 'Functional App · Completed · Clean Architecture',
    title: 'Shopino',
    image: 'assets/shopino.jpeg',
    imageAlt: 'Shopino app preview showing product browsing, cart, and favorites.',

    overview:
      'A production-style Flutter e-commerce app covering authentication, product browsing, cart, and favorites, built with Clean Architecture, Cubit/Bloc, and full API integration.',

    purpose:
      'Build a realistic shopping app flow that demonstrates product browsing, user actions, session handling, and API-driven screens end to end.',

    role:
      'Designed and implemented the full app structure, authentication flow, API layer, state management, product modules, cart logic, and local session handling.',

    features: [
      'Authentication flow (login/signup)',
      'Product listing',
      'Product details with image gallery',
      'Cart management',
      'Favorites',
      'Local token storage',
      'API-driven screens'
    ],

    technical: [
      'Clean Architecture (data/domain/presentation)',
      'Cubit/Bloc state management',
      'Dio for REST APIs',
      'dartz Either for error handling',
      'GetIt for dependency injection',
      'GoRouter for navigation',
      'Local storage for auth/session data'
    ],

    challenges:
      'Kept the architecture layered and testable while resolving real-world issues like GoRouter/BLoC navigation bugs, duplicate GlobalKey errors, and secure token storage across login/signup/logout flows.',

    tech: [
      'Flutter',
      'Dart',
      'Cubit/Bloc',
      'Dio',
      'GoRouter',
      'GetIt',
      'Clean Architecture',
      'REST APIs'
    ],

    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rimonnnn/shopino_store',
        primary: true
      },
      {
        label: 'Demo Video',
        url: 'https://drive.google.com/file/d/1hLKaIuwPIpzSWSK5bf1QOYVSc8mJMEfF/view?usp=drivesdk'
      }
    ],

    translations: {
      ar: {
        label: 'تطبيق متكامل · مكتمل · Clean Architecture',
        title: 'Shopino',
        imageAlt: 'معاينة تطبيق Shopino وتصفح المنتجات وسلة التسوق والمفضلة.',

        overview:
          'تطبيق تجارة إلكترونية باستخدام Flutter يضم تسجيل الدخول، وتصفح المنتجات، وسلة التسوق، والمفضلة. يعتمد على Clean Architecture وإدارة الحالة باستخدام Cubit/Bloc والتكامل مع واجهات API.',

        purpose:
          'بناء تجربة تسوق متكاملة توضّح كيفية تصفح المنتجات وتنفيذ إجراءات المستخدم وإدارة الجلسة وربط الشاشات بواجهات API.',

        role:
          'صممت ونفذت بنية التطبيق، وتدفّق المصادقة، وطبقة الاتصال بالـ API، وإدارة الحالة، ووحدات المنتجات، ومنطق سلة التسوق، وحفظ بيانات الجلسة محليًا.',

        features: [
          'تسجيل الدخول وإنشاء الحساب',
          'عرض المنتجات',
          'تفاصيل المنتجات مع معرض للصور',
          'إدارة سلة التسوق',
          'إدارة المنتجات المفضلة',
          'حفظ رمز المصادقة محليًا',
          'شاشات تعتمد على بيانات API'
        ],

        technical: [
          'Clean Architecture بطبقات data وdomain وpresentation',
          'إدارة الحالة باستخدام Cubit/Bloc',
          'Dio للتعامل مع REST APIs',
          'dartz Either لمعالجة الأخطاء',
          'GetIt لحقن الاعتماديات (Dependency Injection)',
          'GoRouter للتنقل بين الشاشات',
          'التخزين المحلي لبيانات المصادقة والجلسة'
        ],

        challenges:
          'الحفاظ على بنية مقسمة إلى طبقات وقابلة للاختبار، مع معالجة مشكلات عملية مثل أخطاء التنقل المرتبطة بـ GoRouter وBLoC، وتكرار GlobalKey، والتخزين الآمن لرموز المصادقة أثناء تسجيل الدخول والخروج وإنشاء الحساب.',

        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/rimonnnn/shopino_store',
            primary: true
          },
          {
            label: 'فيديو توضيحي',
            url: 'https://drive.google.com/file/d/1hLKaIuwPIpzSWSK5bf1QOYVSc8mJMEfF/view?usp=drivesdk'
          }
        ]
      }
    }
  },


  /* =======================================================
     NEWS APP
  ======================================================= */

  news: {
    label: 'Functional App · Completed · API Integrated',
    title: 'News App',
    image: 'assets/news_app.jpeg',
    imageAlt: 'News App collage showing the home feed, search, categories, and article details.',

    overview:
      'A live news Flutter app for browsing headlines through API data, with search, categories, article details, localization, and clear loading/error handling.',

    purpose:
      'Build an API-based Flutter app that demonstrates real content fetching, category filtering, search, article details, and localization.',

    role:
      'Built the UI, integrated NewsAPI with Dio, managed Cubit states, implemented routing, localization, and reusable widgets.',

    features: [
      'Live API headlines',
      'Search flow',
      'News categories',
      'Article details screen',
      'Arabic/English localization',
      'Loading and error states'
    ],

    technical: [
      'Dio for REST API requests',
      'Cubit/Bloc for state management',
      'GoRouter for navigation',
      'Easy Localization for multilingual support',
      'Cached Network Image for network images',
      'ScreenUtil for responsive sizing'
    ],

    challenges:
      'Handled API loading, empty results, and error states clearly so the user experience stays understandable instead of showing broken screens.',

    tech: [
      'Flutter',
      'Dart',
      'Cubit',
      'Bloc',
      'Dio',
      'NewsAPI',
      'GoRouter',
      'Easy Localization',
      'Cached Network Image',
      'ScreenUtil'
    ],

    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rimonnnn/news_app',
        primary: true
      },
      {
        label: 'Demo Video',
        url: 'https://drive.google.com/file/d/1yh2RKrWxusozg1gjavGbvnTWAoYrISUx/view?usp=drive_link'
      }
    ],

    translations: {
      ar: {
        label: 'تطبيق متكامل · مكتمل · متصل بواجهة API',
        title: 'News App',
        imageAlt: 'مجموعة صور من تطبيق الأخبار تعرض الصفحة الرئيسية والبحث والتصنيفات وتفاصيل المقالات.',

        overview:
          'تطبيق أخبار باستخدام Flutter يعرض العناوين من خلال API، ويتيح البحث والتصفح حسب التصنيفات وفتح تفاصيل المقالات، مع دعم تعدد اللغات ومعالجة واضحة لحالات التحميل والأخطاء.',

        purpose:
          'إنشاء تطبيق يعتمد على API لعرض جلب البيانات فعليًا، والتصفية حسب التصنيفات، والبحث، وعرض تفاصيل المقالات، ودعم تعدد اللغات.',

        role:
          'نفذت واجهات المستخدم، ودمجت NewsAPI باستخدام Dio، وأدرت الحالات باستخدام Cubit، وطبقت التنقل ودعم اللغات والـ Widgets القابلة لإعادة الاستخدام.',

        features: [
          'عرض الأخبار والعناوين من API',
          'البحث عن الأخبار',
          'تصنيفات الأخبار',
          'شاشة تفاصيل المقال',
          'دعم اللغتين العربية والإنجليزية',
          'حالات التحميل والأخطاء'
        ],

        technical: [
          'Dio لإرسال طلبات REST API',
          'Cubit/Bloc لإدارة الحالة',
          'GoRouter للتنقل بين الشاشات',
          'Easy Localization لدعم تعدد اللغات',
          'Cached Network Image لعرض الصور من الإنترنت',
          'ScreenUtil لتنسيق الواجهات حسب حجم الشاشة'
        ],

        challenges:
          'معالجة حالات تحميل البيانات وعدم وجود نتائج والأخطاء بطريقة واضحة، حتى تظل تجربة الاستخدام مفهومة بدلًا من عرض شاشات معطلة.',

        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/rimonnnn/news_app',
            primary: true
          },
          {
            label: 'فيديو توضيحي',
            url: 'https://drive.google.com/file/d/1yh2RKrWxusozg1gjavGbvnTWAoYrISUx/view?usp=drive_link'
          }
        ]
      }
    }
  },


  /* =======================================================
     GRID WORLD Q-LEARNING GAME
  ======================================================= */

  gridworld: {
    label: 'AI Project · Reinforcement Learning · Q-Learning',
    title: 'Grid World Q-Learning Game',
    image: './assets/grid_world_game.png',
    fallbackImage: 'assets/grid_world_game.png',
    imageAlt: 'Grid World Q-Learning Game cover showing the agent, fire cells, and goal.',

    overview:
      'An interactive Python/Tkinter game demonstrating Q-Learning where an agent learns to reach a goal while avoiding fire cells using rewards, penalties, exploration, and a Q-table.',

    purpose:
      'Show reinforcement learning basics through a visual grid environment where decisions improve over time based on Q-values and reward feedback.',

    role:
      'Built the grid environment, movement rules, reward system, Q-table storage, learning flow, Tkinter interface, and playable web version.',

    features: [
      'Agent movement inside a grid',
      'Start, goal, and fire cells',
      'Reward and penalty system',
      'Q-table learning',
      'JSON persistence',
      'Playable web version'
    ],

    aiConcepts: [
      'Reinforcement Learning',
      'Q-Learning',
      'Q-table',
      'Rewards and penalties',
      'Exploration vs exploitation',
      'State-action values'
    ],

    technical: [
      'Q-Learning update logic',
      'Grid environment design',
      'Reward shaping',
      'Tkinter UI for visualization',
      'JSON storage for learned Q-values',
      'Web version for portfolio interaction'
    ],

    challenges:
      'The main challenge was making the learning process understandable visually, not just mathematically. The solution was to keep the grid simple, show clear states, and connect actions with rewards, penalties, and saved Q-values.',

    tech: [
      'Python',
      'Reinforcement Learning',
      'Q-Learning',
      'Tkinter',
      'JSON',
      'HTML',
      'CSS',
      'JavaScript'
    ],

    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/rimonnnn/grid_world_game.git',
        primary: true
      },
      {
        label: 'Try Game',
        url: 'grid_world_game/index.html',
        type: 'game'
      }
    ],

    translations: {
      ar: {
        label: 'مشروع ذكاء اصطناعي · التعلّم المعزّز · Q-Learning',
        title: 'لعبة Grid World باستخدام Q-Learning',
        imageAlt: 'غلاف لعبة Grid World باستخدام Q-Learning، ويعرض الوكيل وخلايا النار والهدف.',

        overview:
          'لعبة تفاعلية باستخدام Python وTkinter توضّح خوارزمية Q-Learning؛ يتعلّم فيها وكيل الوصول إلى الهدف وتجنّب خلايا النار باستخدام المكافآت والعقوبات والاستكشاف وجدول Q.',

        purpose:
          'شرح أساسيات التعلّم المعزّز من خلال بيئة شبكية مرئية تتحسن فيها القرارات بمرور الوقت اعتمادًا على قيم Q والمكافآت الناتجة عن الأفعال.',

        role:
          'أنشأت بيئة الشبكة وقواعد الحركة ونظام المكافآت وتخزين جدول Q وآلية التعلّم وواجهة Tkinter، بالإضافة إلى نسخة ويب قابلة للعب.',

        features: [
          'تحريك الوكيل داخل شبكة',
          'تحديد نقطة البداية والهدف وخلايا النار',
          'نظام للمكافآت والعقوبات',
          'التعلّم باستخدام جدول Q',
          'حفظ البيانات باستخدام JSON',
          'نسخة ويب قابلة للعب'
        ],

        aiConcepts: [
          'التعلّم المعزّز (Reinforcement Learning)',
          'خوارزمية Q-Learning',
          'جدول Q (Q-table)',
          'المكافآت والعقوبات',
          'الموازنة بين الاستكشاف والاستغلال',
          'قيم الحالة والفعل'
        ],

        technical: [
          'منطق تحديث قيم Q-Learning',
          'تصميم بيئة شبكية',
          'تشكيل المكافآت (Reward Shaping)',
          'واجهة Tkinter لعرض التعلّم بصريًا',
          'حفظ قيم Q المتعلّمة باستخدام JSON',
          'نسخة ويب تفاعلية للمحفظة الشخصية'
        ],

        challenges:
          'كان التحدي الأساسي جعل عملية التعلّم مفهومة بصريًا، وليس رياضيًا فقط. لذلك صُممت الشبكة بشكل بسيط مع عرض الحالات بوضوح وربط الأفعال بالمكافآت والعقوبات وقيم Q المحفوظة.',

        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/rimonnnn/grid_world_game.git',
            primary: true
          },
          {
            label: 'جرّب اللعبة',
            url: 'grid_world_game/index.html',
            type: 'game'
          }
        ]
      }
    }
  }

};