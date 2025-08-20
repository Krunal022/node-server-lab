const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

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
    });
}

module.exports = initSocketServer;