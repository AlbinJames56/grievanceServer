require("dotenv").config();
const express = require("cors");
const cors = require("cors");
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const grievanceServer = express();

require("./DB/Connection");

grievanceServer.use(cors());
grievanceServer.use(express.json());
grievanceServer.use("/AdminRouter", adminRouter);
grievanceServer.use("/UserRouter", userRouter);

const PORT = 300;

grievanceServer.listen(PORT, () => {
  console.log("Server Started On port: ", PORT);
});
grievanceServer.length("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1 style=color:red>Wma server running and wait to client request</h1>"
    );
});
