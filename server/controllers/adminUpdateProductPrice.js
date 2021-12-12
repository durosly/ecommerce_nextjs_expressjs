const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const id = req.params.id
    const price = parseInt(req.body.price)
    try {
        if(!price) throw new CustomError("Invalid entry")

        if(price <= 0) throw new CustomError("Price cannot be less than or equal to zero")

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        product.price = price

        await product.save()

        res.json({ status: true, message: "success", price, updatedAt: product.updatedAt })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}