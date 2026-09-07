const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  const icon = menuToggle.querySelector('.menu-toggle-icon');
  if (icon) icon.textContent = '☰';
};

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
    const icon = menuToggle.querySelector('.menu-toggle-icon');
    if (icon) icon.textContent = isOpen ? '☰' : '×';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const selector = link.getAttribute('href');
    const target = selector ? document.querySelector(selector) : null;
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
      block: 'start',
    });
    history.replaceState(null, '', selector);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = String(new Date().getFullYear());
