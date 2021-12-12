const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

Product.belongsTo(ProductCategory, {
    foreignKey: "productCategoryId"
})

module.exports = async (req, res) => {
    try {
        const productCategoryId = req.params.categoryId
        if(!productCategoryId) throw new CustomError("No category specified")

        const products = await Product.findAll({ where: {
            productCategoryId
        }, limit: 100, order: [["createdAt", "DESC"]]})

        if(products.length <= 0) throw new CustomError("No product found")

        const category = await ProductCategory.findByPk(productCategoryId, {
            attributes: ["name", "desc"]
        })

        res.json({ status: true, message: 'success', products, category})
    } catch(error) {
        let message = "something went wrong"

        if(error instanceof CustomError) {
            message = error.message
        }

        res.json({ status: false, message})
    }
}