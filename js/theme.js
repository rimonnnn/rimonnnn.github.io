/* =========================================================
   theme.js
   Dark/light theme toggle with persistence and accessibility.

   The initial theme is applied by the inline bootstrap in
   index.html to prevent a flash of the wrong theme.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const rootBody = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';
  const DEFAULT_THEME = 'dark';

  const isValidTheme = (theme) =>
    theme === 'light' || theme === 'dark';

  function getCurrentTheme() {
    const theme = rootBody.getAttribute('data-theme');

    return isValidTheme(theme) ? theme : DEFAULT_THEME;
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme switching still works if localStorage is unavailable.
    }
  }

  function syncThemeToggleUI(theme) {
    if (!themeToggle) return;

    const isLight = theme === 'light';
    const icon = themeToggle.querySelector('.theme-toggle__icon');

    // Keep the accessible name stable because aria-pressed
    // represents whether the light theme is currently active.
    themeToggle.setAttribute('aria-label', 'Toggle color theme');
    themeToggle.setAttribute('aria-pressed', String(isLight));

    // Describe the action that will happen on the next click.
    themeToggle.setAttribute(
      'title',
      isLight ? 'Switch to dark mode' : 'Switch to light mode'
    );

    if (icon) {
      icon.textContent = isLight ? '☀' : '☾';
      icon.setAttribute('aria-hidden', 'true');
    }
  }

  function applyTheme(theme, { persist = false } = {}) {
    if (!isValidTheme(theme)) return;

    rootBody.setAttribute('data-theme', theme);
    syncThemeToggleUI(theme);

    if (persist) {
      saveTheme(theme);
    }
  }

  // Synchronize the UI with the theme set by index.html.
  applyTheme(getCurrentTheme());

  // Toggle the active theme.
  themeToggle?.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    applyTheme(nextTheme, { persist: true });
  });
});