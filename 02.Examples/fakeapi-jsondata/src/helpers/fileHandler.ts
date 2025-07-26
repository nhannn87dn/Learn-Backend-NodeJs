import fs from 'fs/promises';

// Save data JSON to file
export async function writeFile(fileName: string, data: any) {
  try {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    console.log('Saved!');
  } catch (err) {
    throw err;
  }
}

export async function readFile(fileName: string) {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

