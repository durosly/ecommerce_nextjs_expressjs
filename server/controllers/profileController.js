const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const User = require("../database/models/user")(sequelize, DataTypes)

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")

        const profile = await User.findByPk(sessionUser.id, { attributes: ["firstname", "lastname", "middlename", "email", "phonenumber", "state", "city", "address"] })

        res.json({ status: true, message: "successful", profile })
    } catch(error) {
        res.json({ status: false, message: "failed" })
    }
}