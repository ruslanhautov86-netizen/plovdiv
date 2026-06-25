const fs = require('fs');

try {
  const html = fs.readFileSync('yandex_menu.html', 'utf8');
  
  const parts = html.split('{"title":"');
  let menu = [];

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    
    const titleMatch = chunk.match(/^([^"]+)"/);
    if (!titleMatch) continue;
    const title = titleMatch[1];
    
    const objStr = chunk.substring(0, 500);
    
    const priceMatch = objStr.match(/"price":"([^"]+)"/);
    const currencyMatch = objStr.match(/"currency":"([^"]+)"/);
    const photoMatch = objStr.match(/"photoLink":"([^"]+)"/);
    const descMatch = objStr.match(/"description":"([^"]+)"/);
    
    if (priceMatch) {
      let photoLink = photoMatch ? photoMatch[1] : null;
      if (photoLink && !photoLink.startsWith('http')) {
        photoLink = 'https://avatars.mds.yandex.net/get-altay/' + photoLink.replace('{size}', 'L');
      }
      
      menu.push({
        title: title,
        price: priceMatch[1] + ' ' + (currencyMatch ? currencyMatch[1] : '₽'),
        photoLink: photoLink,
        description: descMatch ? descMatch[1] : ''
      });
    }
  }

  const uniqueMenu = [];
  const seen = new Set();
  for (const item of menu) {
    if (!seen.has(item.title) && /[А-Яа-я]/.test(item.title)) {
      seen.add(item.title);
      uniqueMenu.push(item);
    }
  }

  fs.writeFileSync('full_menu.json', JSON.stringify(uniqueMenu, null, 2));
  console.log('Extracted ' + uniqueMenu.length + ' unique items.');
} catch(e) {
  console.error(e);
}
