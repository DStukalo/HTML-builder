const path = require('path');
const fs = require('fs');
const WAY = path.join(__dirname, 'text.txt');

fs.readFile(WAY, (err, text) => {
    if (err) {
        throw err;
    }
    const data = Buffer.from(text);
    console.log(data.toString());
});
