/**
 * Form module - Portfolio Électronique
 * Handles form submission and validation
 */

/**
 * Initialize contact form with validation and submission handling
 */
export function initContactForm() {
    try {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const submitBtn = form.querySelector('.submit-button');
        if (!submitBtn) return;

        const currentLanguage = localStorage.getItem('preferredLanguage') || 'fr';

        const messages = {
            fr: {
                loading: "Envoi en cours...",
                success: "Message envoyé !",
                error: "Erreur lors de l'envoi",
                empty: "Veuillez remplir tous les champs",
                invalidEmail: "Email invalide"
            },
            en: {
                loading: "Sending...",
                success: "Message sent!",
                error: "Error sending message",
                empty: "Please fill all fields",
                invalidEmail: "Invalid email"
            }
        };

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = form.querySelector('#name');
            const emailInput = form.querySelector('#email');
            const messageInput = form.querySelector('#message');

            if (!validateForm(nameInput, emailInput, messageInput, messages[currentLanguage])) {
                return;
            }

            submitBtn.textContent = messages[currentLanguage].loading;
            submitBtn.disabled = true;

            simulateFormSubmission(form, submitBtn, messages[currentLanguage]);
        });

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');

                if (input.id === 'email' && input.value) {
                    if (!isValidEmail(input.value)) {
                        input.classList.add('error');
                    }
                }
            });
        });
    } catch (err) {
        console.error("Error initializing contact form:", err);
    }
}

/**
 * Validate form inputs
 * @param {HTMLElement} nameInput - Name input element
 * @param {HTMLElement} emailInput - Email input element
 * @param {HTMLElement} messageInput - Message input element
 * @param {Object} messages - Localized messages
 * @returns {boolean} - True if form is valid
 */
function validateForm(nameInput, emailInput, messageInput, messages) {
    let isValid = true;

    if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
    } else {
        nameInput.classList.remove('error');
    }

    if (!emailInput.value.trim()) {
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        showTemporaryMessage(messages.invalidEmail, 'error');
        isValid = false;
    } else {
        emailInput.classList.remove('error');
    }

    if (!messageInput.value.trim()) {
        messageInput.classList.add('error');
        isValid = false;
    } else {
        messageInput.classList.remove('error');
    }

    if (!isValid) {
        showTemporaryMessage(messages.empty, 'error');
    }

    return isValid;
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show temporary message near the form button
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showTemporaryMessage(message, type = 'success') {
    let messageElement = document.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';

        messageElement.style.padding = '8px 12px';
        messageElement.style.marginTop = '10px';
        messageElement.style.borderRadius = '4px';
        messageElement.style.textAlign = 'center';
        messageElement.style.fontSize = '0.9rem';
        messageElement.style.transition = 'opacity 0.3s ease';

        const submitBtn = document.querySelector('.submit-button');
        if (submitBtn) {
            submitBtn.parentNode.insertBefore(messageElement, submitBtn.nextSibling);
        }
    }

    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;

    if (type === 'error') {
        messageElement.style.backgroundColor = 'rgba(244, 63, 94, 0.1)';
        messageElement.style.color = '#f43f5e';
        messageElement.style.border = '1px solid rgba(244, 63, 94, 0.3)';
    } else {
        messageElement.style.backgroundColor = 'rgba(45, 212, 191, 0.1)';
        messageElement.style.color = '#0f766e';
        messageElement.style.border = '1px solid rgba(45, 212, 191, 0.3)';
    }

    messageElement.style.opacity = '1';

    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}

/**
 * Simulate form submission with loading and success states
 * @param {HTMLElement} form - Form element
 * @param {HTMLElement} submitBtn - Submit button element
 * @param {Object} messages - Localized messages
 */
function simulateFormSubmission(form, submitBtn, messages) {
    setTimeout(() => {
        submitBtn.textContent = messages.success;
        submitBtn.style.backgroundColor = '#10b981';

        form.reset();

        const successAnim = document.createElement('div');
        successAnim.className = 'success-animation';
        form.appendChild(successAnim);

        setTimeout(() => {
            successAnim.remove();
        }, 1500);

        setTimeout(() => {
            submitBtn.textContent = form.getAttribute('data-submit-text') || messages.submit;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
}