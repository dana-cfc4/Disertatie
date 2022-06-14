const express = require("express");
const router = express.Router();

let rating_controller = require("../controllers/ratingController");

router.get("", rating_controller.getRatings);
router.post("", rating_controller.addRating);
router.put("/:id", rating_controller.updateRating);
router.delete("/:id", rating_controller.deleteRating);

module.exports = router;
