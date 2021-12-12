const fs = require("fs")
const path = require("path")
const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)

module.exports = async (req, res) => {
    const { name, desc } = req.body

    if(!name) return res.json({ status: false, message: "Enter category name" })
    if(!desc) return res.json({ status: false, message: "Enter category description" })

    try {
        let category = await ProductCategory.findOne({ where: { name: name.toLowerCase() } })
        if(category) return res.json({ status: false, message: "Category already exist" })
        category = await sequelize.transaction(async (t) => {
            const folder = path.join(__dirname, '../', '../', 'public', 'assets', 'images', 'products', name.toLowerCase())
            const c = await ProductCategory.create({
                name: name.toLowerCase(),
                desc
            }, { transaction: t })
            if(!fs.existsSync(folder)){
                fs.mkdirSync(folder)
            }

            return c
        })
        res.json({ status: true, message: "Category created successfully", category })
    } catch(error) {
        res.json({ status: false, message: "Something went wrong uploading category" })
    }
}