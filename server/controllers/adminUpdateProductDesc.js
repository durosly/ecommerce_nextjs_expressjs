const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const id = req.params.id
    const desc = req.body.desc
    try {

        if(!id) throw new CustomError("No id specified")
        if(!desc) throw new CustomError("No description specified")

        await Product.update({ desc }, { where: { id }})

        const product = await Product.findByPk(id, { attributes: ["updatedAt"]} )

        res.json({ status: true, message: "Success", desc, updatedAt: product.updatedAt })
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message
        res.json({ status: false, message })
    }
}