const sequelize = require("../database")
const { DataTypes, Op, col } = require("sequelize")
const { getPlaiceholder } = require("plaiceholder")
const Order = require("../database/models/order")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

// relationship
Order.belongsTo(Product, { foreignKey: "productId" })

module.exports = async (req, res) => {
    try {
        const sessionUser = req.session.get("user")
        const orderId = req.params.id

        const order = await Order.findByPk(orderId, { 
            where: { 
                userId: sessionUser.id 
            }, 
            attributes: ["productId", [col("Product.name"), "productName"], "price", "quantity", [col("Product.image"), "productImage"]], 
            include: { model: Product, attributes: []}
        })

        const { base64 } = await getPlaiceholder(`/uploads/products/${order.dataValues.productImage}`, 22)
        
        res.json({ status: true, message: "Order loaded sucessfully", order, base64 })
    } catch(error) {
        console.log(error.message)
        let message = "Something went wrong loading order"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message})
    }
}