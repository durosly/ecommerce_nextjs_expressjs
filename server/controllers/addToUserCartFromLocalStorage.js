const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const { db } = req.body
    const sessionUser = req.session.get("user")

    
    try {

        let newCartItem = []
    
        if(db.items.length > 0) {
            newCartItem = db.items.map(item => {
                return {
                    userId: sessionUser.id,
                    productId: item.id,
                    count: item.quantity
                }
            })

            await Cart.bulkCreate(newCartItem, { individualHooks: true })
        }
        
        res.json({ status: true, message: "success" })
    } catch(error) {
        let message = "Something went wrong adding item to cart"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}