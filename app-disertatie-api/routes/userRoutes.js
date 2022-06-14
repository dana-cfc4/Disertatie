const express = require("express");
const user_controller = require("../controllers/userController");

const router = express.Router();

router.get('', user_controller.getUsers);
router.get('/:id', user_controller.getUserById);
router.post('/signup', user_controller.signup);
router.post("/signin", user_controller.signin);

module.exports = router;