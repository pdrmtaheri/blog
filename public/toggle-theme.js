const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
let themeValue = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (themeValue) return themeValue;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
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

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
  }
}

function toggleTheme() {
  themeValue = themeValue === "light" ? "dark" : "light";
  setPreference();
}

// set early so no page flashes / CSS is made aware
reflectPreference();

function initThemeButtons() {
  // Remove any existing listeners first
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

// Initialize on page load
window.addEventListener("load", initThemeButtons);

// Reinitialize after page transitions
document.addEventListener("astro:after-swap", () => {
  reflectPreference();
  initThemeButtons();
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
