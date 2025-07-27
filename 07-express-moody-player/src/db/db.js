require('dotenv').config(); // if not already at the top
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("✅ Connected to MongoDB"))
        .catch(err => console.error("❌ Could not connect to MongoDB", err));
}

module.exports = connectToDB;
