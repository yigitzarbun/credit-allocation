/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tablo) => {
      tablo.increments("user_id");
      tablo.string("email").unique().notNullable();
      tablo.string("password").notNullable();
      tablo.string("role_name").notNullable();
    })
    .createTable("sectors", (tablo) => {
      tablo.increments("sector_id");
      tablo.string("sector_name").unique().notNullable();
    })
    .createTable("occupations", (tablo) => {
      tablo.increments("occupation_id");
      tablo.string("occupation_name").unique().notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("sectors");
};
