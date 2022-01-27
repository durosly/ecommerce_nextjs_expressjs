const Joi = require("joi")

const signupSchema = Joi.object({
    reference: Joi.string().trim().pattern(new RegExp('.*_safeplaze_.*')).message("invalid reference").required(),
    state: Joi.string().trim().required(),
    addressChoice: Joi.string().valid("new", "profile").label("Address choice").required(),
    // address: Joi.string().trim().required()
    address: Joi.alternatives().conditional("addressChoice", { is: "new", then: Joi.string().trim().required(), otherwise: Joi.string().allow("")})
})

module.exports = signupSchema