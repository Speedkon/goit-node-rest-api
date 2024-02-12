const HttpError = require("../../helpers/HttpError.js");
const Contact = require('../../models/contacts.js');

const deleteContact = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404)
    }
    res.json(result)
};

module.exports = deleteContact;