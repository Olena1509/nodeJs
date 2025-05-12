global.logs = global.logs || [];

const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, 'logs.json');

if (fs.existsSync(logsPath)) {
  const savedLogs = JSON.parse(fs.readFileSync(logsPath, 'utf-8'));
  console.log('Історія логів:');
  savedLogs.forEach((log, i) => {
    console.log(`${i + 1}. [${log.timestamp}] ${log.message}`);
  });
} else {
  console.log('Логи ще не створено.');
}
