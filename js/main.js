/* ==========================================================================
   Josué da Silva Cavalcante · Academic homepage
   Shared behavior: light/dark theme switcher and language preference.
   Dark theme is the default. The chosen preference is stored locally.
   The script runs synchronously in <head> to apply the theme before paint.
   ========================================================================== */
(function () {
  "use strict";

  var THEME_KEY = "jdc-theme";
  var LANG_KEY = "jdc-lang";
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
      /* The label describes the action of the button, that is, the theme
         the user will switch to. */
      var label =
        button.getAttribute("data-label-" + theme) ||
        (theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      button.setAttribute("aria-pressed", String(theme === "light"));
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    }
  }

  /* Restore the stored theme; dark remains the default. The script runs in
     <head>, so buttons are labeled again once the document is parsed. */
  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* private mode */
  }
  applyTheme(storedTheme === "light" ? "light" : "dark");

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
  });

  /* Delegate clicks: theme toggle and language preference. */
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) {
      return;
    }

    var toggle = target.closest("[data-theme-toggle]");
    if (toggle) {
      var nextTheme =
        root.getAttribute("data-theme") === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (e) {
        /* private mode */
      }
      applyTheme(nextTheme);
      return;
    }

    var langLink = target.closest("[data-lang]");
    if (langLink) {
      try {
        localStorage.setItem(LANG_KEY, langLink.getAttribute("data-lang"));
      } catch (e) {
        /* private mode */
      }
    }
  });
})();
