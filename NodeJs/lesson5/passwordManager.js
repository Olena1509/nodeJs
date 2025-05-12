const crypto = require('crypto');
const users = {};

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function registerUser(username, password) {
  const hashed = hashPassword(password);
  users[username] = hashed;
  console.log(`Користувача ${username} зареєстровано.`);
}

function loginUser(username, password) {
  const hashed = hashPassword(password);
  if (users[username] && users[username] === hashed) {
    console.log(`Вхід дозволено для ${username}`);
  } else {
    console.log('Невірний логін або пароль');
  }
}

registerUser('olena', 'mySecret123');
loginUser('olena', 'mySecret123');  
loginUser('olena', 'wrongpass');    
