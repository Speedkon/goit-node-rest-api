const Joi = require("joi");

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().pattern(/\d/).min(1).required()
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2}),
    phone: Joi.string().pattern(/\d/).min(1)
})
    .min(1)
    .message("Body must have at least one field");

module.exports = { createContactSchema, updateContactSchema };