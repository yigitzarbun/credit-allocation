/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("occupations").truncate();
  await knex("occupations").insert([
    { occupation_id: 1, occupation_name: "Yönetici", score: 8 },
    { occupation_id: 2, occupation_name: "Uzman", score: 5 },
    { occupation_id: 3, occupation_name: "İşçi", score: 4 },
  ]);
};
