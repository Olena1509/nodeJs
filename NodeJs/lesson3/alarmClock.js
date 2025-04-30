const EventEmitter = require('events');

class AlarmClock extends EventEmitter {
  start() {
    console.log('Будильник запущено. Чекаємо 5 секунд...');
    setTimeout(() => {
      this.emit('ring');
    }, 5000);
  }
}

const myAlarm = new AlarmClock();

myAlarm.on('ring', () => {
  console.log('Прокидайся!');
});

myAlarm.start();
