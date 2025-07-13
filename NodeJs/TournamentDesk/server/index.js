import http from 'http';
import { Pool } from 'pg';
import url from 'url';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tournaments_db',
  password: 'postgres',
  port: 5432,
});

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method === 'GET') {
      switch (pathname) {
        case '/api/tournaments': {
          const result = await pool.query('SELECT * FROM tournaments');
          res.end(JSON.stringify(result.rows));
          break;
        }

        case '/api/cities': {
          const result = await pool.query('SELECT DISTINCT city FROM tournaments');
          res.end(JSON.stringify(result.rows.map(r => r.city)));
          break;
        }

        case '/api/statistics': {
          const total = await pool.query('SELECT COUNT(*) FROM tournaments');
          const avg = await pool.query('SELECT AVG(prize_pool) FROM tournaments');
          const players = await pool.query('SELECT SUM(players_registered) FROM tournaments');

          res.end(JSON.stringify({
            totalTournaments: parseInt(total.rows[0].count),
            averagePrizePool: Math.round(parseFloat(avg.rows[0].avg)),
            totalPlayers: parseInt(players.rows[0].sum),
          }));
          break;
        }

        case '/api/top': {
          const result = await pool.query('SELECT * FROM tournaments ORDER BY prize_pool DESC LIMIT 5 OFFSET 2');
          res.end(JSON.stringify(result.rows));
          break;
        }

        case '/api/above-average': {
          const result = await pool.query(`
            SELECT * FROM tournaments
            WHERE prize_pool > (SELECT AVG(prize_pool) FROM tournaments)
          `);
          res.end(JSON.stringify(result.rows));
          break;
        }

        default:
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Not Found' }));
      }
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});