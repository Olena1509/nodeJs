const fs = require('fs');
const path = require('path');
const logsPath = path.join(__dirname, 'logs.json');

global.logs = global.logs || [];

function logEvent(message) {
  const timestamp = new Date().toISOString();
  global.logs.push({ timestamp, message });


  fs.writeFileSync(logsPath, JSON.stringify(global.logs, null, 2));
}

logEvent('Система запущена');
