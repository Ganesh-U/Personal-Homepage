# Ganesh Umasankar - Personal Homepage

A modern, interactive personal homepage showcasing technical skills, professional journey, and academic projects through creative visualizations and engaging user experiences.

## Objective
- Present technical expertise through interactive visualizations
- Showcase academic and professional projects with detailed descriptions
- Provide an engaging timeline of educational and career milestones
- Demonstrate web development skills through creative UI components
- Serve as a professional resource for recruiters and employers

## Screenshots

### Homepage - Interactive Skills Constellation
![Homepage Skills Visualization](screenshots/homepage-skills.png)
*Interactive skills constellation with expandable categories and smooth animations*

### Journey Page - Horizontal Timeline
![Journey Timeline](screenshots/journey-timeline.png) 
*Scrollable career timeline with expandable milestone cards*

### Projects Page - Circular Menu System
![Projects Circular Menu](screenshots/projects-menu.png)
*Rotating circular project menu with detailed popup modals*

### Mobile Responsive Design
![Mobile View](screenshots/mobile-responsive.png)
*Fully responsive design optimized for mobile devices*

## 🌟 Creative Addition

### Interactive Skills Constellation (Primary Creative Feature)
The homepage features a unique **space-themed skills visualization** where technical competencies are represented as celestial bodies in an interactive constellation:

- **Visual Design:** Skills appear as glowing nodes with pulsing animations and particle effects
- **Interactivity:** Click on main skill categories (Programming, Web Development, etc.) to expand and reveal specific technologies
- **Technical Implementation:** Uses mathematical positioning with trigonometry for precise circular layouts
- **User Experience:** Smooth CSS animations with hover effects and expandable sub-skill nodes

This creative addition goes beyond traditional skill lists to provide an engaging, memorable way for visitors to explore technical expertise.

## 🛠️ Technology Requirements

### Core Technologies
- **HTML5:** Semantic markup with modern standards
- **CSS3:** Grid, Flexbox, animations, and responsive design
- **JavaScript ES6+:** Modern syntax with module system
- **ES6 Modules:** Modular architecture with `type="module"`

### Development Tools
- **Prettier:** Code formatting and consistency
- **ESLint:** JavaScript linting and quality assurance
- **W3C Validator:** HTML validation compliance
- **GitHub Pages:** Deployment and hosting platform

### Browser Support
- Modern browsers supporting ES6+ features
- Chrome 60+, Firefox 55+, Safari 11+, Edge 16+
- Mobile browsers with touch interaction support

## 📋 Installation & Usage

### Prerequisites
- Node.js and npm (for development tools)
- Modern web browser
- Git for version control

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/ganeshumasankar/portfolio.git
cd portfolio

# Install development dependencies
npm install

# Start local development server
npm start
# Server will run on http://localhost:8080

# Alternative: Use any local server
# python -m http.server 8080
# or use Live Server extension in VS Code
```

### Development Commands
```bash
# Format code with Prettier
npm run format

# Run ESLint for code quality
npm run lint
npm run lint:fix

# Validate HTML structure
npm run validate

