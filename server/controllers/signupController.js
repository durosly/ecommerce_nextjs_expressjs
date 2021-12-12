const sequelize = require("../database")
const { DataTypes, ValidationError } = require("sequelize")
const config = require("config")
const User = require("../database/models/user")(sequelize, DataTypes)
const EmailValidation = require("../database/models/emailvalidation")(sequelize, DataTypes)
const transporter = require("../mailer")
const CustomError = require("../errors")

module.exports = async (req, res) => {
    try {
        const data = req.body

        // GET FIRST, LAST AND MIDDLE NAMES
        const names = data.fullname.split(" ")

        if(names.length > 1) {

            if(names.length > 3) throw new Error("Names should not be more than three")

            const data = req.body
            data.lastname = names[0].trim()

            if(names.length > 2) {
                data.firstname = names[2].trim()
                data.middlename = names[1].trim()
            } else {
                data.firstname = names[1].trim()
            }
            // BEGING TRANSACTION
            await sequelize.transaction(async t => {
                await User.create(data, { transaction: t })
                const mail = await EmailValidation.create({ email: data.email }, { transaction: t })
                const url = `${config.get("base_url")}/signup/verification/email?e=${data.email}&token=${mail.token}`

                // SET EMAIL SESSION FOR RE-SEND
                req.session.set("email", data.email)
                await req.session.save()

                // SEND MAIL
                await transporter.sendMail({
                    from: '<no-reply@safeplaze.com>', // sender address
                    to: `${data.email}`, // list of receivers
                    subject: "E-mail verification", // Subject line
                    text: `Copy and paste ${url} in a browser`, // plain text body
                    html: `<!doctype html>
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width">
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <title>E-mail verification</title>
                        <style>
                        /* -------------------------------------
                            INLINED WITH htmlemail.io/inline
                        ------------------------------------- */
                        /* -------------------------------------
                            RESPONSIVE AND MOBILE FRIENDLY STYLES
                        ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                          table[class=body] h1 {
                            font-size: 28px !important;
                            margin-bottom: 10px !important;
                          }
                          table[class=body] p,
                                table[class=body] ul,
                                table[class=body] ol,
                                table[class=body] td,
                                table[class=body] span,
                                table[class=body] a {
                            font-size: 16px !important;
                          }
                          table[class=body] .wrapper,
                                table[class=body] .article {
                            padding: 10px !important;
                          }
                          table[class=body] .content {
                            padding: 0 !important;
                          }
                          table[class=body] .container {
                            padding: 0 !important;
                            width: 100% !important;
                          }
                          table[class=body] .main {
                            border-left-width: 0 !important;
                            border-radius: 0 !important;
                            border-right-width: 0 !important;
                          }
                          table[class=body] .btn table {
                            width: 100% !important;
                          }
                          table[class=body] .btn a {
                            width: 100% !important;
                          }
                          table[class=body] .img-responsive {
                            height: auto !important;
                            max-width: 100% !important;
                            width: auto !important;
                          }
                        }
                    
                        /* -------------------------------------
                            PRESERVE THESE STYLES IN THE HEAD
                        ------------------------------------- */
                        @media all {
                          .ExternalClass {
                            width: 100%;
                          }
                          .ExternalClass,
                                .ExternalClass p,
                                .ExternalClass span,
                                .ExternalClass font,
                                .ExternalClass td,
                                .ExternalClass div {
                            line-height: 100%;
                          }
                          .apple-link a {
                            color: inherit !important;
                            font-family: inherit !important;
                            font-size: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                            text-decoration: none !important;
                          }
                          #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                            font-size: inherit;
                            font-family: inherit;
                            font-weight: inherit;
                            line-height: inherit;
                          }
                          .btn-primary table td:hover {
                            background-color: #34495e !important;
                          }
                          .btn-primary a:hover {
                            background-color: #34495e !important;
                            border-color: #34495e !important;
                          }
                        }
                        </style>
                      </head>
                      <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                        <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Please, verify your e-mail</span>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                          <tr>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
                    
                                <!-- START CENTERED WHITE CONTAINER -->
                                <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                    
                                  <!-- START MAIN CONTENT AREA -->
                                  <tr>
                                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                        <tr>
                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi ${data.firstname},</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for signing up on safeplaze.com. We just need you to verify your email by clicking the link below.</p>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                              <tbody>
                                                <tr>
                                                  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                      <tbody>
                                                        <tr>
                                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="${url}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #1196c8; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Verify</a> </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Please ignore if you did not request for this e-mail. Feel free to report to us at <a href="${config.get("base_url")} target="_blank">safeplaze.com</a> if this persist.</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Have a wonderful shopping experience.</p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                    
                                <!-- END MAIN CONTENT AREA -->
                                </table>
                    
                                <!-- START FOOTER -->
                                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                    <tr>
                                      <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                        Powered by <a href="${config.get("base_url")}" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Safeplaze</a>.
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!-- END FOOTER -->
                    
                              <!-- END CENTERED WHITE CONTAINER -->
                              </div>
                            </td>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                          </tr>
                        </table>
                      </body>
                    </html>`, // html body
                })

            })
            
            res.json({ status: true, message: "Sigup successful." })
        } else {
            throw new CustomError("Last name is not specified")
        }
    }catch(error) {
        console.log(error)
        if(error instanceof ValidationError) {
            const msg = error.errors[0].message
            res.status(400).json({ status: false, message:  msg})
        } else if(error instanceof CustomError) {
            res.status(400).json({ status: false, message: `Error: ${error.message}` })
        } else {
            res.status(500).json({ status: false, message: "Something went wrong." })
        }
    }
}