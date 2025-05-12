const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'userData.json');

const shouldReset = process.argv.includes('--reset');

if (shouldReset) {
  fs.writeFileSync(storagePath, JSON.stringify({}));
  console.log('Глобальне сховище очищено.');
} else {
  if (fs.existsSync(storagePath)) {
    const data = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
    console.log('Поточне сховище:', data);
  } else {
    console.log('Сховище ще не створено.');
  }
}
