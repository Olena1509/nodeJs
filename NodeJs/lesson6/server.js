import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const PORT = 3001;
const DATA_FILE = path.resolve('./phrases.json');

let phrases = [];

// Завантажуємо фрази з файлу при старті сервера
try {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  phrases = JSON.parse(data);
} catch {
  phrases = [];
}

function savePhrases() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(phrases, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  // GET /api/phrases?search=word
  if (url.pathname === '/api/phrases' && method === 'GET') {
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const filtered = search
      ? phrases.filter(p => p.en.toLowerCase().includes(search) || p.ua.toLowerCase().includes(search))
      : phrases;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(filtered));
  }

  // POST /api/phrases
  if (url.pathname === '/api/phrases' && method === 'POST') {
    const body = await parseBody(req);
    if (!body.en || !body.ua) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Missing "en" or "ua" field' }));
    }
    const newPhrase = {
      id: Date.now().toString(),
      en: body.en.trim(),
      ua: body.ua.trim(),
      learned: false,
    };
    phrases.push(newPhrase);
    savePhrases();

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newPhrase));
  }

  // DELETE /api/phrases/:id
  if (url.pathname.startsWith('/api/phrases/') && method === 'DELETE') {
    const id = url.pathname.split('/').pop();
    const index = phrases.findIndex(p => p.id === id);
    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Phrase not found' }));
    }
    phrases.splice(index, 1);
    savePhrases();

    res.writeHead(204);
    return res.end();
  }

  // PUT /api/phrases/:id (toggle learned)
  if (url.pathname.startsWith('/api/phrases/') && method === 'PUT') {
    const id = url.pathname.split('/').pop();
    const phrase = phrases.find(p => p.id === id);
    if (!phrase) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Phrase not found' }));
    }
    phrase.learned = !phrase.learned;
    savePhrases();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(phrase));
  }

  // 404 для інших маршрутів
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
