const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// register
router.post("/register", userController.register);
// login
router.post("/login", userController.login);

module.exports=router;
