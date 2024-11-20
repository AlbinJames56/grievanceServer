const grievance = require("../Models/grievanceSchema");
const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { notifySuperhero } = require("../utilits/socketUtils");
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
    res.status(401).json("Network error");
  }
};

// save grievance to database
exports.addGrievance = async (req, res) => {
  // console.log("Inside add grievnace");
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.jwt_secret); // Decode token
  const userId = decoded.userId;
  const {
    name,
    email,
    issue,
    description,
    status = "Submitted",
    date,
    file
  } = req.body;
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
        file
      });
      await newGrievance.save();
     // Notify superheroes in real-time
    notifySuperhero("new-grievance", newGrievance);
      res.status(200).json(newGrievance);
      // send an email to superhero
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: "albinjamestpra@gmail.com",
        subject: "New Grievance Submitted",
        html: `
          <h3>New Grievance Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Issue:</strong> ${issue}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Status:</strong> ${status}</p>
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
