const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

// Відкриваємо файл db.json
const dbPath = path.join(__dirname, "../db.json");
let dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// Налаштовуємо парсинг JSON
app.use(express.json());

// Отримати всі фільми
app.get("/api/movies", (req, res) => {
  res.json(dbData.movies);
});

// Додати новий фільм
app.post("/api/movies", (req, res) => {
  const newMovie = req.body;
  dbData.movies.push(newMovie);
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), "utf-8");
  res.status(201).json(newMovie);
});

// Запуск серверу
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
