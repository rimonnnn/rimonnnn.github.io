/* =========================================================
   project-modal.js
   Project details modal with English/Arabic support.

   Reads project data from window.projectDetails.
   Arabic project text is stored at project.translations.ar.

   Features:
   - Uses the same main image displayed in the project card.
   - Supports live language changes while the modal is open.
   - Keeps technology names and external URLs unchanged.
   - No image gallery or lightbox.
   - Escape to close, focus trapping, and focus restoration.
========================================================= */

function initializeProjectModal() {
  const projectDetails = window.projectDetails || {};
  const projectModal = document.getElementById('projectModal');

  if (!projectModal) return;

  const modalPanel = projectModal.querySelector('.project-modal__panel');
  const modalMedia = document.getElementById('modalProjectMedia');
  const modalLabel = document.getElementById('modalProjectLabel');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalOverview = document.getElementById('modalProjectOverview');
  const modalSections = document.getElementById('modalProjectSections');
  const modalTech = document.getElementById('modalProjectTech');
  const modalLinks = document.getElementById('modalProjectLinks');

  if (!modalPanel || !modalMedia) return;

  modalPanel.setAttribute('tabindex', '-1');
  modalPanel.setAttribute('role', 'dialog');
  modalPanel.setAttribute('aria-modal', 'true');

  let lastFocusedProjectTrigger = null;
  let currentProjectKey = null;
  let currentTriggerElement = null;


  /* =======================================================
     LANGUAGE HELPERS
  ======================================================= */

  function getCurrentLanguage() {
    const i18nLanguage = window.portfolioI18n?.getLanguage?.();

    if (i18nLanguage === 'ar' || i18nLanguage === 'en') {
      return i18nLanguage;
    }

    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }

  function getLocalizedProject(projectKey) {
    const project = projectDetails[projectKey];

    if (!project) return null;

    const language = getCurrentLanguage();

    const localizedContent = language === 'ar'
      ? project.translations?.ar
      : null;

    if (!localizedContent) return project;

    return {
      ...project,
      ...localizedContent,

      // Technical identifiers remain in their original form unless
      // explicitly translated in the project's locale data.
      tech: localizedContent.tech || project.tech || [],

      // Keep media sources and other non-translatable properties intact.
      image: project.image,
      fallbackImage: project.fallbackImage,
      translations: project.translations
    };
  }

  function getSectionLabels(language) {
    if (language === 'ar') {
      return {
        purpose: 'الهدف من المشروع',
        role: 'دوري في المشروع',
        features: 'أهم المميزات',
        aiConcepts: 'مفاهيم الذكاء الاصطناعي والتعلّم الآلي',
        technical: 'التفاصيل التقنية',
        challenges: 'التحديات والحلول',
        techAriaLabel: 'تقنيات المشروع'
      };
    }

    return {
      purpose: 'Purpose',
      role: 'My Role',
      features: 'Key Features',
      aiConcepts: 'AI / ML Concepts Used',
      technical: 'Technical Highlights',
      challenges: 'Challenges & Solutions',
      techAriaLabel: 'Project tech stack'
    };
  }


  /* =======================================================
     GENERAL HELPERS
  ======================================================= */

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };

      return entities[character];
    });
  }

  function getSafeURL(value) {
    if (typeof value !== 'string' || !value.trim()) return '';

    try {
      const url = new URL(value, window.location.href);

      return ['http:', 'https:'].includes(url.protocol)
        ? url.href
        : '';
    } catch {
      return '';
    }
  }

  function getButtonIcon(typeOrLabel = '') {
    const key = String(typeOrLabel).toLowerCase();

    if (key.includes('github')) {
      return `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      `;
    }

    if (
      key.includes('try') ||
      key.includes('game') ||
      key.includes('app') ||
      key.includes('جرّب') ||
      key.includes('لعبة')
    ) {
      return `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" aria-hidden="true">
          <path d="M7 4v16l13-8z"/>
        </svg>
      `;
    }

    if (
      key.includes('demo') ||
      key.includes('live') ||
      key.includes('preview') ||
      key.includes('مباشر') ||
      key.includes('توضيحي')
    ) {
      return `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <path d="M15 3h6v6"/>
          <path d="M10 14 21 3"/>
        </svg>
      `;
    }

    return `
      <svg class="btn-icon" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    `;
  }


  /* =======================================================
     PROJECT IMAGE
     Prefer the actual image rendered in the clicked project card.
  ======================================================= */

  function getProjectCardImage(triggerElement) {
    if (!triggerElement) return null;

    const projectCard = triggerElement.closest(
      '[data-project-card], .project-card'
    );

    if (projectCard) {
      return projectCard.querySelector(
        '.project-image img, .project-cover img, img'
      );
    }

    return triggerElement.matches('img') ? triggerElement : null;
  }

  function getProjectImageSources(project, triggerElement) {
    const sources = [];
    const normalizedSources = new Set();

    function addSource(source) {
      if (typeof source !== 'string' || !source.trim()) return;

      const candidate = source.trim();
      let normalized = candidate;

      try {
        normalized = new URL(candidate, window.location.href).href;
      } catch {
        // Keep non-URL strings untouched; the browser will report load errors.
      }

      if (normalizedSources.has(normalized)) return;

      normalizedSources.add(normalized);
      sources.push(candidate);
    }

    const cardImage = getProjectCardImage(triggerElement);

    if (cardImage) {
      addSource(cardImage.currentSrc);
      addSource(cardImage.getAttribute('src'));
      addSource(cardImage.src);
    }

    addSource(project.image);
    addSource(project.fallbackImage);

    return sources;
  }

  function renderUnavailableImage(project) {
    const language = getCurrentLanguage();
    const title = escapeHTML(project.title || 'Project preview');

    const message = language === 'ar'
      ? 'صورة المشروع غير متاحة حاليًا.'
      : 'Project preview is not available yet.';

    modalMedia.innerHTML = `
      <div class="project-modal__placeholder">
        <div>
          <strong>${title}</strong>
          <span>${message}</span>
        </div>
      </div>
    `;
  }

  function renderProjectImage(project, triggerElement) {
    const imageSources = getProjectImageSources(
      project,
      triggerElement
    );

    if (imageSources.length === 0) {
      renderUnavailableImage(project);
      return;
    }

    const image = document.createElement('img');

    image.className = 'project-modal__image';
    image.alt = project.imageAlt ||
      `${project.title || 'Project'} preview`;

    image.loading = 'eager';
    image.decoding = 'async';
    image.draggable = false;

    let sourceIndex = 0;

    image.addEventListener('error', () => {
      sourceIndex += 1;

      if (sourceIndex < imageSources.length) {
        image.src = imageSources[sourceIndex];
        return;
      }

      renderUnavailableImage(
        getLocalizedProject(currentProjectKey) || project
      );
    });

    modalMedia.replaceChildren(image);
    image.src = imageSources[0];
  }

  function updateModalImageAlt(project) {
    const image = modalMedia.querySelector('img');

    if (image) {
      image.alt = project.imageAlt ||
        `${project.title || 'Project'} preview`;
    }
  }


  /* =======================================================
     DETAIL CONTENT
  ======================================================= */

  function renderList(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return '';
    }

    return `
      <ul>
        ${items
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join('')}
      </ul>
    `;
  }

  function renderDetailBlock(title, content, isList = false) {
    if (
      content == null ||
      content === '' ||
      (Array.isArray(content) && content.length === 0)
    ) {
      return '';
    }

    const contentHTML = isList
      ? renderList(Array.isArray(content) ? content : [content])
      : `<p>${escapeHTML(content)}</p>`;

    return `
      <div class="project-detail-block">
        <strong>${escapeHTML(title)}</strong>
        ${contentHTML}
      </div>
    `;
  }

  function renderPlaceholder(project) {
    const language = getCurrentLanguage();
    const numericProgress = Number(project.progress);

    const progress = Number.isFinite(numericProgress)
      ? Math.min(100, Math.max(0, numericProgress))
      : 60;

    const statusText = language === 'ar'
      ? `قيد التطوير — اكتمل نحو ${progress}%`
      : `In Progress — ~${progress}% Complete`;

    const progressLabel = language === 'ar'
      ? 'تقدم المشروع'
      : 'Project progress';

    modalMedia.innerHTML = `
      <div class="project-modal__placeholder">
        <div>
          <strong>${escapeHTML(project.title || 'Project')}</strong>
          <span>${statusText}</span>
          <div class="progress-wrap" style="width:min(280px,100%);margin:18px auto 0">
            <div class="progress-track" role="progressbar"
              aria-label="${escapeHTML(progressLabel)}"
              aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
              <span style="width:${progress}%"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderProjectLinks(project) {
    if (!modalLinks) return;

    const language = getCurrentLanguage();

    const links = Array.isArray(project.links)
      ? project.links
      : [];

    const validLinks = links
      .filter((link) => link && typeof link === 'object')
      .map((link) => ({
        ...link,
        safeURL: getSafeURL(link.url)
      }))
      .filter((link) => link.safeURL);

    if (validLinks.length > 0) {
      modalLinks.innerHTML = validLinks
        .map((link) => `
          <a
            class="btn ${link.primary ? 'btn-primary' : 'btn-secondary'}"
            href="${escapeHTML(link.safeURL)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${getButtonIcon(link.type || link.label)}
            ${escapeHTML(
              link.label ||
              (language === 'ar' ? 'عرض المشروع' : 'View Project')
            )}
          </a>
        `)
        .join('');

      return;
    }

    const numericProgress = Number(project.progress);

    const progress = Number.isFinite(numericProgress)
      ? Math.min(100, Math.max(0, numericProgress))
      : 60;

    const statusText = language === 'ar'
      ? `قيد التطوير — اكتمل نحو ${progress}%`
      : `In Progress — ~${progress}% Complete`;

    modalLinks.innerHTML = `
      <span class="btn btn-disabled" aria-disabled="true">
        ${getButtonIcon('status')}
        ${statusText}
      </span>
    `;
  }

  function renderProjectDetails(projectKey) {
    const project = getLocalizedProject(projectKey);

    if (!project) return;

    const language = getCurrentLanguage();
    const labels = getSectionLabels(language);

    if (modalLabel) {
      modalLabel.textContent = project.label || 'Project';
    }

    if (modalTitle) {
      modalTitle.textContent = project.title || '';
    }

    if (modalOverview) {
      modalOverview.textContent = project.overview || '';
    }

    if (modalSections) {
      modalSections.innerHTML = [
        renderDetailBlock(labels.purpose, project.purpose),
        renderDetailBlock(labels.role, project.role),
        renderDetailBlock(labels.features, project.features, true),
        renderDetailBlock(labels.aiConcepts, project.aiConcepts, true),
        renderDetailBlock(labels.technical, project.technical, true),
        renderDetailBlock(labels.challenges, project.challenges)
      ].join('');
    }

    if (modalTech) {
      const technologies = Array.isArray(project.tech)
        ? project.tech
        : [];

      modalTech.innerHTML = technologies
        .map((technology) => (
          `<span>${escapeHTML(technology)}</span>`
        ))
        .join('');

      modalTech.setAttribute(
        'aria-label',
        labels.techAriaLabel
      );
    }

    renderProjectLinks(project);
    updateModalImageAlt(project);
  }


  /* =======================================================
     OPEN / CLOSE MODAL
  ======================================================= */

  function openProjectModal(projectKey, triggerElement) {
    const project = projectDetails[projectKey];

    if (!project) return;

    currentProjectKey = projectKey;
    currentTriggerElement = triggerElement || null;

    lastFocusedProjectTrigger =
      triggerElement || document.activeElement;

    const localizedProject = getLocalizedProject(projectKey);

    if (project.placeholder) {
      renderPlaceholder(localizedProject || project);
    } else {
      renderProjectImage(
        localizedProject || project,
        currentTriggerElement
      );
    }

    renderProjectDetails(projectKey);

    modalPanel.scrollTop = 0;

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
      if (projectModal.classList.contains('is-open')) {
        modalPanel.focus({ preventScroll: true });
      }
    });
  }

  function closeProjectModal() {
    if (!projectModal.classList.contains('is-open')) {
      return;
    }

    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    if (
      lastFocusedProjectTrigger?.isConnected &&
      typeof lastFocusedProjectTrigger.focus === 'function'
    ) {
      lastFocusedProjectTrigger.focus();
    }

    lastFocusedProjectTrigger = null;
    currentProjectKey = null;
    currentTriggerElement = null;
  }


  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => (
      !element.hidden &&
      element.getAttribute('aria-hidden') !== 'true' &&
      !element.closest('[aria-hidden="true"]')
    ));
  }

  function trapFocus(container, event) {
    const focusableElements = getFocusableElements(container);

    if (focusableElements.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  document.addEventListener('keydown', (event) => {
    if (!projectModal.classList.contains('is-open')) {
      return;
    }

    if (event.key === 'Escape') {
      closeProjectModal();
      return;
    }

    if (event.key === 'Tab') {
      trapFocus(modalPanel, event);
    }
  });


  /* =======================================================
     EVENT BINDINGS
  ======================================================= */

  document
    .querySelectorAll('[data-project-open]')
    .forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (trigger.matches('a')) {
          event.preventDefault();
        }

        openProjectModal(
          trigger.dataset.projectOpen,
          trigger
        );
      });
    });

  document
    .querySelectorAll('[data-modal-close]')
    .forEach((trigger) => {
      trigger.addEventListener('click', closeProjectModal);
    });

  // translations.js dispatches this event after changing the page language.
  // If the project modal is open, refresh its dynamic content immediately.
  document.addEventListener(
    window.portfolioI18n?.languageChangeEvent ||
      'portfolio:languagechange',
    () => {
      if (
        !currentProjectKey ||
        !projectModal.classList.contains('is-open')
      ) {
        return;
      }

      const previousScrollTop = modalPanel.scrollTop;
      const activeElement = document.activeElement;

      const activeLinkIndex = activeElement?.closest(
        '#modalProjectLinks a'
      )
        ? Array.from(
            modalLinks.querySelectorAll('a')
          ).indexOf(activeElement)
        : -1;

      const project = getLocalizedProject(currentProjectKey);

      if (project?.placeholder) {
        renderPlaceholder(project);
      }

      renderProjectDetails(currentProjectKey);
      modalPanel.scrollTop = previousScrollTop;

      // Restore focus to the equivalent project link if it was focused.
      if (activeLinkIndex >= 0) {
        modalLinks
          .querySelectorAll('a')[activeLinkIndex]
          ?.focus({ preventScroll: true });
      }
    }
  );
}


/* =========================================================
   INITIALIZATION
========================================================= */

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initializeProjectModal,
    { once: true }
  );
} else {
  initializeProjectModal();
}