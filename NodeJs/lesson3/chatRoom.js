const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  sendMessage(sender, text) {
    this.emit('message', { sender, text });
  }
}

const chat = new ChatRoom();

chat.on('message', ({ sender, text }) => {
  console.log(`💬 ${sender}: ${text}`);
});

chat.sendMessage('Андрій', 'Привіт усім!');
chat.sendMessage('Олена', 'Як справи?');
