const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');
content = content.replace(/\{size\}/g, 'orig');
content = content.replace(/\/L"/g, '/orig"');
fs.writeFileSync('src/data/menu.ts', content);
console.log('Fixed URLs in menu.ts');
