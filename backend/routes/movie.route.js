import express, { Router } from "express";
import {
  getFavoriteMovies,
  getPopularMovies,
  postFavoriteMovies,
  getMovies,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/popular", getPopularMovies);

router.get("/", getMovies);

router.get("/favorites", getFavoriteMovies);

router.post("/favorites", postFavoriteMovies);

export default router;
