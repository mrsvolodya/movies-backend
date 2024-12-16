import express from "express";
import { router as _router, defaults } from "json-server";
import cors from "cors";
const app = express();

// Вказуємо шлях до db.json
const router = _router("db.json");
const middlewares = defaults();

// Додаємо CORS для доступу до API
app.use(cors());

// Використовуємо стандартні middleware
app.use(middlewares);

// Вказуємо, що маршрут /movies пов'язаний з json-server
app.use("/movies", router);

// Запускаємо сервер на порту 10000 (для Render)
app.listen(10000, () => {
  console.log("Server is running on http://localhost:10000");
});
