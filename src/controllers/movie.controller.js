import * as movieServices from "../services/movie.services.js";

export const get = (req, res) => {
  res.send("This is API for Movies DB!");
};

export const getAll = (req, res) => {
  res.send(movieServices.getAll());
};

export const getOne = (req, res) => {
  const { id } = req.params;
  const movie = movieServices.getById(id);

  if (!movie) {
    res.sendStatus(404);
    return;
  }

  return res.send(movie);
};

export const create = (req, res) => {
  const movie = req.body;
  const newMovie = movieServices.create(movie);

  if (!newMovie) {
    return res.sendStatus(422);
  }

  return res.status(201).send(newMovie);
};

export const update = (req, res) => {
  const { id } = req.params;
  const movie = req.body;
  const {
    title,
    image,
    genre,
    rating,
    director,
    description,
    releaseDate,
    actors,
  } = movie;

  if (
    !title ||
    !image ||
    !genre ||
    !rating ||
    !director ||
    !description ||
    !releaseDate ||
    !actors
  ) {
    res.sendStatus(422);
    return;
  }

  if (!movie) {
    res.sendStatus(404);
    return;
  }

  const updatedMovie = movieServices.update(id, movie);
  return res.status(200).send(updatedMovie);
};

export const remove = (req, res) => {
  const { id } = req.params;

  if (!movieServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  movieServices.remove(id);

  res.sendStatus(204);
};
