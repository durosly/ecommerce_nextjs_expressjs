const sequelize = require("../database")
const { DataTypes, Op } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)

module.exports = async (req, res) => {
    const { query } = req.query

    try {

        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${query ? query : ""}%`
                }
            },
            limit: 10,
            attributes: ["id", "name"],
            order: ["name", "ASC"]
        })
    
        if(products.length > 0) {

            res.json({ status: true, message: "success", products })
        } else {
            res.status(404).json({ status: false, message: "not found" })
        }
    } catch(error) {
        res.status(500).json({ status: false, message: "Something went wrong" })
    }
}