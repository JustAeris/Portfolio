/**
 * Navigation module - Portfolio Électronique
 * Handles mobile menu and smooth scrolling
 */

/**
 * Initialize mobile menu functionality with sequential animations
 */
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const body = document.body;

    if (!hamburger || !navLinks) return;

    // Feature detection for CSS Custom Properties
    const supportsCustomProps = window.CSS &&
        window.CSS.supports &&
        window.CSS.supports('(--custom-prop: 0)');

    // Add animation sequence index to nav items with appropriate fallback
    navItems.forEach((item, index) => {
        if (supportsCustomProps) {
            // Modern approach with CSS variables
            item.style.setProperty('--i', index);
        } else {
            // Legacy browser fallback
            item.style.transitionDelay = `${0.1 * index}s`;
        }
    });

    // Toggle mobile menu - utilisation de passive:true pour améliorer les performances
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Prevent body scrolling when menu is open - utilisons une classe au lieu d'un style inline
        if (navLinks.classList.contains('active')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    }, { passive: true });

    // Close menu when nav links are clicked
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 * with respect for reduced motion preferences
 */
export function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (!anchorLinks.length) return;

    // Check for reduced motion preference
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = preferReducedMotion ? 'auto' : 'smooth';

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: scrollBehavior
            });

            // Update URL without triggering scroll
            history.pushState(null, null, targetId);
        });
    });

    // Handle initial hash in URL
    window.addEventListener('load', () => {
        if (window.location.hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: scrollBehavior
                    });
                }
            }, 100);
        }
    });
}