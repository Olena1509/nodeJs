global.callCount = global.callCount || 0;

function greetUser(name) {
  global.callCount++;
  console.log(`Привіт, ${name}!`);
  console.log(`Кількість викликів: ${global.callCount}`);
}

greetUser('Олена');
greetUser('Іван');
greetUser('Марія');
