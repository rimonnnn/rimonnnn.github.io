/* =========================================================
   theme.js — light/dark toggle UI + persistence
   (initial theme is applied by the inline bootstrap in index.html)
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const rootBody = document.body;
  const themeToggle = document.getElementById('themeToggle');

  function syncThemeToggleUI(theme) {
    if (!themeToggle) return;
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    if (icon) icon.textContent = isLight ? '☀' : '☾';
  }

  syncThemeToggleUI(rootBody.getAttribute('data-theme') || 'dark');

  themeToggle?.addEventListener('click', () => {
    const nextTheme = rootBody.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (e) { /* localStorage unavailable */ }
    rootBody.setAttribute('data-theme', nextTheme);
    syncThemeToggleUI(nextTheme);
  });
});
