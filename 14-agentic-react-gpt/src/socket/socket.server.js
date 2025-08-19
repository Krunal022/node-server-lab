const { Server } = require("socket.io");

async function initSocketServer(httpServer) {
    const io = new Server(httpServer, { /* options */ });

    io.on("connection", (socket) => {
        console.log("user connected!", socket.id);
    });
}

module.exports = initSocketServer;