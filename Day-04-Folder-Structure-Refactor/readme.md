# Folder Structure Express and Node.Js

Xây dựng cấu trúc dự án RESTFul-APIs với Node.Js và Express CHUẨN đi làm

> - Tiếp tục maintenance project theo Follow
> - Tạo Route theo từng phiên bản
> - Tạo Controller
> - Tạo Service
> - Validation Requests
> - Handle Errors inside routes, controllers, services

## 💛 Tạo RESTFul-APIs theo phiên bản

- Trong thư mục src/routes tạo thêm một thư mục v1

- Maintenance các routes demo phần trước, đưa vào v1

- Resources User
  - GET : api/v1/users
  - GET : api/v1/users/:id
  - POST : api/v1/users/:id
  - PUT : api/v1/users/:id
  - DELETE: api/v1/users/:id

Tại src/routes/v1 tạo file user.route.js

```js
const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', async (req, res) => {
  //Thêm một phần tử vào mảng
  const newUsers = {...users,{id: 4: name: 'Trump', email: 'trump@gmail.com'}}

  //trả lại mảng mới
  res.status(200).json(users);
});

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', async (req, res,next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }

});

// Update a user
// localhost:8686/api/v1/users/1
router.patch('/users/:id', async (req, res, next) => {
  // ...
});

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users/:id', async (req, res, next) => {
  // ...
});

module.exports = router;
```

Gắn router vào app.js

```js
const usersRoute = require('./routes/users.route');

//Response version API
app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', async (req, res) => {
  res.status(200).json({ version: 'API 1.0' });
});

//Các API sẽ bắt đầu bằng api
app.use('/api/v1', usersRoute);
```

## 💛 TEST API

- REST Client (Huachao Mao) Extension
- PostMan: <https://www.postman.com/downloads/>

## 💛 Tạo Controller

Tiếp tục refactor các routes, chuyển thành các controllers

Tách xử lý business logic ra khỏi routes, giúp routes gọn hơn, dễ nhìn hơn

Tạo file src/controllers/users.controller.js

```js
const createError = require('http-errors');
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
exports.getAllUsers = async (req, res) => {
  res.status(200).json(users);
};

// Get a user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = await users.find((user) => user.id === id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  console.log('createUser');
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  console.log('updateUserById');
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  console.log('deleteUserById');
};
```

refactor lại phần users Route src/routes/v1/users.route.js

```js
const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUserById);

router.delete('/:id', usersController.deleteUserById);

module.exports = router;
```

Sử dòng này ở app.js

```js
//app.use('/api/v1', usersRoute);
app.use('/api/v1/users', usersRoute);
```

## 💛 Tạo Service

Nếu bạn muốn tách phần xử lý business logic fetch Data ra khỏi controller
thì tạo thêm lớp Service. Controller chỉ nhận data và trả lại response

Tạo file src/services/users.service.js

Lưu ý: nó trả về Data cho Controller nên sử dụng return

```js
const createError = require('http-errors');
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
exports.getAllUsers = async (users) => {
  return users;
};

// Get a user by ID
exports.getUserById = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = await users.find((user) => user.id === id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    return user;
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.createUser = async () => {
  console.log('createUser');
  return users;
};

// Update a user by ID
exports.updateUserById = async () => {
  console.log('updateUserById');
  return users;
};

// Delete a user by ID
exports.deleteUserById = async () => {
  console.log('deleteUserById');
  return users;
};
```

Khi đó user Controller bạn refactor lại như sau:

chuyển hết phần hander error sang service

```js
const createError = require('http-errors');
const usersService = require('../services/users.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  console.log('createUser');
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
  console.log('updateUserById');
};

// Delete a user by ID
exports.deleteUserById = async (req, res, next) => {
  console.log('deleteUserById');
};
```

Còn không bạn có thể dừng lại ở mức cơ bản là controller, fetch Data và trả
lại response.

## 💛 Validate Requests

- validate Body parameter
- validate Path parameter
- validate Query parameter

**Bước 1:** Chúng ta cần tạo một Middleware để handle validate `src\middlewares\validateSchema.middleware.js`

Sử dụng thư viện `joi` để validate

Chi tiết cách sử dụng joi xem ở [link sau](https://joi.dev/api/?v=17.9.1)

```js
const Joi = require('joi');
const _ = require('lodash');

//Midleware validateSchema
const validateSchema = (schema) => (req, res, next) => {
  //dùng pick để chỉ chọn ra các phần tử cần lấy
  const pickSchema = _.pick(schema, ['params', 'body', 'query']);
  const object = _.pick(req, Object.keys(pickSchema));
  const { value, error } = Joi.compile(pickSchema)
    .prefs({
      errors: {
        label: 'key',
      },

      abortEarly: false,
    })
    .validate(object);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    return res.status(400).json({
      status: 400,
      type: 'validateSchema Joi',
      message: errorMessage,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validateSchema;
```

**Bước 2:** Tạo các Schema Validation

Tạo folder `src/validations`

Trong folder này tạo file `user.validation.js

```js
const Joi = require('joi');

const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getUserById,
};
```

Giải thích: chúng ta Cần validate cho sự kiện getUserById khi gọi

```code
localhost:8686/api/v1/users/:id
```

Validate `id` phải được truyền vào yêu cầu là số

Chúng ta lần lượt tạo thêm các Schema cho từng route của user Resources

## 💛 User Authentication, Authorization

- Tạo user Token
- Tạo Middleware xác thực token
- Tạo Roles phân quyền truy cập routes

Trong thực tế khi xây dựng một hệ thống Restull API sẽ có:

- Các endpoint ở chế độ public tức ai cũng có thể truy cập vào
- Các endpoint ở chế độ private, chỉ những ai có quyền mới truy cập

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

Tạo Route Auth src/routes/v1/auth.route.js

```js
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');
const validateSchema = require('../../middlewares/validateSchema.middleware');
const authValidation = require('../../validations/auth.validation');

//http://localhost:8686/api/v1/auth
router.post(
  '/',
  validateSchema(authValidation.userLogin),
  authController.userLogin
);

module.exports = router;
```

Gắn route Auth vào app.js

```js
//...
const authRouteV1 = require('./routes/v1/auth.route');

app.use('/api/v1/auth', authRouteV1);
```

Tạo Controller Auth src/controllers/auth.controller.js

User login sẽ mang theo payload là email và password

```js
const { authService } = require('../services/auth.service');
const responseHandler = require('../utilities/responseHandler');

const userLogin = catchAsync(async (req, res) => {
  const user = await authService.userLogin(req.body);
  requestHandler.sendJsonSuccess(res)(user);
});
module.exports = {
  userLogin,
};
```

Tạo Service Auth src/services/auth.service.js

```js

```
