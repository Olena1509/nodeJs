const EventEmitter = require('events');

class RegistrationSystem extends EventEmitter {
  registerUser(name, email) {
    console.log(`✅ Користувач ${name} зареєстрований.`);
    this.emit('userRegistered', { name, email });
  }
}

function sendWelcomeEmail({ name, email }) {
  console.log(`📧 Привіт ${name}! Вітальний лист надіслано на ${email}.`);
}

const regSystem = new RegistrationSystem();

regSystem.on('userRegistered', sendWelcomeEmail);

regSystem.registerUser('Олена', 'olena@example.com');
