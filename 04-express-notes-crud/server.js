// This is a simple server that allows you to create, read, update, and delete notes!

// Required the express module to create a server
// This is simple server that allows you to create, read, update, and delete notes
// It uses an in-memory array to store the notes
const express = require('express');

// Create an instance of express to create a server
const app = express();

// Middleware to parse JSON bodies
// This is allowing us to read the body of the request
app.use(express.json())

// This is an in-memory array to store the notes
const notes = []

// This is the route to create a new note
// It uses the POST method to create a new note
// The note is sent in the body of the request
// The note is added to the notes array
// It returns a message that the note was added
// The route is /notes
app.post('/notes', (req, res) => {
    notes.push(req.body)
    res.json({
        message: "Note Added!"
    })
})

// This is the route to get all notes
// It uses the GET method to get all notes
// The route is /notes
app.get('/notes', (req, res) => {
    // It returns the notes array as a JSON response
    res.json({
        notes: notes
    })
})

// This is the route to get a specific note by index
// It uses the DELETE method to delete a note
// It returns a message that the note was deleted
// The route is /notes/:idx where :idx is the index of the note
// The index is passed as a parameter in the URL
app.delete('/notes/:idx', (req, res) => {
    // The index of the note is passed as a parameter in the URL
    const index = req.params.idx
    // delete the note by specified index
    delete notes[index];
    res.send("Note deleted!")
})

// This is the route to update a specific note by index
// It uses the PATCH method to update a note
// It returns a message that the note was updated
// The route is /notes/:idx where :idx is the index of the note to be updated
// The index is passed as a parameter in the URL
app.patch('/notes/:idx', (req, res) => {
    // The index of the note is passed as a parameter in the URL
    const index = req.params.idx
    // The new title of the note is sent in the body of the request
    const { title } = req.body
    // find the note by index and update its title
    notes[index].title = title;
    // send a response that the note was updated
    res.send('Note updated!')
})

// This is the place where the server starts listening on a port 3000
app.listen('3000', (req, res) => {
    console.log("Server is running on port 3000")
})