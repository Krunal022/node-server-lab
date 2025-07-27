const express = require('express');

// Import the ConnectToDB function from the db.js file

const ConnectToDB = require('./src/db/db.js');

const app = express();

// Call the ConnectToDB function to establish a connection to the database
// This will ensure that the database connection is established before the server starts
ConnectToDB();

// Middleware to parse JSON bodies
// This is necessary to handle JSON data sent in requests, such as in POST requests
app.use(express.json())

// Define a simple route for the root URL
app.get('/notes', (req, res) => {
    res.send("Hello from notes");
})

// Define a route to handle POST requests to create a new note
// This route expects a JSON body with 'title' and 'content' fields
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    console.log(req.body)
})

// Start the server and listen on port 3000
app.listen('3000', () => {
    console.log("Server is running on port 3000");
})