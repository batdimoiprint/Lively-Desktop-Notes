const { log } = require("console");
const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Handling Routings for Get and Post

  if (req.method === "GET" && req.url === "/") {
    log(`Welcome`);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Nodejs server");
  }

  if (req.method === "GET" && req.url === "/api/notes") {
    fs.readFile("./server/notes.txt", "utf-8", (err, data) => {
      if (err) {
        log(`Error fetching data: ${err}`);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to read notes" }));
        return;
      }
    //   res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
      log(`Data has been read`);
    });
  }

  if (req.method === "POST" && req.url === "/api/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      log(body);
    });
    req.on("end", () => {
      fs.readFile("./server/notes.txt", "utf8", (err, data) => {
        let notesArray = [];
        if (!err && data) {
          try {
            notesArray = JSON.parse(data);
            if (!Array.isArray(notesArray)) notesArray = [];
          } catch {
            notesArray = [];
          }
        }

        const newID = Date.now();

        const parsed = JSON.parse(body);
        const newNote = { id: newID, title: parsed.title, body: parsed.body };

        notesArray.push(newNote);

        fs.writeFile(
          "./server/notes.txt",
          JSON.stringify(notesArray),
          (err) => {
            if (err) {
              log(`Error: ${err}`);
            }
          }
        );

        log(JSON.stringify(newNote));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newNote));
      });
    });
  }
});
server.listen(port, () => {
  log(`Server running on port ${port}`);
});
