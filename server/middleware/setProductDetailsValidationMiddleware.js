const setProductDetailsValidationSchema = require("../validators/setProductDetailsValidationSchema")

module.exports = (req, res, next) => {

    const { error } = setProductDetailsValidationSchema.validate(req.body)
    
    if(error) return res.status(400).json({ status: false, message: `Error: ${error.details[0].message}` })

    next()
}