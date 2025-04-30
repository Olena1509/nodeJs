const EventEmitter = require('events');

class NetworkMonitor extends EventEmitter {
  checkSpeed(speed) {
    console.log(`🔍 Перевірка швидкості: ${speed} Мбіт/с`);
    if (speed < 10) {
      this.emit('slowConnection', speed);
    }
  }
}

const monitor = new NetworkMonitor();

monitor.on('slowConnection', (speed) => {
  console.log(`⚠️ Повільне з'єднання: лише ${speed} Мбіт/с. Перевірте інтернет!`);
});

monitor.checkSpeed(25);
monitor.checkSpeed(8);
monitor.checkSpeed(12);
monitor.checkSpeed(5);
