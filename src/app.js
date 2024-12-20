import express from "express";
import cors from "cors";
import { router as movieRouter } from "./routes/todo.route.js";
const app = express();

app.use(cors());

app.use("/", express.json(), movieRouter);

app.listen(3005, () => {});
