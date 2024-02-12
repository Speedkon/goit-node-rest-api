const HttpError = require("../helpers/HttpError")
const jwt = require('jsonwebtoken')
const User = require('../models/users')
require('dotenv').config()
const { JWT_SECRET } = process.env
const controllerWrapper = require('../helpers/controllerWrapper');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization || ''
    const { type, token } = authHeader.split(' ')
    
    if (type !== "Bearer") {
        throw HttpError(401, "Not authorized")
    }

    if (!token) {
        throw HttpError(401, "Not authorized")
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        req.user = user
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            next(HttpError(401, "Not authorized"))
        }
        next(error)
    }
    next()
}

module.exports = {
    authMiddleware: controllerWrapper(authMiddleware)
}