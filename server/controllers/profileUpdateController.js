const sequelize = require("../database")
const { DataTypes, ValidationError } = require("sequelize")
const User = require("../database/models/user")(sequelize, DataTypes)
const CustomError = require("../errors")
const profileUpdateValidationSchema = require("../validators/profileUpdateValidationSchema")

module.exports = async (req, res) => {
    const sessionUser = req.session.get("user")
    try {

        const { value, error } = profileUpdateValidationSchema.validate(req.body)
        
        if(error) throw new CustomError(error.details[0].message)

        await User.update(value, {
            where: {
                id: sessionUser.id
            }
        })


        res.json({ status: true, message: 'Update successful', data: value })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        } else if(error instanceof ValidationError) {
            message = error.errors[0].message
        }

        res.json({ status: false, message })
    }
}