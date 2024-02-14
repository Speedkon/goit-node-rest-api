const createContact = require('./create');
const getAllContacts = require('./getAll');
const getOneContact = require('./getOne');
const deleteContact = require('./delete');
const updateContact = require('./update');
const updateStatusContact = require('./updateStatus');

const controllerWrapper = require('../../helpers/controllerWrapper')

module.exports = {
    getAllContacts: controllerWrapper(getAllContacts),
    getOneContact: controllerWrapper(getOneContact),
    deleteContact: controllerWrapper(deleteContact),
    createContact: controllerWrapper(createContact),
    updateContact: controllerWrapper(updateContact),
    updateStatusContact: controllerWrapper(updateStatusContact)
};