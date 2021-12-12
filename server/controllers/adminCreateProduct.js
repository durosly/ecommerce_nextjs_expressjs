const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const path = require("path")
const Product = require("../database/models/product")(sequelize, DataTypes)
const ProductInventory = require("../database/models/productinventory")(sequelize, DataTypes)
const ProductCategory = require("../database/models/productcategory")(sequelize, DataTypes)
const CustomError = require('../errors')

module.exports = async (req, res) => {

    try {

        const vendor = req.session.get("admin")

        if(!req.files.image) throw new CustomError("No file uploaded")
        
        await sequelize.transaction(async (t) => {

            const inputs = JSON.parse(req.body.inputs)
            const image = req.files.image
            const imageNameTmp = image.name.split(".")
            const imageName = imageNameTmp[0] + "---" + Date.now() + "." + imageNameTmp[imageNameTmp.length - 1]
            
            const category = await ProductCategory.findByPk(inputs.category, { attributes: ["name"] })
            if(!category) throw new CustomError("No category found")

            const inventory = await ProductInventory.create({ quantity: inputs.amount }, { transaction: t })

            const product = {
                name: inputs.name,
                image: imageName,
                desc: inputs.desc,
                price: inputs.price,
                discount: inputs.discount,
                productCategoryId: inputs.category,
                productInventoryId: inventory.id,
                vendorId: vendor.id 
            }

            await Product.create(product, { transaction: t })

            // path to upload folder
            const uploadPath = path.join(__dirname, "../", "../", "public", "uploads", "products")

            // path + file
            const uploadUrl = path.format({
                dir: uploadPath,
                base: imageName
            })

            await image.mv(uploadUrl)

            res.json({ status: true, message: "success"})
        })
        
    } catch(error) {
        let message = "Something went wrong"
        if(error instanceof CustomError) {
            message = error.message
        }

        res.json({ status: false, message })
    }
}