const User = require('../../models/users')
const HttpError = require('../../helpers/HttpError')
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const result = await User.create({
            email,
            password: hashedPassword
        });
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription
            }
        });
    } catch (error) {
        if (error.message.includes('E11000')) {
            throw HttpError(409, "Email in use" )
        }
        throw error
    }
}

module.exports = registration