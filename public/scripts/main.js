if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    // ────────────────────────────────────────────────
    // Existing modal dialogs (price + eye treatment)
    // ────────────────────────────────────────────────
    const priceDlg = document.getElementById('priceModal');
    const priceBtn = document.querySelector('[data-open-prices]');
    if (priceDlg && priceBtn) {
        priceBtn.addEventListener('click', () => priceDlg.showModal());
        priceDlg.querySelector('.close')
            ?.addEventListener('click', () => priceDlg.close());
    }
    const eyeDlg = document.getElementById('eyeModal');
    const eyeBtn = document.querySelector('[data-open-eye-treatment]');
    if (eyeDlg && eyeBtn) {
        eyeBtn.addEventListener('click', () => eyeDlg.showModal());
        eyeDlg.querySelector('.close')
            ?.addEventListener('click', () => eyeDlg.close());
    }
    // ────────────────────────────────────────────────
    // 1. Mobile hamburger menu
    // ────────────────────────────────────────────────
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.nav-overlay');
    function closeMenu() {
        burger?.classList.remove('is-open');
        nav?.classList.remove('is-open');
        overlay?.classList.remove('is-visible');
        burger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    function openMenu() {
        burger?.classList.add('is-open');
        nav?.classList.add('is-open');
        overlay?.classList.add('is-visible');
        burger?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    burger?.addEventListener('click', () => {
        const isOpen = burger.classList.contains('is-open');
        isOpen ? closeMenu() : openMenu();
    });
    overlay?.addEventListener('click', closeMenu);
    // Submenu tap-to-expand on mobile
    const hasSubs = document.querySelectorAll('.has-sub');
    hasSubs.forEach((li) => {
        const topLink = li.querySelector(':scope > a');
        topLink?.addEventListener('click', (e) => {
            // Only intercept on mobile (when burger is visible)
            if (burger && window.getComputedStyle(burger).display !== 'none') {
                e.preventDefault();
                li.classList.toggle('is-expanded');
            }
        });
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            closeMenu();
    });
    // ────────────────────────────────────────────────
    // 2. Scroll reveal (IntersectionObserver)
    // ────────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        });
        reveals.forEach((el) => observer.observe(el));
    }
    // ────────────────────────────────────────────────
    // 3a. Scroll-to-top button
    // ────────────────────────────────────────────────
    const scrollBtn = document.querySelector('.scroll-top');
    if (scrollBtn) {
        const toggleScrollBtn = () => {
            const show = window.scrollY > 400;
            scrollBtn.classList.toggle('is-visible', show);
        };
        window.addEventListener('scroll', toggleScrollBtn, { passive: true });
        toggleScrollBtn();
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // ────────────────────────────────────────────────
    // 3b. Active nav highlighting
    // ────────────────────────────────────────────────
    // ── Active nav highlighting ──
    const currentPath = window.location.pathname;
    document.querySelectorAll('.main-nav > ul > li > a').forEach((link) => {
        // Skip hash-only links (like the Treatments dropdown toggle)
        if (link.getAttribute('href')?.startsWith('#'))
            return;
        const linkPath = new URL(link.href, window.location.origin).pathname;
        const isActive = linkPath === currentPath ||
            (currentPath === '/' && linkPath === '/index.html');
        if (isActive) {
            link.classList.add('is-active');
        }
    });
    // ────────────────────────────────────────────────
    // Existing form validation
    // (Wrapped in if-block instead of early return,
    //  so the code above runs on all pages)
    // ────────────────────────────────────────────────
    const form = document.querySelector('.newsletter-form');
    if (form) {
        const inputs = Array.from(form.querySelectorAll('input[name]'));
        const messageFor = (input) => {
            if (input.validity.valueMissing)
                return 'This field is required.';
            if (input.validity.typeMismatch && input.type === 'email')
                return 'Please enter a valid email address.';
            if (input.validity.tooShort) {
                const min = input.getAttribute('minlength') ?? '2';
                return `Please enter at least ${min} characters.`;
            }
            return input.validationMessage;
        };
        const updateError = (input) => {
            const errorEl = input.nextElementSibling;
            if (!errorEl)
                return;
            if (input.validity.valid) {
                input.classList.remove('is-invalid');
                errorEl.textContent = '';
            }
            else {
                input.classList.add('is-invalid');
                errorEl.textContent = messageFor(input);
            }
        };
        inputs.forEach((input) => {
            input.addEventListener('input', () => updateError(input));
            input.addEventListener('blur', () => updateError(input));
        });
        form.addEventListener('submit', (e) => {
            inputs.forEach(updateError);
            const firstInvalid = inputs.find((i) => !i.validity.valid);
            if (firstInvalid) {
                e.preventDefault();
                firstInvalid.focus();
            }
        });
    }
});
window.addEventListener('pageshow', () => {
    document.querySelector('.newsletter-form')?.reset();
});
export {};
