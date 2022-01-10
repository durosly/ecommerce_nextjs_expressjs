const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const id = req.params.id

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        const fees = await DeliveryFee.findAll({ where: {
            productId: id
        }, attributes: ["id", "state", "price"], order: ["state"]})

        if(!fees) throw new CustomError("No fees yet")

        res.json({ status: true, message: "success", fees })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}