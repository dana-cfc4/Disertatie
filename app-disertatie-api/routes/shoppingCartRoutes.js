const express = require("express");
const router = express.Router();

let cart_controller = require("../controllers/shoppingCartController");

router.get("", cart_controller.getCarts);
router.post("", cart_controller.addCart);
router.put("/:id", cart_controller.updateCart);
router.delete("/:id", cart_controller.deleteCart);

module.exports = router;
