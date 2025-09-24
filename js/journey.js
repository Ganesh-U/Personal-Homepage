// journey.js - Journey timeline page functionality
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize navigation
  initNavigation();
  
  // Initialize horizontal timeline
  initHorizontalTimeline();
  
  // Initialize timeline interactions
  initTimelineInteractions();
  
  // Initialize card expansion functionality
  initCardExpansion();
});

/**
 * Initialize horizontal scrolling timeline
 */
function initHorizontalTimeline() {
  const wrapper = document.querySelector(".timeline-wrapper");
  const track = document.querySelector(".timeline-track");
  
  if (!wrapper || !track) return;
  
  // Horizontal scroll with mouse wheel
  wrapper.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    }
  });
  
  // Touch/drag scrolling
  let isDown = false;
  let startX;
  let scrollLeft;
  
  wrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.style.cursor = "grabbing";
  });
  
  wrapper.addEventListener("mouseleave", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });
  
  wrapper.addEventListener("mouseup", () => {
    isDown = false;
    wrapper.style.cursor = "grab";
  });
  
  wrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });
  
  // Set initial cursor
  wrapper.style.cursor = "grab";
}

/**
 * Initialize timeline interactions
 */
function initTimelineInteractions() {
  const stops = document.querySelectorAll(".timeline-stop");
  
  stops.forEach((stop, index) => {
    // Animate in
    stop.style.opacity = "0";
    stop.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      stop.style.transition = "all 0.5s ease";
      stop.style.opacity = "1";
      stop.style.transform = "translateY(0)";
    }, index * 100 + 200);
  });
}

/**
 * Initialize card expansion functionality
 */
function initCardExpansion() {
  const cards = document.querySelectorAll(".stop-card");
  
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      
      const year = card.dataset.year;
      const stop = card.closest(".timeline-stop");
      const details = stop.querySelector(".stop-details");
      
      if (!details) return;
      
      // Close all other expanded cards first
      const allStops = document.querySelectorAll(".timeline-stop");
      allStops.forEach(otherStop => {
        if (otherStop !== stop) {
          const otherCard = otherStop.querySelector(".stop-card");
          const otherDetails = otherStop.querySelector(".stop-details");
          
          if (otherCard && otherDetails) {
            otherCard.classList.remove("expanded");
            otherDetails.classList.remove("expanded");
          }
        }
      });
      
      // Toggle current card
      const isExpanded = card.classList.contains("expanded");
      
      if (isExpanded) {
        // Collapse
        card.classList.remove("expanded");
        details.classList.remove("expanded");
      } else {
        // Expand
        card.classList.add("expanded");
        details.classList.add("expanded");
        
        // Remove auto-scroll behavior - no need to scroll into view
      }
    });
    
    // Add hover effect
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("expanded")) {
        card.style.cursor = "pointer";
        card.style.transform = "translateY(-5px)";
      }
    });
    
    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("expanded")) {
        card.style.transform = "translateY(0)";
      }
    });
  });
  
  // Close expanded cards when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".timeline-stop")) {
      const expandedCards = document.querySelectorAll(".stop-card.expanded");
      const expandedDetails = document.querySelectorAll(".stop-details.expanded");
      
      expandedCards.forEach(card => card.classList.remove("expanded"));
      expandedDetails.forEach(details => details.classList.remove("expanded"));
    }
  });
  
  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const expandedCards = document.querySelectorAll(".stop-card.expanded");
      const expandedDetails = document.querySelectorAll(".stop-details.expanded");
      
      expandedCards.forEach(card => card.classList.remove("expanded"));
      expandedDetails.forEach(details => details.classList.remove("expanded"));
    }
  });
}

console.log("Journey page initialized");