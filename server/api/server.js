const express = require("express");
const server = express();
server.use(express.json());
const userRouter = require("./users/users-router");
server.use("/api/users", userRouter);
module.exports = server;
