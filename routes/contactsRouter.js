const express = require('express')
const validateBody = require('../helpers/validateBody.js')
const contactController = require('../controllers/contactsControllers.js');
const {createContactSchema, updateContactSchema, updateFavoriteSchema} = require('../schemas/contactsSchemas.js')

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", contactController.getOneContact);

contactsRouter.delete("/:id", contactController.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), contactController.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), contactController.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), contactController.updateStatusContact);

module.exports = contactsRouter;
