const sequelize = require("../database")
const { DataTypes, Op, col } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const ProductInventory = require("../database/models/productinventory")(sequelize, DataTypes)

Product.belongsTo(ProductInventory, {
    foreignKey: "productInventoryId"
})

module.exports = async (req, res) => {
    const { query, offset } = req.query

    try {

        const products = await Product.findAll({
            include: { model: ProductInventory, attributes: [] },
            where: {
                name: {
                    [Op.like]: `%${query ? query : ""}%`
                }
            },
            offset: parseInt(offset) ? parseInt(offset) : 0,
            limit: 10,
            attributes: ["id", "name", "price", "discount", [col("ProductInventory.quantity"), "quantity"] ],
            order: ["createdAt", "DESC"]
        })
    
        if(products.length > 0) {

            res.json({ status: true, message: "success", products })
        } else {
            res.status(404).json({ status: false, message: "not found" })
        }
    } catch(error) {
        res.status(500).json({ status: false, message: "Something went wrong" })
    }
}