const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
const userRouter = require("./users/users-router");
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
module.exports = server;
