
module.exports = async (req, res, next) => {

    if(!req.session.get("user")) res.json({ status: false, message: "No user found" })

    next()
}