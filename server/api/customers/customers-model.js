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

async function add(customers) {
  const customerIdArray = await db("customers").insert(customers);
  const customerId = customerIdArray[0];
  const newCustomer = await db("customers")
    .where("customer_id", customerId)
    .first();
  return newCustomer;
}
module.exports = {
  getAllCustomers,
  add,
};
