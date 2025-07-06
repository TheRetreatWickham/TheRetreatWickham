document.addEventListener('DOMContentLoaded', () => {
  const burger  = document.querySelector<HTMLButtonElement>('#burger');
  const sideNav = document.querySelector<HTMLElement>('.side-nav');

  burger?.addEventListener('click', () => {
    const isOpen = sideNav?.classList.toggle('nav--open') ?? false;
    burger.setAttribute('aria-expanded', String(isOpen));
  });
});
