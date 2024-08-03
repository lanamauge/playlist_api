import pkg from "pg";
import express, { query } from "express";

const { Pool } = pkg;

const connectionString =
  "postgresql://playlist_vh9f_user:3CxgBlAr9lKnwTscVsVtGFZ9KxB9yMFS@dpg-cqn32p88fa8c73aktodg-a.frankfurt-postgres.render.com/playlist_vh9f";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function queryDatabase(query) {
  const client = await pool.connect();
  console.log("Connected to the database");

  const res = await client.query(query);
  // console.log(res.rows); // Print the rows returned by the query

  return res.rows;
}

//queryDatabase('SELECT * FROM songs WHERE id = 2');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/songs", async (req, res) => {
  let songs = await queryDatabase("SELECT * FROM SONGS");
  res.send(songs);
});

app.post("/songs", async (req, res) => {
	let song = req.body;
	let query = `INSERT INTO songs ("title", "artist", "year") VALUES ('${song.title}', '${song.artist}', ${song.year});`
	await queryDatabase(query);
	res.send("🎵 Song added to playlist 📲");
})
