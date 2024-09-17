const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controllers");
// const auth = require("../middle-wares/auth");

router.post("/register", user_controller.register);
router.post("/log-in", user_controller.log_in);


module.exports = router;