const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const app = express();
const { sendJsonErrors } = require('./helpers/responseHandler');

const userRouteV1 = require('./routes/v1/user.route');
const authRouteV1 = require('./routes/v1/auth.route');
const categoryRouteV1 = require('./routes/v1/category.route');
const productRouteV1 = require('./routes/v1/product.route');

// for parsing application/json
app.use(
  bodyParser.json({
    limit: '16mb',
  })
);
// for parsing application/xwww-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '16mb',
    extended: true,
  })
);

//Response version API
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Restfull API' });
});

//Response version API
app.get('/api/v1', (req, res) => {
  res.status(200).json({ version: 'API 1.0' });
});

//Các API sẽ bắt đầu bằng api/v1/users
app.use('/api/v1/users', userRouteV1);
app.use('/api/v1/auth', authRouteV1);
app.use('/api/v1/categories', categoryRouteV1);
app.use('/api/v1/products', productRouteV1);
///////////////////////////////////////
// Không thêm gì bắt dầu từ đây xuống //
///////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.log('<<< Error Handler Stack >>>', err.stack);
  console.error('<< Middleware Error >>', err);
  if (err instanceof createError.HttpError) {
    sendJsonErrors(req, res, err, 'HttpError');
  } else {
    sendJsonErrors(req, res, err, 'AppError');
  }
});

module.exports = app;
