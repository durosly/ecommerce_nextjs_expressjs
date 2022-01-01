const { Router } = require("express")
// MIDDLEWARE
const session = require("../middleware/session")
const signupValidateMiddleware = require("../middleware/signupValidateMiddleware")
const signupEmailValidateMiddleware = require("../middleware/signupEmailValidateMiddleware")
const sessionExit = require('../middleware/sessionExist')

//CONTROLLERS
const signupController = require("../controllers/signupController")
const signupEmailValidationContoller = require("../controllers/signupEmailValidationController")
const signupEmailValidationResend = require("../controllers/signupEmailValidationResend")
const loginController = require("../controllers/loginController")
const profileController = require("../controllers/profileController")
const profileUpdateController = require("../controllers/profileUpdateController")
const getCategory = require("../controllers/getCategory")
const getSpecialCategoryController = require("../controllers/getSpecialCategoryController")
const getSpecialCategoryProductsController = require("../controllers/getSpecialCategoryProductsController")
const getProductOfCategory = require("../controllers/getProductOfCategory")
const getProduct = require("../controllers/getProduct")
const addToUserCart = require("../controllers/addToUserCart")
const getUserCart = require("../controllers/getUserCart")
const deleteFromUserCart = require("../controllers/deleteFromUserCart")
const increaseCartItemCountController = require("../controllers/increaseCartItemCountController")
const decreaseCartItemCountController = require("../controllers/decreaseCartItemCountController")

// ROUTERS HANDLERS
const router = Router()
// SIGNUP ROUTES
router.get("/signup/verification/resend", session, signupEmailValidationResend)

router.post("/signup/verification", signupEmailValidateMiddleware, signupEmailValidationContoller) 

router.post("/signup", signupValidateMiddleware, session, signupController)

// LOGIN ROUTES
router.post("/login", session, loginController)

// USER INFO
// load profile details
router.get("/profile", session, sessionExit, profileController)

// update profile details
router.put("/profile", session, sessionExit, profileUpdateController)

// get Categories
router.get("/categories", getCategory)

// get products of a particular category
router.get("/products/category/:categoryId", getProductOfCategory)

// get a particular product info
router.get("/product/:id", getProduct)

// get product in special category
router.get("/special-category/:id/products", getSpecialCategoryProductsController)

// get special category for index page
router.get("/special-category", getSpecialCategoryController)

// add to cart P.S create middleware for validation
router.post("/cart/add", session, sessionExit, addToUserCart)

// get all items in user cart
router.get("/cart", session, sessionExit, getUserCart)

// delete item from cart
router.delete("/cart/:id", session, sessionExit, deleteFromUserCart)

// increase item count in cart
router.put("/cart/:id/increase", session, sessionExit, increaseCartItemCountController)

// decrease item count in cart
router.put("/cart/:id/decrease", session, sessionExit, decreaseCartItemCountController)



module.exports = router