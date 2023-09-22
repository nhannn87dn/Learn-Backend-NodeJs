const { DataTypes } = require('sequelize');
/**
 * Data Types
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
 * 
 */
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      numberPhone: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      //tableName: 'Users', //Nếu không khai báo thì tên table = tên Model (thêm s số nhiều)
      timestamps: true, //https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
    }
  );

  return User;
};
