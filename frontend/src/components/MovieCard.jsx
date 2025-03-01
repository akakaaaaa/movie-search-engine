import { useState, useEffect } from "react";
import "../css/MovieCard.css";
import "../css/favorited.css";

const BASE_URL = "http://localhost:5000/api";

function MovieCard({
  movie_id,
  movie_title,
  movie_release,
  movie_poster_path,
}) {
  const [userIP, setUserIP] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching user IP", error);
        setIsLoading(false);
      }
    };

    fetchIP();
  }, []);

  const onFavoriteClick = (e) => {
    e.preventDefault();

    if (isLoading || !userIP) {
      console.log("IP is not yet available.");
      return;
    }

    console.log(movie_id, movie_title, movie_release, movie_poster_path);

    fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_ip: userIP,
        movie_id: movie_id,
        title: movie_title,
        movie_poster_path: movie_poster_path,
        movie_release: movie_release,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log("Error adding/removing from favorites:", data.message);
        } else {
          setIsFavorited((prev) => !prev);
          console.log("Movie successfully added/removed from favorites");
        }
      })
      .catch((error) =>
        console.log("Error adding/removing from favorites:", error)
      );
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie_poster_path}`}
          alt={movie_title}
        />
        <div className="movie-overlay">
          <button
            onClick={onFavoriteClick}
            disabled={isLoading}
            className={isFavorited ? "favorited" : ""}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie_title}</h3>
        <p>{movie_release?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
