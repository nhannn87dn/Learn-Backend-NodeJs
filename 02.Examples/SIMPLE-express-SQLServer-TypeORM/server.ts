require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () =>
console.log(`🚀[ExpressJs] Server ready at: http://localhost:${PORT}`),
)
