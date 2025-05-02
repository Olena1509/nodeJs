const fs = require('fs');

const buffer1 = Buffer.from('Привіт, ');
const buffer2 = Buffer.from('світ!');

const combinedBuffer = Buffer.concat([buffer1, buffer2]);

console.log(combinedBuffer.toString()); 

fs.writeFileSync('combined_output.txt', combinedBuffer);
