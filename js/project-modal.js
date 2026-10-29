/* =========================================================
   project-modal.js — project modal, image gallery, lightbox
   Reads data from window.projectDetails (see projects-data.js).
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const projectDetails = window.projectDetails || {};

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

    [galleryIndex - 1, galleryIndex + 1].forEach((i) => {
      const neighbour = galleryImages[(i + galleryImages.length) % galleryImages.length];
      if (neighbour) { const pre = new Image(); pre.src = neighbour.src; }
    });

    if (lightboxEl?.classList.contains('is-open')) renderLightboxFrame();
  }

  function setGalleryIndex(nextIndex) {
    if (galleryImages.length === 0) return;
    galleryIndex = (nextIndex + galleryImages.length) % galleryImages.length;
    renderGalleryFrame();
  }

  function attachSwipe(el) {
    el.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      setGalleryIndex(galleryIndex + (delta < 0 ? 1 : -1));
    }, { passive: true });
  }

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
    if (!img) return;
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

    /* Reset gallery state first so a project without a gallery can never
       inherit stale images (and keyboard arrows) from the previous project. */
    galleryImages = [];
    galleryIndex = 0;

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
