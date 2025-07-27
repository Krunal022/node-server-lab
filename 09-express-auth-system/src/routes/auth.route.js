const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model')


router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    const user = await userModel.create({
        username,
        password
    })

    res.json({
        message: "user created successfully!",
        user
    })

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const userExist = await userModel.findOne({
        username: username
    })

    if (!userExist) {
        return res.status(404).json("User does not exist")
    }

    const isPasswordValid = password == userExist.password;

    if (!isPasswordValid) {
        return res.status(401).json("Invalid password")
    }

    res.json({
        message: "Login successful",
        user: userExist
    })

})

module.exports = router;