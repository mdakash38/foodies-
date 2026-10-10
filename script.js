
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');

        root.classList.toggle('dark', !isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

function initTypingAnimation() {
    const targetElement = document.getElementById('typing-text');

    if (!targetElement) return;

    const textSequence = [
        'Department of Software Engineering',
        '2nd Year 1st Semester Student',
        'University of Frontier Technology, Bangladesh'
    ];

    let partIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeAnimation() {
        const currentPart = textSequence[partIdx];

        if (isDeleting) {
            targetElement.textContent = currentPart.substring(0, charIdx - 1);
            charIdx--;
        } else {
            targetElement.textContent = currentPart.substring(0, charIdx + 1);
            charIdx++;
        }

        let dynamicSpeed = isDeleting ? 35 : 65;

        if (!isDeleting && charIdx === currentPart.length) {
            dynamicSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            partIdx = (partIdx + 1) % textSequence.length;
            dynamicSpeed = 450;
        }

        setTimeout(typeAnimation, dynamicSpeed);
    }

    setTimeout(typeAnimation, 600);
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    const statusMessage = document.getElementById('contact-form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!statusMessage || !submitButton) return;

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        submitButton.disabled = true;
        statusMessage.textContent = 'Sending your message...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                statusMessage.textContent =
                    `Your message could not be sent (HTTP ${response.status}). Please try again later.`;
                return;
            }

            contactForm.reset();
            statusMessage.textContent = 'Thanks! Your message was sent successfully.';
        } catch (error) {
            console.error('Contact form submission failed:', error);
            statusMessage.textContent =
                'Could not connect to the message service. Check your connection and try again.';
        } finally {
            submitButton.disabled = false;
        }
    });
}

function initUi() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    if (window.AOS && typeof window.AOS.init === 'function') {
        window.AOS.init({
            duration: 500,
            once: true,
            offset: 30
        });
    }

    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initContactForm();
}

document.addEventListener('DOMContentLoaded', initUi);
