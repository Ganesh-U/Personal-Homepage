// journey.js - Journey timeline page functionality
import { initNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHorizontalTimeline();
  initTimelineInteractions();
  initCardExpansion();
});

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
    wrapper.style.cursor = "grabbing";
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
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
  
  wrapper.style.cursor = "grab";
}

function initTimelineInteractions() {
  const stops = document.querySelectorAll(".timeline-stop");
  
  stops.forEach((stop, index) => {
    stop.style.opacity = "0";
    stop.style.transform = "translateY(20px)";
    
    setTimeout(() => {
      stop.style.transition = "all 0.5s ease";
      stop.style.opacity = "1";
      stop.style.transform = "translateY(0)";
    }, index * 100 + 200);
  });
}

function initCardExpansion() {
  const cards = document.querySelectorAll(".stop-card");
  
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCard(card);
    });
    
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
      closeAllCards();
    }
  });
  
  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllCards();
    }
  });
}

function toggleCard(card) {
  const stop = card.closest(".timeline-stop");
  const details = stop.querySelector(".stop-details");
  
  if (!details) return;
  
  // Close all other cards first
  closeAllCards(stop);
  
  // Toggle current card
  const isExpanded = card.classList.contains("expanded");
  
  if (isExpanded) {
    card.classList.remove("expanded");
    details.classList.remove("expanded");
  } else {
    card.classList.add("expanded");
    details.classList.add("expanded");
  }
}

function closeAllCards(exceptStop = null) {
  document.querySelectorAll(".timeline-stop").forEach(stop => {
    if (stop !== exceptStop) {
      const card = stop.querySelector(".stop-card");
      const details = stop.querySelector(".stop-details");
      
      if (card && details) {
        card.classList.remove("expanded");
        details.classList.remove("expanded");
      }
    }
  });
}