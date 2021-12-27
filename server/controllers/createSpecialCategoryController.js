const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const {v4: uuidv4} = require("uuid")
const SpecialCategory = require("../database/models/SpecialCategory")(sequelize, DataTypes)
const SpecialCategorySpecificProductList = require("../database/models/SpecialCategorySpecificProductList")(sequelize, DataTypes)

module.exports = async (req, res) => {
    const data = req.body

    //console.log(req.body)
    //return res.json({ status: true, message: "Went throungh"})
    //const { name, desc } = req.body

    try {
        let category = await SpecialCategory.findOne({ where: { title: data.name.toLowerCase() } })
        if(category) return res.json({ status: false, message: "Special category already exist" })
        category = await sequelize.transaction(async (t) => {
            const c = await SpecialCategory.create({
                title: data.name.toLowerCase(),
                type: data.type,
                to: data.to,
                from: data.from
            }, { transaction: t })

            if(data.type === "specific") {
                const specificData = data.items.map(item => {
                    return {
                        id: uuidv4(),
                        ProductId: item.id,
                        SpecialCategoryId: c.id
                    }
                })

                await SpecialCategorySpecificProductList.bulkCreate(specificData, {
                    transaction: t
                })
            }

            return c
        })
        res.json({ status: true, message: "Category created successfully", category })
    } catch(error) {
        console.log(error.message)
        res.json({ status: false, message: "Something went wrong uploading category" })
    }
}