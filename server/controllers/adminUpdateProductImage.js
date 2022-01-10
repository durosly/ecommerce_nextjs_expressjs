const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const path = require("path")
const fs = require("fs")
const { getPlaiceholder } = require("plaiceholder")
const Product = require("../database/models/product")(sequelize, DataTypes)
const CustomError = require("../errors")

module.exports = async (req, res) => {
    const id = req.params.id
    try {

        if(!req.files.image) {
            res.status(400)
            throw new CustomError("No file uploaded")
        } 
        

        await sequelize.transaction(async (t) => {

            const image = req.files.image
            const imageNameTmp = image.name.split(".")
            const imageName = imageNameTmp[0] + "---" + Date.now() + "." + imageNameTmp[imageNameTmp.length - 1]

            const product = await Product.findByPk(id, { attributes: ["image"] }, { transaction: t })

            // path to upload folder
            const uploadPath = path.join(__dirname, "../", "../", "public", "uploads", "products")

            // remove previous image
            const previousImgUrl = path.format({
                dir: uploadPath,
                base: product.image
            })

            if(fs.existsSync(previousImgUrl)) {
                fs.unlink(previousImgUrl, err => {
                    if(err) {
                        res.status(500)
                        throw new CustomError("There seems to be a problem uploading file")
                    }
                })
            } else {
                res.status(404)
                throw new CustomError("Previous image not found")
            }

            await Product.update({ image: imageName }, { where: { id } }, { transaction: t })
            const updatedAt = await Product.findByPk(id, { attributes: [["createdAt", "now"]] })
            // path + file
            const uploadUrl = path.format({
                dir: uploadPath,
                base: imageName
            })

            await image.mv(uploadUrl)
            //console.log(uploadPath)

            const { base64 } = await getPlaiceholder(`/uploads/products/${imageName}`, 22)

            res.json({ status: true, message: "success", image: imageName, updatedAt, blurURL: base64 })
        })
    } catch(error) {
        console.log(error.message)
        let message = "Something went wrong"
        if(error instanceof CustomError) message = error.message
        res.json({ status: false, message })
    }
}