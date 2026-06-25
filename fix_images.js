const fs = require('fs');
const file = 'src/components/sections/MenuPreview.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\/L"/g, '/orig"');
fs.writeFileSync(file, content);
console.log('Fixed URLs in MenuPreview.tsx');
