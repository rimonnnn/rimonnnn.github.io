/* =========================================================
   main.js — entry file (load this FIRST).
   The inline bootstrap script in index.html already sets the
   theme attribute, the "js" class and window.handleImgError.
   This file is only a safety net + the "ready" flag.
========================================================= */

/* Safety net: only defines the helper if the inline bootstrap was removed. */
window.handleImgError = window.handleImgError || function handleImgError(imgEl, fallbackSrc) {
  imgEl.onerror = null;
  imgEl.src = fallbackSrc;
};

document.addEventListener('DOMContentLoaded', () => {
  /* Tell the inline bootstrap's safety timer that the JS is running */
  window.__portfolioReady = true;
});
