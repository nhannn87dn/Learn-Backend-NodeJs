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

app.get('/ab?cd', (req, res) => {
  res.send('ab?cd');
});

app.get('/users/:username([0-9a-zA-Z]{6,12})', function (req, res) {
  console.log('<<=== 🚀 req.params ===>>',req.params);
  res.send('Route match for User Name: ' + req.params.username);
});

app.get('/tin-tuc/:slug([a-z0-9-]+)', (req, res, next)=>{
  console.log('Blog slug route accessed with slug:', req.params.slug);
  res.send(`Blog post with slug: ${req.params.slug}`);
})

//Cau hinh mot route moi
app.get('/blog', (req, res, next)=>{
  //queryparams
  console.log('Query Params:', req.query);
  console.log('Blog route dsjdhsjdhsjdshdjshjh');
  res.send('Welcome to the Blog!');
})

//example with dynamic route
app.get('/blog/:id', (req, res, next)=>{
  console.log('Blog ID route accessed with ID:', req.params.id);
  res.send(`Blog post with ID: ${req.params.id}`);
})

// example with method POST
app.post('/blog', (req, res, next)=>{
  //body params
  console.log('Body Params:', req.body);
  console.log('Blog POST route accessed');
  //res.send('Blog POST request received!');
  res.status(201).json(req.body);
})

app.put('/blog', (req, res, next)=>{
  console.log('Blog PUT route accessed');
  res.send('Blog PUT request received!');
})

app.delete('/blog', (req, res, next)=>{
  console.log('Blog DELETE route accessed');
  res.send('Blog DELETE request received!');
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
