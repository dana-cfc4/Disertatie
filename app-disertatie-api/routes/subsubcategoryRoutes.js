const express = require("express");
const router = express.Router();

const subsubcategory_controller = require("../controllers/subsubcategoryController");

router.get("", subsubcategory_controller.getSubSubCategories);
router.post("", subsubcategory_controller.addSubSubCategory);
router.put("/:id", subsubcategory_controller.updateSubSubCategory);

module.exports = router;
