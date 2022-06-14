const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

router.get("", category_controller.getCategories);
router.post("", category_controller.addCategory);
router.put("/:id", category_controller.updateCategory);

module.exports = router;
