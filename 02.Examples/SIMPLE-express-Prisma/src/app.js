const express = require('express')
const app = express();
const createError = require('http-errors');
const myRoutes = require('./routes/index');
const employeeRoutes = require('./routes/employee');
// Calling the express.json() method for parsing
app.use(express.json());

app.use('/api', myRoutes);
app.use('/api/employees', employeeRoutes);

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