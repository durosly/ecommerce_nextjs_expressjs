const Joi = require("joi")

const signupEmailValidationSchema = Joi.object({
    email: Joi.string().email({tlds: { allow: ["com", "net", "org"] }}).required(),
    token: Joi.string().guid({
        version: "uuidv4"
    }).required()
})

module.exports = signupEmailValidationSchema