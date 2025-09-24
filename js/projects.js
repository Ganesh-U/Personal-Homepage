// projects.js - Circular menu with proper positioning
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  setTimeout(() => initCircularMenu(), 200);
});

function initCircularMenu() {
  const menu = document.getElementById("circularMenu");
  const menuItems = document.querySelectorAll(".menu-item");
  const projectPopup = document.getElementById("projectPopup");
  const closeBtn = document.getElementById("popupClose");
  const popupContents = document.querySelectorAll(".popup-content");
  
  if (!menu || !menuItems.length || !projectPopup) return;

  positionItemsAroundCenter(menuItems);
  setupRotationControl(menu);
  setupMenuItems(menuItems);
  setupPopupControls(closeBtn, projectPopup);
  
  window.addEventListener("resize", () => {
    positionItemsAroundCenter(menuItems);
  });
}

function setupRotationControl(menu) {
  menu.addEventListener("mouseenter", () => {
    pauseAnimation(menu);
  });
  
  menu.addEventListener("mouseleave", () => {
    resumeAnimation(menu);
  });
}

function pauseAnimation(menu) {
  menu.style.animationPlayState = "paused";
  
  const centerText = menu.querySelector(".center-text");
  if (centerText) {
    centerText.style.animationPlayState = "paused";
  }
  
  menu.querySelectorAll(".item-label").forEach(label => {
    label.style.animationPlayState = "paused";
  });
}

function resumeAnimation(menu) {
  menu.style.animationPlayState = "running";
  
  const centerText = menu.querySelector(".center-text");
  if (centerText) {
    centerText.style.animationPlayState = "running";
  }
  
  menu.querySelectorAll(".item-label").forEach(label => {
    label.style.animationPlayState = "running";
  });
}

function setupMenuItems(menuItems) {
  menuItems.forEach((item, index) => {
    // Initial animation
    item.style.opacity = "0";
    item.style.transform = "translate(-50%, -50%) scale(0)";
    
    setTimeout(() => {
      item.style.transition = "all 0.5s ease";
      item.style.opacity = "1";
      item.style.transform = "translate(-50%, -50%) scale(1)";
    }, index * 100 + 500);
    
    item.addEventListener("click", () => {
      const projectId = item.dataset.project;
      showProjectPopup(projectId);
    });
    
    item.addEventListener("mouseenter", () => {
      const dot = item.querySelector(".item-dot");
      if (dot) dot.style.transform = "scale(1.2)";
    });
    
    item.addEventListener("mouseleave", () => {
      const dot = item.querySelector(".item-dot");
      if (dot) dot.style.transform = "scale(1)";
    });
  });
}

function setupPopupControls(closeBtn, projectPopup) {
  if (closeBtn) {
    closeBtn.addEventListener("click", hideProjectPopup);
  }
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectPopup.classList.contains("active")) {
      hideProjectPopup();
    }
  });
  
  document.addEventListener("click", (e) => {
    if (projectPopup.classList.contains("active") && 
        !projectPopup.contains(e.target) && 
        !e.target.closest(".menu-item")) {
      hideProjectPopup();
    }
  });
}

function positionItemsAroundCenter(items) {
  const container = document.querySelector(".circular-menu");
  const centerElement = document.querySelector(".menu-center");
  
  if (!container || !centerElement || !items.length) return;

  if (container.offsetWidth === 0 || centerElement.offsetWidth === 0) {
    setTimeout(() => positionItemsAroundCenter(items), 100);
    return;
  }

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;

  const centerCircleRadius = centerElement.offsetWidth / 2;
  const itemRadius = items[0].offsetWidth / 2;
  const gap = 20;
  const positioningRadius = centerCircleRadius + itemRadius + gap;

  items.forEach((item, index) => {
    const angleStep = (2 * Math.PI) / items.length;
    const angle = (index * angleStep) - (Math.PI / 2);
    
    const x = centerX + Math.cos(angle) * positioningRadius;
    const y = centerY + Math.sin(angle) * positioningRadius;
    
    item.style.position = "absolute";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.transform = "translate(-50%, -50%)";
  });
}

function showProjectPopup(projectId) {
  const projectPopup = document.getElementById("projectPopup");
  const popupContents = document.querySelectorAll(".popup-content");
  
  popupContents.forEach(content => {
    content.classList.remove("active");
  });
  
  const selectedContent = document.querySelector(`[data-popup="${projectId}"]`);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }
  
  projectPopup.classList.add("active");
}

function hideProjectPopup() {
  const projectPopup = document.getElementById("projectPopup");
  const popupContents = document.querySelectorAll(".popup-content");
  
  projectPopup.classList.remove("active");
  
  popupContents.forEach(content => {
    content.classList.remove("active");
  });
}