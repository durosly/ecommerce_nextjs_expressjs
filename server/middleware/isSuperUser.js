const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Admin = require("../database/models/admin")(sequelize, DataTypes)

module.exports = async (req, res, next) => {
    const adminId = req.session.get("admin")
    const { id } = adminId
    try {
        const admin = await Admin.findOne({ where: { id, isSuper: true } })

        if(!admin) return res.json({ status: false, message: "Access denied" })

        next()

    } catch(error) {
        res.json({ status: false, message: "Access error occured" })
    }
}