// Use express to create a simple server
const express = require('express');

// Create an instance of express
const app = express();

// Middleware to parese JSON bodies
// This is necesssary to handle JSON data send in POST requests
// Without this, req.body will be undefined
app.use(express.json())

// Notes array to store notes
// This is a simple in-memory store
const notes = []

// POST endpoint to add a note
// This endpoint will receive a note in the request body
// and add it to the notes array
app.post('/notes', (req, res) => {
    
    // It will then return the updated notes array
    console.log(req.body);
    
    // Push the new note to the notes array
    // req.body should contain the note data
    notes.push(req.body);
    
    // Send a response back to the client
    // With a message and the updated notes array
    // It will be in JSON format
    res.json({
        message: "Note added successfully",
        notes: notes
    })
    
})

// Start the server on port 3000
// This will allow the server to listen for incoming requests
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})