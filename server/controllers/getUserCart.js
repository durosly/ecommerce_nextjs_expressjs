const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")

        let cartItems = await Cart.findAll({ where: { userId: sessionUser.id }, attributes: [["productId", "id"], ["count", "quantity"]] })

        if(cartItems.length > 0) {

            res.json({ status: true, message: "success", cartItems })
        } else {
            res.json({ status: true, message: "success", cartItems: [] })
        }

    } catch(error) {
        let message = "Something went wrong loading items from cart"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}