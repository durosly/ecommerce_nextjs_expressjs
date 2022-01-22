const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const User = require("../database/models/user")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")

        const userState = await User.findByPk(sessionUser.id, { attributes: ['state']})


        if(userState) {
            res.json({ status: true, message: "success", state: userState.state })
        } else {
            throw new CustomError("No state found")
        }

    } catch(error) {
        let message = "Something went wrong loading state from user profile"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}