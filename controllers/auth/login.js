const HttpError = require('../../helpers/HttpError')
const User = require('../../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {JWT_SECRET} = process.env

const login = async (req, res, next) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    const { _id: id } = user;
    if (!user) {
        throw HttpError(401, 'Email or password is wrong')
    }

    if (!user.verify) {
        throw HttpError(401, 'Email is not verified! Please check your mailbox')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw HttpError(401, 'Email or password is wrong')
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" })
    
    await User.findByIdAndUpdate(id, { token });

    res.status(200).json({
        token,
        user: {
            email: user.email,
            sudscription: user.subscription
        }
    }) 
}

module.exports = login
