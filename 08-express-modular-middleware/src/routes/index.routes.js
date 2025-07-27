// required modules
const express = require('express');
const app = express();

// Express provides Router for modular routing
const route = express.Router();

// Middleware added to log requests
app.use((req, res, next) => {
    console.log("Middleware between app and routes");
    next();
});

// Create a route for the root path
route.get('/', (req, res) => {
  res.send('Hello from the index route!');
});

// Export the route to be used in other files
module.exports = route;