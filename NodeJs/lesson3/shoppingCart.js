const EventEmitter = require('events');

class ShoppingCart extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.total = 0;
  }

  addItem(name, price) {
    this.items.push({ name, price });
    this.total += price;
    this.emit('itemAdded', name, this.total);
  }
}

const cart = new ShoppingCart();

cart.on('itemAdded', (name, total) => {
  console.log(`Товар додано: ${name}. Загальна сума: ${total} грн`);
});

cart.addItem('Навушники', 1200);
cart.addItem('Мишка', 800);
cart.addItem('Клавіатура', 1500);
