const fs = require('fs');
const path = require('path');

function log(message) {
  const logFilePath = path.join(__dirname, 'log.txt');

  
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '=== Лог-файл створено ===\n');
  }

  const timestamp = new Date().toLocaleString(); 
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Помилка при записі в лог:', err.message);
    } else {
      console.log('Лог додано!');
    }
  });
}

log('Система запущена');
