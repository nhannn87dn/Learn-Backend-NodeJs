const express = require('express');
const createError = require('http-errors');
const app = express();
const usersRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route')
const FirstRouter = require('./routes/index');
const path = require('path');

// Calling the express.json() method for parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Các API sẽ bắt đầu bằng api
//localhost:8686/api
//localhost:8686/api/users
app.use('/api', FirstRouter);
//Các API sẽ bắt đầu bằng api
app.use('/api/v1', usersRoute);
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