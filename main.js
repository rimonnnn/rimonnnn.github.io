/* =========================================================
   main.js
   All DOM logic, theme syncing, navigation, reveal animations,
   counters, contact form handling, and the project modal system.
   Wrapped in DOMContentLoaded so it is safe regardless of where
   the script tag is placed / loaded (defer).
   NOTE: initial theme attribute is set by a tiny blocking inline
   script in index.html (placed first inside <body>) to avoid a
   flash-of-wrong-theme. This file only keeps the toggle UI in sync
   and handles the click interaction.
========================================================= */

/* ---------------------------------------------------------
   SHARED IMAGE FALLBACK HELPER
   Attach once globally so inline onerror="" handlers in the
   HTML can all call the same function instead of repeating
   the same two lines on every <img> tag.
--------------------------------------------------------- */
window.handleImgError = function handleImgError(imgEl, fallbackSrc) {
  imgEl.onerror = null;
  imgEl.src = fallbackSrc;
};

document.addEventListener('DOMContentLoaded', () => {
  const rootBody = document.body;

  /* ---------------------------------------------------------
     THEME TOGGLE
  --------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');

  function syncThemeToggleUI(theme) {
    if (!themeToggle) return;
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    if (icon) icon.textContent = isLight ? '☀' : '☾';
  }

  // Sync the toggle button's visual state with whatever the
  // pre-paint inline script already applied to <body data-theme="...">
  syncThemeToggleUI(rootBody.getAttribute('data-theme') || 'dark');

  themeToggle?.addEventListener('click', () => {
    const nextTheme = rootBody.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (e) { /* localStorage unavailable */ }
    rootBody.setAttribute('data-theme', nextTheme);
    syncThemeToggleUI(nextTheme);
  });

  /* ---------------------------------------------------------
     MOBILE NAV MENU
  --------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     REDUCED MOTION PREFERENCE
  --------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     TYPEWRITER ROLE EFFECT
  --------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriterRole');
  const typewriterRoles = ['Flutter Developer', 'Mobile App Builder', 'REST API Integrator'];
  let typewriterRoleIndex = 0;
  let typewriterCharIndex = 0;
  let typewriterDeleting = false;

  function runTypewriter() {
    if (!typewriterElement || prefersReducedMotion) return;
    const currentRole = typewriterRoles[typewriterRoleIndex];
    typewriterElement.textContent = currentRole.slice(0, typewriterCharIndex);

    if (!typewriterDeleting && typewriterCharIndex < currentRole.length) {
      typewriterCharIndex += 1;
      window.setTimeout(runTypewriter, 78);
      return;
    }

    if (!typewriterDeleting && typewriterCharIndex === currentRole.length) {
      typewriterDeleting = true;
      window.setTimeout(runTypewriter, 1200);
      return;
    }

    if (typewriterDeleting && typewriterCharIndex > 0) {
      typewriterCharIndex -= 1;
      window.setTimeout(runTypewriter, 38);
      return;
    }

    typewriterDeleting = false;
    typewriterRoleIndex = (typewriterRoleIndex + 1) % typewriterRoles.length;
    window.setTimeout(runTypewriter, 250);
  }

  if (typewriterElement) {
    if (prefersReducedMotion) {
      typewriterElement.textContent = typewriterRoles[0];
    } else {
      runTypewriter();
    }
  }

  /* ---------------------------------------------------------
     ANIMATED STAT COUNTERS
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter[data-count]');

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count || 0);
    if (!target) return;
    const duration = 950;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => {
    if (prefersReducedMotion) {
      counter.textContent = counter.dataset.count || counter.textContent;
    } else {
      counterObserver.observe(counter);
    }
  });

  /* ---------------------------------------------------------
     SCROLL-REVEAL ANIMATIONS
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => {
    if (prefersReducedMotion) {
      element.classList.add('visible');
    } else {
      revealObserver.observe(element);
    }
  });

  /* ---------------------------------------------------------
     ACTIVE NAV LINK ON SCROLL
  --------------------------------------------------------- */
  const sectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (id) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    const visibleEntries = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length) {
      setActiveLink(visibleEntries[0].target.id);
    }
  }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.18, 0.32, 0.5] });

  sections.forEach((section) => navObserver.observe(section));

  /* ---------------------------------------------------------
     CONTACT FORM (Email via Formspree + WhatsApp fallback)
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitButton');
  const whatsappSubmitButton = document.getElementById('whatsappSubmitButton');
  const whatsappNumber = '201206174130';

  const showFormStatus = (message, type) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status visible ${type}`;
  };

  const getContactFormData = () => ({
    name: document.getElementById('clientName')?.value.trim() || '',
    email: document.getElementById('clientEmail')?.value.trim() || '',
    message: document.getElementById('clientMessage')?.value.trim() || ''
  });

  contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!submitButton) return;

    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending via Email...';
    submitButton.setAttribute('disabled', 'true');
    whatsappSubmitButton?.setAttribute('disabled', 'true');
    formStatus?.classList.remove('visible', 'success', 'error');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        showFormStatus('Message sent by email successfully. I will get back to you soon.', 'success');
      } else {
        showFormStatus('Email sending failed. Please try again or use WhatsApp instead.', 'error');
      }
    } catch (error) {
      showFormStatus('Network error. Please try again or send the message via WhatsApp.', 'error');
    } finally {
      submitButton.textContent = originalText;
      submitButton.removeAttribute('disabled');
      whatsappSubmitButton?.removeAttribute('disabled');
    }
  });

  whatsappSubmitButton?.addEventListener('click', () => {
    if (!contactForm) return;
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const { name, email, message } = getContactFormData();
    const whatsappMessage = `Hi Rimon, I saw your portfolio and would like to contact you.
Name: ${name}
Email: ${email}
Message: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    showFormStatus('Opening WhatsApp with your message ready to send.', 'success');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  /* ---------------------------------------------------------
     PROJECT MODAL SYSTEM
  --------------------------------------------------------- */
  function getButtonIcon(typeOrLabel = '') {
    const key = String(typeOrLabel).toLowerCase();
    if (key.includes('github')) {
      return '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>';
    }
    if (key.includes('try') || key.includes('game') || key.includes('app')) {
      return '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>';
    }
    if (key.includes('demo') || key.includes('live') || key.includes('preview')) {
      return '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';
    }
    return '<svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
  }

  const projectDetails = {
    news: {
      label: 'Functional App · Completed · API Integrated',
      title: 'News App',
      image: 'assets/project_news_app_photo.jpg',
      fallbackImage: 'https://rimonnnn.github.io/assets/project_news_app_photo.jpg',
      imageAlt: 'News App screenshot showing live article feed',
      overview: 'A live news Flutter app for browsing headlines through API data, with search, categories, article details, localization, and clear loading/error handling.',
      purpose: 'Build an API-based Flutter app that demonstrates real content fetching, category filtering, search, article details, and localization.',
      role: 'Built the UI, integrated NewsAPI with Dio, managed Cubit states, implemented routing, localization, and reusable widgets.',
      features: ['Live API headlines', 'Search flow', 'News categories', 'Article details screen', 'Arabic/English localization', 'Loading and error states'],
      technical: ['Dio for REST API requests', 'Cubit/Bloc for state management', 'GoRouter for navigation', 'Easy Localization for multilingual support', 'Cached Network Image for network images', 'ScreenUtil for responsive sizing'],
      challenges: 'Handled API loading, empty results, and error states clearly so the user experience stays understandable instead of showing broken screens.',
      tech: ['Flutter', 'Dart', 'Cubit', 'Bloc', 'Dio', 'NewsAPI', 'GoRouter', 'Easy Localization', 'Cached Network Image', 'ScreenUtil'],
      links: [
        { label: 'GitHub', url: 'https://github.com/rimonnnn/news_app', primary: true },
        { label: 'Demo Video', url: 'https://drive.google.com/file/d/1yh2RKrWxusozg1gjavGbvnTWAoYrISUx/view?usp=drive_link' }
      ]
    },
    meals: {
      label: 'Local Storage App · Completed · SQLite',
      title: 'Meals App',
      image: 'assets/project_meals_app_photo.jpg',
      fallbackImage: 'https://rimonnnn.github.io/assets/project_meals_app_photo.jpg',
      imageAlt: 'Meals App screenshot showing meal recipe list',
      overview: 'A local-storage Flutter recipe app for saving and viewing meals without depending on an online backend, with onboarding, validation, and responsive screens.',
      purpose: 'Create an offline-friendly app that proves local persistence, form handling, navigation, and clean screen structure.',
      role: 'Implemented the UI, SQLite flow, onboarding persistence, form validation, navigation, and responsive layouts.',
      features: ['Meal recipe screens', 'Local SQLite storage', 'Onboarding persistence', 'Form validation', 'Responsive UI', 'Clean navigation flow'],
      technical: ['SQLite for saved meal data', 'SharedPreferences for onboarding state', 'GoRouter for screen navigation', 'ScreenUtil for responsive UI', 'Reusable form and layout widgets'],
      challenges: 'Separated local data handling from UI flow so the app remains easier to maintain and expand.',
      tech: ['Flutter', 'Dart', 'SQLite', 'SharedPreferences', 'GoRouter', 'ScreenUtil', 'Form Validation'],
      links: [
        { label: 'GitHub', url: 'https://github.com/rimonnnn/meals-app-', primary: true },
        { label: 'Demo Video', url: 'https://drive.google.com/file/d/1lrQaTsGKwYp64qPKxSP401-SRwm5Ph_c/view?usp=drive_link' }
      ]
    },
    shopino: {
      label: 'Functional App · Completed · Clean Architecture',
      title: 'Shopino',
      images: [
        { src: 'assets/splash_screen.jpg', fallback: 'https://rimonnnn.github.io/assets/splash_screen.jpg', alt: 'Shopino splash screen' },
        { src: 'assets/product_details.jpg', fallback: 'https://rimonnnn.github.io/assets/product_details.jpg', alt: 'Shopino product details screen' },
        { src: 'assets/cart.jpg', fallback: 'https://rimonnnn.github.io/assets/cart.jpg', alt: 'Shopino cart screen' },
        { src: 'assets/favorite.jpg', fallback: 'https://rimonnnn.github.io/assets/favorite.jpg', alt: 'Shopino favorites screen' }
      ],
      overview: 'A production-style Flutter e-commerce app covering authentication, product browsing, cart, and favorites, built with Clean Architecture, Cubit/Bloc, and full API integration.',
      purpose: 'Build a realistic shopping app flow that demonstrates product browsing, user actions, session handling, and API-driven screens end to end.',
      role: 'Designed and implemented the full app structure, authentication flow, API layer, state management, product modules, cart logic, and local session handling.',
      features: ['Authentication flow (login/signup)', 'Product listing', 'Product details with image gallery', 'Cart management', 'Favorites', 'Local token storage', 'API-driven screens'],
      technical: ['Clean Architecture (data/domain/presentation)', 'Cubit/Bloc state management', 'Dio for REST APIs', 'dartz Either for error handling', 'GetIt for dependency injection', 'GoRouter for navigation', 'Local storage for auth/session data'],
      challenges: 'Kept the architecture layered and testable while resolving real-world issues like GoRouter/BLoC navigation bugs, duplicate GlobalKey errors, and secure token storage across login/signup/logout flows.',
      tech: ['Flutter', 'Dart', 'Cubit/Bloc', 'Dio', 'GoRouter', 'GetIt', 'Clean Architecture', 'REST APIs'],
      links: [
        { label: 'GitHub', url: 'https://github.com/rimonnnn/shopino_store', primary: true },
        { label: 'Demo Video', url: 'https://drive.google.com/file/d/1hLKaIuwPIpzSWSK5bf1QOYVSc8mJMEfF/view?usp=drivesdk' }
      ]
    },
    finance: {
      label: 'UI Project · Provider · Completed',
      title: 'Finance App UI',
      image: 'assets/project_finance_app_photo.jpg',
      fallbackImage: 'https://rimonnnn.github.io/assets/finance_app.png',
      imageAlt: 'Finance App UI screenshot showing dashboard and statistics screens',
      overview: 'A polished finance mobile UI project showing onboarding, authentication screens, OTP UI, dashboard screens, profile screens, and reusable custom components.',
      purpose: 'Demonstrate modern Flutter UI implementation, screen flow, reusable widgets, and responsive dashboard layouts.',
      role: 'Built reusable UI components, navigation flow, authentication screens, dashboard UI, profile UI, and Provider-based state handling.',
      features: ['Onboarding screens', 'Authentication UI', 'OTP UI', 'Dashboard screens', 'Profile screens', 'Reusable custom UI components'],
      technical: ['Provider and ChangeNotifier for simple state handling', 'GoRouter for navigation', 'ScreenUtil for responsive sizing', 'Flutter SVG support', 'Pin Code input UI', 'Carousel Slider for onboarding'],
      challenges: 'Kept the project clearly positioned as UI-focused without pretending it has backend integration.',
      tech: ['Flutter', 'Dart', 'Provider', 'ChangeNotifier', 'GoRouter', 'ScreenUtil', 'Flutter SVG', 'Pin Code', 'Carousel Slider', 'Custom UI'],
      links: [
        { label: 'GitHub', url: 'https://github.com/rimonnnn/financeApp', primary: true },
        { label: 'Demo Video', url: 'https://drive.google.com/file/d/1J96z7iNbL92opdPAS02uuOmmN3QUyCTT/view?usp=drive_link' }
      ]
    },
    gridworld: {
      label: 'AI Project · Reinforcement Learning · Q-Learning',
      title: 'Grid World Q-Learning Game',
      image: './assets/grid_world_game.png',
      fallbackImage: 'assets/grid_world_game.png',
      imageAlt: 'Grid World Q-Learning Game cover showing agent, fire cells, and goal',
      overview: 'An interactive Python/Tkinter game demonstrating Q-Learning where an agent learns to reach a goal while avoiding fire cells using rewards, penalties, exploration, and a Q-table.',
      purpose: 'Show reinforcement learning basics through a visual grid environment where decisions improve over time based on Q-values and reward feedback.',
      role: 'Built the grid environment, movement rules, reward system, Q-table storage, learning flow, Tkinter interface, and playable web version.',
      features: ['Agent movement inside a grid', 'Start, goal, and fire cells', 'Reward and penalty system', 'Q-table learning', 'JSON persistence', 'Playable web version'],
      aiConcepts: ['Reinforcement Learning', 'Q-Learning', 'Q-table', 'Rewards and penalties', 'Exploration vs exploitation', 'State-action values'],
      technical: ['Q-Learning update logic', 'Grid environment design', 'Reward shaping', 'Tkinter UI for visualization', 'JSON storage for learned Q-values', 'Web version for portfolio interaction'],
      challenges: 'The main challenge was making the learning process understandable visually, not just mathematically. The solution was to keep the grid simple, show clear states, and connect actions with rewards, penalties, and saved Q-values.',
      tech: ['Python', 'Reinforcement Learning', 'Q-Learning', 'Tkinter', 'JSON', 'HTML', 'CSS', 'JavaScript'],
      links: [
        { label: 'GitHub', url: 'https://github.com/rimonnnn/grid_world_game.git', primary: true },
        { label: 'Try Game', url: 'grid_world_game/index.html', type: 'game' }
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalPanel = projectModal?.querySelector('.project-modal__panel');
  const modalMedia = document.getElementById('modalProjectMedia');
  const modalLabel = document.getElementById('modalProjectLabel');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalOverview = document.getElementById('modalProjectOverview');
  const modalSections = document.getElementById('modalProjectSections');
  const modalTech = document.getElementById('modalProjectTech');
  const modalLinks = document.getElementById('modalProjectLinks');
  let lastFocusedProjectTrigger = null;

  function renderList(items) {
    return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }

  function renderDetailBlock(title, content, isList = false) {
    if (!content || (Array.isArray(content) && content.length === 0)) return '';
    return `
      <div class="project-detail-block">
        <strong>${title}</strong>
        ${isList ? renderList(content) : `<p>${content}</p>`}
      </div>
    `;
  }

  let galleryImages = [];
  let galleryIndex = 0;
  let lightboxEl = null;
  let touchStartX = 0;

  function renderGalleryFrame() {
    const img = galleryImages[galleryIndex];
    if (!img) return;
    const mainImg = modalMedia.querySelector('.project-modal__gallery-main img');
    const skeleton = modalMedia.querySelector('.project-modal__gallery-skeleton');

    if (mainImg) {
      skeleton?.classList.add('is-visible');
      mainImg.classList.remove('is-loaded');
      mainImg.onload = () => {
        skeleton?.classList.remove('is-visible');
        mainImg.classList.add('is-loaded');
      };
      mainImg.onerror = () => {
        mainImg.onerror = null;
        mainImg.src = img.fallback;
      };
      mainImg.src = img.src;
      mainImg.alt = img.alt;
    }

    modalMedia.querySelectorAll('.project-modal__gallery-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === galleryIndex);
    });
    modalMedia.querySelectorAll('.project-modal__gallery-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === galleryIndex);
    });

    const counter = modalMedia.querySelector('.project-modal__gallery-count');
    if (counter) counter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;

    // Preload neighbouring images so navigation feels instant
    [galleryIndex - 1, galleryIndex + 1].forEach((i) => {
      const neighbour = galleryImages[(i + galleryImages.length) % galleryImages.length];
      if (neighbour) { const pre = new Image(); pre.src = neighbour.src; }
    });

    if (lightboxEl?.classList.contains('is-open')) renderLightboxFrame();
  }

  function setGalleryIndex(nextIndex) {
    galleryIndex = (nextIndex + galleryImages.length) % galleryImages.length;
    renderGalleryFrame();
  }

  /* --- Swipe support (mobile) --- */
  function attachSwipe(el) {
    el.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      setGalleryIndex(galleryIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* --- Lightbox (fullscreen zoom) --- */
  function buildLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'project-lightbox';
    lightboxEl.innerHTML = `
      <div class="project-lightbox__backdrop" data-lightbox-close></div>
      <button class="project-lightbox__close" type="button" data-lightbox-close aria-label="Close zoom">×</button>
      <button class="project-lightbox__nav project-lightbox__nav--prev" type="button" data-lightbox-prev aria-label="Previous image">‹</button>
      <img class="project-lightbox__img" alt="" />
      <button class="project-lightbox__nav project-lightbox__nav--next" type="button" data-lightbox-next aria-label="Next image">›</button>
    `;
    document.body.appendChild(lightboxEl);
    lightboxEl.querySelectorAll('[data-lightbox-close]').forEach((el) => el.addEventListener('click', closeLightbox));
    lightboxEl.querySelector('[data-lightbox-prev]').addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
    lightboxEl.querySelector('[data-lightbox-next]').addEventListener('click', () => setGalleryIndex(galleryIndex + 1));
    attachSwipe(lightboxEl);
    return lightboxEl;
  }

  function renderLightboxFrame() {
    const img = galleryImages[galleryIndex];
    const lightboxImg = lightboxEl.querySelector('.project-lightbox__img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxImg.onerror = () => { lightboxImg.onerror = null; lightboxImg.src = img.fallback; };
  }

  function openLightbox() {
    buildLightbox();
    renderLightboxFrame();
    lightboxEl.classList.add('is-open');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightboxEl?.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
  }

  function openProjectModal(projectKey, triggerElement) {
    const project = projectDetails[projectKey];
    if (!project || !projectModal) return;

    lastFocusedProjectTrigger = triggerElement || document.activeElement;

    if (project.placeholder) {
      modalMedia.innerHTML = `
        <div class="project-modal__placeholder">
          <div>
            <strong>${project.title}</strong>
            <span>In Progress — ~${project.progress || 60}% Complete</span>
            <div class="progress-wrap" style="width:min(280px,100%);margin:18px auto 0">
              <div class="progress-track"><span style="width:${project.progress || 60}%"></span></div>
            </div>
          </div>
        </div>
      `;
    } else if (Array.isArray(project.images) && project.images.length > 0) {
      galleryImages = project.images;
      galleryIndex = 0;
      const first = galleryImages[0];
      const dots = galleryImages
        .map((_, i) => `<button type="button" class="project-modal__gallery-dot${i === 0 ? ' is-active' : ''}" data-gallery-dot="${i}" aria-label="Show image ${i + 1}"></button>`)
        .join('');
      const thumbs = galleryImages
        .map((img, i) => `<button type="button" class="project-modal__gallery-thumb${i === 0 ? ' is-active' : ''}" data-gallery-thumb="${i}" aria-label="Show image ${i + 1}">
            <img src="${img.src}" onerror="handleImgError(this, '${img.fallback}')" alt="" loading="lazy" />
          </button>`)
        .join('');
      const navArrows = galleryImages.length > 1 ? `
        <button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--prev" data-gallery-prev aria-label="Previous image">‹</button>
        <button type="button" class="project-modal__gallery-nav project-modal__gallery-nav--next" data-gallery-next aria-label="Next image">›</button>
      ` : '';
      modalMedia.innerHTML = `
        <div class="project-modal__gallery">
          <div class="project-modal__gallery-main" data-gallery-zoom>
            <div class="project-modal__gallery-skeleton is-visible"></div>
            <img src="${first.src}" onerror="handleImgError(this, '${first.fallback}')" alt="${first.alt}" />
            ${navArrows}
            <span class="project-modal__gallery-count">1 / ${galleryImages.length}</span>
          </div>
          ${galleryImages.length > 1 ? `<div class="project-modal__gallery-thumbs">${thumbs}</div>` : ''}
          ${galleryImages.length > 1 ? `<div class="project-modal__gallery-dots">${dots}</div>` : ''}
        </div>
      `;
      const mainEl = modalMedia.querySelector('.project-modal__gallery-main');
      modalMedia.querySelector('[data-gallery-prev]')?.addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
      modalMedia.querySelector('[data-gallery-next]')?.addEventListener('click', () => setGalleryIndex(galleryIndex + 1));
      modalMedia.querySelectorAll('[data-gallery-dot]').forEach((dot) => {
        dot.addEventListener('click', () => setGalleryIndex(Number(dot.dataset.galleryDot)));
      });
      modalMedia.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
        thumb.addEventListener('click', () => setGalleryIndex(Number(thumb.dataset.galleryThumb)));
      });
      mainEl.addEventListener('click', openLightbox);
      attachSwipe(mainEl);
      renderGalleryFrame();
    } else {
      modalMedia.innerHTML = `
        <img src="${project.image}" onerror="handleImgError(this, '${project.fallbackImage}')" alt="${project.imageAlt}" />
      `;
    }

    modalLabel.textContent = project.label;
    modalTitle.textContent = project.title;
    modalOverview.textContent = project.overview;

    modalSections.innerHTML = [
      renderDetailBlock('Purpose', project.purpose),
      renderDetailBlock('My Role', project.role),
      renderDetailBlock('Key Features', project.features, true),
      renderDetailBlock('AI / ML Concepts Used', project.aiConcepts, true),
      renderDetailBlock('Technical Highlights', project.technical, true),
      renderDetailBlock('Challenges & Solutions', project.challenges)
    ].join('');

    modalTech.innerHTML = project.tech.map((tech) => `<span>${tech}</span>`).join('');

    if (project.links.length > 0) {
      modalLinks.innerHTML = project.links
        .map((link) => `<a class="btn ${link.primary ? 'btn-primary' : 'btn-secondary'}" href="${link.url}" target="_blank" rel="noopener">${getButtonIcon(link.type || link.label)}${link.label}</a>`)
        .join('');
    } else {
      modalLinks.innerHTML = '<span class="btn btn-disabled" aria-disabled="true"><svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>In Progress — ~60% Complete</span>';
    }

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalPanel?.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedProjectTrigger && typeof lastFocusedProjectTrigger.focus === 'function') {
      lastFocusedProjectTrigger.focus();
    }
  }

  document.querySelectorAll('[data-project-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openProjectModal(trigger.dataset.projectOpen, trigger);
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach((trigger) => {
    trigger.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (lightboxEl?.classList.contains('is-open')) { closeLightbox(); return; }
      if (projectModal?.classList.contains('is-open')) { closeProjectModal(); return; }
    }
    if (galleryImages.length > 1 && (projectModal?.classList.contains('is-open') || lightboxEl?.classList.contains('is-open'))) {
      if (event.key === 'ArrowLeft') setGalleryIndex(galleryIndex - 1);
      if (event.key === 'ArrowRight') setGalleryIndex(galleryIndex + 1);
    }
  });
});