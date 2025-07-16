if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  /* ─── Laser price-list modal ─── */
  const priceDlg = document.getElementById('priceModal') as HTMLDialogElement | null;
  const priceBtn = document.querySelector<HTMLButtonElement>('[data-open-prices]');
  if (priceDlg && priceBtn) {
    priceBtn.addEventListener('click', () => priceDlg.showModal());
    priceDlg.querySelector<HTMLButtonElement>('.close')
      ?.addEventListener('click', () => priceDlg.close());
  }


  const eyeDlg = document.getElementById('eyeModal') as HTMLDialogElement | null;
  const eyeBtn = document.querySelector<HTMLButtonElement>('[data-open-eye-treatment]');
  if (eyeDlg && eyeBtn) {
    eyeBtn.addEventListener('click', () => eyeDlg.showModal());
    eyeDlg.querySelector<HTMLButtonElement>('.close')
      ?.addEventListener('click', () => eyeDlg.close());
  }
});
