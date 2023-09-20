/**
 * Nên tách thông tin này ra file .env để bảo mật
 * Thông tin kết nối tham khảo link
 * https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#mssql
 */

const dbConfig = {
    dialect: 'mssql',
    host: 'NHAN2',
    port: 1433,
    username: 'nhan',
    password: '123456789',
    database: 'myStore',
    dialectOptions: {
        options: {
          encrypt: false, 
        },
    },
}

module.exports = dbConfig;