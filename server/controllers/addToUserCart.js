const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const { item } = req.body
    const sessionUser = req.session.get("user")

    try {
        let cartItem = await Cart.findOne({ where: { productId: item.id, userId: sessionUser.id } })

        if(cartItem) throw new CustomError("Item already in cart")

        cartItem = await sequelize.transaction(async (t) => {
            const c = await Cart.create({
                userId: sessionUser.id,
                productId: item.id,
                count: item.quantity
            }, { transaction: t })

            return c
        })
        
        res.json({ status: true, message: "Item added to cart", cartItem })
    } catch(error) {
        let message = "Something went wrong adding item to cart"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}