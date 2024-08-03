import pkg from 'pg';
const { Pool } = pkg;

const connectionString = "postgresql://playlist_vh9f_user:3CxgBlAr9lKnwTscVsVtGFZ9KxB9yMFS@dpg-cqn32p88fa8c73aktodg-a.frankfurt-postgres.render.com/playlist_vh9f";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
	rejectUnauthorized: false
  }
});

async function queryDatabase(query) {
  try {
	const client = await pool.connect();
	console.log('Connected to the database');

	const res = await client.query(query);
	console.log(res.rows); // Print the rows returned by the query

	client.release();
	console.log('Client released');
  } catch (err) {
	console.error('Error executing query', err.stack);
  } finally {
	await pool.end();
	console.log('Pool has ended');
  }
}

queryDatabase('SELECT * FROM songs WHERE id = 2');
