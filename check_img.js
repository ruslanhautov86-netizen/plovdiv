const https = require('https');
https.get('https://avatars.mds.yandex.net/get-sprav-products/2773996/2a000001990a87bbfa27a2bf54376aa0ba0e/L', (res) => {
    console.log('Status: ' + res.statusCode);
});
