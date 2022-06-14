const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/productController");

router.get("", product_controller.getProducts);
router.post("", product_controller.addProduct);
router.put("/:id", product_controller.updateProduct);

module.exports = router;
