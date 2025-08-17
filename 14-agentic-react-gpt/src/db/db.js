const mongoose = require('mongoose');

function connectToDatabase() {

    try {
        mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Database connection successful ✅');
    } catch (error) {
        console.error('Database connection error:', error);
    }

}

module.exports = connectToDatabase;