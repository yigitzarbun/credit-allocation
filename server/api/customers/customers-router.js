const router = require("express").Router();
const customersModel = require("./customers-model");

router.get("/", async (req, res, next) => {
  try {
    const allCustomers = await customersModel.getAllCustomers();
    res.status(200).json(allCustomers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
