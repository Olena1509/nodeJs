const http = require('http');
const PORT = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // <-- Оце важливо!
  res.end('Сервер працює');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
