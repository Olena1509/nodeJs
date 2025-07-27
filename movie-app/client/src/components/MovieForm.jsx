import React, { useState } from "react";
import { addMovie } from "../api";

export default function MovieForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre) {
      setMessage("Будь ласка, заповніть обов’язкові поля: назва та жанр");
      return;
    }

    try {
      await addMovie({ title, description, poster, genre, rating });
      setMessage("Фільм додано!");

      setTitle("");
      setDescription("");
      setPoster("");
      setGenre("");
      setRating(1);
    } catch (error) {
      const errMsg =
        error?.response?.data?.error || "Сталася помилка при додаванні фільму.";
      setMessage(errMsg);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Додати фільм</h2>
      <div>
        <label>
          Назва*:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Опис:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Постер (URL):
        <input
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
      </label>

      <label>
        Жанр*:
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="">-- оберіть жанр --</option>
          <option value="comedy">Комедія</option>
          <option value="drama">Драма</option>
          <option value="action">Бойовик</option>
        </select>
      </label>

      <label>
        Рейтинг (1-5):
        <input
          type="number"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value ? Number(e.target.value) : 1)
          }
          min={1}
          max={5}
          step={1}
        />
      </label>

      <button type="submit">Додати</button>

      {message && <p>{message}</p>}
    </form>
  );
}
