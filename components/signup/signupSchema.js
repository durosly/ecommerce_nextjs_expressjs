import Joi from 'joi'

const signupSchema = Joi.object({
    fullname: Joi.string().required().trim().label("Full name").pattern(new RegExp('^[a-zA-Z ]*$')).message("Name must contain only letter and white space"),
    email: Joi.string().email({tlds: { allow: ["com", "net", "org"] }}).required().label("E-mail"),
    phonenumber: Joi.string().required().min(10).label("Phonenumber"),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')).message("Password must contain uppercase, lowwercase and numbers").label("Password")
})

export default signupSchema