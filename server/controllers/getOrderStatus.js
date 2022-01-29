const sequelize = require("../database")
const { DataTypes, Op } = require("sequelize")
const Order = require("../database/models/order")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")
        const orderId = req.params.id

        const order = await Order.findByPk(orderId, { where: { userId: sessionUser.id }, attributes: ["status"]})

        if(!order) {
            throw new CustomError("No order found")
        }


        
        res.json({ status: true, message: "Order status loaded sucessfully", orderStatus: order.status })
    } catch(error) {
        console.log(error.message)
        let message = "Something went wrong loading order status"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}