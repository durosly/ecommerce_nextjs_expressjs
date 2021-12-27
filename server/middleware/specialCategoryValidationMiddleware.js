const specialCategoryValidationSchema = require("../validators/specialCategoryValidationSchema")

module.exports = async function (req, res, next) {

    const { error } = specialCategoryValidationSchema.validate(req.body)

    if(error) return res.status(400).json({ status: false, message: `Error: ${error.message}` })

    next()
}