const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const ProductDetails = require("../database/models/productdetails")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const { id } = req.params
        const details = req.body

        if(details && details.length < 1) {
            throw new CustomError("Details cannot be empty")
        }

        const data = details.map(detail => {
            return {
                productId: id,
                details: detail
            }
        })

        await ProductDetails.bulkCreate(data, { individualHooks: true })
        

        res.json({ status: true, message: "success" })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }

        res.status(400).json({ status: false, message })
    }
}