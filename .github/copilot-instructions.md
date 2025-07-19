# Copilot Instructions for lively Project (Frontend & Backend)

## Project Overview
This is a simple web application for dynamic note-taking. The codebase consists of:
- **Frontend:**
  - `index.html`: Page structure, input, button, notes display area.
  - `style.css`: Styling, layout, responsive design.
  - `script.js`: JavaScript logic for DOM manipulation and interactivity.
- **Backend:**
  - `/server/server.js`: Node.js RESTful API for notes, using a `.txt` file as a database.

## Architecture & Data Flow
- **Frontend:**
  - Data managed client-side or via API calls to the backend.
  - Notes created dynamically in the DOM, can use JS array for state.
  - UI updates via DOM manipulation in `script.js`.
- **Backend:**
  - Node.js server handles HTTP requests (GET, POST, DELETE).
  - Notes stored as JSON objects in a `.txt` file.
  - API endpoints for CRUD operations.

## Developer Workflows
- No build step or package management for frontend; edit files directly and open `index.html` in a browser to test.
- Backend server runs with Node.js, no external libraries required.
- Debugging:
  - Frontend: browser DevTools (console, elements, network).
  - Backend: Node.js console output, manual API testing (curl, Postman).
- No automated tests or CI/CD; manual testing only.

## Project-Specific Conventions
- **Frontend:**
  - All logic in vanilla JS; no frameworks or libraries.
  - DOM elements selected/manipulated with standard methods.
  - CSS uses Flexbox/Grid for layout and media queries for responsiveness.
  - Data is hardcoded or managed in-memory unless using backend API.
- **Backend:**
  - All logic in vanilla Node.js; no npm packages.
  - File I/O with `fs` module for persistence.
  - Data stored as JSON in `.txt` file.
  - RESTful API design (GET, POST, DELETE).

## Patterns & Examples
- **Frontend:** dynamic element creation, event handling, responsive design.
- **Backend:** HTTP server setup, routing, file read/write, JSON parsing/stringifying, error handling.

## Integration Points
- Frontend communicates with backend via fetch API calls.
- No external dependencies or cross-component communication.

## Key Files
- `index.html`: Main structure and entry point.
- `script.js`: JS logic for UI interactivity and API calls.
- `style.css`: Styling and responsive rules.
- `/server/server.js`: Node.js backend server and API.
- `/server/notes.txt`: File database for notes.

---

**For AI agents:**
- Do not provide code in any mode; only explain how tasks are accomplished.
- When illustrating a concept, use unrelated example code and let the user implement it based on the explanation.
- Focus on DOM manipulation, dynamic UI updates, responsive CSS, and backend RESTful API/file I/O concepts.
- Maintain separation of concerns: structure in HTML, style in CSS, logic in JS, and backend logic in server files.
- Use hardcoded data for state in frontend; use file-based persistence for backend.
- Extend features by adding new JS functions, updating HTML/CSS, or expanding backend API as needed.

---

If any section is unclear or missing, please provide feedback for further refinement.
