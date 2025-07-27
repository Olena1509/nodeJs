import React, { useState } from "react";
import { addMovie } from "../api";
import styles from "./AddMovieForm.module.scss";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = {
        title,
        description,
        genre,
        poster,
        rating: rating ? Number(rating) : null,
      };
      const response = await addMovie(newMovie);
      alert(`Фільм "${response.title}" додано!`);

      setTitle("");
      setDescription("");
      setGenre("");
      setPoster("");
      setRating("");
    } catch (error) {
      console.error(error);
      alert("Помилка при додаванні фільму");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />
      <input
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className={styles.input}
      />
      <input
        placeholder="Жанр"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
        className={styles.input}
      />
      <input
        placeholder="URL постера"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        className={styles.input}
      />
      <input
        placeholder="Рейтинг (1-10)"
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Додати фільм
      </button>
    </form>
  );
};

export default AddMovieForm;
