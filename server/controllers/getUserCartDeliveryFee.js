const sequelize = require("../database")
const { DataTypes, Op } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")
        const state = req.params.state

        let cartItems = await Cart.findAll({ where: { userId: sessionUser.id }, attributes: [["productId", "id"]] })

        if(cartItems.length > 0) {
            const ids = cartItems.map(item => item.id)

            const fees = await DeliveryFee.findAll({ where: { productId: { [Op.in]: ids }, state }, attributes: ["productId", "price"] })

            res.json({ status: true, message: "success", fees })
        } else {
            throw new CustomError("No Item in cart")
        }

    } catch(error) {
        let message = "Something went wrong loading delivery fees"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}