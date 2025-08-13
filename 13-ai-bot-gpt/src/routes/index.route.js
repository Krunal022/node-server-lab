const express = require('express')
const { userAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', userAuth, (req, res) => {
    res.render("index");
})

module.exports = router;