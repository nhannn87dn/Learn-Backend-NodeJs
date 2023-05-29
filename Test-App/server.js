require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 8686;

const server = app.listen(PORT, () => {
  console.log(
    `Server start with port ${PORT}, Open URL localhost:${PORT} on your browser`
  );
});
