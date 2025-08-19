const app = require('./src/app')

const connectToDatabase = require('./src/db/db')
const initSocketServer = require('./src/socket/socket.server')

const { createServer } = require("http");
const httpServer = createServer(app);
initSocketServer(httpServer);

connectToDatabase()

httpServer.listen(3000, () => {
    console.log("Server is running on PORT 3000.")
})