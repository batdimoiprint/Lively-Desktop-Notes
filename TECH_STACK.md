# Technology Stack

This document provides a comprehensive overview of all technologies used in the **Lively Desktop Notes** project.

## 🎨 Frontend Technologies

### Core Web Technologies
- **HTML5** - Semantic markup and structure
  - Canvas API for matrix animation rendering
  - Form elements for user input
  - Modern HTML5 features
  
- **CSS3** - Styling and visual design
  - Flexbox/Grid layouts
  - CSS animations and transitions
  - Responsive design principles
  - Custom styling for matrix theme

- **JavaScript (ES6+)** - Client-side functionality
  - Modern ES6+ features (async/await, arrow functions)
  - Fetch API for HTTP requests
  - DOM manipulation
  - Event handling
  - Canvas API for matrix animation

### Animation & Graphics
- **HTML5 Canvas API** - Matrix rain background animation
  - Real-time particle system
  - Color customization
  - Smooth animation loops

## 🔧 Backend Technologies

### Server Runtime
- **Node.js** - JavaScript runtime environment
  - Version: Compatible with modern Node.js versions
  - Uses built-in modules (no external dependencies)

### Core Node.js Modules
- **HTTP Module** - Web server functionality
  - RESTful API endpoints
  - Request/response handling
  - CORS configuration

- **File System (fs) Module** - Data persistence
  - File-based database operations
  - JSON data storage and retrieval
  - Configuration file management

- **Child Process Module** - System integration
  - Git Bash command execution
  - Project scaffolding automation
  - Development workflow integration

### API Architecture
- **RESTful API Design**
  - GET `/api/notes` - Retrieve all notes
  - POST `/api/notes` - Create new note
  - DELETE `/api/notes` - Remove note
  - GET/POST `/api/color` - Matrix color management
  - POST `/api/command` - Execute Git commands
  - POST `/api/create-project` - Project scaffolding

## 💾 Data Storage

### File-Based Storage
- **JSON Files** - Structured data storage
  - `notes.txt` - Notes data persistence
  - `LivelyProperties.json` - Configuration storage
  - `LivelyInfo.json` - Application metadata

### Data Format
- **JSON** - Data interchange format
  - Structured note objects with ID, title, and body
  - Configuration settings and properties
  - Error handling for malformed JSON

## 🛠️ Development Tools

### Code Editor
- **Visual Studio Code** - Primary development environment
  - Workspace configuration (`lively.code-workspace`)
  - Extension recommendations and settings

### Version Control
- **Git** - Source code management
  - Repository history and collaboration
  - Branch management
  - Integration with GitHub

### System Integration
- **Windows Batch Scripts**
  - `autostart.bat` - Application startup automation
  - `run-server.vbs` - Background server execution

## 🔗 Integration Features

### Lively Wallpaper Integration
- **Lively Wallpaper Engine** - Desktop wallpaper framework
  - Dynamic wallpaper support
  - Real-time configuration updates
  - Custom property system

### Development Workflow
- **Project Scaffolding Support**
  - React project creation via Vite
  - Node.js project initialization
  - Express.js setup automation

### Command Line Integration
- **Git Bash Integration**
  - Direct command execution from UI
  - Development workflow automation
  - Cross-platform compatibility

## 📚 Supported Frameworks (via Project Creation)

### Frontend Frameworks
- **React** - Component-based UI library
  - Created via Vite build tool
  - Modern React development setup

### Backend Frameworks
- **Express.js** - Web application framework
  - RESTful API development
  - Middleware support

### Build Tools
- **Vite** - Next-generation frontend build tool
  - Fast development server
  - Optimized production builds
  - Modern JavaScript features

## 🌐 Network & Communication

### HTTP Communication
- **CORS (Cross-Origin Resource Sharing)**
  - Enabled for cross-origin requests
  - Proper header configuration
  - OPTIONS request handling

### API Standards
- **REST API Design**
  - Standard HTTP methods
  - JSON request/response format
  - Error handling and status codes

## 📋 Key Features

### Real-time Features
- Matrix animation background
- Live note management
- Instant color updates
- Command execution feedback

### File System Operations
- Persistent note storage
- Configuration management
- Project file creation

### User Interface
- Responsive design
- Interactive forms
- Modal dialogs
- Status feedback

## 🔮 Architecture Benefits

### Simplicity
- **No Build Process Required** - Direct file serving
- **Minimal Dependencies** - Uses only Node.js built-ins
- **Easy Deployment** - Simple file structure

### Performance
- **Lightweight** - Minimal resource usage
- **Fast Startup** - No compilation step
- **Efficient Storage** - File-based persistence

### Maintainability
- **Vanilla Technologies** - No framework lock-in
- **Clear Separation** - Frontend/backend boundaries
- **Readable Code** - Modern JavaScript patterns

---

## 📖 Documentation Links

- [Node.js Documentation](https://nodejs.org/docs)
- [MDN Web Docs - HTML](https://developer.mozilla.org/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/docs/Web/JavaScript)
- [Canvas API Documentation](https://developer.mozilla.org/docs/Web/API/Canvas_API)
- [Lively Wallpaper Engine](https://github.com/rocksdanister/lively)

---

*This technology stack enables a lightweight, efficient, and maintainable desktop notes application with dynamic wallpaper integration.*