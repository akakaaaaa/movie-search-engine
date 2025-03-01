import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Favorite from "./models/favorite.model.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());
// http://localhost:5173/

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

app.get("/api/movies/search", async (req, res) => {
  const { movie_title } = req.query;

  if (!movie_title) {
    return res
      .status(400)
      .json({ success: false, message: "Missing movie title" });
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        movie_title
      )}`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No movies found" });
    }

    res.status(200).json({ success: true, data: data.results });
  } catch (error) {
    console.error("Error fetching movies: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/favorites", async (req, res) => {
  const { user_ip } = req.query;

  try {
    if (!user_ip) {
      return res
        .status(400)
        .json({ success: false, message: "user_ip is required" });
    }

    const response = await Favorite.find({ user_ip });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.error("Error fetching favorites: ", error);
  }
});

app.post("/api/favorites", async (req, res) => {
  const { user_ip, movie_id, title, movie_release, movie_poster_path } =
    req.body;

  if (!user_ip || !movie_id || !title || !movie_poster_path || !movie_release) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingFavorite = await Favorite.findOne({ user_ip, movie_id });

    if (!existingFavorite) {
      await new Favorite({
        user_ip,
        movie_id,
        title,
        movie_release,
        movie_poster_path,
      }).save();
    } else {
      await Favorite.findOneAndDelete({ user_ip, movie_id });
    }

    const favorites = await Favorite.find({ user_ip });

    return res.status(200).json({ success: true, data: favorites });
  } catch (error) {
    console.error("Error while adding/deleting favorites:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
  connectDB();
});
