const movieData = require("../db.json");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello word!");
});

app.get("/movies", (req, res) => {
  res.json(movieData);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movieData.find((movie) => movie.id === parseInt(id));

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.listen(3000, () => {
  console.log("APP IS LISTENING! http://localhost:3000");
});
