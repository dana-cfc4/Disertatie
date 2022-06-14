const express = require("express");
const router = express.Router();

let specification_controller = require("../controllers/specificationController");

router.get("", specification_controller.getSpecifications);
router.post("", specification_controller.addSpecification);
router.put("/:id", specification_controller.updateSpecification);

module.exports = router;
