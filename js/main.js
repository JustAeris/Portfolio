/**
 * Main JavaScript module - Portfolio Électronique
 * Initializes all modules and functionalities
 */

import { initThemeToggle, detectThemePreference } from './theme.js';
import {
    initTypingEffect,
    initParticlesBackground,
    initAnimatedTags,
    initScrollProgress,
    initCardTiltEffect
} from './animations.js';
import { initMobileMenu, initSmoothScroll } from './navigation.js';

// Évite d'utiliser unload ou beforeunload qui interfèrent avec bfcache
if ('function' === typeof window.addEventListener) {
    window.addEventListener('pageshow', (event) => {
        // Reinitialiser si la page vient du cache de navigation
        if (event.persisted) {
            console.log('Page restaurée depuis le cache de navigation');
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initializing...');

    try {
        // Detect user preferences
        detectThemePreference();

        // Initialize components
        initThemeToggle();
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimation();
        initSkillBars();

        // Initialize animations and effects
        initParticlesBackground();
        initTypingEffect();
        initAnimatedTags();
        initCardTiltEffect();
        initScrollProgress();

        console.log('Portfolio initialization complete');
    } catch (err) {
        console.error('Error during portfolio initialization:', err);
    }
}, { passive: true });

/**
 * Initialize skill bar animations
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    if (!skillBars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = '100%';
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimation() {
    const elements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.bio-text p'),
        ...document.querySelectorAll('.contact-info')
    ];

    if (!elements.length) return;

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}