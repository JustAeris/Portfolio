/**
 * Portfolio Électronique - Script JavaScript
 *
 * Ce script gère les interactions utilisateur du portfolio.
 */

// Traductions
const translations = {
    fr: {
        nav: {
            about: "À propos",
            skills: "Compétences",
            projects: "Projets",
            contact: "Contact"
        },
        hero: {
            subtitle: "Passionné d'Électronique & Développeur Embarqué",
            cta_primary: "Découvrir mes projets",
            cta_secondary: "Me contacter"
        },
        about: {
            title: "À propos de moi",
            paragraph: "Passionné d'électronique depuis mon plus jeune âge, je me suis lancé dans la création de projets embarqués pour développer mes compétences. Bien que débutant, j'ai déjà réalisé plusieurs montages fonctionnels qui m'ont permis d'apprendre les bases des microcontrôleurs, des capteurs et de la programmation embarquée. Mon objectif est de continuer à améliorer mes connaissances pour pouvoir créer des systèmes électroniques plus complexes et utiles au quotidien."
        },
        skills: {
            title: "Compétences Techniques",
            skill1: {
                title: "Microcontrôleurs",
                tags: ["Arduino", "ESP32", "STM32"]
            },
            skill2: {
                title: "Conception de Circuits",
                tags: ["Breadboarding", "KiCad", "PCB"]
            },
            skill3: {
                title: "Programmation",
                tags: ["C/C++", "C#", "Python", "Arduino IDE", "STM32CubeIDE"]
            },
            skill4: {
                title: "Systèmes Embarqués",
                tags: ["Firmware", "Électronique numérique", "IoT", "Capteurs"]
            }
        },
        projects: {
            title: "Mes Projets",
            view: "Voir le projet",
            code: "Code source",
            project1: {
                title: "Station Météo Arduino",
                description: "Station météo basée sur Arduino avec capteurs de température, d'humidité et de pression atmosphérique. Affichage sur écran LCD."
            },
            project2: {
                title: "Système d'Éclairage LED RGB",
                description: "Contrôle de LEDs RGB via ESP32 avec interface web pour changer les couleurs et les modes d'animation."
            },
            project3: {
                title: "Système d'Arrosage Automatique",
                description: "Système d'arrosage automatique avec capteur d'humidité du sol, pompe à eau et contrôleur Arduino."
            }
        },
        contact: {
            title: "Me Contacter",
            intro: "Vous avez une question ou un projet en tête ? N'hésitez pas à me contacter !",
            form: {
                name: "Nom",
                name_placeholder: "Votre nom",
                email: "Email",
                email_placeholder: "Votre email",
                message: "Message",
                message_placeholder: "Votre message",
                submit: "Envoyer le message"
            }
        },
        footer: {
            copyright: "© 2025 Portfolio Électronique. Tous droits réservés."
        }
    },
    en: {
        nav: {
            about: "About",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            subtitle: "Electronics Enthusiast & Embedded Developer",
            cta_primary: "Discover my projects",
            cta_secondary: "Contact me"
        },
        about: {
            title: "About me",
            paragraph: "Passionate about electronics since a young age, I started creating embedded projects to develop my skills. Although a beginner, I have already built several functional systems that allowed me to learn the basics of microcontrollers, sensors, and embedded programming. My goal is to continue improving my knowledge to create more complex and useful electronic systems for everyday life."
        },
        skills: {
            title: "Technical Skills",
            skill1: {
                title: "Microcontrollers",
                tags: ["Arduino", "ESP32", "STM32"]
            },
            skill2: {
                title: "Circuit Design",
                tags: ["Breadboarding", "KiCad", "PCB"]
            },
            skill3: {
                title: "Programming",
                tags: ["C/C++", "C#", "Python", "Arduino IDE", "STM32CubeIDE"]
            },
            skill4: {
                title: "Embedded Systems",
                tags: ["Firmware", "Digital electronics", "IoT", "Sensors"]
            }
        },
        projects: {
            title: "My Projects",
            view: "View project",
            code: "Source code",
            project1: {
                title: "Arduino Weather Station",
                description: "Arduino-based weather station with temperature, humidity, and atmospheric pressure sensors. LCD display output."
            },
            project2: {
                title: "RGB LED Lighting System",
                description: "Control of RGB LEDs via ESP32 with web interface to change colors and animation modes."
            },
            project3: {
                title: "Automatic Watering System",
                description: "Automatic watering system with soil moisture sensor, water pump, and Arduino controller."
            }
        },
        contact: {
            title: "Contact Me",
            intro: "Have a question or project in mind? Feel free to contact me!",
            form: {
                name: "Name",
                name_placeholder: "Your name",
                email: "Email",
                email_placeholder: "Your email",
                message: "Message",
                message_placeholder: "Your message",
                submit: "Send message"
            }
        },
        footer: {
            copyright: "© 2025 Electronics Portfolio. All rights reserved."
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Détection et initialisation des préférences utilisateur
    detectBrowserPreferences();

    // Initialisation des fonctionnalités
    initMobileMenu();
    initSkillBars();
    initScrollAnimation();
    initLanguageSelector();
    initThemeToggle();
    initSmoothScroll();

    // Nouvelles fonctionnalités
    initParticlesBackground();
    initTypingEffect();
    initAnimatedTags();
    initParallaxEffect();
    initCardTiltEffect();
    initScrollProgress();
    initLogoAnimation();
});

/**
 * Initialise l'animation du logo SVG
 */
function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    // Appliquer un effet de pulsation subtil
    logo.addEventListener('mouseenter', () => {
        const logoSvg = logo.querySelector('.logo-svg');
        if (logoSvg) {
            logoSvg.classList.add('active');
        }
    });

    logo.addEventListener('mouseleave', () => {
        const logoSvg = logo.querySelector('.logo-svg');
        if (logoSvg) {
            logoSvg.classList.remove('active');
        }
    });
}

