const HttpError = require("../../helpers/HttpError.js")
const Contact = require('../../models/contacts.js')

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result)
};

module.exports = getOneContact;