const express = require('express')
const { postRegisterController, getRegisterController, getLoginController } = require('../controllers/auth.controller')
const router = express.Router();

router.route('/register')
    .get(getRegisterController)
    .post(postRegisterController)

router.route('/login')
    .get(getLoginController)

module.exports = router;