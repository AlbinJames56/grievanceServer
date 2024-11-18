const mongoose = require("mongoose");
const grievanceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  action: {
    type: String,
  },
});
const grievance = mongoose.model("grievance", grievanceSchema);
module.exports = grievance;
