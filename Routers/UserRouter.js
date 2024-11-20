const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const jwtMiddleware = require("../Middlewares/jwtMiddlewares");
const bodyParser = require("body-parser");

// register
router.post("/register", userController.register);
// login
router.post("/login", userController.login);

// addGrievance
router.post("/addGrievance", bodyParser.json({ limit: "50mb" }), userController.addGrievance);

// fetch user grievances
router.get("/getUserGrievance", userController.getUserGrievance);

module.exports = router;
