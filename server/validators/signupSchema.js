const Joi = require("joi")

const signupSchema = Joi.object({
    fullname: Joi.string().trim().pattern(new RegExp('^[a-zA-Z ]+$')).message("Full name must contain only letters and whitespace").required().label("Full name"),
    email: Joi.string().trim().email({tlds: { allow: ["com", "net", "org"] }}).required().label("E-mail"),
    phonenumber: Joi.string().trim().required().min(10).pattern(new RegExp("^[0-9]+$")).message("Phonenumber should contain only numbers").label("Phonenumber"),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')).message("Password must contain uppercase, lowwercase and numbers").label("Password")
})

module.exports = signupSchema