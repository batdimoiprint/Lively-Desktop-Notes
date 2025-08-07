const keywordPatterns = {
  // Declaration keywords
  "keyword-declaration": [
    "const",
    "let",
    "var",
    "def",
    "class",
    "function",
    "interface",
    "type",
    "struct",
    "enum",
    "namespace",
    "module",
    "package",
    "using",
    "import",
    "export",
    "declare",
    "extends",
    "implements",
  ],
  // Control flow keywords
  "keyword-control": [
    "if",
    "else",
    "elif",
    "switch",
    "case",
    "default",
    "when",
    "unless",
    "guard",
    "match",
    "with",
  ],
  // Error handling
  "keyword-error": [
    "try",
    "catch",
    "except",
    "finally",
    "throw",
    "raise",
    "error",
    "panic",
    "Result",
    "Option",
    "Some",
    "None",
  ],
  // Function related
  "keyword-function": [
    "return",
    "yield",
    "lambda",
    "arrow",
    "fn",
    "func",
    "procedure",
    "method",
    "constructor",
    "destructor",
    "operator",
  ],
  // Primitive types and literals
  "keyword-primitive": [
    "null",
    "undefined",
    "nil",
    "void",
    "bool",
    "boolean",
    "int",
    "float",
    "double",
    "string",
    "char",
    "byte",
    "true",
    "false",
    "True",
    "False",
    "this",
    "self",
    "super",
    "base",
  ],
  // Access modifiers and storage
  "keyword-modifier": [
    "public",
    "private",
    "protected",
    "internal",
    "static",
    "abstract",
    "virtual",
    "override",
    "final",
    "sealed",
    "readonly",
    "const",
    "volatile",
    "extern",
    "inline",
    "mutable",
  ],
  // Loop keywords
  "keyword-loop": [
    "for",
    "while",
    "do",
    "foreach",
    "until",
    "loop",
    "repeat",
    "break",
    "continue",
    "next",
    "in",
    "of",
    "range",
  ],
  // Async keywords
  "keyword-async": [
    "async",
    "await",
    "Promise",
    "Future",
    "Task",
    "thread",
    "spawn",
    "concurrent",
    "parallel",
    "sync",
  ],
  // Operators and special symbols
  "keyword-operator": [
    "new",
    "delete",
    "typeof",
    "instanceof",
    "is",
    "as",
    "sizeof",
    "and",
    "or",
    "not",
    "xor",
    "mod",
    "div",
  ],
  // Preprocessor and meta
  "keyword-preprocessor": [
    "#include",
    "#define",
    "#ifdef",
    "#ifndef",
    "#endif",
    "#pragma",
    "@override",
    "@deprecated",
    "@annotation",
    "macro",
  ],
};
async function fetchNotes() {
  try {
    let data = await fetch("http://localhost:4000/api/notes");
    let json = await data.json();
    // console.log(json);
    json.forEach((item) => {
      displayNotes(item.title, item.body, item.id);
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteNotes(idInput) {
  try {
    let data = await fetch("http://localhost:4000/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idInput,
      }),
    });
    let response = await data.json();
    window.location.reload();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function postNotes() {
  try {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    let data = await fetch("http://localhost:4000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });
    let response = data.json();
    window.location.reload();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Deprecated
// function highlightSyntax(text) {
//   let highlightedText = text;

//   // Process each keyword category
//   Object.entries(keywordPatterns).forEach(([className, keywords]) => {
//     keywords.forEach((keyword) => {
//       // Create regex pattern to match whole words only
//       const pattern = new RegExp(`\\b${keyword}\\b`, "g");
//       highlightedText = highlightedText.replace(
//         pattern,
//         `<span class="${className}">${keyword}</span>`
//       );
//     });
//   });

//   return highlightedText;
// }

function displayOverlay(isOpen) {
  const overlayContainer = document.getElementById("overlay");
  let overlay = overlayContainer.querySelector(".overlay");

  if (isOpen === true) {
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.style = "z-index: 6; visibility: visible;";
      overlayContainer.appendChild(overlay);
    } else {
      overlay.style.visibility = "visible";
    }
  } else {
    if (overlay) {
      overlay.style.visibility = "hidden";
      overlay.remove();
    }
  }
}

function displayNotes(titleInput, bodyInput, idInput) {
  const cards = document.createElement("section");
  cards.className = "cards";
  const title = document.createElement("h1");
  title.textContent = titleInput;
  title.addEventListener("click", () => {
    displayModal(titleInput, bodyInput, idInput);
  });

  // ID Debug
  // const id = document.createElement("h1");
  // id.textContent = idInput;
  const paragraphContainer = document.createElement("div");
  paragraphContainer.className = "paragraph-container";

  const paragraph = document.createElement("p");
  paragraph.innerHTML = bodyInput;
  // paragraph.innerHTML = highlightSyntax(bodyInput);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.setAttribute("checked", "true");

  // paragraphContainer.appendChild(checkBox);
  paragraphContainer.appendChild(paragraph);

  cards.appendChild(title);
  cards.appendChild(paragraphContainer);
  // cards.appendChild(button);
  document.getElementById("notes").appendChild(cards);
}

function displayModal(modalTitle, modalBody, idInput) {
  // alert(modalTitle)
  displayOverlay(true);
  const modal = document.createElement("section");
  modal.className = "modal";
  modal.style = "z-index:7";

  const title = document.createElement("h1");
  title.textContent = modalTitle;

  const body = document.createElement("p");
  body.innerHTML = modalBody;
  // body.innerHTML = highlightSyntax(modalBody);

  const deleteNote = document.createElement("button");
  deleteNote.className = "btn-delete";
  deleteNote.textContent = "Delete Note";
  deleteNote.addEventListener("click", () => {
    modal.remove();
    deleteNotes(idInput);
  });

  if (modalTitle === "Output") {
    deleteNote.style.visibility = "hidden";
  } else {
    deleteNote.style.visibility = "visible";
  }

  const closeNote = document.createElement("button");

  closeNote.className = "btn-close";
  closeNote.textContent = "Close";
  closeNote.addEventListener("click", () => {
    displayOverlay(false);
    modal.remove();
    // window.location.reload();
  });

  modal.appendChild(closeNote);
  modal.appendChild(deleteNote);
  modal.appendChild(title);
  modal.appendChild(body);
  document.getElementById("cardModal").appendChild(modal);

  // Apply current color theme to the new buttons
  updateAllButtonColors();
}

let color = "";

async function getColor() {
  try {
    let data = await fetch("http://localhost:4000/api/color");
    let json = await data.json();
    color = `#${json}`;
    document.getElementById("color").value = color;
    updateAllButtonColors(color); // Update all buttons with the matrix color
  } catch (error) {
    console.log(error);
  }
}

getColor();

async function setColor() {
  let color = document.getElementById("color").value;
  try {
    let data = await fetch("http://localhost:4000/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hex: color,
      }),
    });
    let response = await data.json();
    updateAllButtonColors(color); // Update all buttons with new color
    window.location.reload();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function sendCommand() {
  const bash = document.getElementById("command").value;
  const status = document.getElementById("statusOutput");
  if (bash == "") {
    status.textContent = "Command Required";
  } else {
    try {
      let data = await fetch("http://localhost:4000/api/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: bash,
        }),
      });
      let responseStatus = await data.status;
      if ((responseStatus = 200)) {
        status.textContent = "Success: " + responseStatus;
      } else {
        status.textContent = `Error: ${data.status}`;
      }
      let response = await data.json();
      let body = response;
      // Remove any existing event listeners by cloning the element
      const outputBtn = document.getElementById("output");
      const newOutputBtn = outputBtn.cloneNode(true);
      outputBtn.parentNode.replaceChild(newOutputBtn, outputBtn);

      // Add the new event listener
      newOutputBtn.addEventListener("click", () => {
        displayModal("Output", body);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

var root = {
  wavecolor: {
    r: 125,
    g: 52,
    b: 253,
  },
  rainbowSpeed: 0.5,
  rainbow: false,
  matrixspeed: 50,
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");

var hueFw = false;
var hue = -0.01;

// making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;

// the characters
var konkani = "ᜀᜁᜂᜃᜄᜅᜆᜇᜈᜉᜊᜋᜌᜎᜏᜐᜑᜒᜓ᜔";
// converting the string into an array of single characters
var characters = konkani.split("");
var font_size = 14;
var columns = c.width / font_size; // number of columns for the rain
var gradient = ctx.createLinearGradient(0, 10, 0, 200);
// an array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y-coordinate of the drop (same for every drop initially)
for (var x = 0; x < columns; x++) drops[x] = 1;

// drawing the characters
function draw() {
  // Get the BG color based on the current time i.e. rgb(hh, mm, ss)
  // translucent BG to show trail

  ctx.fillStyle = "rgba(0,0,0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#BBB"; // grey text
  ctx.font = font_size + "px arial";

  // looping over drops
  for (var i = 0; i < drops.length; i++) {
    // background color
    ctx.fillStyle = "black";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
    // a random chinese character to print
    var text = characters[Math.floor(Math.random() * characters.length)];
    // x = i * font_size, y = value of drops[i] * font_size

    if (root.rainbow) {
      hue += hueFw ? 0.01 : -0.01;
      var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.fillStyle = "rgba(" + rr + "," + rg + "," + rb + ")";
    } else {
      ctx.fillStyle = `${color}`;
    }

    ctx.fillText(text, i * font_size, drops[i] * font_size);
    // Incrementing Y coordinate
    drops[i]++;
    // sending the drop back to the top randomly after it has crossed the screen
    // adding randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;
  }
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
  switch (name) {
    case "matrixColor":
      root.wavecolor = hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;
    case "rainbowSpeed":
      root.rainbowSpeed = val / 100;
      break;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

fetchNotes();

// Mode toggle functionality
let currentMode = "notes"; // 'notes' or 'tasks'

function toggleMode() {
  const toggleBtn = document.getElementById("toggleBtn");
  const submitBtn = document.getElementById("submitBtn");
  const titleInput = document.getElementById("titleInput");
  const bodyInput = document.getElementById("bodyInput");
  const form = document.getElementById("inputs");

  if (currentMode === "notes") {
    // Switch to tasks mode
    currentMode = "tasks";
    toggleBtn.textContent = "Switch to Notes";
    submitBtn.textContent = "Add Task";
    titleInput.placeholder = "Task Title";
    bodyInput.placeholder = "Task Description";
    form.onsubmit = postTasks;
  } else {
    // Switch to notes mode
    currentMode = "notes";
    toggleBtn.textContent = "Switch to Tasks";
    submitBtn.textContent = "Add Notes";
    titleInput.placeholder = "Title";
    bodyInput.placeholder = "Body";
    form.onsubmit = postNotes;
  }
}

async function postTasks() {
  try {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    let data = await fetch("http://localhost:4000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: body,
        completed: false,
      }),
    });
    let response = data.json();
    window.location.reload();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Color input toggle functionality
function toggleColorInput() {
  const container = document.getElementById("colorInputContainer");
  const toggleBtn = document.getElementById("colorToggleBtn");

  if (container.style.display === "none") {
    container.style.display = "flex";
    container.style.gap = "0.5rem";
    container.style.alignItems = "center";
    toggleBtn.textContent = "Hide Color";
  } else {
    container.style.display = "none";
    toggleBtn.textContent = "Matrix Color";
  }
}

// Update color button to reflect hex value
function updateColorButton(hexColor = null) {
  const colorInput = document.getElementById("color");
  const colorBtn = document.getElementById("colorToggleBtn");

  // Use parameter color or input value
  const targetColor = hexColor || colorInput?.value;

  if (targetColor) {
    const rgb = hexToRgb(targetColor);
    if (rgb) {
      // Set button background to reflect the color
      colorBtn.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
      colorBtn.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    }
  }
}

// Universal button color update function
function updateAllButtonColors(hexColor = null) {
  const colorInput = document.getElementById("color");

  // Use parameter color or input value
  const targetColor = hexColor || colorInput?.value;

  if (targetColor) {
    const rgb = hexToRgb(targetColor);
    if (rgb) {
      // Update all .btn buttons (general buttons)
      const generalButtons = document.querySelectorAll(".btn");
      generalButtons.forEach((btn) => {
        if (!btn.id || btn.id !== "colorToggleBtn") {
          // Skip color button, it has special handling
          btn.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
          btn.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;
          btn.style.boxShadow = `
            0 6px 25px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        }
      });

      // Update delete buttons with red tint but matrix color influence
      const deleteButtons = document.querySelectorAll(".btn-delete");
      deleteButtons.forEach((btn) => {
        btn.style.background = `rgba(${Math.min(255, rgb.r + 50)}, ${Math.max(
          0,
          rgb.g - 20
        )}, ${Math.max(0, rgb.b - 20)}, 0.15)`;
        btn.style.borderColor = `rgba(${Math.min(255, rgb.r + 50)}, ${Math.max(
          0,
          rgb.g - 20
        )}, ${Math.max(0, rgb.b - 20)}, 0.25)`;
        btn.style.boxShadow = `
          0 6px 25px rgba(${Math.min(255, rgb.r + 50)}, ${Math.max(
          0,
          rgb.g - 20
        )}, ${Math.max(0, rgb.b - 20)}, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(${Math.min(255, rgb.r + 50)}, ${Math.max(
          0,
          rgb.g - 20
        )}, ${Math.max(0, rgb.b - 20)}, 0.1)`;
      });

      // Update close buttons with neutral tone but matrix color influence
      const closeButtons = document.querySelectorAll(".btn-close");
      closeButtons.forEach((btn) => {
        const avgColor = Math.floor((rgb.r + rgb.g + rgb.b) / 3);
        btn.style.background = `rgba(${avgColor}, ${avgColor}, ${avgColor}, 0.15)`;
        btn.style.borderColor = `rgba(${avgColor}, ${avgColor}, ${avgColor}, 0.25)`;
        btn.style.boxShadow = `
          0 6px 25px rgba(${avgColor}, ${avgColor}, ${avgColor}, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(${avgColor}, ${avgColor}, ${avgColor}, 0.1)`;
      });

      // Update the special color toggle button
      updateColorButton(targetColor);
    }
  }
}

// Listen for color input changes
document.addEventListener("DOMContentLoaded", function () {
  const colorInput = document.getElementById("color");
  if (colorInput) {
    colorInput.addEventListener("input", updateAllButtonColors);
  }
});
