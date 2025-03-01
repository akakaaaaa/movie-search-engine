import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    movie_id: {
      type: Number,
      required: true,
    },
    user_ip: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    movie_release: {
      type: String,
      required: true,
    },
    movie_poster_path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("favorite", favoriteSchema);

export default Favorite;
