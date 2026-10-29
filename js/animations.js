/* =========================================================
   animations.js — typewriter, stat counters, scroll reveal
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     TYPEWRITER ROLE EFFECT
     (The element is aria-hidden in the HTML; the h1 carries a
     static aria-label so screen readers read the title once.)
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
});
