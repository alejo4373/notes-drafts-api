const pgp = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/users_notes_db"
const db = pgp(connectionString)

module.exports = db;
