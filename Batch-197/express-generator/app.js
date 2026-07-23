var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Cach khai bao mot route moi
app.get('/blog', (req, res, next)=>{
    res.json({
      message: 'Blog Page'
    })
});

app.get('/api/v1/categories', (req, res, next)=>{
    
  const queryString = req.query;

  console.log('<<=== 🚀 queryString ===>>',queryString);
  //logic

  //trả lại cho client kết quả
  res.json([
      {id: 1, name: 'Laptop'},
      {id: 2, name: 'Mobile'}
    ])
})

// create new category
app.post('/api/v1/categories', (req, res, next)=>{
    const data = req.body;
    console.log('<<=== 🚀 data ===>>',data);

  res.json({
      message: 'Method POST categories',
      data
    })
})

// update category by ID
app.put('/api/v1/categories/:id', (req, res, next)=>{
    const data = req.body;
    console.log('<<=== 🚀 data ===>>',data);
    const routeParam = req.params;
    console.log('<<=== 🚀  routeParam===>>',routeParam);
  res.json({
      message: 'Method PUT categories'
    })
})


// delete category by ID
app.delete('/api/v1/categories/:id', (req, res, next)=>{
    res.json({
      message: 'Method DELETE categories'
    })
})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
