const router = require("express").Router();
const weightsModel = require("./weights-model");

router.get("/", async (req, res, next) => {
  try {
    const weights = await weightsModel.getAll();
    res.status(200).json(weights);
  } catch (error) {
    next(error);
  }
});

router.put("/:weight_id", async (req, res, next) => {
  try {
    const changes = req.body;
    await weightsModel.update(changes.weight_id, changes);
    const updatedWeight = await weightsModel.getById(changes.weight_id);
    res.status(200).json(updatedWeight);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
