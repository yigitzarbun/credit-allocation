const db = require("../../data/db-config");

async function getAllOccupations() {
  return db("occupations");
}
async function findOccupationById(id) {
  const Occupation = await db("occupations").where("occupation_id", id).first();
  return Occupation;
}
async function getByFilter(filter) {
  return await db("occupations").where(filter).first();
}

async function createOccupation(Occupation) {
  const CreatedOccupationId = await db("occupations").insert(Occupation);
  const createdOccupation = await findOccupationById(CreatedOccupationId);
  return createdOccupation;
}
async function updateOccupation(occupation_id, updates) {
  return db("occupations")
    .where("occupation_id", occupation_id)
    .update(updates);
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
  getByFilter,
  createOccupation,
  deleteOccupation,
  updateOccupation,
};
