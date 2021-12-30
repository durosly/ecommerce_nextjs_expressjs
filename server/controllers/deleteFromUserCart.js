const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const { id } = req.params
    const sessionUser = req.session.get("user")

    try {
        let cartItem = await Cart.findOne({ where: { productId: id, userId: sessionUser.id } })

        if(cartItem) {
            cartItem.destroy()
        }
        
        res.json({ status: true, message: "Item removed from cart", id })
    } catch(error) {
        let message = "Something went wrong removing item from cart nice"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}