import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import movieRoutes from "./routes/movie.route.js";

const app = express();

app.use(cors());

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
  connectDB();
});
