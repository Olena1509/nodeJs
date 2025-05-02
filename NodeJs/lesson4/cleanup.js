const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'temp');
const TWO_MINUTES = 2 * 60 * 1000;

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return console.error('Помилка при читанні директорії:', err.message);
  }

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return console.error(`Помилка при отриманні інформації про файл ${file}:`, err.message);
      }

      const now = Date.now();
      const modifiedTime = new Date(stats.mtime).getTime();

      if (now - modifiedTime > TWO_MINUTES) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return console.error(`Не вдалося видалити ${file}:`, err.message);
          }
          console.log(`Видалено файл: ${file}`);
        });
      }
    });
  });
});
