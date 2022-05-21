const path = require('path');
const fs = require('fs');

const DirForCheck = path.join(__dirname, 'styles');

fs.readdir(DirForCheck, function (err, items) {
    if (err) throw err;
    let project = path.join(__dirname, 'project-dist');
    const writeStream = fs.createWriteStream(path.join(project, 'bundle.css'));
    items.forEach((el) => {
        let cur = path.join(DirForCheck, el);
        fs.stat(cur, (err, stats) => {
            if (err) throw err;
            if (stats.isFile() && path.parse(el).ext === '.css') {
                const readStream = fs.createReadStream(cur, 'utf-8');
                readStream.on('data', (chunk) => {
                    writeStream.write(chunk);
                });
            }
        });
    });
});
