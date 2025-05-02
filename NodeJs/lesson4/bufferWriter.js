const fs = require('fs');

function writeBufferToFile(text) {
  const buffer = Buffer.from(text, 'utf-8');

  fs.writeFile('buffer_output.txt', buffer, (err) => {
    if (err) {
      console.error('Помилка запису у файл:', err);
    } else {
      console.log('Текст записано у buffer_output.txt');
      console.log('Довжина в байтах:', buffer.length);
    }
  });
}

writeBufferToFile('Привіт, буфер!');
