const express = require('express');
const createError = require('http-errors');
const app = express();
const { sendJsonErrors } = require('./utilities/responseHandler');

const usersRouteV1 = require('./routes/v1/users.route');
const authRouteV1 = require('./routes/v1/auth.route');

//Response version API
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', async (req, res) => {
  res.status(200).json({ message: 'Restfull API' });
});

//Response version API
app.get('/api/v1', async (req, res) => {
  res.status(200).json({ version: 'API 1.0' });
});

//Các API sẽ bắt đầu bằng api/v1/users
app.use('/api/v1/users', usersRouteV1);
app.use('/api/v1/auth', authRouteV1);

///////////////////////////////////////
// Không thêm gì bắt dầu từ đây xuống //
///////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('Error Handler Stack', err.stack);
  // render the error page
  // res.status(err.status || 500);
  // res.send({ error: err.message });
  sendJsonErrors(req, res, err);
});

module.exports = app;
