/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("users").insert([
    {
      user_id: 1,
      fname: "Ahmet",
      lname: "Kara",
      email: "ahmetkara@bank.com",
      password: "1234",
      role_name: "analyst",
    },
    {
      user_id: 2,
      fname: "Mehmet",
      lname: "Ak",
      email: "mehmetak@bank.com",
      password: "1234",
      role_name: "analyst",
    },
    {
      user_id: 3,
      fname: "Ayşe",
      lname: "Canik",
      email: "aysecanik@bank.com",
      password: "1234",
      role_name: "analyst",
    },
  ]);
};
