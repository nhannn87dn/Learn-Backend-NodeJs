const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/user.route');
const authRoute = require('./routes/auth.route')
// Cấu hình body parser để đọc dữ liệu từ request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.send({ error: err.message });
});

module.exports = app;