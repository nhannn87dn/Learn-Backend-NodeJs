const { Sequelize } = require('sequelize');
const dbConfig = require('../configs/db')
const sequelize = new Sequelize(dbConfig);

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

//Kết nối các Models (Bảng) tại đây
models.User = require('./user.model')(sequelize, Sequelize);
//... thêm vào sau

module.exports = models;
