function addNotes(titleText, paragraphText) {
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
  const paragraph = document.getElementById("paragraphInput").value;
  addNotes(titleInput, paragraph);
});
