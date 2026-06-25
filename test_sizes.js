const https = require('https');
const sizes = ['orig', 'XXL', 'XL', 'L', 'M', 'S', 'orig_1', '1a', '2a', '3a'];
const baseUrl = 'https://avatars.mds.yandex.net/get-sprav-products/2773996/2a000001990a87bbfa27a2bf54376aa0ba0e/';

sizes.forEach(size => {
  https.get(baseUrl + size, (res) => {
    if (res.statusCode === 200) {
      console.log(`Size ${size} works!`);
    } else {
      console.log(`Size ${size} failed with ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(`Error for ${size}: ${e.message}`);
  });
});
