# NoSql with MongoDB


## 💛 Basic Authentication Systems
Trong thực tế khi xây dựng một hệ thống Restull API sẽ có:

- Các routes ở chế độ public tức ai cũng có thể truy cập vào
- Các routes ở chế độ private, chỉ những ai có quyền mới truy cập

Thì chúng ta gọi các vấn đề trên với một khái niệm là `Authentication` (Xác thực danh tính)

Đối với những User có quyền truy cập, thì lại có một vấn đề nữa là quyền hạn. User này có quyền truy cập đến những tài nguyên nào thì chúng ta gọi nó với một khái niệm là `Authorization`

**Bước 1: Mỗi User phải có một token (chìa khóa) để truy cập tới các private endpoint**

Để có được token, User phải đăng nhập vào hệ thống, nếu đúng email, password thì hệ thống sẽ sinh ra cho User một token.

User sẽ mang token này để truy cập tới các private endpoint

Tạo Schema Login src/validations/auth.validation.js

```js
const Joi = require('joi');

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  userLogin,
};
```

Tạo Route Auth src/routes/auth.route.js

```js
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const authValidation = require('../validations/auth.validation')
const users = require('../data/users.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');

//http://localhost:8686/api/v1/auth/login
router.post('/auth/login', async (req, res,next) => {
    console.log(body);
  //Tìm xem có tồn tại user có email không
  let user =  users.find((user) => user.email === body.email);

  if (!user) {
    throw createError(400, 'Invalid email or password');
  }

  // So tiếp mật khẩu có đúng không
  if (user.password !== body.password) {
    throw createError(400, 'Invalid email or password');
  }

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    'secure_key'
    );

   res.status(200).json({
      user: { id: user.id, email: user.email },
      token
    });

})
  
module.exports = router;
```

Gắn route Auth vào app.js

```js
//...
const authRoute = require('./routes/auth.route');

app.use('/api/v1/auth', authRoute);
```


**Bước 3: Tạo Auth Middleware - Anh gác cổng cho App**

Tạo một file src/middleware/auth.middleware.js

```js
const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;
const users = require('../data/users.json');
const createError = require('http-errors');

const authenticateToken = async (req, res, next) => {
    //Lấy thông tin authorization từ trong header request ra
    const authHeader = req.headers['authorization'];
     //trích xuất token từ trong chuỗi authorization vừa lấy được
    const token = authHeader && authHeader.split(' ')[1];

    //Kiểm tra token có tồn tại không
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    //Nếu token tồn tại thì kiểm tra tính hợp lệ
    try {
      //Giải mã token để lấy thông tin
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);

      //Kiểm tra xem có tồn tại user với userId lấy được từ token không
      //Để tránh token giả mạo
      const user =  users.find((user) => user.id === decoded._id);
     

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }

      req.user = user;
      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            return next(createError(403, 'Forbidden'));
        }
        // authentication and authorization successful
        next();
    }
}

module.exports = {
    authorize,
    authenticateToken,
};
```

**Bước 4: Bảo vệ Route với Auth Middleware**

Ví dụ bạn muốn bảo vệ các route có phương thức POST, PUT, DELETE của users.route.js

Sửa lại đoạn này

```js
router.put('/users/:id', async (req, res, next) => {

})
```

Thành như sau

```js
//Thêm vào trên đầu
const {authenticateToken} = require('../middleware/auth.middleware')
//Thêm middleware vào trước
router.put('/users/:id', authenticateToken,, async (req, res, next) => {

})
```

## 💛 Express Sessions

Sử dụng 2 thư viện này để lưu trữ phiên đăng nhập trong hệ thống backend với NodeJS

Dùng nó khi bạn làm ứng dụng web với Node.js, còn nếu làm API thì không cần đến.

- cookie-session: <https://expressjs.com/en/resources/middleware/cookie-session.html?
- express-session: <https://expressjs.com/en/resources/middleware/session.html>


```bash
yarn add express-session
```

Sau đó tại file app.js

```js
var session = require('express-session')
//Thêm đoạn này vào, cấu hình cho session
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } //true https, false http
}));
```
Cách sử dụng:

```js

/* GET home page. */
router.get('/', function(req, res, next) {
  //Đăng ký một session ở route này
  req.session.views = 1;

  res.json({version: '1.0'})
});


router.get('/getsession', function(req, res, next) {
  //Sang bên này bạn nhận được session như sau
  console.log(req.session.views);
  
  res.json({page: 'getsession'})
});
```

Chi tiết xem: <https://expressjs.com/en/resources/middleware/session.html>
