// skills.js - Interactive skills visualization
const skills = {
  programming: {
    name: 'Programming',
    items: ['Python', 'Java', 'C++', 'C'],
    color: '#5E92F3',
    x: 0.2,
    y: 0.3,
  },
  web: {
    name: 'Web Development',
    items: ['ReactJS', 'NodeJS', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
    color: '#8B5CF6',
    x: 0.8,
    y: 0.3,
  },
  databases: {
    name: 'Databases',
    items: ['MySQL', 'MongoDB'],
    color: '#EC4899',
    x: 0.5,
    y: 0.5,
  },
  ml_ai: {
    name: 'ML & AI',
    items: ['Scikit-Learn', 'Pandas', 'NumPy', 'OpenCV', 'Regression'],
    color: '#10B981',
    x: 0.2,
    y: 0.7,
  },
  networking: {
    name: 'Networking',
    items: ['VxLAN', 'EVPN', 'Routing', 'Switching', 'MLAG', 'OSPF', 'BGP'],
    color: '#F59E0B',
    x: 0.8,
    y: 0.7,
  },
};

let nodes = [];
let container;

export function initSkills() {
  container = document.getElementById('skillsContainer');
  if (!container) return;

  window.addEventListener('resize', updateNodePositions);
  createNodes();
  addInteractivity();
  createBackgroundParticles();
}

function createNodes() {
  nodes = [];
  const containerRect = container.getBoundingClientRect();

  for (const [key, category] of Object.entries(skills)) {
    // Create main category node
    const mainNode = document.createElement('div');
    mainNode.className = 'skill-node main-node';
    mainNode.dataset.category = key;
    mainNode.style.left = `${category.x * 100}%`;
    mainNode.style.top = `${category.y * 100}%`;
    mainNode.style.background = `radial-gradient(circle at 30% 30%, ${category.color}dd, ${category.color}aa)`;
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
      expanded: false,
    };

    nodes.push(nodeData);

    // Create skill sub-nodes (hidden initially)
    category.items.forEach((skill, index) => {
      const angle = calculateAngle(index, category.items.length);
      const radius = calculateRadius(category.items.length);

      const subNode = document.createElement('div');
      subNode.className = 'skill-node sub-node';
      subNode.dataset.category = key;
      subNode.dataset.skill = skill;
      subNode.style.opacity = '0';
      subNode.style.transform = 'translate(-50%, -50%) scale(0)';
      subNode.style.borderColor = category.color;
      subNode.style.position = 'absolute';
      subNode.style.left = `${category.x * 100}%`;
      subNode.style.top = `${category.y * 100}%`;
      subNode.innerHTML = `<span class="sub-node-label">${skill}</span>`;

      container.appendChild(subNode);

      nodes.push({
        element: subNode,
        x: nodeData.x + Math.cos(angle) * radius,
        y: nodeData.y + Math.sin(angle) * radius,
        category: key,
        parentNode: nodeData,
        skill: skill,
        angle: angle,
        radius: radius,
        isMain: false,
        color: category.color,
      });
    });
  }
}

function calculateAngle(index, total) {
  if (total <= 2) {
    return index === 0 ? -Math.PI / 3 : Math.PI / 3;
  }
  const angleRange = total <= 4 ? Math.PI * 1.2 : Math.PI * 2;
  const offset = total <= 4 ? -angleRange / 2 : -Math.PI / 2;
  return (
    offset + (index / Math.max(1, total <= 4 ? total - 1 : total)) * angleRange
  );
}

function calculateRadius(total) {
  if (total <= 3) return 100;
  if (total <= 5) return 110;
  if (total <= 7) return 130;
  return 150;
}

function updateNodePositions() {
  const containerRect = container.getBoundingClientRect();

  nodes.forEach((node) => {
    if (node.isMain) {
      const category = skills[node.category];
      node.x = category.x * containerRect.width;
      node.y = category.y * containerRect.height;
    } else if (node.parentNode) {
      node.x = node.parentNode.x + Math.cos(node.angle) * node.radius;
      node.y = node.parentNode.y + Math.sin(node.angle) * node.radius;

      if (node.parentNode.expanded) {
        updateSubNodePosition(node, containerRect);
      }
    }
  });
}

function updateSubNodePosition(node, containerRect) {
  const nodeRadius = 30;
  const targetX = Math.max(
    nodeRadius,
    Math.min(containerRect.width - nodeRadius, node.x)
  );
  const targetY = Math.max(
    nodeRadius,
    Math.min(containerRect.height - nodeRadius, node.y)
  );

  node.element.style.left = `${(targetX / containerRect.width) * 100}%`;
  node.element.style.top = `${(targetY / containerRect.height) * 100}%`;
}

function addInteractivity() {
  const mainNodes = nodes.filter((n) => n.isMain);

  mainNodes.forEach((node) => {
    node.element.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNodeExpansion(node);
      node.element.classList.toggle('expanded', node.expanded);
    });

    node.element.addEventListener('mouseenter', () => {
      if (!node.expanded) {
        node.element.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.4)';
      }
    });

    node.element.addEventListener('mouseleave', () => {
      if (!node.expanded) {
        node.element.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      }
    });
  });

  nodes
    .filter((n) => !n.isMain)
    .forEach((node) => {
      node.element.addEventListener('click', (e) => e.stopPropagation());
    });

  container.addEventListener('click', () => {
    nodes
      .filter((n) => n.isMain && n.expanded)
      .forEach((node) => {
        toggleNodeExpansion(node);
        node.element.classList.remove('expanded');
      });
  });
}

function toggleNodeExpansion(node) {
  // Close other expanded nodes
  nodes
    .filter((n) => n.isMain && n.expanded && n !== node)
    .forEach((otherNode) => {
      collapseNode(otherNode);
    });

  node.expanded = !node.expanded;

  if (node.expanded) {
    expandNode(node);
  } else {
    collapseNode(node);
  }
}

function expandNode(node) {
  const subNodes = nodes.filter(
    (n) => n.category === node.category && !n.isMain
  );
  const containerRect = container.getBoundingClientRect();

  subNodes.forEach((subNode, index) => {
    setTimeout(() => {
      updateSubNodePosition(subNode, containerRect);
      subNode.element.style.opacity = '1';
      subNode.element.style.transform = 'translate(-50%, -50%) scale(1)';
      subNode.element.style.transition =
        'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      subNode.element.style.zIndex = '20';
    }, index * 50);
  });

  node.element.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.5)';
}

function collapseNode(node) {
  const subNodes = nodes.filter(
    (n) => n.category === node.category && !n.isMain
  );
  const containerRect = container.getBoundingClientRect();

  node.expanded = false;
  node.element.classList.remove('expanded');

  subNodes.forEach((subNode) => {
    subNode.element.style.opacity = '0';
    subNode.element.style.transform = 'translate(-50%, -50%) scale(0)';
    subNode.element.style.zIndex = '5';
    setTimeout(() => {
      subNode.element.style.left = `${(node.x / containerRect.width) * 100}%`;
      subNode.element.style.top = `${(node.y / containerRect.height) * 100}%`;
    }, 300);
  });

  node.element.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
}

function createBackgroundParticles() {
  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
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

export default { initSkills };
