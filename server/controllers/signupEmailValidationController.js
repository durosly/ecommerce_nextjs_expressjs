const sequelize = require("../database")
const { ValidationError, DataTypes } = require("sequelize")
const EmailValidation = require("../database/models/emailvalidation")(sequelize, DataTypes)
const CustomErrors = require("../errors")

module.exports = async (req, res) => {
    try {
        const validation = await EmailValidation.findAll({
            where: {
                email: req.body.email,
                token: req.body.token
            }
        })
        if(validation.length > 0) {

            await EmailValidation.destroy({
                where: {
                    email: req.body.email,
                    token: req.body.token                
                }
            })
        } else {
            throw new CustomErrors("Invalid data entry")
        }

        res.json({ status: true, message: "success" })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof ValidationError) {
            message = error.errors[0].message
        } else if(error instanceof CustomErrors) {
            message = error.message
        }

        res.json({ status: false, message })
    }
}