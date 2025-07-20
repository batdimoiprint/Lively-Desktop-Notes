async function fetchNotes() {
  try {
    let data = await fetch("http://127.0.0.1:3000/api/notes");
    let json = await data.json();
    // console.log(json);
    json.forEach((item) => {
      displayNotes(item.title, item.body, item.id);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchNotes();

async function postNotes() {
  try {
    const title = document.getElementById("titleInput").value;
    const body = document.getElementById("bodyInput").value;

    let data = await fetch("http://127.0.0.1:3000/api/notes", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    });
    let response = data.json()
    console.log(response);
    
  } catch (error) {
    console.error(error);
  }
}

function displayNotes(titleInput, bodyInput, idInput) {
  const cards = document.createElement("div");
  cards.className = "cards";
  const title = document.createElement("h1");
  title.textContent = titleInput;
// ID Debug
  const id = document.createElement("h1");
  id.textContent = idInput;

  const paragraph = document.createElement("p");
  paragraph.textContent = bodyInput;
  const button = document.createElement("btn");
  button.className = "btn-close";
  button.addEventListener("click", () => {
    cards.remove();
  });
  button.textContent = "x";

  cards.appendChild(id)
  cards.appendChild(button);
  cards.appendChild(title);
  cards.appendChild(paragraph);
  document.getElementById("cards").appendChild(cards);
}
