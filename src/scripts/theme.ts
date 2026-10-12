const themeStorageKey = "theme";
type Theme = "garden" | "forest";

function syncThemeControls() {
    const isDark = document.documentElement.dataset.theme === "forest";
    document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((toggle) => {
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", isDark ? "Switch to Garden light theme" : "Switch to Forest dark theme");
    });
}

function applyTheme(theme: Theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
        try { window.localStorage.setItem(themeStorageKey, theme); } catch {}
    }
    syncThemeControls();
}

function preferredTheme(): Theme {
    try {
        const stored = window.localStorage.getItem(themeStorageKey);
        if (stored === "forest" || stored === "dark") return "forest";
        if (stored === "garden" || stored === "light") return "garden";
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "forest" : "garden";
}

syncThemeControls();
document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("[data-theme-toggle]")) {
        applyTheme(document.documentElement.dataset.theme === "forest" ? "garden" : "forest", true);
    }
});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(preferredTheme()));
window.addEventListener("storage", (event) => {
    if (event.key === themeStorageKey || event.key === null) applyTheme(preferredTheme());
});
