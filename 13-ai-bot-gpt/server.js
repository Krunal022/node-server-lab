const app = require('./src/app')
const connectToDB = require('./src/db/db');
const connectionToSoket = require('./src/socket/socket.server');
const http = require("http");

const httpServer = http.createServer(app);
connectionToSoket(httpServer);

connectToDB();

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
});