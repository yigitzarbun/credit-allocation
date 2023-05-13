const router = require("express").Router();
const sectorModel = require("./sectors-model");
const md = require("./sectors-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allSector = await sectorModel.getAllSectors();
    res.status(200).json(allSector);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/addSector",
  md.infoExists,
  md.sectorUnique,
  async (req, res, next) => {
    try {
      const newSector = req.body;
      const addSector = await sectorModel.createSector(newSector);
      res.status(201).json(newSector);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/:sector_id", async (req, res, next) => {
  try {
    const updates = { ...req.body };
    await sectorModel.updateSector(updates.sector_id, updates);
    const updatedSector = await sectorModel.findSectorById(updates.sector_id);
    res.status(201).json(updatedSector);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedSector = await sectorModel.deleteSector(req.params.id);
    res.status(200).json({ message: "Sektör başarıyla silindi" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
