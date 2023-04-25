/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tablo) => {
      tablo.increments("user_id");
      tablo.string("fname").notNullable();
      tablo.string("lname").notNullable();
      tablo.string("email").unique().notNullable();
      tablo.string("password").notNullable();
      tablo.string("role_name").notNullable();
    })
    .createTable("sectors", (tablo) => {
      tablo.increments("sector_id");
      tablo.string("sector_name").unique().notNullable();
      tablo.integer("sector_score").notNullable();
    })
    .createTable("occupations", (tablo) => {
      tablo.increments("occupation_id");
      tablo.string("occupation_name").unique().notNullable();
      tablo.integer("occupation_score").notNullable();
    })
    .createTable("priorities", (tablo) => {
      tablo.increments("priority_id");
      tablo.integer("priority").notNullable();
      tablo
        .integer("sector_id")
        .unsigned()
        .notNullable()
        .references("sector_id")
        .inTable("sectors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tablo
        .integer("occupation_id")
        .unsigned()
        .notNullable()
        .references("occupation_id")
        .inTable("occupations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("customers", (tablo) => {
      tablo.increments("customer_id");
      tablo.string("fname").notNullable();
      tablo.string("lname").notNullable();
      tablo.integer("experience_years").notNullable();
      tablo
        .integer("sector_id")
        .unsigned()
        .notNullable()
        .references("sector_id")
        .inTable("sectors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tablo
        .integer("occupation_id")
        .unsigned()
        .notNullable()
        .references("occupation_id")
        .inTable("occupations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("customers")
    .dropTableIfExists("priorities")
    .dropTableIfExists("occupations")
    .dropTableIfExists("sectors")
    .dropTableIfExists("users");
};
