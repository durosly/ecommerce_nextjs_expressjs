const sequelize = require("../database")
const { DataTypes, Op } = require("sequelize")
const Order = require("../database/models/order")(sequelize, DataTypes)
const moment =  require('moment')
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")
        const orderDate = req.params.date
        const orderIds = []

        const formatedDate = moment(orderDate).format("YYYY-MM-DD")

        const orders = await Order.findAll({ where: { createdAt: { [Op.startsWith]: formatedDate }, userId: sessionUser.id }})

        if(orders.length > 0) {
            orders.forEach(order => {
                const item = order.dataValues
                orderIds.push({
                    id: item.id,
                    productId: item.productId
                })
            })
        } else {
            throw new CustomError("No order found")
        }

        
        res.json({ status: true, message: "Orders loaded sucessfully", orders: orderIds })
    } catch(error) {
        console.log(error.message)
        let message = "Something went wrong loading orders"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}