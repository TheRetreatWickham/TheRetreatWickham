
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  /* ─── Laser price-list modal ─── */
  const dlg = document.getElementById('priceModal') as HTMLDialogElement | null;
  const openBtn = document.querySelector<HTMLButtonElement>('[data-open-prices]');

  if (dlg && openBtn) {
    openBtn.addEventListener('click', () => dlg.showModal());
    (dlg.querySelector('.close') as HTMLButtonElement)
        ?.addEventListener('click', () => dlg.close());
  }
});