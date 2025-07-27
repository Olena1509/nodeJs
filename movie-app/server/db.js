const { Pool } = require('pg');
require('dotenv').config();

console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Помилка підключення до бази даних:', err.stack);
  } else {
    console.log('Підключення до бази даних встановлено!');
    release();
  }
});

module.exports = pool;
