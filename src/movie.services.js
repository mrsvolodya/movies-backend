import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve("src/db/db.json");

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let moviesDb = [];

try {
  const movies = fs.readFileSync(filePath, "utf-8");
  moviesDb = JSON.parse(movies);
} catch (error) {
  console.error("Error reading or parsing the db.json file:", error);
  process.exit(1);
}

export const getAll = () => {
  return moviesDb;
};

export const getById = (id) => {
  return moviesDb.find((movie) => movie.id === parseInt(id)) || null;
};

export const createMovie = (movie) => {
  if (
    !movie.title ||
    !movie.image ||
    !movie.rating ||
    !movie.releaseDate ||
    !movie.description ||
    !movie.actors ||
    !movie.director ||
    !movie.genre
  ) {
    return null;
  }

  const newMovie = {
    ...movie,
    id: uuidv4(),
  };

  fs.writeFileSync(filePath, JSON.stringify(newMovie, null, 2), "utf-8");

  return newMovie;
};

export const deleteMovieById = (id) => {
  const movieIndex = moviesDb.findIndex((movie) => movie.id === id);

  if (movieIndex !== -1) {
    moviesDb.splice(movieIndex, 1);
    saveDatabase(db);
    return true;
  }

  return false;
};
