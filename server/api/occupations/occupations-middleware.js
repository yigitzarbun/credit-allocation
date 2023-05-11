const occupationsModel = require("./occupations-model");

const occupationUnique = async (req, res, next) => {
  const { occupation_name } = req.body;
  const occupationExists = await occupationsModel.getByFilter({
    occupation_name,
  });
  if (occupationExists) {
    res.status(400).json({ message: "Meslek zaten bulunuyor" });
  } else {
    next();
  }
};
const infoExists = async (req, res, next) => {
  const { occupation_name, occupation_score } = req.body;
  if (!occupation_name || !occupation_score) {
    res.status(400).json({ message: "Gerekli bilgiler eksik" });
  }
};
module.exports = { occupationUnique, infoExists };
