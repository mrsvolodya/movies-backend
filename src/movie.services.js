import fs from "fs";
const db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

export const getAll = () => {
  return db;
};

export const getById = (id) => {
  return db.find((movie) => movie.id === parseInt(id)) || null;
};
