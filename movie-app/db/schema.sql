CREATE DATABASE movie_db;

-- Таблиця фільмів
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    poster_url TEXT,
    genre VARCHAR(100),
    avg_rating FLOAT DEFAULT 0
);

-- Таблиця оцінок
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5)
);
