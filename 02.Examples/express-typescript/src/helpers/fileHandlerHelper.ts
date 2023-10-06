import fs from 'fs';

// Save data JSON to file
function writeFile(fileName: string, data: any) {
  fs.writeFileSync(fileName, JSON.stringify(data), { flag: 'w' });
  console.log('Saved!');
}

//Delete file

export default { writeFile };