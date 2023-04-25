/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("customers").truncate();
  await knex("customers").insert([
    {
      customer_id: 1,
      fname: "Ali",
      lname: "Veli",
      experience_years: 2,
      sector_id: 1,
      occupation_id: 2,
    },
    {
      customer_id: 2,
      fname: "Orhan",
      lname: "Kasap",
      experience_years: 2,
      sector_id: 2,
      occupation_id: 3,
    },
  ]);
};
