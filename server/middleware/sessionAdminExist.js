
module.exports = async (req, res, next) => {

    if(!req.session.get("admin")) return res.json({ status: false, message: "Invalid request. Please, contact admin" })

    next()
}