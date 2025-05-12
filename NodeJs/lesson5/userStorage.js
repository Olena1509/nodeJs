const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'userData.json');

if (fs.existsSync(storagePath)) {
  const data = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
  if (data.username) {
    console.log(`Привіт знову, ${data.username}!`);
    process.exit();
  }
}

console.log('Введи своє ім’я:');
process.stdin.on('data', (input) => {
  const username = input.toString().trim();
  const data = { username };
  fs.writeFileSync(storagePath, JSON.stringify(data));
  console.log(`Ім’я ${username} збережено.`);
  process.exit();
});
