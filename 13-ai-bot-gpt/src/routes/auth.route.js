const express = require('express')
const { postRegisterController, getRegisterController, getLoginController, postLoginController } = require('../controllers/auth.controller')
const router = express.Router();

router.route('/register')
    .get(getRegisterController)
    .post(postRegisterController)

router.route('/login')
    .get(getLoginController)
    .post(postLoginController)

module.exports = router;