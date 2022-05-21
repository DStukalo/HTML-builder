const path = require('path');
const fs = require('fs');
const WAY = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(WAY, 'utf-8');

readStream.on('data', (chunk) => {
    const data = Buffer.from(chunk);
    console.log(data.toString());
});
readStream.on('error', (e) => {
    throw e;
});
