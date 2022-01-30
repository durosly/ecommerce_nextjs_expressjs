const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductDetails = require("../database/models/productdetails")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const { id } = req.params
        const productDetail = await ProductDetails.findByPk(id)

        if(!productDetail) throw new CustomError("No product details found")

        await productDetail.destroy()

        res.json({ status: true, message: "success" })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }

        res.status(400).json({ status: false, message })
    }
}