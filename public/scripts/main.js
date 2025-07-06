document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('#burger');
    const sideNav = document.querySelector('.side-nav');
    burger?.addEventListener('click', () => {
        const isOpen = sideNav?.classList.toggle('nav--open') ?? false;
        burger.setAttribute('aria-expanded', String(isOpen));
    });
});
export {};
