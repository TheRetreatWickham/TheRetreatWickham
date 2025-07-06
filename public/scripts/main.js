// disable browser “remembered” scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
document.addEventListener('DOMContentLoaded', () => {
    // jump to top
    window.scrollTo(0, 0);
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.side-nav a');
    // clear every highlight
    navLinks.forEach(link => link.classList.remove('is-active'));
    // only look at links that start with “/”
    navLinks.forEach(link => {
        const raw = link.getAttribute('href') || '';
        if (!raw.startsWith('/'))
            return;
        try {
            const linkPath = new URL(link.href, location.origin).pathname;
            if (linkPath === currentPath) {
                link.classList.add('is-active');
            }
        }
        catch {
            // skip invalid URLs
        }
    });
});
export {};
