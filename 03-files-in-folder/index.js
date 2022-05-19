const path = require('path');
const fs = require('fs');

fs.readdir(__dirname, function (err, items) {
    console.log(items);

    for (var i = 0; i < items.length; i++) {
        if (path.extname(items[i]) !== '') {
            console.log(items[i]);
        }
    }
});
