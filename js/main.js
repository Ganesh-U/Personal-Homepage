// main.js - Main module for homepage
import { initConstellation } from "./constellation.js";
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  
  const constellationContainer = document.getElementById("constellationContainer");
  if (constellationContainer) {
    initConstellation();
  }
  
  initSmoothScroll();
});

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href === "#top") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

console.log("Homepage initialized successfully");