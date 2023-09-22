require('dotenv').config();
const app = require("./src/app");
const PORT = process.env.PORT || 9000;
const models = require('./src/models');


/**
 * Tạo hàm kiểm tra db kết nối thành công chưa
 * Kết nối Database server OK --> start server express
 */
const initApp = async () => {
  console.log("Testing the database connection..");

  try {
     //test kết nối
     await models.sequelize.authenticate();
     console.log("Connection has been established successfully.");

     
    // Đồng bộ hóa cơ sở dữ liệu và khởi tạo các bảng nếu chưa tồn tại
    /**
     * sync() , tạo mới nếu chưa, còn rồi thì thôi
     * sync({ force: true }), xóa cũ tạo mới lại
     * sync({ alter: true }), check và đồng bộ thay đổi
     */
    models.sequelize.sync({ alter: true }).then(() => {
      console.log('Database synced');
    }).catch((error) => {
      console.error('Error syncing database:', error);
    });

    //Khởi tạo server Express
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });

    
  } catch (error) {
     console.error("Unable to connect to the database:", error.original);
  }
};

initApp();

