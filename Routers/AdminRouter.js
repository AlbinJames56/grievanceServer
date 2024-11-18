const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController"); 

const jwtMiddleware = require("../Middlewares/jwtMiddlewares");
// getAllGrievances
router.get("/getAllGrievances", adminController.getAllGrievances);
// updateGrievance
router.post("/updateGrievance", adminController.updateGrievance);
 

module.exports=router;
