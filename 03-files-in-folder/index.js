const path = require('path');
const fs = require('fs');
const WAY = path.join(__dirname, 'secret-folder');

fs.readdir(WAY, function (err, items) {
    if (err) {
        throw err;
    }

    for (let i = 0; i < items.length; i++) {
        let cur = path.join(WAY, items[i]);
        fs.stat(cur, (err, stats) => {
            if (stats.isFile()) {
                console.log(
                    `${path.parse(items[i]).name} - ${path
                        .parse(items[i])
                        .ext.slice(1)} - ${stats.size}b`
                );
            }
        });
    }
});
