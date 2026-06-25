const fs = require('fs');
const https = require('https');
const path = require('path');

const destFolder = path.join(__dirname, 'public', 'images', 'menu');
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

let menuTs = fs.readFileSync('src/data/menu.ts', 'utf8');

const regex = /"imageSrc":\s*"(https:\/\/[^"]+)"/g;
let match;
let downloads = [];
let index = 1;

while ((match = regex.exec(menuTs)) !== null) {
  downloads.push({
    url: match[1],
    filename: `item_${index}.jpg`,
    originalMatch: match[0]
  });
  index++;
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Redirect
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log(`Starting download of ${downloads.length} images...`);
  let successCount = 0;
  for (let d of downloads) {
    const dest = path.join(destFolder, d.filename);
    try {
      await downloadFile(d.url, dest);
      successCount++;
      // Replace in text
      menuTs = menuTs.replace(d.originalMatch, `"imageSrc": "/images/menu/${d.filename}"`);
    } catch (e) {
      console.error(`Error downloading ${d.url}:`, e.message);
    }
  }
  
  fs.writeFileSync('src/data/menu.ts', menuTs);
  console.log(`Finished! Successfully downloaded ${successCount}/${downloads.length} images and updated menu.ts`);
}

run();
