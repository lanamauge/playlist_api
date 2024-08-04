
import express from "express";
import "dotenv/config";
import { queryDatabase } from "./db.js";


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
