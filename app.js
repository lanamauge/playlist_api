import pkg from "pg";
import express, { query } from "express";
import "dotenv/config";

const { Pool } = pkg;

const connectionString = process.env.DB_CONNECTION_STRING;
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

  return res.rows;
}

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/songs", async (req, res) => {
  let songs = await queryDatabase("SELECT * FROM SONGS");
  res.send(songs);
});

app.post("/songs", async (req, res) => {
  let song = req.body;
  let query = `INSERT INTO songs ("title", "artist", "year") VALUES ('${song.title}', '${song.artist}', ${song.year});`;
  await queryDatabase(query);
  res.send("🎵 Song added to playlist 📲");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
