const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    const { fullName: { firstName, lastName }, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return res.status(400).json({
            message: "user is already exist!"
        })
    }

    const hashPass = await bcryptjs.hash(password, 10)

    const user = await userModel.create({
        fullName: { firstName, lastName },
        email,
        password: hashPass
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "user Registered successfully",
        user: {
            email: user.email,
            _id: user._id,
            fullName: user.fullName
        }
    })

}


module.exports = {
    registerController
}