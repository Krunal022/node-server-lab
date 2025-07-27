const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const authRoutes = require('./routes/auth.routes');

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRoutes);

module.exports = app