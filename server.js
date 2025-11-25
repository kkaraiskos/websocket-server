const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") filePath = "./trigger.html";

    const ext = path.extname(filePath);
    const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
    const contentType = types[ext] || "text/plain";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
    console.log("Client connected");

    ws.on("message", msg => {
        if (msg.toString() === "TRIGGER") {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("ALERT");
                }
            });
        }
    });
});

server.listen(PORT, () => console.log("Server running on " + PORT));
