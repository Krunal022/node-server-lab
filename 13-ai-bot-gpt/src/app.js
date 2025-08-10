require('dotenv').config()
const express = require('express')

const indexRoutes = require('./routes/index.route')
const authRoutes = require('./routes/auth.route')

const app = express()

// set view engine for ejs templates
app.set("view engine", 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

module.exports = app;