const mongoose = require('mongoose');

function ConnectToDB() {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to DB")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = ConnectToDB;