const express = require('express')
const userModel = require('../models/user.model')
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const existingUser = await userModel.findOne({ username })

    if (existingUser) {
        return res.status(409).json({
            message: "Username already exists. Please choose a different one."
        })
    }

    const newUser = await userModel.create({ username, password })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully.",
        user: newUser,
        token
    });
})


module.exports = router;