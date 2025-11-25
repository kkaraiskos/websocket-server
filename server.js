const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on port 8080");

wss.on("connection", ws => {
    console.log("Client connected");

    ws.on("message", message => {
        if (message === "TRIGGER") {
            console.log("Alert triggered");
            // στέλνουμε σε ΟΛΟΥΣ τους συνδεδεμένους clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("ALERT");
                }
            });
        }
    });
});
