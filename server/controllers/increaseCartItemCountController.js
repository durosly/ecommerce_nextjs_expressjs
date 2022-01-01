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
            await cartItem.increment("count")
            res.json({ status: true, message: "Item quantity updated", quantity: cartItem.count + 1 })
        } else {
            throw new CustomError("No item found")
        }
        
    } catch(error) {
        let message = "Something went wrong updating item quantity"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}