const express = require('express');

const router = express.Router();
const Controllers = require('../controllers/auth.controller')

router.post('/register', Controllers.registerUser)

router.post('/login', Controllers.loginUser)

module.exports = router;