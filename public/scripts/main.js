if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    /* ─── Laser price-list modal ─── */
    const dlg = document.getElementById('priceModal');
    const openBtn = document.querySelector('[data-open-prices]');
    if (dlg && openBtn) {
        openBtn.addEventListener('click', () => dlg.showModal());
        dlg.querySelector('.close')
            ?.addEventListener('click', () => dlg.close());
    }
});
export {};
