const HttpError = require("../../helpers/HttpError.js")
const Contact = require('../../models/contacts.js')

const updateContact = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if (!result) {
        throw HttpError(404)
    }
    res.status(200).json(result)
};

module.exports = updateContact;