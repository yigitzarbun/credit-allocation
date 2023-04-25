const db = require("../../data/db-config");
async function getAllCustomers() {
  const customers = await db("customers")
    .leftJoin("sectors", "sectors.sector_id", "customers.sector_id")
    .leftJoin(
      "occupations",
      "occupations.occupation_id",
      "customers.occupation_id"
    );
  return customers;
}
module.exports = {
  getAllCustomers,
};
