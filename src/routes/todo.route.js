import express from "express";
import * as movieController from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", movieController.get);

router.get("/movies", movieController.getAll);

router.get("/movies/:id", movieController.getOne);

router.post("/movies", movieController.create);

router.put("/movies/:id", movieController.update);

router.delete("/movies/:id", movieController.remove);

export { router };
