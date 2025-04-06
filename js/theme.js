/**
 * Theme module - Portfolio Électronique
 * Handles theme switching and preference detection
 */

/**
 * Detect user's theme preference from system or localStorage
 */
export function detectThemePreference() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDarkTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);

    applyTheme(isDarkTheme);

    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.checked = isDarkTheme;
    }
}

/**
 * Initialize the theme toggle functionality
 */
export function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;

    themeSwitch.addEventListener('change', function() {
        document.body.classList.add('theme-transition');

        setTimeout(() => {
            applyTheme(this.checked);

            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
        }, 50);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.add('theme-transition');

            setTimeout(() => {
                applyTheme(e.matches);
                themeSwitch.checked = e.matches;

                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 300);
            }, 50);
        }
    });
}

/**
 * Apply the selected theme
 * @param {boolean} isDark - True for dark theme, false for light theme
 */
export function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }

    updateParticlesColor(isDark);
}

/**
 * Update particles color based on theme
 * @param {boolean} isDark - True for dark theme, false for light theme
 */
function updateParticlesColor(isDark) {
    if (window.particlesInstance) {
        const particlesColor = isDark ? '#ffffff' : '#0f172a';
        try {
            window.particlesInstance.options.particles.color.value = particlesColor;
            window.particlesInstance.options.particles.line_linked.color = particlesColor;
            window.particlesInstance.refresh();
        } catch (error) {
            console.warn('Error updating particles color:', error);
        }
    }
}