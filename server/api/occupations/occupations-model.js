const db = require("../../data/db-config");

async function getAllOccupations() {
  return db("occupations");
}
async function findOccupationById(id) {
  const Occupation = await db("occupations").where("occupation_id", id).first();
  return Occupation;
}

async function createOccupation(Occupation) {
  const CreatedOccupationId = await db("occupations").insert(Occupation);
  const createdOccupation = await findOccupationById(CreatedOccupationId);
  return createdOccupation;
}
async function deleteOccupation(id) {
  const deletedOccupation = await db("occupations")
    .where("occupation_id", id)
    .del();
  return deletedOccupation;
}
module.exports = {
  getAllOccupations,
  findOccupationById,
  createOccupation,
  deleteOccupation,
};
