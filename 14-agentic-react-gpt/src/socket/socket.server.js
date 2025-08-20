const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const generateResponse = require("../services/ai.service");
const messageModel = require('../models/message.model')

async function initSocketServer(httpServer) {
    const io = new Server(httpServer, { /* options */ });

    io.use(async (socket, next) => {

        const cookies = cookie.parse(socket.handshake.headers?.cookie || "")

        if (!cookies.token) {
            next(new Error("Authentication error: No token provided!"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);

            socket.user = user

            next()

        } catch (error) {
            next(new Error("Authentication error: Invalid token!"))
        }
    })

    io.on("connection", (socket) => {
        console.log("User :", socket.user)
        console.log("New socket Connection! :", socket.id);

        socket.on("ai-message", async (messagePayload) => {
            await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: messagePayload.content,
                role: 'user'
            });

            try {
                const response = await generateResponse(messagePayload.content);
                await messageModel.create({
                    user: socket.user._id,
                    chat: messagePayload.chat,
                    content: response,
                    role: 'model'
                });
                socket.emit("ai-response", { text: response, chat: messagePayload.chat });
            } catch (error) {
                console.error("AI Error:", error);
                socket.emit("ai-response", { error: "AI service failed" });
            }
        });

    });

}

module.exports = initSocketServer;