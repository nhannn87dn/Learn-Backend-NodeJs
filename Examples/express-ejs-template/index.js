const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);

// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));

// Cấu hình thư mục tài nguyên tĩnh để chưa css, js, images
app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Dummy users
var users = [
  { name: 'tobi', email: 'tobi@learnboost.com' },
  { name: 'loki', email: 'loki@learnboost.com' },
  { name: 'jane', email: 'jane@learnboost.com' },
];

app.get('/', function (req, res) {
  //render kết quả ra temlate views/index.html
  res.render('index', {
    users: users,
    title: 'EJS example',
    header: 'Some users',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
