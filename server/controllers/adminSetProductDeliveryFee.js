const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const {v4: uuidv4} = require("uuid")
const Product = require("../database/models/product")(sequelize, DataTypes)
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const id = req.params.id

        const { states, fee } = req.body

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        const data = states.map(state => {
            return {
                id: uuidv4(),
                productId: id,
                price: Math.abs(parseInt(fee)),
                state
            }
        })

        await sequelize.transaction(async (t) => { 
            await DeliveryFee.bulkCreate(data, { transaction: t })
        })


        res.json({ status: true, message: "success" })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}