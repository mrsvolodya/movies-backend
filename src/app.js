import cors from "cors";
import "dotenv/config";
import express from "express";
import { router as movieRouter } from "./routes/todo.route.js";
const app = express();

app.use(cors());

app.use("/", express.json(), movieRouter);
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {});
