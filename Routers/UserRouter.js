const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const jwtMiddleware = require("../Middlewares/jwtMiddlewares");

// register
router.post("/register", userController.register);
// login
router.post("/login", userController.login);

// addGrievance
router.post("/addGrievance", userController.addGrievance);

// fetch user grievances
router.get("/getUserGrievance", userController.getUserGrievance);

module.exports = router;
