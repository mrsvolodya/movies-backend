import db from "./db/db.json" assert { type: "json" };

export const getAll = () => {
  return db;
};

export const getById = (id) => {
  return db.find((movie) => movie.id === parseInt(id)) || null;
};
