const Joi = require("joi")

const specialCategorySchema = Joi.object({
    name: Joi.string().trim().required(),
    type: Joi.string().valid("specific", "price", "discount"),
    from: Joi.alternatives().conditional("type", { is: "specific", then: Joi.string().allow(null).required(), otherwise: Joi.number().integer().required() }),
    to: Joi.alternatives().conditional("type", { is: "specific", then: Joi.string().allow(null).required(), otherwise: Joi.number().integer().required() }),
    items: Joi.alternatives().conditional("type", { is: "specific", then: Joi.array().min(1).max(6).items(Joi.object({ id: Joi.string().guid({ version: "uuidv4"}).required(), name: Joi.string() })).required(), otherwise: Joi.array().length(0).required()})
})

module.exports = specialCategorySchema