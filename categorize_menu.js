const fs = require('fs');

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

const items = JSON.parse(fs.readFileSync('full_menu.json', 'utf8'));

const categories = {
  "Салаты": ["САЛАТ", "ЦЕЗАРЬ"],
  "Шашлыки и Мангал": ["ШАШЛЫК", "ЛЮЛЯ-КЕБАБ", "САДЖ", "ЦЫПЛЕНОК ГРИЛЬ", "ОВОЩИ ГРИЛЬ", "КРЕВЕТКИ ТИГРОВЫЕ"],
  "Супы": ["ХАРЧО", "УХА"],
  "Горячие блюда": ["ОДЖАХУРИ", "ДОЛМА", "СПАГЕТТИ", "ЧКМЕРУЛИ", "ФОРЕЛЬ В ПАПИЛЬОТКЕ", "ТРЕСКА", "СВИНИНА ЗАПЕЧЕННАЯ", "ОТБИВНАЯ", "БЕФСТРОГАНОВ", "СТЕЙК"],
  "Гарниры": ["КАРТОФЕЛЬ", "ЦВЕТНАЯ КАПУСТА В СУХАРЯХ"],
  "Горячие закуски": ["СУЛУГУНИ ЗАПЕЧЕННЫЙ", "ШАМПИНЬОНЫ", "АДЖАПСАНДАЛ", "СЫР СУЛУГУНИ В ХРУСТЯЩЕЙ"],
  "Холодные закуски": ["РУЛЕТЫ", "АССОРТИ", "ГРУЗДИ", "СЕЛЕДКА", "КАПРЕЗЕ", "САЦИВИ", "КАПУСТА ПО-ГРУЗИНСКИ"],
  "Хлеб": ["ХЛЕБ"],
  "Соусы": ["МАЙОНЕЗ", "СМЕТАНА", "АДЖИКА", "БАЖЕ", "ГОРЧИЦА", "КИМЧИ", "МАЦОНИ", "НАРШАРАБ"]
};

let categorized = [];
let assignedTitles = new Set();

for (const cat in categories) {
  const keywords = categories[cat];
  const catItems = items.filter(item => {
    if (assignedTitles.has(item.title)) return false;
    const isMatch = keywords.some(kw => item.title.toUpperCase().includes(kw));
    if (isMatch) assignedTitles.add(item.title);
    return isMatch;
  });
  
  if (catItems.length > 0) {
    categorized.push({
      category: cat,
      items: catItems.map(i => {
         let p = i.photoLink ? i.photoLink.replace(/\/L$/, '/orig') : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop';
         return {
           title: i.title,
           price: i.price,
           description: (i.description || '').replace(/\\n/g, ' '),
           imageSrc: p
         }
      })
    });
  }
}

// Any remaining unassigned items?
const remaining = items.filter(i => !assignedTitles.has(i.title));
if (remaining.length > 0) {
  categorized.push({
    category: "Разное",
    items: remaining.map(i => {
         let p = i.photoLink ? i.photoLink.replace(/\/L$/, '/orig') : 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop';
         return {
           title: i.title,
           price: i.price,
           description: (i.description || '').replace(/\\n/g, ' '),
           imageSrc: p
         }
    })
  });
}

const content = `export const menuData = ${JSON.stringify(categorized, null, 2)};`;
fs.writeFileSync('src/data/menu.ts', content);
console.log('Categories generated successfully');
