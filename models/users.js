const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'User email is not valid'],
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = model('user', userSchema);

module.exports = User;