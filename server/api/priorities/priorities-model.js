const db = require("../../data/db-config");

async function getAllPriorities() {
  const priotiries = await db("priorities")
    .leftJoin("sectors", "sectors.sector_id", "priorities.sector_id")
    .leftJoin(
      "occupations",
      "occupations.occupation_id",
      "priorities.occupation_id"
    );
  return priotiries;
}
module.exports = {
  getAllPriorities,
};
