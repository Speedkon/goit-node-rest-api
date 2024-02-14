const HttpError = require("../../helpers/HttpError.js")
const Contact = require('../../models/contacts.js')

const createContact = async (req, res) => {
    const result = await Contact.create(req.body);
    if (!result) {
        throw HttpError(404)
    }
    res.status(201).json(result)
};

module.exports = createContact;