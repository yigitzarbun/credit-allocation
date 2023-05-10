const db = require("../../data/db-config");

async function getAll() {
  const weights = await db("weights");
  return weights;
}

async function getById(weight_id) {
  const weight = await db("weights").where("weight_id", weight_id).first();
  return weight;
}

async function update(weight_id, changes) {
  return db("weights").where("weight_id", weight_id).update(changes);
}

module.exports = {
  getAll,
  getById,
  update,
};
