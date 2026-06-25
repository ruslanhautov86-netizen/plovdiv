const fs = require('fs');

try {
  const html = fs.readFileSync('yandex_menu.html', 'utf8');
  const priceRegex = /.{0,50}"price".{0,50}/g;
  let match;
  let matches = [];
  while ((match = priceRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }
  
  // also look for "руб"
  const rubRegex = /.{0,50}руб.{0,50}/g;
  while ((match = rubRegex.exec(html)) !== null) {
    matches.push(match[0]);
  }
  
  fs.writeFileSync('menu_prices.txt', matches.join('\n'));
  console.log('Found ' + matches.length + ' matches for price/руб');
} catch(e) {
  console.error(e);
}
