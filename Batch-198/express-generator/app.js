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

// Thêm những route khác tại đây
app.get('/blog', (req, res, next)=>{
  //query string nhận được
  const query = req.query;

  console.log('<<=== 🚀 query ===>>',query);
  res.json({ message: "Blog Page" });
})

app.get('/blog/:id', (req, res)=>{
  //route param
  const params = req.params;
  console.log('<<=== 🚀 params ===>>',params);

  res.json({ message: "Blog Detail" });
})
//thêm mới 1 blog
app.post('/blog', (req, res, next)=>{
  //thông tin gửi lên từ body
  const body = req.body;

  console.log('<<=== 🚀 body ===>>',body);

   res.json({message: 'POST Blog'})
})
//cập nhật
app.put('/blog/:id', (req, res)=>{
  const id  = req.params.id;
  const payload = req.body;

  console.log('<<=== 🚀 id, payload ===>>',id, payload);
  res.json({message: 'PUT Blog'})

})
// xóa 1 blog
app.delete('/blog/:id', (req, res)=>{
  const id  = req.params.id;
 
  console.log('<<=== 🚀 id ===>>',id);
  res.json({message: 'DELETE Blog'})

});

app.get('/about', (req, res, next)=>{
  res.json({ message: "Welcome to the About Page" });
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
