const sequelize = require("../database")
const { DataTypes, col } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

Cart.belongsTo(Product, {
    foreignKey: "productId"
})

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")

        let subtotal = 0

        let cartItems = await Cart.findAll({ where: { userId: sessionUser.id }, attributes: [["productId", "id"], ["count", "quantity"], [col("Product.price"), "price"], [col("Product.discount"), "discount"]], include: [{ model: Product, attributes: []}] })

        if(cartItems.length > 0) {

            const items = cartItems.map(item => item.dataValues)
            const prices = items.map(item => ((item.price - (item.price * item.discount / 100)) * item.quantity))

            subtotal = prices.reduce((prev, curr) => prev + curr, 0)

            res.json({ status: true, message: "success", subtotal })
        } else {
            res.json({ status: true, message: "success", subtotal })
        }

    } catch(error) {
        let message = "Something went wrong loading items from cart"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}