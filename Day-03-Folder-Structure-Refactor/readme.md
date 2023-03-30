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

## 💛 User Authentication, Authorization

- Tạo user Token
- Tạo Middleware xác thực token
- Tạo Roles phân quyền truy cập routes
