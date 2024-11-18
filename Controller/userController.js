const grievance = require("../Models/grievanceSchema");
const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

// register controller
exports.register = async (req, res) => {
  // console.log("inside register function");
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      res.status(406).json("User Already Exists.. Please login..");
    } else {
      const newUser = new users({
        username,
        email,
        password,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.login = async (req, res) => {
  //   console.log("inside login function");
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email, password });
    // console.log(existingUser);
    if (existingUser) {
      // generate token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("Invalid email/ password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// save grievance to database
exports.addGrievance = async (req, res) => {
  // console.log("Inside add grievnace");
  const token = req.query.token;
    const decoded = jwt.verify(token, process.env.jwt_secret); // Decode token
    const userId = decoded.userId; 
  const { name, email, issue, description, status = "Submitted",date} = req.body;
  try {
    const user = await users.findOne({ email });
    if (user) {
      const newGrievance = new grievance({
        name,
        email,
        issue,
        userId,
        description,
        date,
        status,
      });
      await newGrievance.save();
      res.status(200).json(newGrievance);
    } else {
      console.log("User Doesn't exists");
      res.status(406).json("User Doesn't exists ");
    }
  } catch (err) {
    console.log("Catch error", err);
    res.status(500).json(err);
  }
};
exports.getUserGrievance = async (req, res) => {
  const token = req.query.token;
    const decoded = jwt.verify(token, process.env.jwt_secret); // Decode token
    const userId = decoded.userId; 
  
  try {
    const grievances = await grievance.find({ userId });
    if (grievances.length > 0) {
      res.status(200).json(grievances);
    } else {
      res.status(404).json({ message: "No grievances found for this user" });
    }
  } catch (err) {
    console.log("catch", err);
    res.status(500).json(err);
  }
};
