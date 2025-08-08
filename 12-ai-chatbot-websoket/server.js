const { text } = require('stream/consumers');
const app = require('./src/app')
const generateResponse = require('./src/services/ai.service')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const chatHistory = []

io.on("connection", (socket) => {
    console.log("user connected!")

    socket.on("disconnect", () => {
        console.log("user disconnected!")
    })

    socket.on("message", async (data) => {

        chatHistory.push({
            role: "user",
            parts: [{ text: data.prompt }]
        })

        console.log("AI Received :", data.prompt)
        const response = await generateResponse(chatHistory);

        chatHistory.push({
            role: "model",
            parts: [{ text: response }]
        })

        console.log("AI Says :", response)

        // Emit the response back to the client
        // What AI Says!
        socket.emit("ai-response", { response })
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})