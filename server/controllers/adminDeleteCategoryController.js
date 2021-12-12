const fs = require("fs")
const path = require('path')
const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const categoryId = req.body.id

    try {
        await sequelize.transaction( async (t) => {
            const category = await ProductCategory.findByPk(categoryId, { transaction: t })

            if(!category) throw new CustomError("No category found")

            await Product.destroy({
                where: {
                    productCategoryId: categoryId
                }
            }, { transaction: t })

            await ProductCategory.destroy({
                where: {
                    id: categoryId
                }
            }, { transaction: t })

            const folder = path.join(__dirname, "../", "../", "public", "assets", "images", "products", category.name)
            if(fs.existsSync(folder)) {
                fs.rm(folder, { recursive: true }, () => {
                    res.json({ status: true, message: "Category deleted" })
                })
            } else {
                res.json({ status: true, message: "Category deleted" })
            }

        })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message })
    }
}