const router = require("express").Router();
const customersModel = require("./customers-model");
const md = require("./customers-middleware");
router.get("/", async (req, res, next) => {
  try {
    const allCustomers = await customersModel.getAllCustomers();
    res.status(200).json(allCustomers);
  } catch (error) {
    next(error);
  }
});

router.post("/", md.customerUnique, async (req, res, next) => {
  try {
    const customer = await customersModel.add(req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

router.put("/:customer_id", async (req, res, next) => {
  try {
    const updates = { ...req.body };
    await customersModel.update(updates.customer_id, updates);
    const updatedCustomer = await customersModel.getById(updates.customer_id);
    res.status(201).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
