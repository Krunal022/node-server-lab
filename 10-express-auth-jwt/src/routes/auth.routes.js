const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router();

express.json();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username: username,
        password: password
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user is created",
        user,
        token
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


router.get('/user', async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({
        id: decode._id
    }).select('-password -__v')

    res.status(200).json({
        message: "user fetched successfully",
        user
    })

})

module.exports = router