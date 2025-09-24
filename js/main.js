// main.js - Main module for homepage
import { initSkills } from './skills.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();

  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer) {
    initSkills();
  }

  initSmoothScroll();
});

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}
