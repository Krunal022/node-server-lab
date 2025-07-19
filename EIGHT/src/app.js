const express = require('express');  // require express and routes
const app = express(); // create an instance of express
const indexRoutes = require('./routes/index.routes'); // import the index routes from the routes directory

// Middleware added to log requests
app.use((req, res, next) => {
    console.log("Middleware between app and api routes");
    next();
});

// use the indexRoutes for the root path
app.use('/', indexRoutes);


module.exports = app;