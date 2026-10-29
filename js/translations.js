/* =========================================================
   translations.js
   Lightweight English/Arabic language switch for the portfolio.

   - Keeps English as the default language.
   - Saves the selected language in localStorage.
   - Translates existing text nodes without replacing SVG icons.
   - Updates common accessibility attributes and page metadata.
   - Sets the document language and direction for RTL support.
   - Dispatches a language-change event for dynamic components.
========================================================= */

(() => {
  'use strict';

  const STORAGE_KEY = 'portfolio-language';
  const LANGUAGE_EVENT = 'portfolio:languagechange';

  const textTranslations = {
    'About': 'نبذة عني',
    'Projects': 'المشاريع',
    'AI Project': 'مشروع الذكاء الاصطناعي',
    'What I Build': 'ما الذي أستطيع تطويره',
    'Skills': 'المهارات',
    'Training': 'التدريب',
    'Contact': 'تواصل',
    'View CV': 'عرض السيرة الذاتية',
    'Open to Flutter Internships & Junior Roles': 'متاح لفرص تدريب ووظائف Flutter للمبتدئين',
    'Flutter Developer': 'مطور Flutter',
    'Building clean, API-driven mobile apps with Flutter': 'أطوّر تطبيقات موبايل باستخدام Flutter وواجهات API بكود منظم',
    'I build responsive Flutter apps with REST APIs, local storage, state management, and clean project structure.': 'أطوّر تطبيقات Flutter متجاوبة تتكامل مع REST APIs والتخزين المحلي وإدارة الحالة، مع الحفاظ على تنظيم الكود.',
    'View Projects': 'عرض المشاريع',
    'Contact Me': 'تواصل معي',
    'Projects': 'المشاريع',
    'REST API skills: Dio & JSON': 'التعامل مع REST APIs باستخدام Dio وJSON',
    'Cubit / Provider State Management': 'إدارة الحالة باستخدام Cubit وProvider',
    'AI & DS Academic Background': 'خلفية أكاديمية في الذكاء الاصطناعي وعلوم البيانات',
    'Egypt': 'مصر',
    'REST APIs': 'واجهات REST API',
    'CS Fundamentals': 'أساسيات علوم الحاسوب',
    'Email': 'البريد الإلكتروني',
    'Open to Work 🚀': 'متاح لفرص العمل 🚀',
    'Responsive iOS & Android apps with maintainable codebases.': 'تطبيقات iOS وAndroid متجاوبة بكود منظم وسهل الصيانة.',
    'About Me': 'نبذة عني',
    'Building reliable Flutter apps with clean structure and practical features.': 'أطوّر تطبيقات Flutter موثوقة ببنية واضحة وميزات عملية.',
    'I’m a Flutter Developer from Egypt building responsive Flutter apps with REST APIs, local storage, routing, and maintainable feature-based structure. I’m currently training at NTI and looking for Flutter internship or entry-level opportunities where I can contribute to real product features and keep improving through practical work.': 'أنا مطوّر Flutter من مصر، أعمل على بناء تطبيقات متجاوبة تتكامل مع REST APIs والتخزين المحلي والتنقل بين الشاشات، مع تنظيم الكود حسب الميزات لتسهيل صيانته. أتلقى تدريبًا في NTI حاليًا، وأبحث عن فرص تدريب أو وظائف للمبتدئين أستطيع من خلالها المساهمة في تطوير منتجات حقيقية ومواصلة التعلّم بالتطبيق العملي.',
    'Local Storage': 'التخزين المحلي',
    'Clean Structure': 'بنية منظمة',
    'Flutter Developer · Egypt': 'مطور Flutter · مصر',
    'Projects across Flutter & AI': 'مشاريع في Flutter والذكاء الاصطناعي',
    'Training Programs': 'برامج تدريبية',
    'Main Focus: Flutter': 'التركيز الأساسي: Flutter',
    'Education': 'التعليم',
    'Expected Graduation': 'التخرج المتوقع',
    'Degree': 'الدرجة العلمية',
    'B.Sc. in Computers and Information — AI & Data Science Track': 'بكالوريوس الحاسبات والمعلومات — مسار الذكاء الاصطناعي وعلوم البيانات',
    'Faculty / University': 'الكلية / الجامعة',
    'Faculty of Computers and Information, Beni-Suef National University': 'كلية الحاسبات والمعلومات، جامعة بني سويف الأهلية',
    'Code Quality Focus': 'الاهتمام بجودة الكود',
    'Feature-based folder structure': 'تنظيم الملفات حسب الميزات',
    'Reusable widgets': 'Widgets قابلة لإعادة الاستخدام',
    'Clear state handling': 'إدارة واضحة للحالات',
    'API error handling': 'معالجة أخطاء API',
    'Responsive design': 'تصميم متجاوب',
    'Clean and readable code': 'كود منظم وسهل القراءة',
    'GitHub README documentation': 'توثيق المشاريع في README على GitHub',
    'Featured Projects': 'مشاريع مميزة',
    'Clean project cards with full details on demand.': 'بطاقات مختصرة للمشاريع مع تفاصيل كاملة عند الطلب.',
    'Compact cards for fast scanning, with detailed case-study information available inside responsive project modals.': 'بطاقات سهلة التصفح، مع تفاصيل كل مشروع داخل نوافذ منبثقة متجاوبة.',
    'View Details': 'عرض التفاصيل',
    'Business Management': 'إدارة الأعمال',
    'Android & Web': 'Android والويب',
    'Arabic / English': 'العربية / الإنجليزية',
    'A Flutter app for small shops to manage products, inventory, sales invoices, customers, and outstanding balances across mobile and web.': 'تطبيق Flutter للمحلات الصغيرة لإدارة المنتجات والمخزون وفواتير البيع والعملاء والمبالغ المستحقة، على الموبايل والويب.',
    'Functional App': 'تطبيق وظيفي',
    'Completed': 'مكتمل',
    'Full-featured e-commerce app with authentication, product browsing, cart, and favorites.': 'تطبيق تجارة إلكترونية يضم تسجيل الدخول وتصفح المنتجات وسلة التسوق والمفضلة.',
    'Demo Video': 'فيديو توضيحي',
    'API Integrated': 'متصل بواجهة API',
    'Live news app with search, categories, article details, and localization.': 'تطبيق أخبار يعرض الأخبار مباشرة، مع البحث والتصنيفات وتفاصيل المقالات ودعم اللغتين.',
    'View All Repositories': 'عرض جميع المستودعات',
    'AI Projects': 'مشاريع الذكاء الاصطناعي',
    'AI and Data Science work, presented with the same project-card system.': 'مشاريع الذكاء الاصطناعي وعلوم البيانات، معروضة بنفس أسلوب بطاقات المشاريع.',
    'Compact AI project cards for quick scanning, with full Reinforcement Learning details available inside the responsive modal.': 'بطاقة مختصرة للمشروع، مع تفاصيل التعلّم المعزّز داخل نافذة منبثقة متجاوبة.',
    'Reinforcement Learning': 'التعلّم المعزّز',
    'Playable': 'قابل للعب',
    'Grid World Q-Learning Game': 'لعبة Grid World باستخدام Q-Learning',
    'Interactive Q-Learning game where an agent learns to reach a goal while avoiding fire cells.': 'لعبة تفاعلية يتعلّم فيها الوكيل الوصول إلى الهدف وتجنّب الخلايا المشتعلة باستخدام Q-Learning.',
    'Try Game': 'جرّب اللعبة',
    'What I Can Build': 'ما الذي أستطيع تطويره',
    'Mobile features for real products.': 'ميزات موبايل لمنتجات حقيقية.',
    'Clean Flutter screens and app flows ready to connect with APIs, local storage, and production-style structure.': 'شاشات ومسارات استخدام منظمة بتقنية Flutter، جاهزة للربط بواجهات API والتخزين المحلي وبنية مناسبة للتطبيقات الفعلية.',
    'API-Based Flutter Apps': 'تطبيقات Flutter تعتمد على API',
    'Mobile apps connected to REST APIs with Dio, JSON parsing, loading states, and error handling.': 'تطبيقات موبايل متصلة بـ REST APIs باستخدام Dio، مع تحليل JSON وحالات التحميل ومعالجة الأخطاء.',
    '→ See: News App': '← شاهد: News App',
    'Storage': 'التخزين',
    'Local Storage Apps': 'تطبيقات تعتمد على التخزين المحلي',
    'Offline-friendly features using SQLite and SharedPreferences for app data and user preferences.': 'ميزات تعمل دون اتصال دائم بالإنترنت باستخدام SQLite وSharedPreferences لتخزين بيانات التطبيق وتفضيلات المستخدم.',
    'Auth': 'المصادقة',
    'Auth & Onboarding Flows': 'مسارات تسجيل الدخول والتهيئة',
    'Login, register, onboarding, OTP UI, validation, and clean user journey screens.': 'شاشات تسجيل الدخول وإنشاء الحساب والتهيئة ورمز OTP والتحقق من البيانات، ضمن تجربة استخدام واضحة.',
    '→ See: Shopino': '← شاهد: Shopino',
    'Tasks': 'المهام',
    'Admin / User Task Apps': 'تطبيقات مهام للمشرف والمستخدم',
    'Role-based screens for admins, users, teams, tasks, dashboards, and workflow management.': 'شاشات حسب الصلاحيات للمشرفين والمستخدمين والفرق، مع المهام ولوحات المعلومات وإدارة سير العمل.',
    'UI': 'الواجهات',
    'Responsive UI from Figma': 'واجهات متجاوبة من Figma',
    'Modern mobile screens converted from designs into responsive Flutter layouts and reusable widgets.': 'تحويل التصميمات إلى واجهات Flutter متجاوبة ومكوّنات قابلة لإعادة الاستخدام.',
    'Technical Skills': 'المهارات التقنية',
    'Grouped for quick scanning.': 'مصنّفة لتسهيل مراجعتها بسرعة.',
    'Skills I use across Flutter projects, APIs, local storage, UI implementation, and AI/Data Science basics.': 'المهارات التي أستخدمها في مشاريع Flutter وواجهات API والتخزين المحلي وتنفيذ الواجهات وأساسيات الذكاء الاصطناعي وعلوم البيانات.',
    'Flutter Core': 'أساسيات Flutter',
    'Responsive UI': 'واجهات متجاوبة',
    'Animations': 'الحركات والانتقالات',
    'Custom Widgets': 'Widgets مخصصة',
    'State Management': 'إدارة الحالة',
    'CS': 'علوم الحاسوب',
    'DSA': 'هياكل البيانات والخوارزميات',
    'Database': 'قواعد البيانات',
    'OS': 'أنظمة التشغيل',
    'APIs & Storage': 'واجهات API والتخزين',
    'Error Handling': 'معالجة الأخطاء',
    'Code Quality': 'جودة الكود',
    'SOLID Basics': 'أساسيات SOLID',
    'Clean Architecture Basics': 'أساسيات Clean Architecture',
    'Feature-based Structure': 'بنية قائمة على الميزات',
    'Tools': 'الأدوات',
    'AI & Data Basics': 'أساسيات الذكاء الاصطناعي والبيانات',
    'Machine Learning Basics': 'أساسيات تعلّم الآلة',
    'Q-Learning Basics': 'أساسيات Q-Learning',
    'Training & Certifications': 'التدريب والشهادات',
    'Hands-on learning behind my Flutter path.': 'خبرات عملية دعمت رحلتي في Flutter.',
    'Training programs and courses focused on practical mobile development, teamwork, and project delivery.': 'برامج تدريبية ودورات ركّزت على تطوير تطبيقات الموبايل عمليًا والعمل الجماعي وتسليم المشاريع.',
    'Jul 2026 — Aug': 'يوليو ٢٠٢٦ — أغسطس',
    'Flutter Developer Trainee — ITI': 'متدرب تطوير Flutter — ITI',
    'Completed an online training program at ITI focused on mobile application development. Gained practical experience in Flutter and Dart, applying core concepts to mobile development. Strengthened programming skills and developed a solid understanding of mobile app development practices.': 'أكملت برنامجًا تدريبيًا عبر الإنترنت في ITI يركّز على تطوير تطبيقات الموبايل. اكتسبت خبرة عملية في Flutter وDart من خلال تطبيق المفاهيم الأساسية، وطوّرت مهارات البرمجة وفهمًا أفضل لممارسات تطوير التطبيقات.',
    'View Certificate': 'عرض الشهادة',
    'Mar 2026 — Jun': 'مارس ٢٠٢٦ — يونيو',
    'Flutter Developer Trainee — NTI': 'متدرب تطوير Flutter — NTI',
    'Intensive training covering Dart, OOP, Flutter, Clean Architecture, SOLID principles, Dio, local storage, and animations.': 'تدريب مكثف تناول Dart والبرمجة كائنية التوجه وFlutter وClean Architecture ومبادئ SOLID وDio والتخزين المحلي والحركات.',
    'Mobile Development Bootcamp — Sprints × Microsoft': 'معسكر تطوير تطبيقات الموبايل — Sprints × Microsoft',
    'Practical mobile development program focused on teamwork, implementation, code reviews, and real project delivery.': 'برنامج عملي لتطوير تطبيقات الموبايل ركّز على العمل الجماعي والتنفيذ ومراجعة الكود وتسليم مشاريع فعلية.',
    'Flutter & Dart Course — Udemy': 'دورة Flutter وDart — Udemy',
    'Structured learning covering UI development, navigation, REST API integration, and project-based Flutter practice.': 'مسار تعلّم منظم تناول تطوير الواجهات والتنقل بين الشاشات والتكامل مع REST APIs والتطبيق العملي باستخدام Flutter.',
    'Let’s Work Together': 'لنعمل معًا',
    'Have a Flutter role, internship opportunity, or freelance project?': 'هل لديك وظيفة أو فرصة تدريب في Flutter أو مشروع للعمل الحر؟',
    'Available for Flutter internships, junior roles, and small freelance mobile app projects.': 'متاح لفرص تدريب Flutter والوظائف للمبتدئين ومشاريع الموبايل الصغيرة للعمل الحر.',
    'Email Directly': 'راسلني بالبريد الإلكتروني',
    'WhatsApp': 'واتساب',
    'Name': 'الاسم',
    'Message': 'الرسالة',
    'Send via Email': 'إرسال بالبريد الإلكتروني',
    'Send via WhatsApp': 'إرسال عبر واتساب',
    'Choose Email to send the message through the contact form, or WhatsApp to open a ready message directly.': 'اختر البريد الإلكتروني لإرسال الرسالة عبر النموذج، أو واتساب لفتح رسالة جاهزة مباشرة.',
    '© 2026 Rimon Abdelmasih · Junior Flutter Developer · Egypt': '© 2026 Rimon Abdelmasih · مطور Flutter مبتدئ · مصر',
    'Back to top': 'العودة إلى الأعلى'
  };

  const attributeTranslations = {
    'Primary navigation': 'التنقل الرئيسي',
    'Rimon home': 'الصفحة الرئيسية - Rimon.dev',
    'Toggle color theme': 'تغيير المظهر',
    'Open menu': 'فتح القائمة',
    'Quick achievements': 'إنجازات سريعة',
    'Core details': 'التقنيات الأساسية',
    'Photo of Rimon Abdelmasih': 'صورة ريمون عبد المسيح',
    'Flutter project previews': 'معاينات مشاريع Flutter',
    'App screenshots': 'لقطات من التطبيقات',
    'Open Masiter project details': 'فتح تفاصيل مشروع مسيطر',
    'Masiter tech stack': 'التقنيات المستخدمة في مسيطر',
    'Open Shopino project details': 'فتح تفاصيل مشروع Shopino',
    'Shopino tech stack': 'التقنيات المستخدمة في Shopino',
    'Open News App project details': 'فتح تفاصيل News App',
    'News App tech stack': 'التقنيات المستخدمة في News App',
    'Close project details': 'إغلاق تفاصيل المشروع',
    'Project tech stack': 'التقنيات المستخدمة في المشروع',
    'Open Grid World Q-Learning Game project details': 'فتح تفاصيل لعبة Grid World باستخدام Q-Learning',
    'Grid World AI concepts and tech stack': 'مفاهيم الذكاء الاصطناعي والتقنيات المستخدمة في Grid World',
    'View Sprints Microsoft certificate': 'عرض شهادة Sprints وMicrosoft',
    'View Udemy Flutter and Dart certificate': 'عرض شهادة Flutter وDart من Udemy',
    'Choose how to send your message': 'اختر طريقة إرسال رسالتك',
    'Your name': 'اسمك',
    'Tell me about the role, internship, or project...': 'اكتب تفاصيل الوظيفة أو التدريب أو المشروع...',
    'Masiter business management application collage': 'مجموعة صور من تطبيق مسيطر لإدارة الأعمال',
    'Shopino project preview': 'معاينة مشروع Shopino',
    'News App project preview': 'معاينة مشروع News App',
    'Grid World Q-Learning Game cover showing agent, fire cells, and goal': 'غلاف لعبة Grid World باستخدام Q-Learning، ويعرض الوكيل وخلايا النار والهدف',
    'Shopino App preview': 'معاينة تطبيق Shopino',
    'Masiter App preview': 'معاينة تطبيق مسيطر',
    'News App preview': 'معاينة تطبيق News App',
    'Sprints and Microsoft Mobile Development Bootcamp certificate preview': 'معاينة شهادة معسكر تطوير الموبايل من Sprints وMicrosoft',
    'Udemy Flutter and Dart course certificate preview': 'معاينة شهادة دورة Flutter وDart من Udemy'
  };

  const htmlMeta = {
    title: {
      en: 'Rimon Abdelmasih | Flutter Developer Portfolio',
      ar: 'Rimon Abdelmasih | مطور Flutter'
    },
    description: {
      en: 'Rimon Abdelmasih portfolio — Flutter Developer building clean, API-driven mobile apps with Flutter, Dart, REST APIs, local storage, and modern UI.',
      ar: 'معرض أعمال Rimon Abdelmasih — مطور Flutter يبني تطبيقات موبايل منظمة باستخدام Flutter وDart وREST APIs والتخزين المحلي وواجهات حديثة.'
    },
    ogDescription: {
      en: 'Flutter Developer portfolio with practical mobile apps, REST API integration, local storage, state management, and AI/Data Science background.',
      ar: 'معرض أعمال مطور Flutter يضم تطبيقات موبايل عملية وتكامل REST APIs والتخزين المحلي وإدارة الحالة وخلفية أكاديمية في الذكاء الاصطناعي وعلوم البيانات.'
    },
    twitterDescription: {
      en: 'Flutter portfolio with practical mobile apps, API integration, local storage, and AI/Data Science background.',
      ar: 'معرض أعمال Flutter يضم تطبيقات موبايل عملية وتكامل API والتخزين المحلي وخلفية في الذكاء الاصطناعي وعلوم البيانات.'
    }
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let currentLanguage = 'en';
  let observer = null;

  function normalize(value) {
    return String(value ?? '').replace(/\s+/g, ' ').trim();
  }

  function getStoredLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'ar' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  }

  function rememberTextNodes(container = document.body) {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (parent.closest('script, style, noscript, svg, textarea, input')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    }
  }

  function getOriginalAttribute(element, name) {
    let attributes = originalAttributes.get(element);
    if (!attributes) {
      attributes = new Map();
      originalAttributes.set(element, attributes);
    }
    if (!attributes.has(name)) attributes.set(name, element.getAttribute(name));
    return attributes.get(name);
  }

  function applyTextTranslations(language) {
    rememberTextNodes();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalText.has(node)) continue;

      const sourceValue = originalText.get(node);
      const sourcePhrase = normalize(sourceValue);
      const arabic = textTranslations[sourcePhrase];

      if (language === 'ar' && arabic) {
        const leading = sourceValue.match(/^\s*/)?.[0] || '';
        const trailing = sourceValue.match(/\s*$/)?.[0] || '';
        node.nodeValue = `${leading}${arabic}${trailing}`;
      } else {
        node.nodeValue = sourceValue;
      }
    }
  }

  function applyAttributeTranslations(language) {
    const selector = '[aria-label], [placeholder], [alt], [title]';

    document.querySelectorAll(selector).forEach((element) => {
      ['aria-label', 'placeholder', 'alt', 'title'].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;

        const original = getOriginalAttribute(element, attribute);
        const translated = attributeTranslations[original];

        if (language === 'ar' && translated) {
          element.setAttribute(attribute, translated);
        } else if (original != null) {
          element.setAttribute(attribute, original);
        }
      });
    });
  }

  function applyMetadata(language) {
    document.title = htmlMeta.title[language];

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', htmlMeta.description[language]);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', htmlMeta.ogDescription[language]);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', htmlMeta.twitterDescription[language]);
  }

  function syncLanguageButton(language) {
    const button = document.getElementById('languageToggle');
    if (!button) return;

    const targetLanguage = language === 'ar' ? 'en' : 'ar';
    button.textContent = targetLanguage === 'ar' ? 'العربية' : 'English';
    button.setAttribute(
      'aria-label',
      targetLanguage === 'ar' ? 'Switch language to Arabic' : 'التبديل إلى اللغة الإنجليزية'
    );
    button.setAttribute('lang', targetLanguage);
    button.setAttribute('aria-pressed', String(language === 'ar'));
  }

  function setLanguage(language, options = {}) {
    const nextLanguage = language === 'ar' ? 'ar' : 'en';
    currentLanguage = nextLanguage;

    document.documentElement.setAttribute('lang', nextLanguage);
    document.documentElement.setAttribute('dir', nextLanguage === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('data-language', nextLanguage);

    applyTextTranslations(nextLanguage);
    applyAttributeTranslations(nextLanguage);
    applyMetadata(nextLanguage);
    syncLanguageButton(nextLanguage);

    if (options.persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, nextLanguage);
      } catch {
        /* The selected language still works for the current page session. */
      }
    }

    document.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, {
      detail: { language: nextLanguage }
    }));
  }

  function translateText(text, language = currentLanguage) {
    const source = normalize(text);
    if (language === 'ar') return textTranslations[source] || text;
    return text;
  }

  function initialize() {
    rememberTextNodes();
    currentLanguage = getStoredLanguage();
    setLanguage(currentLanguage, { persist: false });

    const button = document.getElementById('languageToggle');
    button?.addEventListener('click', () => {
      setLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
    });

    // Translate future text nodes inserted by components without removing their icons.
    observer = new MutationObserver((records) => {
      const hasNewContent = records.some((record) => record.addedNodes.length > 0);
      if (!hasNewContent || currentLanguage !== 'ar') return;

      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            rememberTextNodes(node);
          }
        });
      });

      // Run once after the new nodes have been registered.
      applyTextTranslations('ar');
      applyAttributeTranslations('ar');
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.portfolioI18n = {
    setLanguage,
    getLanguage: () => currentLanguage,
    translateText,
    languageChangeEvent: LANGUAGE_EVENT
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
