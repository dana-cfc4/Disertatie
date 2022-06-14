const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");

router.get("", order_controller.getOrders);
router.post("", order_controller.addOrder);

module.exports = router;
