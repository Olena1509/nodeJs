const pool = require('../db');

// Отримати всі фільми (плюс фільтрація/пошук/сортування)
exports.getMovies = async (req, res) => {
  try {
    const { genre, title, sortByRating } = req.query;

    let baseQuery = 'SELECT * FROM movies';
    const conditions = [];
    const values = [];

    if (genre) {
      values.push(`%,${genre},%`);
      conditions.push(`(',' || genre || ',') ILIKE $${values.length}`);
    }


    if (title) {
      values.push(`%${title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    if (sortByRating === 'asc') {
      baseQuery += ' ORDER BY rating ASC';
    } else if (sortByRating === 'desc') {
      baseQuery += ' ORDER BY rating DESC';
    }

    const result = await pool.query(baseQuery, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};

// Отримати один фільм за id
exports.getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Фільм не знайдено' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};

// Додати новий фільм
exports.addMovie = async (req, res) => {
  console.log('New movie data received:', req.body);
  const { title, description, poster, genre, rating } = req.body;

  if (!title || !description || !genre) {
    return res.status(400).json({ error: 'Обовʼязкові поля: title, description, genre' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO movies (title, description, poster, genre, avg_rating)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, poster || null, genre, rating || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера при додаванні фільму' });
  }
};

// Оновити фільм
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, poster, genre, avg_rating } = req.body;

    const result = await pool.query(
      `UPDATE movies SET title = $1, description = $2, poster = $3, genre = $4, avg_rating = $5 WHERE id = $6 RETURNING *`,
      [title, description, poster, genre, avg_rating, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Фільм не знайдено' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};

// Видалити фільм
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Фільм не знайдено' });
    }

    res.json({ message: 'Фільм видалено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};

// Додати рейтинг фільму
exports.addRating = async (req, res) => {
  const movieId = req.params.id;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Рейтинг має бути від 1 до 5' });
  }

  try {
    // Додати оцінку у таблицю movie_ratings
    await pool.query(
      'INSERT INTO movie_ratings (movie_id, rating) VALUES ($1, $2)',
      [movieId, rating]
    );

    // Обчислити середній рейтинг
    const avgResult = await pool.query(
      'SELECT AVG(rating) AS avg_rating FROM movie_ratings WHERE movie_id = $1',
      [movieId]
    );

    const avgRating = avgResult.rows[0].avg_rating;

    // Оновити середній рейтинг у таблиці movies
    await pool.query(
      'UPDATE movies SET avg_rating = $1 WHERE id = $2',
      [avgRating, movieId]
    );

    res.json({ message: 'Оцінка додана', avg_rating: avgRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
};
