const fs = require('node:fs');
fs.appendFile('./dir/content.txt', "n/Hello, World! v2", (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data appended successfully');
});