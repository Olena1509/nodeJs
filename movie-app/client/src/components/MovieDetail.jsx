import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import styles from "./MovieDetail.module.scss"; // импорт CSS-модуля

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Помилка при завантаженні фільму:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className={styles.loadingText}>Завантаження...</p>;
  if (!movie) return <p className={styles.loadingText}>Фільм не знайдено.</p>;

  return (
    <div className={styles.movieDetailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.movieCard}>
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title}
            className={styles.moviePoster}
          />
        )}

        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>{movie.title}</h2>

          <p className={styles.movieDescription}>
            <strong>Опис:</strong> {movie.description || "Немає опису."}
          </p>

          <p className={styles.movieGenre}>
            <strong>Жанр:</strong> {movie.genre || "Невідомо"}
          </p>

          <p className={styles.movieRating}>
            <strong>Рейтинг:</strong> ⭐ {movie.rating?.toFixed(1) || "Н/Д"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

