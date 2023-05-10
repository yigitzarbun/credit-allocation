/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("weights").truncate();
  await knex("weights").insert([
    {
      weight_id: 1,
      field: "sector",
      weight_score: 0.5,
    },
    {
      weight_id: 2,
      field: "occupation",
      weight_score: 0.4,
    },
    {
      weight_id: 3,
      field: "experience",
      weight_score: 0.1,
    },
  ]);
};
