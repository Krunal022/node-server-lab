// require express and other necessary modules
const express = require('express');

// require the database connection module and the note model
const connectToDB = require('./src/db/db');

// require mongoose to interact with MongoDB
const { default: mongoose } = require('mongoose');

// require the note model to interact with the 'notes' collection
const noteModel = require('./src/models/note.model')


// create an instance of express
const app = express();

// connect to the MongoDB database
connectToDB();

// use middleware to parse JSON requests
app.use(express.json());

// define a route to handle GET requests to '/notes'
// this route retrieves all notes from the database
app.get('/notes', async (req, res) => {
    await noteModel.find().then((note) => {
        res.json({
            message: "All notes fetched successfully!",
            note
        })
    })
})

// define a route to handle POST requests to '/notes'
// this route creates a new note in the database
app.post('/notes', async (req, res) => {

    // extract title and content from the request body
    const { title, content } = req.body

    // create a new note in the database using the note model
    // the noteModel.create() method is used to insert a new document into the 'notes' collection
    // it takes an object with the title and content as properties
    await noteModel.create({
        title, content
    })

    // log the request body to the console for debugging purposes
    console.log(req.body)

    // send a response back to the client indicating that the data has been sent successfully
    res.send('Data sent successfully!')
})


// this route handles DELETE requests to '/notes/:id'
// it uses the noteModel to find and delete a note with the specified ID
app.delete('/notes/:id', async (req, res) => {
    // extract the ID from the request parameters
    // req.params.id contains the ID of the note to be deleted
    const id = req.params.id

    // use the noteModel to find and delete the note with the specified ID
    // noteModel.findOneAndDelete() is used to find a single document by its ID and delete it

    await noteModel.findOneAndDelete({
        _id: id
    })

    // send a response back to the client indicating that the note has been deleted successfully
    res.send("Note deleted successfully!")
})

// start the server and listen on port 3000
app.listen('3000', () => {
    console.log('Server is running on port 3000');
})