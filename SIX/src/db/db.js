const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect('mongodb+srv://krunalWaghela:<PASSWORD>@todoappdb.adwlflh.mongodb.net/').then(()=>{
        console.log('Connected To DB!')
    })
}

module.exports = connectToDB