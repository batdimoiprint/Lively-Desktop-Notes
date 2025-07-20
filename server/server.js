const { log } = require("console");
const http = require("http");
const fs = require("fs");
const port = 3000;

const server = http.createServer((req, res) => {

  // Handling Routings for Get and Post
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Entry point
  if (req.method === "GET" && req.url === "/") {
    log(`Welcome`);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Nodejs server");
  }

  // Get all notes
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

  //Post a note
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

        // log(JSON.stringify(newNote));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newNote));
      });
    });
  }

  // Delete a note
  if (req.method === "DELETE" && req.url === "/api/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // log(body);
    });
    req.on("end", () => {
      fs.readFile("./server/notes.txt", "utf-8", (err, data) => {
        let notesArray = [];
        if (!err && data) {
          try {
            notesArray = JSON.parse(data);
            if (!Array.isArray(notesArray)) notesArray = [];
          } catch {
            notesArray = [];
          }
        }

        const oldID = JSON.parse(body);

        log(oldID.id);
        // log(notesArray.filter((obj) => {
        //   return obj.id !== parseInt(oldID.id);
        // }));

        fs.writeFile(
          "./server/notes.txt",
          JSON.stringify(
            notesArray.filter((obj) => {
              return obj.id !== parseInt(oldID.id);
            })
          ),
          (err) => {
            if (err) {
              log(`Error: ${err}`);
            }
          }
        );

        log("Delete check")

        const message = { message: "Delete check" };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(message));
      });
    });
  }
});

server.listen(port, () => {
  log(`Server running on port ${port}`);
});
