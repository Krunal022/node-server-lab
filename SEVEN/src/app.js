const express = require('express');
const SongRoute = require('./routes/song.route');
const app = express();

app.use('/songs', SongRoute);

module.exports = app;