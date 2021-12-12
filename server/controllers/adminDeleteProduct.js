const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const id = req.params.id
    try {

        const product = await Product.findByPk(id)

        if(!product) throw new CustomError("No product found")

        await product.destroy()

        res.json({ status: true, message: "success" })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}