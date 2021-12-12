const sequelize = require("../database")
const { DataTypes } = require("sequelize")
const bcrypt = require("bcryptjs")
const User = require("../database/models/user")(sequelize, DataTypes)

module.exports = async (req, res) => {
    try {

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if(user) {
            const passwordStatus = await bcrypt.compare(req.body.password, user.password)

            if(passwordStatus) {

                req.session.set("user", {
                    id: user.id,
                    email: user.email
                })

                await req.session.save()

                res.json({ status: true, message: "successful" })
            } else {
                throw new Error("Invalid login credentials")
            }
            
        } else {
            throw new Error("Invalid login credentials")
        }
    } catch(error) {
        res.json({ status: false, message: "Invalid login credentials" })
    }

}