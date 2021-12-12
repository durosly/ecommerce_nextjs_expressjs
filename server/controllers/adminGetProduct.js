const sequelize = require("../database")
const { DataTypes, col } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const ProductInventory = require("../database/models/productinventory")(sequelize, DataTypes)
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)
const CustomError = require("../errors")

Product.belongsTo(ProductInventory, {
    foreignKey: "productInventoryId"
})

Product.belongsTo(ProductCategory, {
    foreignKey: "productCategoryId"
})

module.exports = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByPk(id, {
            include: [{ model: ProductInventory, attributes: [] }, { model: ProductCategory, attributes: [] }],
            attributes: ["id", "name", "desc", "price", "discount", "image", [col("ProductInventory.quantity"), "quantity"], [col("ProductCategory.name"), "category"], "createdAt", "updatedAt"]
        })

        if(!product) throw new CustomError("No product found")

        res.json({ status: true, message: "success", product })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }

        res.status(400).json({ status: false, message })
    }
}