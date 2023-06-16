const sequelize = require('./models/sequelize');
const app = require("./app");
const PORT = 9000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
