const fs = require('fs');

const bufferA = fs.readFileSync('a.txt');
const bufferB = fs.readFileSync('b.txt');

const result = Buffer.compare(bufferA, bufferB);

if (result < 0) {
  console.log('Файл a.txt менший за b.txt (байтово)');
} else if (result > 0) {
  console.log('Файл a.txt більший за b.txt (байтово)');
} else {
  console.log('Файли однакові (байтово)');
}
