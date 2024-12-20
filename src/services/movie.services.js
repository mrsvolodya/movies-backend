import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const moviesDbPath = path.resolve("src/db/db.json");

const readMoviesFromFile = () => {
  try {
    const moviesDb = fs.readFileSync(moviesDbPath, "utf-8");
    return JSON.parse(moviesDb);
  } catch (error) {
    console.error("Error reading the database file:", error);
    return [];
  }
};

const writeMoviesToFile = (movies) => {
  try {
    fs.writeFileSync(moviesDbPath, JSON.stringify(movies, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to the database file:", error);
  }
};

const moviesDb = readMoviesFromFile();

export const getAll = () => readMoviesFromFile();

export const getById = (id) => {
  return readMoviesFromFile().find((movie) => movie.id === id) || null;
};

export const create = (movie) => {
  const newMovie = { id: uuidv4(), ...movie };

  moviesDb.push(newMovie);
  writeMoviesToFile(moviesDb);

  return newMovie;
};

export const update = (id, movie) => {
  const movieIndex = moviesDb.findIndex((movie) => movie.id === id);

  const updateMovie = {
    id: moviesDb[movieIndex].id,
    ...movie,
  };

  moviesDb[movieIndex] = updateMovie;
  writeMoviesToFile(moviesDb);

  return moviesDb;
};

export const remove = (id) => {
  const updatedMovies = moviesDb.filter((movie) => movie.id !== id);

  writeMoviesToFile(updatedMovies);
};
