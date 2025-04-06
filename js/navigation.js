/**
 * Navigation module - Portfolio Électronique
 * Handles mobile menu and smooth scrolling
 */

/**
 * Initialize mobile menu functionality
 */
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const body = document.body;

    if (!hamburger || !navLinks) return;

    // Add animation sequence index to nav items
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when nav links are clicked
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
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
            body.style.overflow = '';
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
export function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (!anchorLinks.length) return;

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