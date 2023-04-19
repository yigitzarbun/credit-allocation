const router = require("express").Router();
const occModel = require("./occupations-model");

router.get("/", async (req, res, next) => {
  try {
    const allSector = await occModel.getAllOccupations();
    res.status(200).json(allSector);
  } catch (error) {
    next(error);
  }
});
router.post("/addOcc", async (req, res, next) => {
  try {
    const newSector = req.body;
    const addSector = await occModel.createOccupation(newSector);
    res.status(201).json(newSector);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await occModel.deleteOccupation(req.params.id);
    res.status(200).json({ message: "Meslek başarıyla silindi" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
