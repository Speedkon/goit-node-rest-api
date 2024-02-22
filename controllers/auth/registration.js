const User = require('../../models/users')
const HttpError = require('../../helpers/HttpError')
const bcrypt = require("bcrypt");
var gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const registration = async (req, res, next) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const avatarURL = gravatar.url(email);

    const verificationToken = uuidv4();
    
    try {
        const result = await User.create({
            email,
            avatarURL,
            password: hashedPassword,
            verificationToken
        });
        const verifyEmail = {
            to: email,
            subject: "Verification",
            html: `<a target="_blank" href="localhost:3000/users/verify/${verificationToken}">Click to verify your email<a>`
        };

        await sendEmail(verifyEmail);
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL: result.avatarURL,
                verificationToken: result.verificationToken
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