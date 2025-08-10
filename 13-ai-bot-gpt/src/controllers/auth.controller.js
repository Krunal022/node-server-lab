const { default: mongoose } = require('mongoose');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getRegisterController(req, res) {
    res.render('register')
}

async function postRegisterController(req, res) {

    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashPassword
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.cookie('token', token);

    res.status(201).json({ message: 'User registered successfully!', user: newUser, token });
}

async function getLoginController(req, res) {
    res.render('login')
}


module.exports = {
    postRegisterController,
    getRegisterController,
    getLoginController
}