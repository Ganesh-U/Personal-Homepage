// constellation.js - Interactive skills showcase (simplified version)

const skills = {
  programming: {
    name: "Programming",
    items: ["Python", "Java", "C++", "C"],
    color: "#5E92F3",  // Richer blue
    x: 0.25,
    y: 0.25
  },
  web: {
    name: "Web Development",
    items: ["ReactJS", "NodeJS", "JavaScript", "HTML/CSS", "Bootstrap"],
    color: "#8B5CF6",  // Richer purple
    x: 0.75,
    y: 0.25
  },
  databases: {
    name: "Databases",
    items: ["MySQL", "MongoDB"],
    color: "#EC4899",  // Richer pink
    x: 0.5,
    y: 0.5
  },
  ml_ai: {
    name: "ML & AI",
    items: ["Scikit-Learn", "Pandas", "NumPy", "OpenCV", "Regression"],
    color: "#10B981",  // Richer green
    x: 0.25,
    y: 0.75
  },
  networking: {
    name: "Networking",
    items: ["VxLAN", "EVPN", "Routing", "Switching", "MLAG", "OSPF", "BGP"],
    color: "#F59E0B",  // Richer amber
    x: 0.75,
    y: 0.75
  }
};

let nodes = [];
let container;

/**
 * Initialize the skills showcase
 */
export function initConstellation() {
  container = document.getElementById("constellationContainer");
  
  if (!container) return;
  
  // Set container size handler
  window.addEventListener("resize", updateNodePositions);
  
  // Create nodes
  createNodes();
  
  // Add interactivity
  addInteractivity();
  
  // Add floating background particles (optional decorative element)
  createBackgroundParticles();
}

/**
 * Create skill nodes
 */
