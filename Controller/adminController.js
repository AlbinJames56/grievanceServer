const grievance = require("../Models/grievanceSchema");
const jwt = require("jsonwebtoken");

exports.getAllGrievances = async (req, res) => {
  // console.log("inside get all");
  try {
    const allGrievances = await grievance.find();
    if (allGrievances.length > 0) {
      res.status(200).json(allGrievances);
    } else {
      res.status(404).json({ message: "No grievances found" });
    }
  } catch (err) {
    console.log("catch", err);
    res.status(500).json(err);
  }
};

// update grievance status
exports.updateGrievance = async (req, res) => {
  // console.log("inside update status " );
  const { gid } = req.params;  
  const { status, action,updatedDate } = req.body;   
  try {
    const updateGrievanceStatus = await grievance.findByIdAndUpdate(
      gid,
      { status, action,updatedDate},
      { new: true }
    );
    if (!updateGrievanceStatus) {
        return res.status(404).json({ message: "Grievance not found" });
      }
    res.status(200).json(updateGrievanceStatus);
  } catch (err) {
    console.error("Error updating grievance:", err);
    res.status(500).json({ message: "Error updating grievance", error: err });
  }
}; 