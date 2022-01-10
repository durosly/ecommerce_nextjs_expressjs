const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const DeliveryFee = require("../database/models/deliveryfee")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const id = req.params.id

        const fee = await DeliveryFee.findOne({ where: { id }})

        if(!fee) throw new CustomError("No fee found")

        await fee.destroy()

        res.json({ status: true, message: "success", fee })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}