/**
 * Détecte les préférences du navigateur (langue et thème) et les applique
 */
function detectBrowserPreferences() {
    // 1. Détection de la langue du navigateur
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLanguage = localStorage.getItem('preferredLanguage');

    // Appliquer la langue en fonction des priorités:
    // 1. Préférence utilisateur sauvegardée
    // 2. Langue du navigateur
    // 3. Français par défaut
    if (!savedLanguage) {
        // Si aucune préférence n'est sauvegardée, utiliser la langue du navigateur
        const preferredLanguage = browserLang && browserLang.startsWith('fr') ? 'fr' : 'en';
        localStorage.setItem('preferredLanguage', preferredLanguage);
        console.log(`Langue détectée à partir du navigateur: ${browserLang} → ${preferredLanguage}`);
    }

    // 2. Détection du thème du navigateur
    const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Appliquer le thème en fonction des priorités:
    // 1. Préférence utilisateur sauvegardée
    // 2. Préférence système (dark/light mode)
    if (!savedTheme && prefersDarkScheme) {
        localStorage.setItem('theme', 'dark');
        console.log('Thème sombre détecté dans les préférences système');
    }
}

/**
 * Initialise le menu mobile (hamburger)
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const body = document.body;

    if (!hamburger || !navLinks) return;

    // Ajouter des indices pour l'animation séquentielle
    navLinksItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    hamburger.addEventListener('click', () => {
        // Toggle du menu et de la classe active du hamburger
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Bloquer le défilement lorsque le menu est ouvert
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Fermer le menu lors d'un clic sur un lien
    navLinksItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        }
    });

    // Fermer le menu lorsqu'on clique en dehors
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) &&
            !navLinks.contains(e.target) &&
            navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

/**
 * Initialise l'animation des barres de compétences
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    skillBars.forEach(bar => {
        // Déclencher l'animation lors du défilement
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        bar.style.width = '100%';
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bar);
    });
}

/**
 * Initialise les animations de défilement pour les éléments
 */
function initScrollAnimation() {
    // Sélectionne les éléments à animer
    const elements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.about-image'),
        ...document.querySelectorAll('.about-text p'),
        ...document.querySelectorAll('.bio-text p'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form')
    ];

    // Ajoute la classe pour l'animation
    elements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Observer pour déclencher l'animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialise le sélecteur de langue et la gestion des traductions
 */
function initLanguageSelector() {
    const languageButtons = document.querySelectorAll('.lang-btn');

    // Récupérer la langue préférée depuis localStorage ou utiliser la détection automatique
    const currentLanguage = localStorage.getItem('preferredLanguage');

    // Appliquer la langue détectée ou sauvegardée
    setLanguage(currentLanguage);

    // Mettre à jour l'interface pour refléter la langue active
    languageButtons.forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            const language = btn.dataset.lang;

            // Ne rien faire si la langue actuelle est déjà sélectionnée
            if (language === localStorage.getItem('preferredLanguage')) return;

            // Mettre à jour la classe active
            languageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Animation de transition
            document.body.classList.add('lang-changing');

            // Changer la langue avec un léger délai pour l'animation
            setTimeout(() => {
                setLanguage(language);
                document.body.classList.remove('lang-changing');

                // Mise à jour de l'attribut lang du document HTML
                document.documentElement.lang = language;
            }, 200);
        });
    });
}

/**
 * Applique les traductions pour la langue spécifiée
 */
