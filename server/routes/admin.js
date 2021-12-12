const { Router } = require("express")

// MIDDLEWARE
const session = require("../middleware/session")
const sessionAdminExit = require("../middleware/sessionAdminExist")
const isSuperUser = require("../middleware/isSuperUser")

//CONTROLLERS
const adminLoginController = require("../controllers/adminLoginController")
const createCategoryController = require("../controllers/createCategoryController")
const adminGetCategoryController = require("../controllers/adminGetCategoryController")
const adminUpdateCategoryNameController = require("../controllers/adminUpdateCategoryNameController")
const adminDeleteCategoryContoller = require("../controllers/adminDeleteCategoryController")
const adminCreateProduct = require("../controllers/adminCreateProduct")
const adminGetProducts = require("../controllers/adminGetProducts")
const adminGetProduct = require("../controllers/adminGetProduct")
const adminUpdateProductImage = require("../controllers/adminUpdateProductImage")
const adminUpdateProductDesc = require("../controllers/adminUpdateProductDesc")
const adminUpdateProductQuantity = require("../controllers/adminUpdateProductQuantity")
const adminUpdateProductDiscount = require("../controllers/adminUpdateProductDiscount")
const adminUpdateProductPrice = require("../controllers/adminUpdateProductPrice")
const adminDeleteProduct = require("../controllers/adminDeleteProduct")

// ROUTERS HANDLERS
const router = Router()

// LOGIN ROUTES
/**
 * @route /admin/login
 * @method POST
 * @access PUBLIC
 */
router.post("/login", session, adminLoginController)

/**
 * @route /admin/category
 * @method POST
 * @access PRIVATE
 */
router.post("/category", session, sessionAdminExit, createCategoryController)

/**
 * @route /admin/category
 * @method GET
 * @access PRIVATE
 */
 router.get("/category", session, sessionAdminExit, adminGetCategoryController)

/**
 * @route /admin/category
 * @method PUT
 * @access PRIVATE
 */
 router.put("/category", session, sessionAdminExit, adminUpdateCategoryNameController)

/**
 * @route /admin/category
 * @method DELETE
 * @access PRIVATE
 */
 router.delete("/category", session, sessionAdminExit, isSuperUser, adminDeleteCategoryContoller)

/**
 * @route /admin/product
 * @method POST
 * @access PRIVATE
 */
 router.post("/product", session, sessionAdminExit, adminCreateProduct)

/**
 * @route /admin/product/:id
 * @method GET
 * @access PRIVATE
 */
 router.get("/product/:id", session, sessionAdminExit, adminGetProduct)

/**
 * @route /admin/product/:id/image
 * @method PUT
 * @access PRIVATE
 */
 router.put("/product/:id/image", session, sessionAdminExit, adminUpdateProductImage)

/**
 * @route /admin/product/:id/desc
 * @method PUT
 * @access PRIVATE
 */
 router.put("/product/:id/desc", session, sessionAdminExit, adminUpdateProductDesc)

/**
 * @route /admin/product/:id/quantity
 * @method PUT
 * @access PRIVATE
 */
 router.put("/product/:id/quantity", session, sessionAdminExit, adminUpdateProductQuantity)

/**
 * @route /admin/product/:id/discount
 * @method PUT
 * @access PRIVATE
 */
 router.put("/product/:id/discount", session, sessionAdminExit, adminUpdateProductDiscount)

/**
 * @route /admin/product/:id/price
 * @method PUT
 * @access PRIVATE
 */
 router.put("/product/:id/price", session, sessionAdminExit, adminUpdateProductPrice)

/**
 * @route /admin/product/:id
 * @method DELETE
 * @access PRIVATE
 */
 router.delete("/product/:id", session, sessionAdminExit, adminDeleteProduct)

/**
 * @route /admin/product
 * @method GET
 * @access PRIVATE
 */
 router.get("/product", session, sessionAdminExit, adminGetProducts)

module.exports = router