const fs = require('node:fs');

fs.readFile('./dir/content.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});