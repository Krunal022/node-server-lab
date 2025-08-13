const app = require('./src/app')
const connectToDB = require('./src/db/db');
const connectionToSoket = require('./src/socket/socket.server');
const http = require("http");

const httpServer = http.createServer(app);
connectionToSoket(httpServer);

connectToDB();

httpServer.listen(3000, () => {
    console.log("server is running on port 3000!")
});