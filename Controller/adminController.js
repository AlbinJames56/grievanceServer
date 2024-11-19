const SuperHero = require("../Models/adminSchema");
const grievance = require("../Models/grievanceSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { notifySuperhero } = require("../utilits/socketUtils");
// register SuperHero
exports.registerSuperHero = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingSuperHero = await SuperHero.findOne({ username });

    if (existingSuperHero) {
      res.status(406).json("User Already Exists.. Please login..");
    } else {
      const newSuperHero = new SuperHero({
        username,
        password,
      });
      await newSuperHero.save();
      res.status(200).json(newSuperHero);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
// login SuperHero
exports.loginSuperHero = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingSuperHero = await SuperHero.findOne({ username, password });
    // console.log(existingUser);
    if (existingSuperHero) {
      // generate token
      const token = jwt.sign(
        { userId: existingSuperHero._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingSuperHero, token });
    } else {
      res.status(406).json("Invalid username/ password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// get all grievances
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
  const { status, action, updatedDate } = req.body;
  try {
    const updateGrievanceStatus = await grievance.findByIdAndUpdate(
      gid,
      { status, action, updatedDate },
      { new: true }
    );
    if (!updateGrievanceStatus) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    res.status(200).json(updateGrievanceStatus);
// update users interface
notifySuperhero("new-grievance", updateGrievanceStatus);

    // getting data from database to send details to user
    const grievanceDetails = await grievance.findById(gid);
    const { name, email, issue, description,date } = grievanceDetails;
    // send an email to user when status updated
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Grievance Status Updated",
      html: `
        <h3>Grievance Update</h3>
        <p><strong>Name:</strong> ${name}</p> 
        <p><strong>Issue:</strong> ${issue}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Action:</strong> ${action}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleString()}</p>
`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending mail", error);
      } else {
        console.log("Email send", info.response);
      }
    });
  } catch (err) {
    console.error("Error updating grievance:", err);
    res.status(500).json({ message: "Error updating grievance", error: err });
  }
};
