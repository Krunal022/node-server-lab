require('dotenv').config()

const express = require('express');
const app = express()

const cookieParser = require('cookie-parser')

const authRoutes = require('../src/routes/auth.route')
const chatRoutes = require("./routes/chat.routes");

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
