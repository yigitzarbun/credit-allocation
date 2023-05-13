const prioritiesModel = require("./priorities-model");

const priorityUnique = async (req, res, next) => {
  const { experience_years, sector_id, occupation_id } = req.body;
  const priorityExists = await prioritiesModel.getByFilter({
    experience_years,
    sector_id,
    occupation_id,
  });
  if (priorityExists) {
    res.status(400).json({ message: "Öncelik zaten mevcut" });
  } else {
    next();
  }
};

const infoValid = async (req, res, next) => {
  const { priority, experience_years, sector_id, occupation_id } = req.body;
  if (!priority || !experience_years || !sector_id || !occupation_id) {
    res.status(400).json({ message: "Gerekli bilgiler eksik" });
  } else {
    next();
  }
};

module.exports = { priorityUnique, infoValid };
