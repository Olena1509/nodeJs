const crypto = require('crypto');

global.database = {
  olena: {
    username: 'olena',
    password: crypto.createHash('sha256').update('mySecret123').digest('hex')
  },
  ivan: {
    username: 'ivan',
    password: crypto.createHash('sha256').update('123456').digest('hex')
  }
};

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const [,, inputUsername, inputPassword] = process.argv;

if (!inputUsername || !inputPassword) {
  console.log('Будь ласка, введіть логін і пароль як аргументи:');
  console.log('node authUser.js <логін> <пароль>');
  process.exit();
}

function authenticate(username, password) {
  const user = global.database[username];
  if (!user) {
    console.log('Користувача не знайдено.');
    return;
  }

  const hashedInput = hashPassword(password);
  if (user.password === hashedInput) {
    console.log(`Успішна авторизація: ${username}`);
  } else {
    console.log('Невірний пароль.');
  }
}

authenticate(inputUsername, inputPassword);
