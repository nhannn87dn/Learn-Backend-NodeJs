const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const app = express();
const { sendJsonErrors } = require('./helpers/responseHandler');
const path = require('path');
const userRouteV1 = require('./routes/v1/user.route');
const authRouteV1 = require('./routes/v1/auth.route');
const categoryRouteV1 = require('./routes/v1/category.route');
const productRouteV1 = require('./routes/v1/product.route');
const brandRouteV1 = require('./routes/v1/brand.route');
const orderRouteV1 = require('./routes/v1/order.route');
const configRouteV1 = require('./routes/v1/config.route');
const customerRouteV1 = require('./routes/v1/customer.route');
const paymentMethodRouteV1 = require('./routes/v1/paymentMethod.route');
const shippingMethodRouteV1 = require('./routes/v1/shippingMethod.route');
const multer = require('multer')
const {
  uploadFile,
  uploadFiles,
  uploadImage,
  uploadImages
} = require('./helpers/multerHelper')

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


// public for upload files
app.use(express.static(path.join(__dirname, '../public')));



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

//Upload images với multer middleware
app.post('/api/v1/upload/:collectionName', (req, res, next) => {
  uploadImages(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(createError(500, err.message, {type: 'MulterError'}));
    } else if (err) {
      next(createError(500, err.message, {type: 'UnknownError'}));
    } 
    else{

      const { collectionName } = req.params;
  
      console.log('req.body', req.body);
      console.log('file', req.file);
      console.log('collectionName', collectionName);
  
       
      res.status(200).json({ ok: true });
    }
    
  });
});


//Các API sẽ bắt đầu bằng api/v1/users
app.use('/api/v1/users', userRouteV1);
app.use('/api/v1/auth', authRouteV1);
app.use('/api/v1/categories', categoryRouteV1);
app.use('/api/v1/products', productRouteV1);
app.use('/api/v1/brands', brandRouteV1);
app.use('/api/v1/orders', orderRouteV1);
app.use('/api/v1/configs', configRouteV1);
app.use('/api/v1/customers', customerRouteV1);
app.use('/api/v1/payment-methods', paymentMethodRouteV1);
app.use('/api/v1/shipping-methods',shippingMethodRouteV1);

///////////////////////////////////////
// Không thêm gì bắt dầu từ đây xuống //
///////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  //console.log('<<< Error Handler Stack >>>', err.stack);
  console.error('<< Middleware Error >>', err);
  if (err instanceof createError.HttpError) {
    sendJsonErrors(req, res, err, 'HttpError');
  }
  else if(err.name === 'ValidationError'){
    sendJsonErrors(req, res, err, 'ValidationMongooseSchema');
  }
  else if(err.name === 'MongoError'){
    sendJsonErrors(req, res, err, 'MongoError');
  }
  else {
    sendJsonErrors(req, res, err, 'AppError');
  }
});

module.exports = app;
