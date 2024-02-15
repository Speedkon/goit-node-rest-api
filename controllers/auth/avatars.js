const User = require('../../models/users')
const fs = require("fs/promises");
const path = require("path");
const HttpError = require('../../helpers/HttpError');
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
    const { filename } = req.file;
    const tmpPath = path.resolve("tmp", filename)
    const publicPath = path.resolve("public", "avatars", filename);

    const avatar = await Jimp.read(tmpPath);
    if (!avatar) {
        throw HttpError(400, "Upload Error");
    }
    await avatar.resize(250, 250).write(tmpPath);

    try {
        await fs.rename(tmpPath, publicPath)

        const userId = req.params.id;
        const img = path.join('public', 'avatars', filename);
        const user = await User.findByIdAndUpdate(userId, {avatarURL: img}, {new: true})

        return res.status(200).json({avatarURL: user.avatarURL})
    } catch (error) {
        throw HttpError(404)
    }
}

module.exports = updateAvatar