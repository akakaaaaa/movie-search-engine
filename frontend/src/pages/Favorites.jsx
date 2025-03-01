import "../css/Favorites.css";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [userInfo, setUserInfo] = useState({
    user_ip: "",
  });
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/api";

  const fetchIP = () => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setUserInfo((prev) => ({ ...prev, user_ip: data.ip }));
      })
      .catch((error) => console.log("Error fetching user IP", error));
  };

  useEffect(() => {
    fetchIP();
  }, []);

  useEffect(() => {
    if (!userInfo.user_ip) return;

    const getFavorites = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/movies/favorites?user_ip=${userInfo.user_ip}`
        );
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.log("Error fetching favorites", error);
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [userInfo.user_ip]);

  console.log(movies);
  return loading ? (
    <div>Loading...</div>
  ) : movies.length > 0 ? (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            movie_poster_path={movie.movie_poster_path}
            movie_release={movie.movie_release}
            movie_id={movie.movie_id}
            movie_title={movie.title}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites</p>
    </div>
  );
};
