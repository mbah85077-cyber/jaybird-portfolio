// ========================================
// JAYBIRD PORTFOLIO
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the elements from index.html

    const themeToggle = document.getElementById("theme-toggle");
    const yearElement = document.getElementById("year");
    const body = document.body;

    // 2. Update the footer year automatically

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Load the saved theme

    const THEME_KEY = "portfolio-theme";

    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (error) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // The theme still works if storage is unavailable.
        }
    }

    // 4. Apply the selected theme

    function applyTheme(theme) {
        const isDark = theme === "dark";

        body.classList.toggle("dark-theme", isDark);

        if (themeToggle) {
            themeToggle.textContent = isDark ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.title = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";
        }
    }

    // Restore the user's previous choice.
    // Use light mode if no saved preference exists.

    const savedTheme = getSavedTheme();
    applyTheme(savedTheme === "dark" ? "dark" : "light");

    // 5. Toggle between light and dark mode

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isCurrentlyDark = body.classList.contains("dark-theme");
            const nextTheme = isCurrentlyDark ? "light" : "dark";

            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    // 6. Close to the top of the page when the logo is clicked
    // The logo's existing href="#home" handles navigation.

});