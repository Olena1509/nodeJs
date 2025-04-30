const EventEmitter = require('events');

class BankCard extends EventEmitter {
  constructor(correctPin) {
    super();
    this.correctPin = correctPin;
    this.attempts = 0;
    this.blocked = false;
  }

  enterPin(pin) {
    if (this.blocked) {
      console.log('💳 Карта вже заблокована.');
      return;
    }

    if (pin === this.correctPin) {
      console.log('✅ PIN-код правильний. Доступ дозволено.');
      this.attempts = 0;
    } else {
      this.attempts++;
      console.log(`❌ Неправильний PIN (${this.attempts}/3)`);

      if (this.attempts >= 3) {
        this.blocked = true;
        this.emit('blocked');
      }
    }
  }
}

const card = new BankCard('1234');

card.on('blocked', () => {
  console.log('🚫 Карта заблокована через 3 неправильні спроби.');
});

card.enterPin('0000');
card.enterPin('1111');
card.enterPin('2222');
card.enterPin('1234'); 
