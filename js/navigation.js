// navigation.js - Shared navigation functionality
export function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Animate hamburger to X
    const hamburgers = navToggle.querySelectorAll('.hamburger');
    if (navToggle.classList.contains('active')) {
      hamburgers[0].style.transform = 'rotate(45deg) translateY(8px)';
      hamburgers[1].style.opacity = '0';
      hamburgers[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      hamburgers.forEach((h) => {
        h.style.transform = 'none';
        h.style.opacity = '1';
      });
    }
  });

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      resetHamburger(navToggle);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      resetHamburger(navToggle);
    }
  });

  // Add scroll effect to navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 5px 25px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }

    // Hide/show on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });

  // Set navbar transition
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.transition = 'all 0.3s ease';
  }
}

function resetHamburger(navToggle) {
  const hamburgers = navToggle.querySelectorAll('.hamburger');
  hamburgers.forEach((h) => {
    h.style.transform = 'none';
    h.style.opacity = '1';
  });
}

export default { initNavigation };
