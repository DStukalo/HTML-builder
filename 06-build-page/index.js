const path = require('path');
const fs = require('fs');
const fsProm = require('fs/promises');
const readline = require('readline');
const createDirectory = path.join(__dirname, 'project-dist');
const createDirectoryAssets = path.join(createDirectory, 'assets');
const dirForCope = path.join(__dirname, 'assets');
const htmlForRead = path.join(__dirname, 'template.html');
const cssForRead = path.join(__dirname, 'styles');
// Copy assets
fs.rm(createDirectory, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    //Create dir
    fs.mkdir(createDirectory, { recursive: true }, (err) => {
        if (err) throw err;
        fs.readdir(dirForCope, function (err, items) {
            if (err) throw err;
            for (let i = 0; i < items.length; i++) {
                let prev = path.join(dirForCope, items[i]);
                let next = path.join(createDirectoryAssets, items[i]);
                fs.stat(prev, (err, stats) => {
                    if (stats.isDirectory()) {
                        fs.mkdir(next, { recursive: true }, (err) => {
                            if (err) throw err;
                            fs.readdir(prev, (err, it) => {
                                if (err) throw err;
                                for (let i = 0; i < it.length; i++) {
                                    let prev2 = path.join(prev, it[i]);
                                    let next2 = path.join(next, it[i]);
                                    fs.copyFile(prev2, next2, (err) => {
                                        if (err) throw err;
                                    });
                                }
                            });
                        });
                    }
                    if (stats.isFile()) {
                        fs.copyFile(prev, next, (err) => {
                            if (err) throw err;
                        });
                    }
                });
            }
            //Read and write html
            const writeStreamHTML = fs.createWriteStream(
                path.join(createDirectory, 'index.html')
            );
            const readInterface = readline.createInterface({
                input: fs.createReadStream(htmlForRead, 'utf-8'),
            });
            fs.readFile(htmlForRead, 'utf-8', (err, data) => {
                if (err) throw err;
                const replaced = data.match(/{{(.*?)}}/g);
                for (let item of replaced) {
                    let res = item.slice(2, -2);
                    const componentsForRead = path.join(
                        __dirname,
                        'components',
                        `${res}.html`
                    );
                    fs.readFile(componentsForRead, 'utf-8', (err, data2) => {
                        if (err) throw err;
                        data = data.replace(item, data2);
                        fs.writeFile(
                            path.join(createDirectory, 'index.html'),
                            data,
                            (err) => {
                                if (err) throw err;
                                fs.readdir(cssForRead, function (err, items) {
                                    if (err) throw err;
                                    let project = path.join(
                                        __dirname,
                                        'project-dist'
                                    );
                                    const writeStream = fs.createWriteStream(
                                        path.join(project, 'style.css')
                                    );
                                    // Create css
                                    items.forEach((el) => {
                                        let cur = path.join(cssForRead, el);
                                        fs.stat(cur, (err, stats) => {
                                            if (err) throw err;
                                            if (
                                                stats.isFile() &&
                                                path.parse(el).ext === '.css'
                                            ) {
                                                const readStream =
                                                    fs.createReadStream(
                                                        cur,
                                                        'utf-8'
                                                    );
                                                readStream.on(
                                                    'data',
                                                    (chunk) => {
                                                        writeStream.write(
                                                            chunk
                                                        );
                                                    }
                                                );
                                            }
                                        });
                                    });
                                });
                            }
                        );
                    });
                }
            });
        });
    });
});
