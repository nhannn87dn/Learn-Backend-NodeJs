import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});