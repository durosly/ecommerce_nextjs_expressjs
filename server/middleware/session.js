const { ironSession } = require("next-iron-session")
const config = require("config")

const session = ironSession({
    cookieName: config.get("cookie.name"),
    password: config.get("cookie.password"),
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
})

module.exports = session