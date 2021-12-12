const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")
const Admin = require("../database/models/admin")(sequelize, DataTypes)

module.exports = async (req, res) => {
    try {

        const admin = await Admin.findOne({
            where: {
                username: req.body.username
            }
        })
    
        if(admin) {
            const passwordStatus = await bcrypt.compare(req.body.password, admin.password)

            if(passwordStatus) {

                req.session.set("admin", {
                    id: admin.id,
                    username: admin.username
                })

                await req.session.save()

                res.json({ status: true, message: "successful" })
            } else {
                throw new Error("Invalid login credentials.")
            }
            
        } else {
            throw new Error("Invalid login credentials")
        }
    } catch(error) {
        res.json({ status: false, message: "Invalid login credentials" })
    }

}