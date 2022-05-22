const path = require('path');
const fs = require('fs');
const WAY = path.join(__dirname, 'text.txt');
const HELLOYMESSAGE = 'Hi, write anything!!';
const BYMESSAGE = 'Bye, thank for interaction!!';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
fs.appendFile(WAY, '', (err) => {
    if (err) throw err;
});
rl.prompt();
console.log(HELLOYMESSAGE);
rl.on('line', (line) => {
    switch (line) {
        case 'exit':
            console.log(BYMESSAGE);
            process.exit(0);
        default:
            const data = line + '\n';
            fs.appendFile(WAY, data, (err) => {
                if (err) throw err;
            });
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log(BYMESSAGE);
    process.exit(0);
});
