const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController");

router.get("/catalog", productController.getAllProducts);
router.get("/item/:id", productController.getProductById);

module.exports = router;
