const { Server } = require("socket.io");
const aiService = require('../services/ai.service')

function connectionToSoket(httpServer) {
    const io = new Server(httpServer, { /* options */ });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("message", async (msg) => {
            console.log("Received message:", msg);
            
            const response = await aiService(msg);
            // Emit AI response back to the client
            socket.emit("ai-message-response", response);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}

module.exports = connectionToSoket;