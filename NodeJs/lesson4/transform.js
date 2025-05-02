const fs = require('fs');
const { Transform } = require('stream');

const replaceFooWithBar = new Transform({
    transform(chunk, encoding, callback) {
      const modifiedChunk = chunk
        .toString()
        .replace(/foo/gi, 'bar'); 
      this.push(modifiedChunk);
      callback();
    }
  });
  

const inputPath = './input.txt';   
const outputPath = './output.txt'; 

const readStream = fs.createReadStream(inputPath);
const writeStream = fs.createWriteStream(outputPath);

readStream
  .pipe(replaceFooWithBar)
  .pipe(writeStream)
  .on('finish', () => console.log('✅ Обробка завершена, записано в output.txt'));
