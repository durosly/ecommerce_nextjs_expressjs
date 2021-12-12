const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const id = req.params.id
    const discount = parseInt(req.body.discount)
    try {
        if(!discount) throw new CustomError("Invalid entry")

        if(discount < 0) throw new CustomError("Discount cannot be less than zero")

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        product.discount = discount

        await product.save()

        res.json({ status: true, message: "success", discount, updatedAt: product.updatedAt })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}