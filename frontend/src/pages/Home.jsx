import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/api";

  async function loadPopularMovies(setMovies) {
    try {
      const response = await fetch(`${BASE_URL}/movies/popular`);
      const data = await response.json();

      if (data.success && data.data.results) {
        setMovies(data.data.results);
      } else {
        console.error("Failed to fetch popular movies:", data.message);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error.message);
    }
  }

  useEffect(() => {
    loadPopularMovies(setMovies);
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/movies/search?movie_title=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (!data.success || !data.data) {
        console.log("Error searching movies");
        return;
      }

      setMovies(data.data);
    } catch (error) {
      console.error("Error searching movies:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="movies-grid">
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <MovieCard
              movie_poster_path={movie.poster_path}
              movie_release={movie.release_date}
              movie_id={movie.id}
              movie_title={movie.title}
              key={movie.id}
            />
          ))}
      </div>
    </div>
  );
};
