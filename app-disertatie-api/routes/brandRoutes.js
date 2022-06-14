const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");

router.get("", brand_controller.getBrands);
router.post("", brand_controller.addBrand);
router.put("/:id", brand_controller.updateBrand);

module.exports = router;
