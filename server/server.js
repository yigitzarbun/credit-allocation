const express = require("express");
const server = express();
server.use(express.json());
const userRouter = require("./users/users-router");
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
module.exports = server;
