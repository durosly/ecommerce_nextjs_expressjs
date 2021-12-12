const Joi = require("joi")

const profileUpdateValidationSchema = Joi.object({
    firstname: Joi.string().trim().required().pattern(new RegExp('^[a-zA-Z]+$')).message("First name must contain only letters").label("First name"),
    lastname: Joi.string().trim().required().pattern(new RegExp('^[a-zA-Z]+$')).message("Last name must contain only letters").label("Last name"),
    middlename: Joi.string().trim().pattern(new RegExp('^[a-zA-Z]+$')).message("Middle name must contain only letters").default(null).label("Middle name"),
    email: Joi.string().trim().email({tlds: { allow: ["com", "net", "org"] }}).required().label("E-mail"),
    phonenumber: Joi.string().trim().required().min(10).pattern(new RegExp("^[0-9]+$")).message("Phonenumber should contain only numbers").label("Phonenumber"),
    address: Joi.string().trim().required().label("Address"),
    city: Joi.string().trim().required().label("City"),
    state: Joi.string().trim().pattern(new RegExp('^[a-zA-Z]+$')).message("State must contain only letters").required().label("State")
})

module.exports = profileUpdateValidationSchema