// navigation.js - Shared navigation functionality

/**
 * Initialize navigation for all pages
 */
export function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  
  if (!navToggle || !navMenu) return;
  
  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
    
    // Animate hamburger to X
    if (navToggle.classList.contains("active")) {
      navToggle.children[0].style.transform = "rotate(45deg) translateY(8px)";
      navToggle.children[1].style.opacity = "0";
      navToggle.children[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
      navToggle.children[0].style.transform = "none";
      navToggle.children[1].style.opacity = "1";
      navToggle.children[2].style.transform = "none";
    }
  });
  
  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      
      // Reset hamburger
      navToggle.children[0].style.transform = "none";
      navToggle.children[1].style.opacity = "1";
      navToggle.children[2].style.transform = "none";
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      
      // Reset hamburger
      if (navToggle) {
        navToggle.children[0].style.transform = "none";
        navToggle.children[1].style.opacity = "1";
        navToggle.children[2].style.transform = "none";
      }
    }
  });
  
  // Add scroll effect to navbar
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.style.boxShadow = "0 5px 25px rgba(0,0,0,0.4)";
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    }
    
    // Hide/show on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    
    lastScroll = currentScroll;
  });
  
  // Set navbar transition
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.transition = "all 0.3s ease";
  }
}

// Export for use in other modules
export default {
  initNavigation
};