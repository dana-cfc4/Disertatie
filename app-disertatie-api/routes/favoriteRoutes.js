const express = require("express");
const router = express.Router();

let favorite_controller = require("../controllers/favoriteController");

router.get("", favorite_controller.getFavorites);
router.post("", favorite_controller.addFavorite);
router.delete("/:id", favorite_controller.deleteFavorite);

module.exports = router;
