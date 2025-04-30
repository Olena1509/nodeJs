const EventEmitter = require('events');

class Tournament extends EventEmitter {
  constructor() {
    super();
    this.scores = {};
  }

  playerWins(name) {
    if (!this.scores[name]) {
      this.scores[name] = 0;
    }
    this.scores[name]++;
    this.emit('playerWin', name, this.scores[name]);
  }
}


const tournament = new Tournament();

tournament.on('playerWin', (name, wins) => {
  console.log(`🏆 ${name} переміг! Загальна кількість перемог: ${wins}`);
});

tournament.playerWins('Олег');
tournament.playerWins('Ірина');
tournament.playerWins('Олег');
tournament.playerWins('Олег');
tournament.playerWins('Ірина');