function setLanguage(language) {
    // Vérification de sécurité - utiliser 'fr' par défaut si language n'est pas valide
    if (!language || !translations[language]) {
        language = 'fr';
    }

    // Sauvegarder la préférence
    localStorage.setItem('preferredLanguage', language);

    // Mettre à jour l'attribut lang du document HTML
    document.documentElement.lang = language;

    // Récupérer les traductions
    const translationData = translations[language];

    // Parcourir tous les éléments avec un attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translationData, key);

        if (translation) {
            element.textContent = translation;
        }
    });

    // Gérer les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(translationData, key);

        if (translation) {
            element.placeholder = translation;
        }
    });

    // Gérer les conteneurs de tags
    document.querySelectorAll('[data-i18n-container]').forEach(container => {
        const key = container.getAttribute('data-i18n-container');
        const tagsArray = getNestedTranslation(translationData, key);

        if (Array.isArray(tagsArray)) {
            // Vider le conteneur
            container.innerHTML = '';

            // Ajouter chaque tag
            tagsArray.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                container.appendChild(tagElement);
            });
        }
    });

    // Mettre à jour le texte du bouton de soumission du formulaire en fonction de la langue
    updateFormSubmitText(language);
}

/**
 * Récupère une traduction imbriquée à partir d'un chemin de clé (ex: "nav.about")
 */
function getNestedTranslation(data, key) {
    return key.split('.').reduce((obj, i) => obj && obj[i], data);
}

/**
 * Met à jour le texte et comportement du bouton de formulaire en fonction de la langue
 */
function updateFormSubmitText(language) {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitText = translations[language].contact.form.submit;
    const submitBtn = form.querySelector('.submit-button');
    submitBtn.textContent = submitText;

    // Textes localisés pour le formulaire
    const loadingText = language === 'fr' ? 'Envoi en cours...' : 'Sending...';
    const successText = language === 'fr' ? 'Message envoyé !' : 'Message sent!';

    form.onsubmit = function(e) {
        e.preventDefault();

        submitBtn.textContent = loadingText;
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = successText;
            submitBtn.style.backgroundColor = '#10b981';

            // Réinitialiser le formulaire
            form.reset();

            // Afficher animation de succès
            const successAnim = document.createElement('div');
            successAnim.className = 'success-animation';
            form.appendChild(successAnim);

            // Retirer l'animation après qu'elle soit terminée
            setTimeout(() => {
                successAnim.remove();
            }, 1500);

            // Rétablir le bouton après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = submitText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    };
}

/**
 * Initialise le toggle de thème clair/sombre
 */
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;

    // Récupérer le thème préféré depuis localStorage ou système
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDarkTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Appliquer le thème
    applyTheme(isDarkTheme);
    themeSwitch.checked = isDarkTheme;

    // Écouter les changements du toggle
    themeSwitch.addEventListener('change', function() {
        // Bloquer les interactions pendant la transition
        document.body.classList.add('theme-transition');

        // Application du thème avec un délai minimal pour permettre au navigateur de traiter les changements
        setTimeout(() => {
            applyTheme(this.checked);

            // Retirer la classe de transition après un court délai
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300); // Durée identique à la transition CSS
        }, 50);
    });

    // Écouter les changements de préférence système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            // Bloquer les interactions pendant la transition
            document.body.classList.add('theme-transition');

            setTimeout(() => {
                applyTheme(e.matches);
                themeSwitch.checked = e.matches;

                // Retirer la classe de transition après un court délai
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 300);
            }, 50);
        }
    });
}

/**
 * Applique le thème clair ou sombre
 * @param {boolean} isDark - true pour le thème sombre, false pour le thème clair
 */
function applyTheme(isDark) {
    if (isDark) {
        // Thème sombre
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        // Thème clair
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }

    // Mettre à jour les particules si elles existent
    if (window.particlesInstance) {
        const particlesColor = isDark ? '#ffffff' : '#0f172a';
        window.particlesInstance.options.particles.color.value = particlesColor;
        window.particlesInstance.refresh();
    }
}

/**
 * Initialise le défilement fluide pour les liens d'ancrage
 */
function initSmoothScroll() {
    // Sélectionner tous les liens qui pointent vers des ancres
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Obtenir la cible du lien
            const targetId = this.getAttribute('href');

            // Ne rien faire si le lien est "#" (parfois utilisé comme placeholder)
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculer la position de défilement avec un petit décalage pour la barre de navigation
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // Effectuer le défilement fluide
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fermer le menu mobile si ouvert
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');

                    // Réinitialiser l'animation du hamburger si nécessaire
                    const hamburger = document.getElementById('hamburger');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });
}

/**
 * Initialise l'effet de fond de particules pour la section hero
 */
