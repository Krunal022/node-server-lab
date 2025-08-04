const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")

async function authMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token is not there! Please Login First.."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id || decoded._id);
        if (!user) return res.status(401).json({ message: "User not found" });
        req.user = user

        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token! Please login again.."
        })
    }

}


module.exports = authMiddleware;