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
      landing_id: "abc",
      fname: "Ali",
      lname: "Veli",
      experience_years: 2,
      sector_id: 1,
      occupation_id: 2,
      priority_id: 1,
      pipedrive: false,
      credit_score: 60,
    },
    {
      customer_id: 2,
      landing_id: "def",
      fname: "Orhan",
      lname: "Kasap",
      experience_years: 2,
      sector_id: 2,
      occupation_id: 3,
      priority_id: 2,
      pipedrive: false,
      credit_score: 90,
    },
  ]);
};
