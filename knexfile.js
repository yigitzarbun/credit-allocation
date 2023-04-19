/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./server/data/migrations" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: "./server/data/schemes.db3" },
    seeds: { directory: "./server/data/seeds" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./server/data/test.db3" },
    seeds: {
      directory: "./data/seeds",
    },
  },
  production: {
    ...sharedConfig,
    connection: { filename: "./server/data/schemes.db3" },
    seeds: { directory: "./server/data/seeds" },
  },
};
