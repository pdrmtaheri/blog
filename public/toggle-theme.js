function toggleTheme() {
  const doc = document.documentElement;
  const currentTheme = doc.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";

  doc.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);

  ["#theme-btn", "#theme-btn-desktop"].forEach((id) => {
    const btn = document.querySelector(id);
    if (btn) btn.setAttribute("aria-label", newTheme);
  });
}

function initButtons() {
  ["#theme-btn", "#theme-btn-desktop"].forEach((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      // Remove any existing listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      newButton.addEventListener("click", toggleTheme);
    }
  });
}

window.addEventListener("load", initButtons);
document.addEventListener("astro:after-swap", initButtons);
