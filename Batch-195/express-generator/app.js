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
/* Dang ky mot route moi */
app.get('/blog', (req, res)=>{
  //Query params --> req.query

  console.log('Blog match', req.query);
  res.send('Blog page')
})
//
app.post('/blog', (req, res)=>{
  //Body params --> req.body
  console.log('<<=== 🚀 req.body ===>>',req.body);
  //res.send('Blog POST')
  res.json({message: 'Blog POST', data: req.body})
})

app.put('/blog', (req, res)=>{
  res.send('PUT Blog')
})

app.get('/download', (req, res) => {
  const file = `${__dirname}/a.zip`;
  res.download(file); // Gửi tệp tin đến client
});

//Dynamic Route
// app.get('/tin-tuc/:slug', (req, res) => {
//   //Tat cac string sau / la slug
//   res.send(`Slug: ${req.params.slug}`);
// });

app.get('/tin-tuc/:slug([a-z0-9-]+)-:id(\\d+)', (req, res) => {
  //Route paramter --> req.params
  console.log('<<=== 🚀 req.params ===>>',req.params);
  res.send(`Slug: ${req.params.slug}, ID: ${req.params.id} xxx`);
});


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
