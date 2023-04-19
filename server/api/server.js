const express = require("express");
const server = express();
server.use(express.json());
const userRouter = require("./users/users-router");
const sectorRouter = require("./sectors/sectors-router");
const occRouter = require("./occupations/occupations-router");
server.use("/api/users", userRouter);
server.use("/api/sector", sectorRouter);
server.use("/api/occ", occRouter);
server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
module.exports = server;
