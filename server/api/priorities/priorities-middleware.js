const prioritiesModel = require("./priorities-model");

const priorityUnique = async (req, res, next) => {
  const { experience_years, sector_id, occupation_id } = req.body;
  const priorityExists = await prioritiesModel.getByFilter({
    experience_years,
    sector_id,
    occupation_id,
  });
  if (priorityExists) {
    res.status(400).json({ message: "Priority already exists" });
  } else {
    next();
  }
};
module.exports = { priorityUnique };
