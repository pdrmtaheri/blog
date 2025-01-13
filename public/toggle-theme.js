// Guard against multiple executions
if (!window.__theme_script_loaded) {
  window.__theme_script_loaded = true;

  const primaryColorScheme = ""; // "light" | "dark"
  let themeValue = localStorage.getItem("theme");

  function getPreferTheme() {
    if (themeValue) return themeValue;

    if (primaryColorScheme) return primaryColorScheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Initialize theme
  themeValue = getPreferTheme();

  function setPreference() {
    localStorage.setItem("theme", themeValue);
    reflectPreference();
  }

  function reflectPreference() {
    document.firstElementChild.setAttribute("data-theme", themeValue);
    document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);
    document.querySelector("#theme-btn-desktop")?.setAttribute("aria-label", themeValue);

    const body = document.body;

    if (body) {
      const computedStyles = window.getComputedStyle(body);

      const bgColor = computedStyles.backgroundColor;

      document.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
    }
  }

  function toggleTheme() {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  }

  reflectPreference();

  function initThemeButtons() {
    const mobileBtn = document.querySelector("#theme-btn");
    const desktopBtn = document.querySelector("#theme-btn-desktop");

    if (mobileBtn) {
      const newMobileBtn = mobileBtn.cloneNode(true);
      mobileBtn.parentNode.replaceChild(newMobileBtn, mobileBtn);
      newMobileBtn.addEventListener("click", toggleTheme);
    }

    if (desktopBtn) {
      const newDesktopBtn = desktopBtn.cloneNode(true);
      desktopBtn.parentNode.replaceChild(newDesktopBtn, desktopBtn);
      newDesktopBtn.addEventListener("click", toggleTheme);
    }
  }

  window.addEventListener("load", initThemeButtons);

  document.addEventListener("astro:after-swap", () => {
    reflectPreference();
    initThemeButtons();
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      themeValue = isDark ? "dark" : "light";
      setPreference();
    });
}
