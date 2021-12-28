const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const SpecialCategory = require("../database/models/specialcategory")(sequelize, DataTypes)
const SpecialCategorySpecificProductList = require("../database/models/specialcategoryspecificproductlist")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const categoryId = req.body.id

    try {
        await sequelize.transaction( async (t) => {
            const category = await SpecialCategory.findByPk(categoryId, { transaction: t })

            if(!category) throw new CustomError("No matching special category found")

            if(category.type === "specific") {
                await SpecialCategorySpecificProductList.destroy({
                    where: {
                        specialCategoryId: categoryId
                    }
                }, { transaction: t })
            }

            await SpecialCategory.destroy({
                where: {
                    id: categoryId
                }
            }, { transaction: t })

            res.json({ status: true, message: "special category deleted" })

        })

    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }
        res.json({ status: false, message })
    }
}