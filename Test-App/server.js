require('dotenv').config();
const app = require('./src/app');

const { PORT } = process.env || 8686;

const server = app.listen(PORT, () => {
  console.log(
    `Server start with port ${PORT}, Open URL locallhost:${PORT} on your browser`
  );
});
