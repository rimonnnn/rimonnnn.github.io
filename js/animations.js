/* =========================================================
   animations.js
   Typewriter, animated counters, and scroll reveals.

   Goals:
   - Smooth, natural animation timing.
   - Respect reduced-motion preferences.
   - Pause decorative animations when the tab is hidden.
   - Handle unsupported IntersectionObserver gracefully.
   - Keep animations lightweight and dependency-free.
========================================================= */

function initializeAnimations() {
  const motionPreference = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  let prefersReducedMotion = motionPreference.matches;

  /* =======================================================
     TYPEWRITER ROLE EFFECT
     The element is aria-hidden in HTML; the h1 provides
     a static accessible label for screen readers.
  ======================================================= */

  const typewriterElement = document.getElementById('typewriterRole');

  const typewriterRoles = [
    'Flutter Developer',
    'Mobile App Builder',
    'REST API Integrator',
  ];

  let typewriterRoleIndex = 0;
  let typewriterCharIndex = 0;
  let typewriterDeleting = false;
  let typewriterTimer = null;

  const TYPE_SPEED = 72;
  const DELETE_SPEED = 34;
  const ROLE_PAUSE = 1500;
  const TRANSITION_PAUSE = 280;

  function stopTypewriter() {
    if (typewriterTimer !== null) {
      window.clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
  }

  function scheduleTypewriter(delay) {
    if (
      !typewriterElement ||
      prefersReducedMotion ||
      document.hidden
    ) {
      return;
    }

    stopTypewriter();

    typewriterTimer = window.setTimeout(runTypewriter, delay);
  }

  function runTypewriter() {
    typewriterTimer = null;

    if (
      !typewriterElement ||
      prefersReducedMotion ||
      document.hidden
    ) {
      return;
    }

    const currentRole = typewriterRoles[typewriterRoleIndex];

    if (!typewriterDeleting) {
      // Type the next character.
      typewriterCharIndex = Math.min(
        typewriterCharIndex + 1,
        currentRole.length
      );

      typewriterElement.textContent = currentRole.slice(
        0,
        typewriterCharIndex
      );

      if (typewriterCharIndex >= currentRole.length) {
        typewriterDeleting = true;
        scheduleTypewriter(ROLE_PAUSE);
      } else {
        scheduleTypewriter(TYPE_SPEED);
      }

      return;
    }

    // Remove characters slightly faster than they are typed.
    typewriterCharIndex = Math.max(typewriterCharIndex - 1, 0);

    typewriterElement.textContent = currentRole.slice(
      0,
      typewriterCharIndex
    );

    if (typewriterCharIndex === 0) {
      typewriterDeleting = false;

      typewriterRoleIndex =
        (typewriterRoleIndex + 1) % typewriterRoles.length;

      scheduleTypewriter(TRANSITION_PAUSE);
    } else {
      scheduleTypewriter(DELETE_SPEED);
    }
  }

  function startTypewriter() {
    if (!typewriterElement) return;

    if (prefersReducedMotion) {
      stopTypewriter();
      typewriterElement.textContent = typewriterRoles[0];
      return;
    }

    scheduleTypewriter(180);
  }

  startTypewriter();


  /* =======================================================
     ANIMATED STAT COUNTERS

     Expected HTML:
     <span class="counter" data-count="5">0</span>
  ======================================================= */

  const counters = Array.from(
    document.querySelectorAll('.counter[data-count]')
  );

  const completedCounters = new WeakSet();
  const activeCounterFrames = new Map();

  let counterObserver = null;

  const COUNTER_DURATION = 1200;

  function getCounterTarget(counter) {
    const rawValue = String(counter.dataset.count ?? '').trim();

    // Support values such as "5", "1,000", or "5+".
    const normalizedValue = rawValue.replace(/,/g, '');
    const match = normalizedValue.match(/-?\d+(?:\.\d+)?/);

    if (!match) return null;

    const target = Number(match[0]);

    if (!Number.isFinite(target)) return null;

    return {
      target,
      rawValue,
      decimalPlaces: (match[0].split('.')[1] || '').length,
    };
  }

  function finishCounter(counter) {
    const frameId = activeCounterFrames.get(counter);

    if (frameId !== undefined) {
      window.cancelAnimationFrame(frameId);
      activeCounterFrames.delete(counter);
    }

    // Always display the author's original final value.
    counter.textContent = counter.dataset.count ?? counter.textContent;

    completedCounters.add(counter);
  }

  function animateCounter(counter) {
    if (completedCounters.has(counter)) return;

    const counterData = getCounterTarget(counter);

    if (!counterData) {
      finishCounter(counter);
      return;
    }

    const { target, rawValue, decimalPlaces } = counterData;

    completedCounters.add(counter);

    if (prefersReducedMotion || target === 0) {
      counter.textContent = rawValue;
      return;
    }

    const startTime = performance.now();

    counter.textContent = '0';

    function tick(now) {
      if (prefersReducedMotion) {
        finishCounter(counter);
        return;
      }

      const elapsed = now - startTime;

      const progress = Math.min(
        elapsed / COUNTER_DURATION,
        1
      );

      // Ease-out quart: quick initial movement, gentle finish.
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const currentValue = target * easedProgress;

      if (progress >= 1) {
        counter.textContent = rawValue;
        activeCounterFrames.delete(counter);
        return;
      }

      counter.textContent = decimalPlaces > 0
        ? currentValue.toFixed(decimalPlaces)
        : String(Math.round(currentValue));

      const nextFrame = window.requestAnimationFrame(tick);

      activeCounterFrames.set(counter, nextFrame);
    }

    const firstFrame = window.requestAnimationFrame(tick);

    activeCounterFrames.set(counter, firstFrame);
  }

  function setupCounters() {
    if (prefersReducedMotion) {
      counters.forEach(finishCounter);
      return;
    }

    // Graceful fallback for older browsers.
    if (!('IntersectionObserver' in window)) {
      counters.forEach(finishCounter);
      return;
    }

    counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          counterObserver.unobserve(entry.target);
          animateCounter(entry.target);
        });
      },
      {
        threshold: 0.4,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  setupCounters();


  /* =======================================================
     SCROLL-REVEAL ANIMATIONS

     Elements reveal once when they enter the viewport.
     Existing .delay-1, .delay-2, and .delay-3 CSS classes
     continue to control staggered transitions.
  ======================================================= */

  const revealElements = Array.from(
    document.querySelectorAll('.reveal')
  );

  let revealObserver = null;

  function revealImmediately(element) {
    element.classList.add('visible');
  }

  function setupScrollReveal() {
    if (prefersReducedMotion) {
      revealElements.forEach(revealImmediately);
      return;
    }

    // Avoid leaving .reveal elements hidden if the browser
    // doesn't support IntersectionObserver.
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(revealImmediately);
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          revealImmediately(entry.target);

          // Reveal only once to avoid repeated animations.
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains('visible')) {
        revealObserver.observe(element);
      }
    });
  }

  setupScrollReveal();


  /* =======================================================
     PAGE VISIBILITY

     Pause the typewriter while the tab is hidden to avoid
     unnecessary timers and unexpected animation timing.
  ======================================================= */

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTypewriter();
      return;
    }

    if (
      typewriterElement &&
      !prefersReducedMotion &&
      typewriterTimer === null
    ) {
      scheduleTypewriter(150);
    }
  });


  /* =======================================================
     REDUCED MOTION PREFERENCE

     Respect changes made while the page is open.
  ======================================================= */

  function handleMotionPreferenceChange(event) {
    prefersReducedMotion = event.matches;

    if (prefersReducedMotion) {
      stopTypewriter();

      if (typewriterElement) {
        typewriterRoleIndex = 0;
        typewriterCharIndex = 0;
        typewriterDeleting = false;

        typewriterElement.textContent = typewriterRoles[0];
      }

      if (counterObserver) {
        counterObserver.disconnect();
      }

      counters.forEach(finishCounter);

      if (revealObserver) {
        revealObserver.disconnect();
      }

      revealElements.forEach(revealImmediately);

      return;
    }

    // Resume the typewriter without replaying completed reveals
    // or counters.
    if (typewriterElement) {
      typewriterElement.textContent = '';
      typewriterRoleIndex = 0;
      typewriterCharIndex = 0;
      typewriterDeleting = false;

      startTypewriter();
    }
  }

  if (typeof motionPreference.addEventListener === 'function') {
    motionPreference.addEventListener(
      'change',
      handleMotionPreferenceChange
    );
  } else if (typeof motionPreference.addListener === 'function') {
    // Compatibility with older Safari versions.
    motionPreference.addListener(handleMotionPreferenceChange);
  }
}


/* =========================================================
   INITIALIZATION

   Also works if this script loads after DOMContentLoaded.
========================================================= */

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initializeAnimations,
    { once: true }
  );
} else {
  initializeAnimations();
}