import express from "express";
import cors from "cors";
import * as moviesService from "./movie.services.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is API for Movies DB!");
});

app.get("/movies", (req, res) => {
  res.send(moviesService.getAll());
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = moviesService.getById(id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = db.findIndex((movie) => movie.id === parseInt(id));

  if (movieIndex !== -1) {
    db.splice(movieIndex, 1);
    return res.status(200).json({ message: "Movie deleted successfully" });
  }

  return res.status(404).json({ message: "Movie not found" });
});

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = db.findIndex((movie) => movie.id === parseInt(id));

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
      ...db[movieIndex],
      title: title || db[movieIndex].title,
      image: image || db[movieIndex].image,
      rating: rating || db[movieIndex].rating,
      releaseDate: releaseDate || db[movieIndex].releaseDate,
      description: description || db[movieIndex].description,
      actors: actors || db[movieIndex].actors,
      director: director || db[movieIndex].director,
      genre: genre || db[movieIndex].genre,
    };

    db[movieIndex] = updateMovie;

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
    id: db.length ? db[db.length - 1].id + 1 : 1,
  };

  db.push(newMovie);

  return res.status(201).json(newMovie);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING! http://localhost:3000");
});
