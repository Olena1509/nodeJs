const fs = require('fs');

const readStream = fs.createReadStream('bigfile.txt', 'utf8');

readStream.on('data', chunk => {
  console.log(chunk.toUpperCase());
});

readStream.on('end', () => {
  console.log('\n--- Кінець читання файлу ---');
});

readStream.on('error', err => {
  console.error('Помилка при читанні файлу:', err.message);
});
