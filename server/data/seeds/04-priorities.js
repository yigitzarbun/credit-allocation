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
      priority: 0,
    },
    {
      priority_id: 2,
      priority: 1,
    },
    {
      priority_id: 3,
      priority: 2,
    },
    {
      priority_id: 4,
      priority: 3,
    },
    {
      priority_id: 5,
      priority: 4,
    },
    {
      priority_id: 6,
      priority: 5,
    },
  ]);
};
