const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function userAuth(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/auth/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.redirect("/auth/login");
        }

        const user = await userModel.findById(decoded._id)

        req.user = user

        next()
    } catch (error) {
        console.error("Authentication error:", error)
        return res.redirect("/auth/login");
    }
}

module.exports = { userAuth }