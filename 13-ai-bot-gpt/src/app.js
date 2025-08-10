require('dotenv').config()
const express = require('express')
const indexRoutes = require('./routes/index.route')
const app = express()

// set view engine for ejs templates
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use('/', indexRoutes);

module.exports = app;