const fs = require('fs');

// Save data JSON to file
function  write(fileName, data) {
  fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

//Delete file

module.exports = { write };