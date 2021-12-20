const sequelize = require("../database")
const { DataTypes, Op, col } = require("sequelize")
const Product = require("../database/models/product")(sequelize, DataTypes)
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)

// relationship
Product.belongsTo(ProductCategory, {
    foreignKey: "productCategoryId"
})

module.exports = async (req, res) => {
    const { query } = req.query

    try {

        const products = await Product.findAll({
            where: {
                [Op.or] : [
                    {
                        name: {
                            [Op.like]: `%${query ? query : ""}%`
                        }
                    },
                    {
                        id: {
                            [Op.like]: `%${query ? query : ""}%`
                        }
                    }, 
                    {
                        '$ProductCategory.name$': {
                            [Op.like]: `%${query ? query : ""}%`
                        }
                    }
                ]
            },
            limit: 10,
            attributes: ["id", "name"],
            order: ["name"],
            include: { model: ProductCategory, attributes: [ ] }
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