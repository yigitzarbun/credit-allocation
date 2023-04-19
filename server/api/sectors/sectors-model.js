const db = require("../../data/db-config");

async function getAllSectors() {
  return db("sectors");
}
async function findSectorById(id) {
  const sector = await db("sectors").where("sector_id", id).first();
  return sector;
}

async function createSector(sector) {
  const CreatedSectorId = await db("sectors").insert(sector);
  const createdSector = await findSectorById(CreatedSectorId);
  return createdSector;
}

async function updateSector(sector_id, updates) {
  return db("sectors").where("sector_id", sector_id).update(updates);
}

async function deleteSector(id) {
  const deletedSector = await db("sectors").where("sector_id", id).del();
  return deletedSector;
}
module.exports = {
  getAllSectors,
  findSectorById,
  createSector,
  updateSector,
  deleteSector,
};
