const router = require("express").Router();
const prioritiesModel = require("./priorities-model");

router.get("/", async (req, res, next) => {
  try {
    const allPriorities = await prioritiesModel.getAllPriorities();
    res.status(200).json(allPriorities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
