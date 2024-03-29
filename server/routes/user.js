const { Router } = require("express")
// MIDDLEWARE
const session = require("../middleware/session")
const signupValidateMiddleware = require("../middleware/signupValidateMiddleware")
const signupEmailValidateMiddleware = require("../middleware/signupEmailValidateMiddleware")
const sessionExit = require('../middleware/sessionExist')
const checkoutValidationMiddleware = require("../middleware/checkoutValidationMiddleware")

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
const addToUserCartFromLocalStorage = require("../controllers/addToUserCartFromLocalStorage")
const getUserSubtotalController = require("../controllers/getUserSubtotalController")
const getStates = require("../controllers/getStates")
const getuserCartDeliveryFee = require("../controllers/getuserCartDeliveryFee")
const getUserProfileState = require("../controllers/getUserProfileState")
const createOrder = require("../controllers/createOrder")
const getOrderProductInfo = require("../controllers/getOrderProductInfo")
const getOrders = require("../controllers/getOrders")
const getOrderStatus = require("../controllers/getOrderStatus")
const getProductDetails = require("../controllers/getProductDetails")

// ROUTERS HANDLERS
const router = Router()
// SIGNUP ROUTES
router.get("/signup/verification/resend", session, signupEmailValidationResend)

router.post("/signup/verification", signupEmailValidateMiddleware, signupEmailValidationContoller) 

router.post("/signup", signupValidateMiddleware, session, signupController)

// LOGIN ROUTES
router.post("/login", session, loginController)

// USER INFO
// load user profile state
router.get("/profile/state", session, sessionExit, getUserProfileState)
// load profile details
router.get("/profile", session, sessionExit, profileController)

// update profile details
router.put("/profile", session, sessionExit, profileUpdateController)

// get Categories
router.get("/categories", getCategory)

// get products of a particular category
router.get("/products/category/:categoryId", getProductOfCategory)

// get product details
router.get("/products/:id/details", getProductDetails)

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

// move local db to online db
router.post("/cart/offline", session, sessionExit, addToUserCartFromLocalStorage)

// load subtotal from server
router.get("/cart/subtotal", session, sessionExit, getUserSubtotalController)

// load states from server
router.get("/states", session, sessionExit, getStates)

// load states from server
router.get("/cart/delivery-fee/:state", session, sessionExit, getuserCartDeliveryFee)

// create order
router.post("/order", checkoutValidationMiddleware, session, sessionExit, createOrder)

// get order status
router.get("/order/:id/status", session, sessionExit, getOrderStatus)

// get order product 
router.get("/order/:id", session, sessionExit, getOrderProductInfo)

// get orders by date
router.get("/orders/:date", session, sessionExit, getOrders)


module.exports = router