function createNodes() {
  nodes = [];
  const containerRect = container.getBoundingClientRect();
  
  // Create main category nodes
  for (const [key, category] of Object.entries(skills)) {
    const mainNode = document.createElement("div");
    mainNode.className = "skill-node main-node";
    mainNode.dataset.category = key;
    mainNode.style.left = `${category.x * 100}%`;
    mainNode.style.top = `${category.y * 100}%`;
    mainNode.style.background = `radial-gradient(circle at 30% 30%, ${category.color}dd, ${category.color}aa)`;
    mainNode.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.3)`;
    mainNode.innerHTML = `
      <span class="node-label">${category.name}</span>
      <div class="node-pulse" style="background: ${category.color}"></div>
    `;
    
    container.appendChild(mainNode);
    
    const nodeData = {
      element: mainNode,
      x: category.x * containerRect.width,
      y: category.y * containerRect.height,
      category: key,
      isMain: true,
      color: category.color,
      skills: category.items,
      expanded: false
    };
    
    nodes.push(nodeData);
    
    // Create skill sub-nodes (initially hidden)
    category.items.forEach((skill, index) => {
      // Arrange items in a circle around the main node with appropriate radius
      let angle, radius;
      
      if (category.items.length <= 2) {
        // For 2 items, place them on opposite sides
        angle = index === 0 ? -Math.PI / 3 : Math.PI / 3;
        radius = 75;
      } else if (category.items.length <= 4) {
        // For 3-4 items, spread in an arc
        const angleRange = Math.PI * 1.2;
        angle = -angleRange/2 + (index / Math.max(1, category.items.length - 1)) * angleRange;
        radius = 80;
      } else if (category.items.length <= 5) {
        // For 5 items, use full circle
        angle = (index / category.items.length) * Math.PI * 2 - Math.PI / 2;
        radius = 85;
      } else {
        // For networking with 7 items - increase radius and use full circle
        angle = (index / category.items.length) * Math.PI * 2 - Math.PI / 2;
        radius = 100; // Increased radius to prevent overlap
      }
      
      const subNode = document.createElement("div");
      subNode.className = "skill-node sub-node";
      subNode.dataset.category = key;
      subNode.dataset.skill = skill;
      subNode.style.opacity = "0";
      subNode.style.transform = "scale(0)";
      subNode.style.borderColor = category.color;
      subNode.innerHTML = `<span class="sub-node-label">${skill}</span>`;
      
      container.appendChild(subNode);
      
      const subNodeData = {
        element: subNode,
        x: nodeData.x + Math.cos(angle) * radius,
        y: nodeData.y + Math.sin(angle) * radius,
        category: key,
        parentNode: nodeData,
        skill: skill,
        angle: angle,
        radius: radius,
        isMain: false,
        color: category.color
      };
      
      nodes.push(subNodeData);
    });
  }
}

/**
 * Update node positions after resize
 */
function updateNodePositions() {
  const containerRect = container.getBoundingClientRect();
  
  nodes.forEach(node => {
    if (node.isMain) {
      const category = skills[node.category];
      node.x = category.x * containerRect.width;
      node.y = category.y * containerRect.height;
    } else if (node.parentNode) {
      node.x = node.parentNode.x + Math.cos(node.angle) * node.radius;
      node.y = node.parentNode.y + Math.sin(node.angle) * node.radius;
      
      // Update position if already expanded
      if (node.parentNode.expanded) {
        const containerRect = container.getBoundingClientRect();
        let targetX = node.x;
        let targetY = node.y;
        
        // Boundary checking
        const nodeRadius = 30;
        const minX = nodeRadius;
        const maxX = containerRect.width - nodeRadius;
        const minY = nodeRadius;
        const maxY = containerRect.height - nodeRadius;
        
        targetX = Math.max(minX, Math.min(maxX, targetX));
        targetY = Math.max(minY, Math.min(maxY, targetY));
        
        node.element.style.left = `${(targetX / containerRect.width) * 100}%`;
        node.element.style.top = `${(targetY / containerRect.height) * 100}%`;
      }
    }
  });
}

/**
 * Add interactivity to nodes
 */
function addInteractivity() {
  const mainNodes = nodes.filter(n => n.isMain);
  
  mainNodes.forEach(node => {
    // Click to expand/collapse
    node.element.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleNodeExpansion(node);
      
      // Visual feedback
      if (node.expanded) {
        node.element.classList.add("expanded");
      } else {
        node.element.classList.remove("expanded");
      }
    });
    
    // Hover effects
    node.element.addEventListener("mouseenter", () => {
      if (!node.expanded) {
        node.element.classList.add("hover");
        // Subtle glow on hover
        node.element.style.boxShadow = `0 6px 25px rgba(0, 0, 0, 0.4)`;
      }
    });
    
    node.element.addEventListener("mouseleave", () => {
      if (!node.expanded) {
        node.element.classList.remove("hover");
        // Reset glow
        node.element.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.3)`;
      }
    });
  });
  
  // Prevent clicks on sub-nodes from bubbling
  const subNodes = nodes.filter(n => !n.isMain);
  subNodes.forEach(node => {
    node.element.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    
    // Add hover effect for sub-nodes
    node.element.addEventListener("mouseenter", () => {
      node.element.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.3)`;
    });
    
    node.element.addEventListener("mouseleave", () => {
      node.element.style.boxShadow = `0 3px 12px rgba(0, 0, 0, 0.2)`;
    });
  });
  
  // Close expanded nodes when clicking background
  container.addEventListener("click", () => {
    const expandedNodes = nodes.filter(n => n.isMain && n.expanded);
    expandedNodes.forEach(node => {
      toggleNodeExpansion(node);
      node.element.classList.remove("expanded");
    });
  });
}

/**
 * Toggle node expansion to show/hide skills
 */
function toggleNodeExpansion(node) {
  // Close other expanded nodes first
  const mainNodes = nodes.filter(n => n.isMain && n.expanded);
  mainNodes.forEach(otherNode => {
    if (otherNode !== node && otherNode.expanded) {
      otherNode.expanded = false;
      otherNode.element.classList.remove("expanded");
      const otherSubNodes = nodes.filter(n => n.category === otherNode.category && !n.isMain);
      otherSubNodes.forEach(subNode => {
        subNode.element.style.opacity = "0";
        subNode.element.style.transform = "scale(0)";
        setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          subNode.element.style.left = `${(otherNode.x / containerRect.width) * 100}%`;
          subNode.element.style.top = `${(otherNode.y / containerRect.height) * 100}%`;
        }, 300);
      });
    }
  });
  
  node.expanded = !node.expanded;
  
  const subNodes = nodes.filter(n => n.category === node.category && !n.isMain);
  const containerRect = container.getBoundingClientRect();
  
  subNodes.forEach((subNode, index) => {
    if (node.expanded) {
      // Show sub-nodes with stagger animation
      setTimeout(() => {
        // Calculate position with boundary checking
        let targetX = subNode.x;
        let targetY = subNode.y;
        
        // Boundary checking
        const nodeRadius = 30;
        const minX = nodeRadius;
        const maxX = containerRect.width - nodeRadius;
        const minY = nodeRadius;
        const maxY = containerRect.height - nodeRadius;
        
        targetX = Math.max(minX, Math.min(maxX, targetX));
        targetY = Math.max(minY, Math.min(maxY, targetY));
        
        subNode.element.style.left = `${(targetX / containerRect.width) * 100}%`;
        subNode.element.style.top = `${(targetY / containerRect.height) * 100}%`;
        subNode.element.style.opacity = "1";
        subNode.element.style.transform = "scale(1)";
        subNode.element.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        subNode.element.style.zIndex = "20";
      }, index * 50);
    } else {
      // Hide sub-nodes
      subNode.element.style.opacity = "0";
      subNode.element.style.transform = "scale(0)";
      subNode.element.style.zIndex = "5";
      setTimeout(() => {
        subNode.element.style.left = `${(node.x / containerRect.width) * 100}%`;
        subNode.element.style.top = `${(node.y / containerRect.height) * 100}%`;
      }, 300);
    }
  });
  
  // Update main node glow when expanded
  if (node.expanded) {
    node.element.style.boxShadow = `0 8px 30px rgba(0, 0, 0, 0.5)`;
  } else {
    node.element.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.3)`;
  }
}

/**
 * Create decorative background particles (optional)
 */
function createBackgroundParticles() {
  const particleCount = 15; // Reduced count
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "bg-particle";
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      animation: floatParticle ${20 + Math.random() * 15}s infinite linear;
      animation-delay: ${Math.random() * 15}s;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    container.appendChild(particle);
  }
}

export default {
  initConstellation
};