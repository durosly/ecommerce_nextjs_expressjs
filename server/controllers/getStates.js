const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const State = require("../database/models/state")(sequelize, DataTypes)

const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {


        const states = await State.findAll({ order: ['name']})

        res.json({ status: true, message: "success", states })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message

        res.json({ status: false, message })
    }
}