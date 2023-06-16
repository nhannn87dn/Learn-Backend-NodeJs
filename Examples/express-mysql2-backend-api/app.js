const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./database");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);





// Middleware xử lý lỗi 404
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Không tìm thấy' });
};



// Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  console.error('Lỗi:', err);

  // Xử lý lỗi dựa trên loại lỗi
  if (err instanceof CustomError) {
    // Xử lý lỗi tùy thuộc vào loại lỗi cụ thể
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Xử lý lỗi mặc định
  return res.status(500).json({ error: 'Lỗi máy chủ' });
};


// Sử dụng middleware xử lý 404
app.use(notFoundHandler);
// Sử dụng middleware xử lý lỗi
app.use(errorHandler);



module.exports = app;