const crypto = require('crypto');

global.database = global.database || {};

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function saveUser(username, password) {
  const hashedPassword = hashPassword(password);
  global.database[username] = {
    username,
    password: hashedPassword
  };
  console.log(`Користувач ${username} збережений з хешованим паролем.`);
}

saveUser('olena', 'mySecret123');
saveUser('ivan', '123456');

console.log('\nПоточна база даних:');
console.log(global.database);
