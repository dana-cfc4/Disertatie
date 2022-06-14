const express = require("express");
const router = express.Router();

const subcategory_controller = require("../controllers/subcategoryController");

router.get("", subcategory_controller.getSubCategories);
router.post("", subcategory_controller.addSubCategory);
router.put("/:id", subcategory_controller.updateSubCategory);

module.exports = router;
