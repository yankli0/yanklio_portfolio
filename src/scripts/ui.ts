const themeStorageKey = "theme";

type Theme = "garden" | "forest";

function isDark() {
    return document.documentElement.dataset.theme === "forest";
}

function syncThemeControls() {
    document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((toggle) => {
        toggle.setAttribute("aria-pressed", String(isDark()));
        toggle.setAttribute("aria-label", "Dark theme");
    });
}

function applyTheme(theme: Theme, persist = false) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
        try {
            window.localStorage.setItem(themeStorageKey, theme);
        } catch {}
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

function setupTheme() {
    syncThemeControls();

    document.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("[data-theme-toggle]")) {
            applyTheme(isDark() ? "garden" : "forest", true);
        }
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () =>
        applyTheme(preferredTheme()),
    );

    window.addEventListener("storage", (event) => {
        if (event.key === themeStorageKey || event.key === null) applyTheme(preferredTheme());
    });
}

function setupTabs() {
    const row = document.querySelector<HTMLElement>(".tabs-row");
    if (!row) return;

    const tabs = [...row.querySelectorAll<HTMLAnchorElement>(".site-tabs > .tab")];
    const prev = row.querySelector<HTMLButtonElement>("[data-tabs-prev]")!;
    const next = row.querySelector<HTMLButtonElement>("[data-tabs-next]")!;

    const position = () => Math.max(tabs.findIndex((tab) => tab.getAttribute("aria-current") === "page"), 0);

    const syncArrows = () => {
        const current = position();
        prev.disabled = current <= 0;
        next.disabled = current >= tabs.length - 1;
    };

    const step = (direction: number) => tabs[position() + direction]?.click();

    syncArrows();
    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
}

setupTheme();
setupTabs();
