const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)

module.exports = async (req, res) => {
    const { id, name, newName } = req.body
    
    try {
        if(!id || !name || !newName) return res.json({ status: false, message: "Invalid request. Please, check input and try again." })
        
        await ProductCategory.update({ name: name.toLowerCase() }, { where: { id } })

        res.json({ status: true, message: "update successful" })

    } catch(error) {
        res.json({ status: false, message: "Something went wrong" })
    }
}