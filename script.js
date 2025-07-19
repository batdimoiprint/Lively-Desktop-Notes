function displayNotes(titleText, paragraphText) {
  const cards = document.createElement("div");
  cards.className = "cards";

  const title = document.createElement("h1");
  title.textContent = titleText;

  const paragraph = document.createElement("p");
  paragraph.textContent = paragraphText;

  const button = document.createElement("btn");
  button.className = "btn-close";
  button.addEventListener("click", () => {
    cards.remove();
  });

  button.textContent = "x";

  cards.appendChild(button);
  cards.appendChild(title);
  cards.appendChild(paragraph);
  document.getElementById("cards").appendChild(cards);
}


document.getElementById("addBtn").addEventListener("click", () => {
  const titleInput = document.getElementById("titleInput").value;
  const bodyInput = document.getElementById("paragraphInput").value;
  // console.log(titleInput,bodyInput);
  
  addNotes(titleInput,bodyInput)


 
});

fetch("http://localhost:3000/api/notes")
  .then((res) => res.json())
  .then((notesArray) => {
    const allNotes = [...notesArray];
    allNotes.forEach((note) => {
      displayNotes(note.title, note.body);
      console.log(note.id, note.title, note.body)
    });
  });

 
  function addNotes(titleInput,bodyInput) {
  fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: titleInput, body: bodyInput }),
  })
 
  ;
  // console.log(`Clicked`);
}