const movieData = require("./db/db.json");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movieData.findIndex((movie) => movie.id === parseInt(id));

  if (movieIndex !== -1) {
    const {
      title,
      image,
      rating,
      releaseDate,
      description,
      actors,
      director,
      genre,
    } = req.body;

    if (
      !title &&
      !image &&
      !rating &&
      !releaseDate &&
      !description &&
      !actors &&
      !director &&
      !genre
    ) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const updateMovie = {
      ...movieData[movieIndex],
      title: title || movieData[movieIndex].title,
      image: image || movieData[movieIndex].image,
      rating: rating || movieData[movieIndex].rating,
      releaseDate: releaseDate || movieData[movieIndex].releaseDate,
      description: description || movieData[movieIndex].description,
      actors: actors || movieData[movieIndex].actors,
      director: director || movieData[movieIndex].director,
      genre: genre || movieData[movieIndex].genre,
    };

    movieData[movieIndex] = updateMovie;

    return res.status(200).json(updateMovie);
  }

  return res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const data = req.body;

  if (
    !data.title &&
    !data.image &&
    !data.rating &&
    !data.releaseDate &&
    !data.description &&
    !data.actors &&
    !data.director &&
    !data.genre
  ) {
    return res.status(400).json({ message: "Not all data provided" });
  }

  const newMovie = {
    ...data,
    id: movieData.length ? movieData[movieData.length - 1].id + 1 : 1,
  };

  movieData.push(newMovie);

  return res.status(201).json(newMovie);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING! http://localhost:3000");
});
