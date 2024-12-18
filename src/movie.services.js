import fs from "fs";
import path from "path";
const filePath = path.resolve("src/db/db.json");
console.log(filePath);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
}

const db = JSON.parse(fs.readFileSync(filePath, "utf-8"));

export const getAll = () => {
  return db;
};

export const getById = (id) => {
  return db.find((movie) => movie.id === parseInt(id)) || null;
};
