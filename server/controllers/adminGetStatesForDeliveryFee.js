const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const State = require("../database/models/state")(sequelize, DataTypes)

const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const id = req.params.id

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        const deliverySetStates = await DeliveryFee.findAll({ where: {
            productId: id
        }, attributes: ["state"]})

        const deliverySetStatesArr = deliverySetStates.map(state => state.state)

        const allStates = await State.findAll({ order: ['name']})

        const states = allStates.filter(state => !deliverySetStatesArr.includes(state.name))

        res.json({ status: true, message: "success", states })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}