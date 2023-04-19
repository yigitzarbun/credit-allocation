const router = require("express").Router();
const sectorModel = require("./sectors-model");

router.get("/", async (req, res, next) => {
  try {
    const allSector = await sectorModel.getAllSectors();
    res.status(200).json(allSector);
  } catch (error) {
    next(error);
  }
});
router.post("/addSector", async (req, res, next) => {
  try {
    const newSector = req.body;
    const addSector = await sectorModel.createSector(newSector);
    res.status(201).json(newSector);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { sector_id, updates } = req.body;
    await sectorModel.updateSector(sector_id, updates);
    const updatedSector = await sectorModel.findSectorById(sector_id);
    res.status(201).json(updatedSector);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await sectorModel.deleteSector(req.params.id);
    res.status(200).json({ message: "Sektör başarıyla silindi" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
