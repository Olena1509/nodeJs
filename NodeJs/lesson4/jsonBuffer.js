const fs = require('fs');

const text = 'Приклад тексту для буфера';
const buffer = Buffer.from(text);

const json = JSON.stringify(buffer);

fs.writeFileSync('buffer.json', json, 'utf8');

const jsonFromFile = fs.readFileSync('buffer.json', 'utf8');
const parsed = JSON.parse(jsonFromFile);
const restoredBuffer = Buffer.from(parsed.data);

console.log('Відновлений текст:', restoredBuffer.toString());
