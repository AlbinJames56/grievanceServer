require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const grievanceServer = express();

require("./DB/Connection");

grievanceServer.use(cors()); 
grievanceServer.use(express.json());
grievanceServer.use("/AdminRouter", adminRouter);
grievanceServer.use("/UserRouter", userRouter);

const PORT = process.env.PORT ||3000;

grievanceServer.listen(PORT, () => {
  console.log("Server Started On port: ", PORT);
}); 
