/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("priorities").truncate();
  await knex("priorities").insert([
    {
      priority_id: 1,
      priority: 1,
      sector_id: 2,
      occupation_id: 2,
    },
    {
      priority_id: 2,
      priority: 2,
      sector_id: 1,
      occupation_id: 1,
    },
  ]);
};
