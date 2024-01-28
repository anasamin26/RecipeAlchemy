const { Signup,SignIn,userVerification } = require("../controller/authController");
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.post("/verify", userVerification);
router.post("/signup", Signup);
router.post("/signin", SignIn);


module.exports = router;