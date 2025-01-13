const themeModule = {
  primaryColorScheme: "", // "light" | "dark"
  themeValue: localStorage.getItem("theme"),

  getPreferTheme() {
    if (this.themeValue) return this.themeValue;
    if (this.primaryColorScheme) return this.primaryColorScheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  },

  setPreference() {
    localStorage.setItem("theme", this.themeValue);
    this.reflectPreference();
  },

  reflectPreference() {
    document.firstElementChild.setAttribute("data-theme", this.themeValue);
    document.querySelector("#theme-btn")?.setAttribute("aria-label", this.themeValue);
    document.querySelector("#theme-btn-desktop")?.setAttribute("aria-label", this.themeValue);

    const body = document.body;
    if (body) {
      const computedStyles = window.getComputedStyle(body);
      const bgColor = computedStyles.backgroundColor;
      document.querySelector("meta[name='theme-color']")?.setAttribute("content", bgColor);
    }
  },

  toggleTheme() {
    this.themeValue = this.themeValue === "light" ? "dark" : "light";
    this.setPreference();
  },

  initThemeButtons() {
    const mobileBtn = document.querySelector("#theme-btn");
    const desktopBtn = document.querySelector("#theme-btn-desktop");

    if (mobileBtn) {
      const newMobileBtn = mobileBtn.cloneNode(true);
      mobileBtn.parentNode.replaceChild(newMobileBtn, mobileBtn);
      newMobileBtn.addEventListener("click", () => this.toggleTheme());
    }

    if (desktopBtn) {
      const newDesktopBtn = desktopBtn.cloneNode(true);
      desktopBtn.parentNode.replaceChild(newDesktopBtn, desktopBtn);
      newDesktopBtn.addEventListener("click", () => this.toggleTheme());
    }
  },

  init() {
    this.themeValue = this.getPreferTheme();
    this.reflectPreference();

    window.addEventListener("load", () => this.initThemeButtons());

    document.addEventListener("astro:after-swap", () => {
      this.reflectPreference();
      this.initThemeButtons();
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        this.themeValue = isDark ? "dark" : "light";
        this.setPreference();
      });
  },
};

themeModule.init();
