import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import styles from "./MoviesList.module.scss";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const fetchMovies = async () => {
    try {
      const params = {};
      if (genre) params.genre = genre;
      if (title) params.title = title;
      if (sortByRating) params.sortByRating = sortByRating;

      const response = await axios.get("/movies", { params });
      setMovies(response.data);
      setCurrentPage(1); // Сбрасываем пагинацию при фильтрах
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genre, title, sortByRating]);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      {/* Фільтри */}
      <div className={styles.filters}>
        <input
          placeholder="Фільтр за жанром"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{ padding: "8px", minWidth: "160px" }}
        />
        <input
          placeholder="Пошук за назвою"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", minWidth: "160px" }}
        />
        <select
          value={sortByRating}
          onChange={(e) => setSortByRating(e.target.value)}
          style={{ padding: "8px", minWidth: "180px" }}
        >
          <option value="">Сортувати за рейтингом</option>
          <option value="asc">За зростанням</option>
          <option value="desc">За спаданням</option>
        </select>
      </div>

      {/* Сітка фільмів */}
      <div className={styles["movies-grid"]}>
        {currentMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className={styles["movie-card"]}
          >
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className={styles["movie-poster"]}
              />
            )}
            <h4 className={styles["movie-title"]}>{movie.title}</h4>
            <p className={styles["movie-rating"]}>
              ⭐ {movie.rating?.toFixed(1) || "Н/Д"}
            </p>
          </Link>
        ))}
      </div>

      {/* Пагінація */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
