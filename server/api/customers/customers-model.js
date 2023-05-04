const db = require("../../data/db-config");
async function getAllCustomers() {
  const customers = await db("customers")
    .select(
      "customers.customer_id",
      "customers.fname",
      "customers.lname",
      "customers.experience_years",
      "customers.pipedrive",
      "customers.credit_score",
      "sectors.sector_id",
      "sectors.sector_name",
      "sectors.sector_score",
      "occupations.occupation_id",
      "occupations.occupation_name",
      "occupations.occupation_score",
      "priorities.priority",
      "priorities.experience_years as priority_experience_years"
    )
    .leftJoin("sectors", "sectors.sector_id", "customers.sector_id")
    .leftJoin(
      "occupations",
      "occupations.occupation_id",
      "customers.occupation_id"
    )
    .leftJoin("priorities", "priorities.priority_id", "customers.priority_id");
  return customers;
}

async function getById(customer_id) {
  return await db("customers").where("customer_id", customer_id).first();
}

async function getByFilter(filter) {
  const customer = await db("customers").where(filter).first();
  return customer;
}

async function add(customers) {
  const customerIdArray = await db("customers").insert(customers);
  const customerId = customerIdArray[0];
  const newCustomer = await db("customers")
    .where("customer_id", customerId)
    .first();
  return newCustomer;
}

async function update(customer_id, changes) {
  return db("customers").where("customer_id", customer_id).update(changes);
}
module.exports = {
  getAllCustomers,
  getById,
  getByFilter,
  add,
  update,
};
