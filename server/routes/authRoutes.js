const { Signup,SignIn } = require("../controller/authController");
const express = require('express');
const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);


module.exports = router;