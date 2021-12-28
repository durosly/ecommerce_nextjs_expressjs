const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const SpecialCategory = require("../database/models/specialcategory")(sequelize, DataTypes)

module.exports = async (req, res) => {
    try {
        const categories = await SpecialCategory.findAll({})

        if(categories.length > 0) {
            res.json({ status: true, message: "categories loaded", categories })
        } else {
            throw new Error("something went wrong")
        }

    } catch(error) {
        res.json({ status: false, message: "failed to load categories" })
    }
}