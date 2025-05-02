const fs = require('fs');

const originalBuffer = Buffer.from('Hello, buffer!');

const copiedBuffer = Buffer.alloc(originalBuffer.length);


originalBuffer.copy(copiedBuffer);


fs.writeFileSync('buffer_copy.txt', copiedBuffer);

console.log('✅ Буфер скопійовано і записано у файл buffer_copy.txt');
