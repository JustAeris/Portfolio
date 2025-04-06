/**
 * Animations module - Portfolio Électronique
 * Manages visual effects and animations
 */

/**
 * Initialize the typing effect for hero subtitle
 */
export function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.classList.add('typing-effect');

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                subtitle.classList.remove('typing-effect');
            }, 1500);
        }
    }

    setTimeout(typeWriter, 800);
}

/**
 * Initialize particles background in hero section
 */
export function initParticlesBackground() {
    // Vérification plus robuste
    if (typeof tsParticles === 'undefined' || !tsParticles || !tsParticles.load) {
        console.warn('tsParticles library not loaded or initialized properly');
        return;
    }

    const particlesContainer = document.getElementById('particles-bg');
    if (!particlesContainer) return;

    try {
        tsParticles.load("particles-bg", {
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 40,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3, // Valeur minimale plus élevée
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: { opacity: 0.5 }
                    },
                    push: { particles_nb: 2 }
                }
            },
            retina_detect: true
        }).then(container => {
            window.particlesInstance = container;
        }).catch(error => {
            console.error("Particles initialization failed:", error);
        });
    } catch (err) {
        console.error("Error initializing particles:", err);
        // Continuer l'exécution sans planter
    }
}

/**
 * Initialize animated tags with staggered animation
 */
export function initAnimatedTags() {
    const tagElements = document.querySelectorAll('.tag');
    if (!tagElements.length) return;

    tagElements.forEach((tag, index) => {
        tag.style.animationDelay = `${0.1 * index}s`;
        tag.classList.add('animated-tag');
    });
}

/**
 * Initialize scroll progress indicator
 */
export function initScrollProgress() {
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollPercentage = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;

        if (scrollTop > 100) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    window.addEventListener('resize', updateProgressBar, { passive: true });

    updateProgressBar();
}

/**
 * Initialize 3D hover effect for project and skill cards
 */
export function initCardTiltEffect() {
    if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!projectCards.length && !skillCards.length) return;

    const config = {
        max: 10,
        perspective: 1000,
        scale: 1.03,
        speed: 500,
        easing: "cubic-bezier(.03,.98,.52,.99)"
    };

    function applyTiltEffect(element) {
        if (!element) return;

        let isMouseOver = false;
        let box;

        element.addEventListener('mouseenter', () => {
            isMouseOver = true;
            box = element.getBoundingClientRect();
        });

        element.addEventListener('mousemove', (e) => {
            if (!isMouseOver) return;

            const x = e.clientX - box.left;
            const y = e.clientY - box.top;

            const xPercent = x / box.width;
            const yPercent = y / box.height;

            const tiltX = (config.max * 2 * (0.5 - yPercent)).toFixed(2);
            const tiltY = (config.max * 2 * (xPercent - 0.5)).toFixed(2);

            element.style.transform = `perspective(${config.perspective}px) 
                                 rotateX(${tiltX}deg) 
                                 rotateY(${tiltY}deg) 
                                 scale3d(${config.scale}, ${config.scale}, ${config.scale})`;
            element.style.transition = 'none';
        });

        element.addEventListener('mouseleave', () => {
            isMouseOver = false;
            element.style.transform = `perspective(${config.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            element.style.transition = `transform ${config.speed}ms ${config.easing}`;
        });
    }

    projectCards.forEach(card => applyTiltEffect(card));
    skillCards.forEach(card => applyTiltEffect(card));
}