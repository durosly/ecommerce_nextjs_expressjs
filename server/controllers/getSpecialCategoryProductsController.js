const sequelize = require("../database")
const { DataTypes, Op } = require("sequelize")
const SpecialCategory = require("../database/models/specialcategory")(sequelize, DataTypes)
const SpecialCategorySpecificProductList = require("../database/models/specialcategoryspecificproductlist")(sequelize, DataTypes)
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")



Product.hasMany(SpecialCategorySpecificProductList, {
    foreignKey: "ProductId"
})

module.exports = async (req, res) => {
    try {
        const categoryId = req.params.id
        let products = []
        if(!categoryId) throw new CustomError("No category specified")

        const category = await SpecialCategory.findByPk(categoryId)

        if(!category) throw new CustomError("No Special category found")

        if(category.type === 'specific') {
            products = await Product.findAll({
                where: {
                    '$SpecialCategorySpecificProductLists.SpecialCategoryId$': categoryId
                },
                include: {
                    model: SpecialCategorySpecificProductList,
                    attributes: []
                }
            })
        } else if(category.type === 'discount') {
            products = await Product.findAll({
                where: {
                    discount: {
                        [Op.between]: [category.from, category.to]
                    }
                }
            })
        } else if(category.type === 'price') {
            products = await Product.findAll({
                where: {
                    price: {
                        [Op.between]: [category.from, category.to]
                    }
                }
            })
        } else {
            throw new CustomError("Invalid category type")
        }

        // const products = await Product.findAll({ where: {
        //     productCategoryId
        // }, limit: 100, order: [["createdAt", "DESC"]]})

        if(products.length <= 0) throw new CustomError("No product found")

        // const category = await ProductCategory.findByPk(productCategoryId, {
        //     attributes: ["name", "desc"]
        // })

        res.json({ status: true, message: 'success', products})
    } catch(error) {
        console.log(error)
        let message = "something went wrong"

        if(error instanceof CustomError) {
            message = error.message
        }

        res.json({ status: false, message})
    }
}