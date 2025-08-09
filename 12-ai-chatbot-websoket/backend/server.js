require('dotenv').config();
const { text } = require('stream/consumers');
const app = require('./src/app')
const generateResponse = require('./src/services/ai.service')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors:{
        origin: "http://localhost:5173",
    }
 });

const chatHistory = []

io.on("connection", (socket) => {
    console.log("user connected!")

    socket.on("disconnect", () => {
        console.log("user disconnected!")
    })

    socket.on("message", async (data) => {
        // Handle both string and object formats
        const prompt = typeof data === 'string' ? data : data.prompt;
        
        if (!prompt) {
            socket.emit("ai-response", { response: "Please provide a valid message." });
            return;
        }

        chatHistory.push({
            role: "user",
            parts: [{ text: prompt }]
        })

        console.log("AI Received :", prompt)
        
        try {
            const response = await generateResponse(chatHistory);
            
            if (!response) {
                throw new Error("No response from AI service");
            }

            chatHistory.push({
                role: "model",
                parts: [{ text: response }]
            })

            console.log("AI Says :", response)

            // Emit the response back to the client
            socket.emit("ai-response", { response })
        } catch (error) {
            console.error("Error generating AI response:", error);
            socket.emit("ai-response", { response: "Sorry, I'm having trouble processing your request right now." });
        }
    })

});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})