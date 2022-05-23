const path = require('path');
const fs = require('fs');

const wayCreateDir = path.join(__dirname, 'files-copy');
const wayPrevDir = path.join(__dirname, 'files');

fs.mkdir(wayCreateDir, { recursive: true }, (err) => {
    if (err) throw err;
});
fs.readdir(wayPrevDir, function (err, items) {
    if (err) throw err;
    for (let i = 0; i < items.length; i++) {
        let prev = path.join(wayPrevDir, items[i]);
        let next = path.join(wayCreateDir, items[i]);
        fs.copyFile(prev, next, (err) => {
            if (err) throw err;
        });
    }
});
fs.readdir(wayCreateDir, function (err, items) {
    if (err) throw err;
    for (let i = 0; i < items.length; i++) {
        let curItem = path.join(wayCreateDir, items[i]);
        let itemInPrev = path.join(wayPrevDir, items[i]);
        fs.access(itemInPrev, (err) => {
            if (err) {
                fs.unlink(curItem, (err) => {
                    if (err) throw err;
                });
            }
        });
    }
});