# Development with auto-reload
npm run dev
```

### Project Structure
```
portfolio/
├── index.html              # Homepage with skills visualization
├── journey.html            # Interactive career timeline
├── projects.html           # Circular project showcase
├── css/
│   └── styles.css          # Comprehensive styling (2000+ lines)
├── js/                     # ES6 Modules
│   ├── main.js            # Homepage initialization
│   ├── skills.js          # Skills constellation logic
│   ├── journey.js         # Timeline interactions
│   ├── projects.js        # Circular menu system
│   └── navigation.js      # Shared navigation component
├── images/
│   ├── profile.jpeg       # Professional headshot
│   └── favicon.ico        # Site icon
├── screenshots/           # Documentation images
├── package.json           # Project configuration
└── README.md              # This file
```

## 🌟 Key Features

### Homepage
- **Hero Section:** Professional introduction with large profile image
- **Interactive Skills Constellation:** Space-themed skill visualization with expandable categories
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Smooth Animations:** CSS transitions and hover effects throughout

### Journey Page
- **Horizontal Timeline:** Scrollable career progression with key milestones
- **Expandable Cards:** Click to reveal detailed information about each experience
- **Visual Elements:** Gradient timeline with floating background animations
- **Touch Support:** Mobile-friendly scrolling and interactions

### Projects Page  
- **Circular Rotating Menu:** Projects arranged in a continuously rotating circle
- **Interactive Popups:** Detailed project information in modal overlays
- **Hover Effects:** Pause rotation and scale effects on interaction
- **Technology Tags:** Color-coded technology stack indicators

### Shared Components
- **Responsive Navigation:** Mobile hamburger menu with smooth animations
- **Professional Footer:** Contact information and social links
- **Consistent Styling:** Unified design system across all pages
- **Accessibility:** Semantic HTML, alt tags, and keyboard navigation

## 👨‍💻 Author

**Ganesh Umasankar**  
MS Computer Science Student  
Northeastern University, Boston, MA  

- **Portfolio Website:** [https://ganeshumasankar.github.io/portfolio](https://ganeshumasankar.github.io/portfolio)
- **Email:** umasankar.g@northeastern.edu
- **LinkedIn:** [ganesh-umasankar-87a3371b4](https://www.linkedin.com/in/ganesh-umasankar-87a3371b4/)
- **GitHub:** [ganeshumasankar](https://github.com/ganeshumasankar)

## 🎓 Academic Reference

**Course:** CS5610 - Web Development  
**Institution:** Northeastern University  
**Semester:** Spring 2025  
**Course Website:** [https://johnguerra.co/classes/webDevelopment_spring_2025/](https://johnguerra.co/classes/webDevelopment_spring_2025/)

## 📚 Documentation & Resources

### Project Documentation
- **Design Document:** [Design Documentation](docs/design-document.pdf)
- **Video Demo:** [Portfolio Walkthrough](https://youtube.com/watch/demo-video)
- **Live Website:** [Portfolio URL](https://ganeshumasankar.github.io/portfolio)
- **Source Code:** [GitHub Repository](https://github.com/ganeshumasankar/portfolio)

### Technical Resources
- **W3C Validation:** All HTML pages pass W3C validation
- **ESLint Config:** Using class-standard linting configuration
- **Prettier Config:** Consistent code formatting across project
- **Accessibility:** WCAG compliant with semantic markup

## 🧠 Use of Generative AI

### AI Tools Used
- **Claude (Anthropic):** Version 4 Sonnet
- **Usage Period:** February-March 2025
- **Assistance Scope:** Code optimization, design documentation, and debugging support

### Specific AI Assistance
1. **CSS Animation Debugging:** Helped resolve complex positioning issues in the circular menu system and optimized performance for mobile devices
2. **JavaScript Optimization:** Provided suggestions for performance improvements in the skills visualization and responsive design implementation
3. **Documentation Creation:** Assisted with structuring comprehensive README documentation and design document formatting
4. **Code Review:** Helped identify potential improvements in ES6 module organization and best practices implementation

### Prompts Used
- "Help me optimize circular positioning math for the rotating project menu to work consistently across different screen sizes"
- "Review this CSS animation code for better performance on mobile devices and suggest GPU-accelerated alternatives"
- "Create comprehensive documentation structure for an academic portfolio project including all required sections for CS5610"
- "Debug responsive design issues with circular layouts and suggest solutions for maintaining proportions across devices"

### AI Contribution Clarification
All core functionality, creative concepts, and design decisions were developed independently. AI assistance was primarily used for:
- **Debugging and optimization** of existing code implementations
- **Documentation formatting** and structure organization
- **Best practices guidance** for modern web development standards
- **Performance optimization** suggestions for animations and responsive design

The creative interactive elements (skills constellation, circular menu, horizontal timeline) are original implementations developed through personal problem-solving and mathematical reasoning.

## 🎬 Demo Video

**Video Demonstration:** [YouTube Portfolio Walkthrough](https://youtube.com/watch/demo-video)

The video includes:
- Complete website walkthrough and navigation
- Interactive features demonstration (skills expansion, timeline scrolling, project rotation)
- Mobile responsiveness showcase across different devices
- Technical implementation highlights and code organization
- Creative elements in action with performance demonstration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal portfolio project, feedback and suggestions are welcome! Please feel free to:
- Open issues for bugs or suggestions
- Submit pull requests for improvements
- Share feedback on design and user experience
- Connect for collaboration opportunities

## 📞 Contact

For questions about this project or collaboration opportunities:

- **Email:** umasankar.g@northeastern.edu
- **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/ganesh-umasankar-87a3371b4/)
- **Portfolio:** [Visit Website](https://ganeshumasankar.github.io/portfolio)

---

**Built with ❤️ by Ganesh Umasankar for CS5610 Web Development**
