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

async function getById(priority_id) {
  const result = await db("priorities")
    .where("priority_id", priority_id)
    .first();
  return result;
}

async function getByFilter(filter) {
  const priority = await db("priorities").where(filter).first();
  return priority;
}

async function add(formData) {
  const priorityIdArray = await db("priorities").insert(formData);
  const priorityId = priorityIdArray[0];
  const newPriority = await db("priorities")
    .where("priority_id", priorityId)
    .first();
  return newPriority;
}

async function update(priority_id, changes) {
  return db("priorities").where("priority_id", priority_id).update(changes);
}
module.exports = {
  getAllPriorities,
  add,
  update,
  getById,
  getByFilter,
};
