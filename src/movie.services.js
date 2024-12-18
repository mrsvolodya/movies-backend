const db = require("../db.json");

export const getAll = () => {
  return db;
};

export const getById = (id) => {
  return db.find((movie) => movie.id === parseInt(id)) || null;
};
