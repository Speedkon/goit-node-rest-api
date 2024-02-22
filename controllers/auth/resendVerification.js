const User = require('../../models/users')
const HttpError = require('../../helpers/HttpError');
const { v4: uuidv4 } = require('uuid');

const resendVerification = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email not found")
    };
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    };

    const verificationToken = uuidv4();

    await User.findByIdAndUpdate(user._id, { verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verification",
        html: `<a target="_blank" href="localhost:3000/users/verify/${verificationToken}">Click to verify your email<a>`
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
        "message": "Verification email sent"
    });
};

module.exports = resendVerification