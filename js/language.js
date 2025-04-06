/**
 * Internationalization module - Portfolio Électronique
 * Manages language switching and translations
 */

// Translation data store
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

/**
 * Detect browser language preference
 */
export function detectLanguagePreference() {
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (!savedLanguage) {
        const preferredLanguage = browserLang && browserLang.startsWith('fr') ? 'fr' : 'en';
        localStorage.setItem('preferredLanguage', preferredLanguage);
        console.log(`Browser language detected: ${browserLang} → ${preferredLanguage}`);
    }

    setLanguage(localStorage.getItem('preferredLanguage') || 'fr');
    updateLanguageButtons(localStorage.getItem('preferredLanguage') || 'fr');
}

/**
 * Initialize language selector buttons
 */
export function initLanguageSelector() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    if (!languageButtons.length) return;

    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const language = btn.dataset.lang;

            if (language === localStorage.getItem('preferredLanguage')) return;

            languageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.body.classList.add('lang-changing');

            setTimeout(() => {
                setLanguage(language);
                document.body.classList.remove('lang-changing');
            }, 200);
        });
    });
}

/**
 * Update the language selector buttons to reflect active language
 * @param {string} language - The active language code
 */
function updateLanguageButtons(language) {
    const languageButtons = document.querySelectorAll('.lang-btn');

    languageButtons.forEach(btn => {
        btn.classList[btn.dataset.lang === language ? 'add' : 'remove']('active');
    });
}

/**
 * Set the active language and update UI
 * @param {string} language - Language code ('fr' or 'en')
 */
export function setLanguage(language) {
    if (!language || !translations[language]) {
        language = 'fr';
    }

    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;

    const translationData = translations[language];

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translationData, key);

        if (translation) {
            element.textContent = translation;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(translationData, key);

        if (translation) {
            element.placeholder = translation;
        }
    });

    document.querySelectorAll('[data-i18n-container]').forEach(container => {
        const key = container.getAttribute('data-i18n-container');
        const tagsArray = getNestedTranslation(translationData, key);

        if (Array.isArray(tagsArray)) {
            container.innerHTML = '';

            tagsArray.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                container.appendChild(tagElement);
            });
        }
    });

    updateFormSubmitText(language);
}

/**
 * Get nested translation from a dotted path key (e.g., "nav.about")
 * @param {Object} data - Translation data object
 * @param {string} key - Dotted path key
 * @returns {*} - Translation value or undefined
 */
function getNestedTranslation(data, key) {
    return key.split('.').reduce((obj, i) => obj && obj[i], data);
}

/**
 * Update form submit button text based on language
 * @param {string} language - Language code
 */
function updateFormSubmitText(language) {
    const submitButton = document.querySelector('.contact-form .submit-button');
    if (submitButton) {
        submitButton.textContent = translations[language].contact.form.submit;
    }
}