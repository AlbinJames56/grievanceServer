const express = require("express");
const router = express.Router();
const adminController = require("../Controller/adminController"); 
// getAllGrievances
router.get("/getAllGrievances", adminController.getAllGrievances);
// updateGrievance
router.put("/updateGrievance/:gid", adminController.updateGrievance);
// register superhero
router.post("/registerSuperHero",adminController.registerSuperHero)
 // login superhero
router.post("/loginSuperHero", adminController.loginSuperHero);

module.exports = router;
