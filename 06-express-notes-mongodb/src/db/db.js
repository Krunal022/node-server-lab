// This file is responsible for connecting to the MongoDB database using Mongoose
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
function connectToDB() {
    mongoose.connect('mongodb+srv://krunalWaghela:<PASSWORD>@todoappdb.adwlflh.mongodb.net/').then(() => {
        console.log('Connected To DB!')
    })
}

// Export the connectToDB function for use in other files
module.exports = connectToDB;