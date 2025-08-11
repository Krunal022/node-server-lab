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

async function postLoginController(req, res) {

    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token);

    res.status(200).json({ message: 'Login successful', user, token });
}


module.exports = {
    postRegisterController,
    getRegisterController,
    getLoginController,
    postLoginController
}