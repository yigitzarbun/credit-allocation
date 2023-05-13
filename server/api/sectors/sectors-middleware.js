const sectorsModel = require("./sectors-model");

const sectorUnique = async (req, res, next) => {
  const { sector_name } = req.body;
  const sectorExists = await sectorsModel.getByFilter({ sector_name });
  if (sectorExists) {
    res.status(400).json({ message: "Sektör zaten var" });
  } else {
    next();
  }
};

const infoExists = async (req, res, next) => {
  const { sector_name, sector_score } = req.body;
  if (!sector_name || !sector_score || sector_score > 100 || sector_score < 0) {
    res.status(400).json({ message: "Gerekli bilgiler eksik veya hatalı" });
  } else {
    next();
  }
};

module.exports = { sectorUnique, infoExists };
