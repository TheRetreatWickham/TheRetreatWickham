if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    /* ─── Laser price-list modal ─── */
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
});
export {};
