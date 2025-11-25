const WebSocket = require("ws");
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });
console.log(`WebSocket server running on port ${PORT}`);

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        if (msg.toString() === "TRIGGER") {
            console.log("Alert triggered");

            // Στέλνουμε ALERT σε όλους τους συνδεδεμένους clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("ALERT");
                }
            });
        }
    });
});
