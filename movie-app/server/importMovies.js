require('dotenv').config();
const axios = require('axios');
const { Pool } = require('pg');

const API_KEY = process.env.TMDB_API_KEY;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Функция для получения маппинга жанров
async function fetchGenres() {
  const res = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });

  const genres = res.data.genres;
  const genreMap = {};
  genres.forEach(g => {
    genreMap[g.id] = g.name;
  });

  return genreMap;
}

async function fetchMovies(genreMap, page = 1) {
  const res = await axios.get('https://api.themoviedb.org/3/movie/popular', {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page,
    },
  });

  console.log('Отримані фільми:', res.data.results.map(m => ({
    title: m.title,
    rating: m.vote_average
  })));

  return res.data.results.map(movie => ({
    title: movie.title,
    description: movie.overview,
    genre: movie.genre_ids.map(id => genreMap[id]).filter(Boolean).join(', '),
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    rating: movie.vote_average,
  }));
}

async function insertMovie(movie) {
  const query = `
    INSERT INTO movies (title, description, genre, poster, rating)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (title) DO NOTHING;
  `;

  const values = [
    movie.title,
    movie.description,
    movie.genre,
    movie.poster,
    movie.rating,
  ];

  await pool.query(query, values);
}

async function run() {
  try {
    console.log('Починаємо імпорт...');
    
    const genreMap = await fetchGenres();
    console.log('Отримали жанри:', genreMap);
    
    for (let page = 1; page <= 5; page++) {
      const movies = await fetchMovies(genreMap, page);
      for (const movie of movies) {
        console.log('Готуємо фільм:', movie.title, '| Жанри:', movie.genre);
        await insertMovie(movie);
        console.log(`✔ Збережено: ${movie.title}`);
      }
    }
    
    console.log('✅ Імпорт завершено!');
  } catch (err) {
    console.error('❌ Помилка:', err);
  } finally {
    await pool.end();
  }
}

run();
