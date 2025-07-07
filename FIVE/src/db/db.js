// First, we need to import the necessary modules and establish a connection to the MongoDB database.
const mongoose = require('mongoose')

// This function connects to the MongoDB database using Mongoose.
function ConnectToDB(){
    mongoose.connect('mongodb+srv://krunalWaghela:<PASSWORD>@todoappdb.adwlflh.mongodb.net/').then(()=>{
        console.log('Connected to MongoDB');
    })
}

// Export the ConnectToDB function so it can be used in other files, such as server.js.
module.exports = ConnectToDB;