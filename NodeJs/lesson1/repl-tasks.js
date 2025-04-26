// 1. Створити змінну name і вивести у верхньому регістрі
const name = 'John';
console.log(name.toUpperCase()); // JOHN

// 2. Створити масив чисел і порахувати суму
const numbers = [5, 10, 15];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 30

// 3. Створити функцію isEven(n), яка перевіряє парність числа
const isEven = (n) => n % 2 === 0;
console.log(isEven(2));  // true
console.log(isEven(3));  // false
console.log(isEven(0));  // true
console.log(isEven(-4)); // true

// 4. Імпортувати модуль os і вивести ім'я користувача
const os = require('os');
console.log(os.userInfo().username);

// 5. Імпортувати модуль path і з'єднати __dirname та 'data.txt'
const path = require('path');
const fullPath = path.join(process.cwd(), 'data.txt');
console.log(fullPath);

// 6. Імпортувати fs і вивести список файлів
const fs = require('fs');
const files = fs.readdirSync('.');
console.log(files);

// 7. Створити об'єкт user і вивести ім'я + додати поле isAdmin
const user = { name: 'John', age: 34 };
console.log(user.name); // John
user.isAdmin = true;
console.log(user);

// 8. Створити функцію double, яка подвоює передане значення
const double = (n) => n * 2;
console.log(double(5)); // 10

// 9. Перевірити результат виразів
console.log(typeof null);        // object
console.log(typeof undefined);   // undefined
console.log(typeof NaN);         // number
console.log(typeof []);          // object
console.log(typeof {});          // object
console.log(Array.isArray([]));  // true

// 10. Вийти з REPL і запустити args.js (приклад process.argv)
console.log(process.argv);