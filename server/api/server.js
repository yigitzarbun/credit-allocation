const express = require("express");
const server = express();
const axios = require("axios");
server.use(express.json());
const cors = require("cors");
const helmet = require("helmet");
server.use(helmet());
server.use(cors());
const userRouter = require("./users/users-router");
const sectorRouter = require("./sectors/sectors-router");
const occRouter = require("./occupations/occupations-router");
const customersRouter = require("./customers/customers-router");
const prioritiesRouter = require("./priorities/priorities-router");
const weightsRouter = require("./weights/weights-router");
server.use("/api/users", userRouter);
server.use("/api/sector", sectorRouter);
server.use("/api/occ", occRouter);
server.use("/api/customers", customersRouter);
server.use("/api/priorities", prioritiesRouter);
server.use("/api/weights", weightsRouter);

const typeFormId = "G6vvOlZz";
const typeFormToken = process.env.REACT_APP_TYPE_FORM;

server.use("/typeform", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const response = await axios.get(
      `https://api.typeform.com/forms/${typeFormId}/responses`,
      {
        headers: {
          Authorization: `Bearer ${typeFormToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const formData = response.data;
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get form data from Typeform" });
  }
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});
module.exports = server;
