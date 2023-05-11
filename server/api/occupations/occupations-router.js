const router = require("express").Router();
const occModel = require("./occupations-model");
const md = require("./occupations-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allSector = await occModel.getAllOccupations();
    res.status(200).json(allSector);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/addOcc",
  md.infoExists,
  md.occupationUnique,
  async (req, res, next) => {
    try {
      const newSector = req.body;
      const addSector = await occModel.createOccupation(newSector);
      res.status(201).json(newSector);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/:occupation_id", async (req, res, next) => {
  try {
    const updates = { ...req.body };
    await occModel.updateOccupation(updates.occupation_id, updates);
    const updatedOccupation = await occModel.findOccupationById(
      updates.occupation_id
    );
    res.status(201).json(updatedOccupation);
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
