import fs from "fs";
import path from "path";
const dbPath = path.resolve("db/db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

export const getAll = () => {
  return db;
};

export const getById = (id) => {
  return db.find((movie) => movie.id === parseInt(id)) || null;
};
