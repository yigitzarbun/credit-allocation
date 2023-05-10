const router = require("express").Router();
const prioritiesModel = require("./priorities-model");
const md = require("./priorities-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allPriorities = await prioritiesModel.getAllPriorities();
    res.status(200).json(allPriorities);
  } catch (error) {
    next(error);
  }
});

router.post("/", md.priorityUnique, async (req, res, next) => {
  try {
    const newPriority = await prioritiesModel.add(req.body);
    res.status(201).json(newPriority);
  } catch (error) {
    next(error);
  }
});

router.put("/:priority_id", async (req, res, next) => {
  try {
    const updates = req.body;
    await prioritiesModel.update(updates.priority_id, updates);
    const updatedPriority = await prioritiesModel.getById(updates.priority_id);
    res.status(200).json(updatedPriority);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
