const fs = require('node:fs');

fs.writeFile('./dir/content.txt', 'Hello, World!', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully');
});