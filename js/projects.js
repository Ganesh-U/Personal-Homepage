// projects.js - Circular menu with proper positioning
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize navigation
  initNavigation();
  
  // Initialize projects after a delay to ensure CSS is loaded
  setTimeout(() => {
    initCircularMenu();
  }, 200);
});

/**
 * Initialize circular menu interactions
 */
function initCircularMenu() {
  const menu = document.getElementById("circularMenu");
  const menuItems = document.querySelectorAll(".menu-item");
  const projectPopup = document.getElementById("projectPopup");
  const closeBtn = document.getElementById("popupClose");
  const popupContents = document.querySelectorAll(".popup-content");
  
  if (!menu || !menuItems.length || !projectPopup) {
    console.log("Required elements not found");
    return;
  }

  // Remove any existing positioning from CSS and position with JavaScript
  positionItemsAroundCenter(menuItems);
  
  // Stop rotation on hover
  menu.addEventListener("mouseenter", () => {
    menu.style.animationPlayState = "paused";
    
    const centerText = menu.querySelector(".center-text");
    if (centerText) {
      centerText.style.animationPlayState = "paused";
    }
    
    menu.querySelectorAll(".item-label").forEach(label => {
      label.style.animationPlayState = "paused";
    });
  });
  
  menu.addEventListener("mouseleave", () => {
    menu.style.animationPlayState = "running";
    
    const centerText = menu.querySelector(".center-text");
    if (centerText) {
      centerText.style.animationPlayState = "running";
    }
    
    menu.querySelectorAll(".item-label").forEach(label => {
      label.style.animationPlayState = "running";
    });
  });
  
  // Menu item interactions
  menuItems.forEach((item, index) => {
    // Initial animation
    item.style.opacity = "0";
    item.style.transform = "translate(-50%, -50%) scale(0)";
    
    setTimeout(() => {
      item.style.transition = "all 0.5s ease";
      item.style.opacity = "1";
      item.style.transform = "translate(-50%, -50%) scale(1)";
    }, index * 100 + 500);
    
    // Click handler
    item.addEventListener("click", () => {
      const projectId = item.dataset.project;
      showProjectPopup(projectId);
    });
    
    // Hover effects
    item.addEventListener("mouseenter", () => {
      const dot = item.querySelector(".item-dot");
      if (dot) dot.style.transform = "scale(1.2)";
    });
    
    item.addEventListener("mouseleave", () => {
      const dot = item.querySelector(".item-dot");
      if (dot) dot.style.transform = "scale(1)";
    });
  });
  
  // Reposition on window resize
  window.addEventListener("resize", () => {
    positionItemsAroundCenter(menuItems);
  });
  
  // Popup controls
  if (closeBtn) {
    closeBtn.addEventListener("click", hideProjectPopup);
  }
  
  // Close popup with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectPopup.classList.contains("active")) {
      hideProjectPopup();
    }
  });
  
  // Close popup when clicking outside
  document.addEventListener("click", (e) => {
    if (projectPopup.classList.contains("active") && 
        !projectPopup.contains(e.target) && 
        !e.target.closest(".menu-item")) {
      hideProjectPopup();
    }
  });

  /**
   * Position menu items in a perfect circle around the center
   */
  function positionItemsAroundCenter(items) {
    const container = document.querySelector(".circular-menu");
    const centerElement = document.querySelector(".menu-center");
    
    if (!container || !centerElement || !items.length) {
      console.log("Cannot position items - missing elements");
      return;
    }

    // Wait for elements to have dimensions
    if (container.offsetWidth === 0 || centerElement.offsetWidth === 0) {
      console.log("Elements not ready, retrying...");
      setTimeout(() => positionItemsAroundCenter(items), 100);
      return;
    }

    // Get the actual center of the container (where the PROJECTS circle should be)
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Calculate positioning radius
    const centerCircleRadius = centerElement.offsetWidth / 2;
    const itemRadius = items[0].offsetWidth / 2;
    
    // Position items so they don't overlap with center circle
    // Radius = center circle radius + item radius + gap
    const gap = 20;
    const positioningRadius = centerCircleRadius + itemRadius + gap;

    console.log(`Positioning ${items.length} items:`);
    console.log(`Container: ${containerWidth} x ${containerHeight}`);
    console.log(`Center: (${centerX}, ${centerY})`);
    console.log(`Positioning radius: ${positioningRadius}`);

    items.forEach((item, index) => {
      // Calculate angle for this item (starting from top, going clockwise)
      const angleStep = (2 * Math.PI) / items.length;
      const angle = (index * angleStep) - (Math.PI / 2); // Start from top
      
      // Calculate position
      const x = centerX + Math.cos(angle) * positioningRadius;
      const y = centerY + Math.sin(angle) * positioningRadius;
      
      // Apply positioning
      item.style.position = "absolute";
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.transform = "translate(-50%, -50%)";
      
      console.log(`Item ${index}: angle=${Math.round(angle * 180 / Math.PI)}°, position=(${Math.round(x)}, ${Math.round(y)})`);
    });
  }
  
  /**
   * Show project popup
   */
  function showProjectPopup(projectId) {
    // Hide all popup contents
    popupContents.forEach(content => {
      content.classList.remove("active");
    });
    
    // Show selected popup content
    const selectedContent = document.querySelector(`[data-popup="${projectId}"]`);
    if (selectedContent) {
      selectedContent.classList.add("active");
    }
    
    // Show popup
    projectPopup.classList.add("active");
  }
  
  /**
   * Hide project popup
   */
  function hideProjectPopup() {
    projectPopup.classList.remove("active");
    
    // Hide all popup contents
    popupContents.forEach(content => {
      content.classList.remove("active");
    });
  }
}

console.log("Projects page initialized");