const express = require('express');
const app = express();
const AuthRoutes = require('./routes/auth.route');
app.use(express.json())

app.use('/auth', AuthRoutes)

module.exports = app;