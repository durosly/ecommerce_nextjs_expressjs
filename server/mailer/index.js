const nodemailer = require("nodemailer")
const config = require("config")

module.exports = nodemailer.createTransport({
    host: "smtp.gmail.com", // GMAIL SMTP
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.get("email.user"),
      pass: config.get("email.pass"),
    }
})