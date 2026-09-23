// Theme switcher. Runs synchronously in <head> so the stored theme is applied
// before the first paint. The theme button label lives in js/i18n.js.
(function () {
  "use strict";

  var THEME_KEY = "jdc-theme";
  var root = document.documentElement;

  var THEME_BG = {
    dark: "#121214",
    light: "#f6f5f2",
  };

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", THEME_BG[theme] || THEME_BG.dark);
    }

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      var label =
        button.getAttribute("data-label-" + theme) ||
        (theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      button.setAttribute("aria-pressed", String(theme === "light"));
      button.setAttribute("aria-label", label);
    }

    // i18n.js re-labels the button in the active language.
    document.dispatchEvent(
      new CustomEvent("jdc:themechange", { detail: { theme: theme } }),
    );
  }

  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    // private mode
  }
  applyTheme(storedTheme === "light" ? "light" : "dark");

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
  });

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) {
      return;
    }

    var toggle = target.closest("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    var nextTheme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch (e) {
      // private mode
    }
    applyTheme(nextTheme);
  });
})();
