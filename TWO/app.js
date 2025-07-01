// File: app.js
// This file is part of a Node.js application using Express.js framework.
// It sets up a simple web server with several routes.


// Importing the express module to create a web server
const server = require("express");

// Creating an instance of the express application
// This instance will be used to define routes and middleware
const app = server();

// Setting up the Express application
// Defining routes for the application
// Each route responds with a simple text message when accessed
app.get('/', (req, res) => {
    res.send("Home Page!")
})
app.get('/about', (req, res) => {
    res.send("About Page!")
})
app.get('/contact', (req, res) => {
    res.send("Contact Page!")
})
app.get('/profile', (req, res) => {
    res.send("Profile Page!")
})

// It listens on port 3000 and responds with different messages for each route.
app.listen(3000, () => {
    console.log(" Server is running on port 3000")
})

// Accessing the root URL ("/") will respond with "Home Page!" 
// Accessing "/about" will respond with "About Page!"...