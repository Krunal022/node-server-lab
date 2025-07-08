const express = require('express');
const connectToDB = require('./src/db/db');
const { default: mongoose } = require('mongoose');
const noteModel = require('./src/models/note.model')
const app = express();

connectToDB();

app.use(express.json());

app.get('/notes', async (req, res) => {
    await noteModel.find().then((note) => {
        res.json({
            message: "All data is here",
            note
        })
    })
    // res.send('hey there!')
})

app.post('/notes', async (req, res) => {

    const { title, content } = req.body

    await noteModel.create({
        title, content
    })
    console.log(req.body)
    res.send('data send!')
    // res.send('hey there!')
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })
    res.send("yay deleted!")
})

app.listen('3000', () => {
    console.log('Server running on port 3000')
})