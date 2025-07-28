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
    let data = await fetch("http://localhost:3000/api/notes");
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
    let data = await fetch("http://localhost:3000/api/notes", {
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

    let data = await fetch("http://localhost:3000/api/notes", {
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

function highlightSyntax(text) {
  let highlightedText = text;

  // Process each keyword category
  Object.entries(keywordPatterns).forEach(([className, keywords]) => {
    keywords.forEach((keyword) => {
      // Create regex pattern to match whole words only
      const pattern = new RegExp(`\\b${keyword}\\b`, "g");
      highlightedText = highlightedText.replace(
        pattern,
        `<span class="${className}">${keyword}</span>`
      );
    });
  });

  return highlightedText;
}

function displayNotes(titleInput, bodyInput, idInput) {
  const cards = document.createElement("section");
  cards.className = "cards";
  const title = document.createElement("h1");
  title.textContent = titleInput;
  title.addEventListener("click", () => {
    displaymodal(titleInput,bodyInput, idInput);
  });

  // ID Debug
  // const id = document.createElement("h1");
  // id.textContent = idInput;

  const paragraph = document.createElement("p");
  paragraph.innerHTML = highlightSyntax(bodyInput);

  const button = document.createElement("btn");
  button.className = "btn-close";
  button.addEventListener("click", () => {
    deleteNotes(idInput);
  });
  button.textContent = "Delete Note";

  // cards.appendChild(id)

  cards.appendChild(title);
  cards.appendChild(paragraph);
  cards.appendChild(button);
  document.getElementById("notes").appendChild(cards);
}

function displaymodal(modalTitle, modalBody, idInput) {
  // alert(modalTitle)
  const modal = document.createElement("section");
  modal.className = "modal";
  modal.style = "z-index:5"
  const title = document.createElement("h1");
  title.textContent = modalTitle;

  const body = document.createElement("p")
  body.innerHTML = highlightSyntax(modalBody)

  const close = document.createElement("button");
  close.className = "btn-close";
  close.textContent = "Close Modal";
  close.addEventListener("click", () => {
    modal.remove();
    // deleteNotes(idInput)
  });

  
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(body)
  document.getElementById("cardModal").appendChild(modal);
}

let color = "";

async function getColor() {
  try {
    let data = await fetch("http://localhost:3000/api/color");
    let json = await data.json();
    color = `#${json}`;
    document.getElementById("color").value = color;
  } catch (error) {
    console.log(error);
  }
}

getColor();

async function setColor() {
  let color = document.getElementById("color").value;
  try {
    let data = await fetch("http://localhost:3000/api/color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hex: color,
      }),
    });
    let response = await data.json;
    window.location.reload();
    console.log(response);
  } catch (error) {
    console.log(error);
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
