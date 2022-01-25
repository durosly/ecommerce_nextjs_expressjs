const sequelize = require("../database")
const { DataTypes, Op, col } = require("sequelize")
const PayStack = require('paystack-node')
const config = require("config")
const Cart = require("../database/models/cart")(sequelize, DataTypes)
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const Order = require("../database/models/order")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

// relationship
Cart.belongsTo(Product, { foreignKey: "productId" })

module.exports = async (req, res) => {
    const { reference, state, address } = req.body
    const sessionUser = req.session.get("user")
    const environment = process.env.NODE_ENV
    const API_KEY = config.get("paystack.private_key")
    const paystack = new PayStack(API_KEY, environment)

    try {
        // confirm transaction using reference key

        const verification = await paystack.verifyTransaction({
            reference
        })
        //console.log(verification.body)
        const { status, data } = verification.body
        const { amount: paystackAmt, channel } = data
        //console.log(verification.body)

        if(status === true) {
                
            // get items from cart
            const cartItems = await Cart.findAll({ where: { userId: sessionUser.id }, order: ["productId"], attributes: ["productId", ["count", "quantity"], [col("Product.price"), "price"], [col("Product.discount"), "discount"]], include: { model: Product, attributes: []} })
                    
            if(cartItems.length > 0) {
                // get delivery fees
                const ids = cartItems.map(item => item.productId)
                const fees = await DeliveryFee.findAll({ where: { productId: { [Op.in]: ids }, state }, attributes: ["productId", "price"], order: ["productId"] })

                if(fees.length > 0) {
                    if(fees.length === cartItems.length) {

                        // calculate subtotal
                        const items = cartItems.map(item => item.dataValues)
                        const prices = items.map(item => ((item.price - (item.price * item.discount / 100)) * item.quantity))
    
                        const subtotal = prices.reduce((prev, curr) => prev + curr, 0)
                        const totalFee = fees.reduce((prev, curr) => prev + curr.price, 0)
    
                        const calculatedCost = subtotal + totalFee

                        if(paystackAmt === (calculatedCost * 100)) {

                            const orderArr = items.map((item, i) => {
                                return {
                                    productId: item.productId,
                                    address,
                                    state,
                                    userId: sessionUser.id,
                                    trxref: reference,
                                    price: prices[i],
                                    deliveryFee: fees[i].price,
                                    channel,
                                    status: 1,
                                    quantity: item.quantity
                                }
                            })

                            // create order
                            await Order.bulkCreate(orderArr, { individualHooks: true })

                            // delete items from cart
                            await Cart.destroy({ where: { userId: sessionUser.id }})

                            res.json({ status: true, message: "Order complete"})

                        } else {
                            throw new CustomError("Transaction verification failed. Please, contact admin")
                        }
    
                        
                    } else {
                        throw new CustomError("An error occurred with fee and cart items. Please, contact admin")
                    }

                } else {
                    throw new CustomError("Something went wrong with product delivery fee setup. Please, contact admin")
                }

            } else {
                throw new CustomError("No item in cart")
            }

        } else {
            throw new CustomError("failed to verify transaction")
        }
        
        res.json({ status: true, message: "Order created sucessfully" })
    } catch(error) {
        console.log(error.message)
        let message = "Something went wrong creating order"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}