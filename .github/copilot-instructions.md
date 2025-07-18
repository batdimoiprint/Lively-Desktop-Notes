# Copilot Instructions for lively Frontend Project

## Project Overview
This is a simple frontend web application for dynamic note-taking. The codebase consists of three main files:
- `index.html`: Defines the page structure, including input, button, and notes display area.
- `style.css`: Handles styling, including layout and responsive design.
- `script.js`: Contains all JavaScript logic for DOM manipulation and interactivity.

## Architecture & Data Flow
- All data is managed client-side; there is no backend or API integration.
- Notes are created dynamically in the DOM and can be extended to use a JS array for state management.
- UI updates are performed by manipulating DOM elements directly in `script.js`.

## Developer Workflows
- No build step or package management; edit files directly and open `index.html` in a browser to test.
- Debugging is done using browser DevTools (console, elements, network).
- No automated tests or CI/CD; manual testing only.

## Project-Specific Conventions
- All logic is in vanilla JS; no frameworks or libraries are used.
- DOM elements are selected and manipulated using various standard methods (e.g., `getElementById`, `querySelector`, `getElementsByClassName`, `createElement`, etc.).
- CSS uses Flexbox/Grid for layout and media queries for responsiveness.
- Data is hardcoded or managed in-memory; no persistence.

## Patterns & Examples
- Example patterns: dynamic element creation, event handling, and responsive design using media queries.

## Integration Points
- All integration is internal between HTML, CSS, and JS files.
- No external dependencies or cross-component communication.

## Key Files
- `index.html`: Main structure and entry point.
- `script.js`: JS logic for UI interactivity.
- `style.css`: Styling and responsive rules.

---

**For AI agents:**
- Do not provide code in any mode; only explain how tasks are accomplished.
- When illustrating a concept, use unrelated example code and let the user implement it based on the explanation.
- Focus on DOM manipulation, dynamic UI updates, and responsive CSS.
- Maintain separation of concerns: structure in HTML, style in CSS, logic in JS.
- Use hardcoded data for state; do not add backend/API logic.
- Extend features by adding new JS functions and updating HTML/CSS as needed.

---

If any section is unclear or missing, please provide feedback for further refinement.
