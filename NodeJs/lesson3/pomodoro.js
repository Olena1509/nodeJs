const EventEmitter = require('events');

class PomodoroTimer extends EventEmitter {
  start() {
    console.log('⏳ Починається робоча сесія (25 хвилин)...');

    setTimeout(() => {
      this.emit('workComplete');
      
      console.log('🛑 Починається перерва (5 хвилин)...');
      
      setTimeout(() => {
        this.emit('breakComplete');
      }, 2000);
    }, 5000);
  }
}

const timer = new PomodoroTimer();

timer.on('workComplete', () => {
  console.log('✅ Робоча сесія завершена!');
});

timer.on('breakComplete', () => {
  console.log('☕ Перерва завершена. Готові до нового раунду!');
});

timer.start();
