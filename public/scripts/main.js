// disable browser “remembered” scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
document.addEventListener('DOMContentLoaded', () => {
    // 1) Snap to top on every page‐nav click
    window.scrollTo(0, 0);
    // 2) Normalize paths (strip trailing slash + .html)
    const normalize = (p) => p.replace(/\/?$/, '').replace(/\.html$/, '');
    const currentPath = normalize(window.location.pathname);
    // Tell TS these really are anchors
    const navLinks = document.querySelectorAll('.side-nav a');
    navLinks.forEach(link => {
        link.classList.remove('is-active');
        const rawHref = link.getAttribute('href') || '';
        // only internal links
        if (!rawHref.startsWith('/'))
            return;
        // Build a URL from the raw href (so we don’t pick up hashes or queries)
        const linkPath = normalize(new URL(rawHref, location.origin).pathname);
        if (linkPath === currentPath) {
            link.classList.add('is-active');
        }
    });
});
export {};
