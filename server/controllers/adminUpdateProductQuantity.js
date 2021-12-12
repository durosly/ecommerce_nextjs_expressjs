const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const ProductInventory = require("../database/models/productinventory")(sequelize, DataTypes)
const CustomError = require("../errors")

Product.belongsTo(ProductInventory, {
    foreignKey: "productInventoryId"
})

module.exports = async (req, res) => {
    const id = req.params.id
    const quantity = parseInt(req.body.quantity)
    try {
        if(!quantity) throw new CustomError("Invalid entry")

        if(quantity < 0) throw new CustomError("Quantity cannot be less than zero")

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        const inventory = await product.getProductInventory()

        inventory.quantity = quantity

        await inventory.save()

        res.json({ status: true, message: "success", quantity, updatedAt: inventory.updatedAt })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}