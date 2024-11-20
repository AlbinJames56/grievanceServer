const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const { initSocket } = require("./utilits/socketUtils");
const express = require("express");
const cors = require("cors");
const adminRouter = require("./Routers/AdminRouter");
const userRouter = require("./Routers/UserRouter");
const grievanceServer = express();
const bodyParser = require("body-parser");

require("./DB/Connection");
// Increase the body-parser limit to handle large payloads
grievanceServer.use(bodyParser.json({ limit: "50mb" }));
grievanceServer.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

grievanceServer.use(cors()); 
grievanceServer.use(express.json());
grievanceServer.use("/AdminRouter", adminRouter);
grievanceServer.use("/UserRouter", userRouter);

const PORT = process.env.PORT ||3000;


// Allow connections from user and superhero apps
const server = http.createServer(grievanceServer);
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});
// Notify all connected clients when a grievance is added/updated
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);  
  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});
initSocket(io);

server.listen(PORT, () => {
  console.log("Server Started On port: ", PORT);
});
