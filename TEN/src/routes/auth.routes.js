const express = require('express');
const userModel = require('../models/user.model')
const router = express.Router();

express.json();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username: username,
        password: password
    })

    res.status(201).json({
        message: "user is created",
        user
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const isUserExist = await userModel.findOne({
        username: username
    })

    if (!isUserExist) {
        return res.status(401).json({
            message: "Username is not there! [ invalid username ]"
        })
    }

    const isPassValid = password == isUserExist.password

    if (!isPassValid) {
        return res.status(401).json({
            message: "[ invalid PASSWORD! ]"
        })
    }

    res.status(200).json({
        message: "Loggin successfully!",
    })
})


module.exports = router