
console.log('Змінні середовища:');
console.log(process.env);

const nodePath = process.execPath;
console.log(`\nШлях до Node.js: ${nodePath}`);
global.nodeJsPath = nodePath;

console.log(`\nГлобальна змінна nodeJsPath: ${global.nodeJsPath}`);