function initParticlesBackground() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-bg", {
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
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
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        }).then(container => {
            window.particlesInstance = container;

            // Adapter la couleur au thème
            const isDarkTheme = document.documentElement.classList.contains('dark-theme');
            if (!isDarkTheme) {
                container.options.particles.color.value = '#0f172a';
                container.options.particles.line_linked.color = '#0f172a';
                container.refresh();
            }
        });
    }
}

/**
 * Initialise l'effet de frappe pour le sous-titre de la section hero
 */
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    // Sauvegarder le texte original
    const originalText = subtitle.textContent;
    // Vider l'élément
    subtitle.textContent = '';

    // Ajouter la classe pour le curseur clignotant
    subtitle.classList.add('typing-effect');

    let i = 0;
    // Fonction pour ajouter les caractères un par un
    function typeWriter() {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Vitesse de frappe
        } else {
            // Retirer la classe du curseur quand l'animation est terminée
            setTimeout(() => {
                subtitle.classList.remove('typing-effect');
            }, 1500);
        }
    }

    // Démarrer l'animation avec un court délai
    setTimeout(typeWriter, 800);
}

/**
 * Initialise les animations pour les tags de compétences de manière simplifiée
 */
function initAnimatedTags() {
    const tagElements = document.querySelectorAll('.tag');

    tagElements.forEach((tag, index) => {
        // Appliquer une animation avec un délai basé sur l'index
        // pour une séquence prévisible plutôt qu'aléatoire
        tag.style.animationDelay = `${0.1 * index}s`;
        tag.classList.add('animated-tag');
    });
}

/**
 * Initialise l'effet de parallaxe uniquement pour l'image "about"
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');

    // Fonction pour appliquer l'effet de parallaxe
    function applyParallax() {
        const scrollTop = window.pageYOffset;

        parallaxElements.forEach(element => {
            // Ne pas appliquer l'effet aux titres de section
            if (!element.classList.contains('section-title')) {
                const speed = element.getAttribute('data-speed') || 0.5;
                const offset = scrollTop * speed;
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    // Ajouter la classe parallax et data-speed uniquement aux images about
    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('parallax');
        el.setAttribute('data-speed', '0.2');
    });

    // Retirer la classe parallax des titres de section
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.remove('parallax');
    });

    // Écouter l'événement de défilement
    window.addEventListener('scroll', applyParallax);
}

/**
 * Initialise l'effet d'inclinaison 3D pour les cartes de projets
 */
function initCardTiltEffect() {
    const projects = document.querySelectorAll('.project-card');
    const skills = document.querySelectorAll('.skill-card');

    // Configuration de l'effet
    const config = {
        reverse: true,
        max: 10,
        perspective: 1000,
        scale: 1.03,
        speed: 500,
        transition: true,
        reset: true,
        easing: "cubic-bezier(.03,.98,.52,.99)"
    };

    // Appliquer l'effet manuellement
    function applyTiltEffect(element) {
        if (!element) return;

        // Bounding box
        let box = element.getBoundingClientRect();

        element.addEventListener('mousemove', (e) => {
            // Recalculer la bounding box à chaque mouvement pour plus de précision
            box = element.getBoundingClientRect();

            // Calculer la position relative de la souris dans l'élément
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;

            // Calculer les positions en pourcentage
            const xPercent = x / box.width;
            const yPercent = y / box.height;

            // Calculer l'inclinaison (de -max à max)
            const tiltX = (config.max * 2 * (0.5 - yPercent)).toFixed(2);
            const tiltY = (config.max * 2 * (xPercent - 0.5)).toFixed(2);

            // Appliquer les transformations
            element.style.transform = `perspective(${config.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${config.scale}, ${config.scale}, ${config.scale})`;
            element.style.transition = `none`;
        });

        // Réinitialiser l'élément lorsque la souris le quitte
        element.addEventListener('mouseleave', () => {
            element.style.transform = `perspective(${config.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            element.style.transition = `transform ${config.speed}ms ${config.easing}`;
        });
    }

    // Appliquer l'effet aux cartes de projets
    projects.forEach(project => {
        applyTiltEffect(project);
    });

    // Appliquer l'effet aux cartes de compétences
    skills.forEach(skill => {
        applyTiltEffect(skill);
    });
}

/**
 * Initialise la barre de progression de défilement
 */
function initScrollProgress() {
    // Créer la barre de progression
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Fonction pour mettre à jour la barre de progression
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollPercentage = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;

        // Ajouter/retirer la classe visible en fonction du défilement
        if (scrollTop > 100) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
        }
    }

    // Écouter l'événement de défilement
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);

    // Initialiser
    updateProgressBar();
}