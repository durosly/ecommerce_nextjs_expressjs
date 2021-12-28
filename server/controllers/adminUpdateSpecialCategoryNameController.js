const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const SpecialCategory = require("../database/models/specialcategory")(sequelize, DataTypes)

module.exports = async (req, res) => {
    const { id, title, newTitle } = req.body
    
    try {
        if(!id || !title || !newTitle) return res.json({ status: false, message: "Invalid request. Please, check input and try again." })
        
        await SpecialCategory.update({ title: newTitle.toLowerCase() }, { where: { id } })

        res.json({ status: true, message: "update successful" })

    } catch(error) {
        res.json({ status: false, message: "Something went wrong" })
    }
}