const signupSchema = require("../validators/signupSchema")

module.exports = async function (req, res, next) {

    const { error } = signupSchema.validate(req.body)

    if(error) return res.status(400).json({ status: false, message: `Error: ${error.message}` })

    next()
}