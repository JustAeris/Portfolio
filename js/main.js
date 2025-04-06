/**
 * Main JavaScript module - Portfolio Électronique
 * Initializes all modules and functionalities
 */

import { initThemeToggle, detectThemePreference } from './theme.js';
import { initLanguageSelector, detectLanguagePreference } from './language.js';
import {
    initTypingEffect,
    initParticlesBackground,
    initAnimatedTags,
    initScrollProgress,
    initCardTiltEffect
} from './animations.js';
import { initMobileMenu, initSmoothScroll } from './navigation.js';
import { initContactForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initializing...');

    // Detect user preferences
    detectThemePreference();
    detectLanguagePreference();

    // Initialize components
    initThemeToggle();
    initLanguageSelector();
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

    // Initialize form handling
    initContactForm();

    console.log('Portfolio initialization complete');
});

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
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form')
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