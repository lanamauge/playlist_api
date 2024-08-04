import pkg from "pg";

const { Pool } = pkg;

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const client = await pool.connect();
console.log("Connected to the database");

export async function queryDatabase(query) {

  const res = await client.query(query);

  return res.rows;
}