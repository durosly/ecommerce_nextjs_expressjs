const Joi = require("joi")

const setProductDetailsSchema = Joi.object({
    details: Joi.array().items(Joi.string().required())
})

module.exports = setProductDetailsSchema