/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sectors").truncate();
  await knex("sectors").insert([
    { sector_id: 1, sector_name: "Eğitim", score: 5 },
    { sector_id: 2, sector_name: "Sağlık", score: 4 },
    { sector_id: 3, sector_name: "Tarım", score: 7 },
  ]);
};
