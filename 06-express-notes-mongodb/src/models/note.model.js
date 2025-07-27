const mongoose = require('mongoose');

// Define the schema for the 'notes' collection
// This schema defines the structure of the documents in the 'notes' collection
const noteSchema = new mongoose.Schema({
    'title': String,
    'content': String
})

// Create a model for the 'notes' collection using the defined schema
// The model provides an interface to interact with the 'notes' collection in the database
const noteModel = mongoose.model('notes', noteSchema);

// Export the noteModel so it can be used in other parts of the application
module.exports = noteModel;