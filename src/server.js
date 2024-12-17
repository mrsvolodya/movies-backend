const movieData = require("../db.json");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("This is API for Movies DB!");
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

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const movieIndex = movieData.findIndex((movie) => movie.id === parseInt(id));

  if (movieIndex !== -1) {
    movieData.splice(movieIndex, 1);
    return res.status(200).json({ message: "Movie deleted successfully" });
  }

  return res.status(404).json({ message: "Movie not found" });
});

app.listen(3000, () => {
  console.log("APP IS LISTENING! http://localhost:3000");
});
