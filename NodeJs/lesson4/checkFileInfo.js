const fs = require('fs');
const path = require('path');

function checkFileInfo(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      return console.error('Помилка доступу до файлу:', err.message);
    }

    if (stats.isFile()) {
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`✅ ${path.basename(filePath)} — файл, розмір: ${sizeKB} КБ`);
    } else {
      console.log(`📁 ${path.basename(filePath)} — це не файл, а директорія або інше.`);
    }
  });
}

checkFileInfo('buffer.json'); 
