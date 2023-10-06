# Folder Structure Express and Node.Js

Tiếp tục maintenance project theo Follow

>* Tạo Routes theo phiên bản
>* Tạo Controllers
>* Tạo Services
>* Validation Requests
>* Handle Errors inside routes, controllers, services
>


## 💛 Tạo RESTFul-APIs theo phiên bản

Trong thực tế mỗi khi API đã được phát hành và chạy trên môi trường production thực tế. Bạn không thể đi sửa code các API trừ trường hợp bất khả kháng và phải có kế hoạch thông báo đến người dùng.

Tạo ra các phiên bản mới hơn như là để nâng cấp code cho phiên bản cũ.

- Trong thư mục src/routes tạo thêm một thư mục v1

- Maintenance các routes demo phần trước, đưa vào v1

- Resources User

| HTTP Method | Endpoint              | Description                     |
|-------------|-----------------------|---------------------------------|
| GET         | api/v1/users          | Retrieve all users               |
| GET         | api/v1/users/:id      | Retrieve a specific user         |
| POST        | api/v1/users/:id      | Create a new user                |
| PUT         | api/v1/users/:id      | Update a specific user           |
| DELETE      | api/v1/users/:id      | Delete a specific user           |


Tại src/routes/v1 tạo file user.route.ts

```js
import express from 'express';
import createError from 'http-errors';
const router = express.Router();

/* tách thành file json */
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req: Request, res: Response) => {
  res.status(200).json(users);
});

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', async (req: Request, res: Response) => {
  //Thêm một phần tử vào mảng
  const newUsers = {...users,{id: 4: name: 'Trump', email: 'trump@gmail.com'}}

  //trả lại mảng mới
  res.status(200).json(users);
});

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', async (req: Request, res: Response,next) => {
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
router.patch('/users/:id', async (req: Request,  res: Response, next: NextFunction) => {
  // ...
});

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users/:id', async (req: Request,  res: Response, next: NextFunction) => {
  // ...
});

export default  router;
```

Gắn router vào app.ts

```js
import usersRoute from './routes/users.route';

//Response version API
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', async (req: Request, res: Response) => {
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

Tách xử lý business logic ra khỏi routes, giúp routes gọn hơn, dễ nhìn hơn, dễ bão trì hơn

Tạo file src/controllers/users.controller.ts

```js
import createError from 'http-errors';
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  res.status(200).json(users);
};

// Get a user by ID
const getUserById = async (req: Request,  res: Response, next: NextFunction) => {
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
const createUser = async (req: Request, res: Response) => {
  console.log('createUser');
};

// Update a user by ID
const updateUserById = async (req: Request, res: Response) => {
  console.log('updateUserById');
};

// Delete a user by ID
const deleteUserById = async (req: Request, res: Response) => {
  console.log('deleteUserById');
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
```

refactor lại phần users Route src/routes/v1/users.route.ts

```js
import express  from "express";
const router = express.Router();
import usersController from '../../controllers/users.controller';

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUserById);

router.delete('/:id', usersController.deleteUserById);

export default  router;
```

Sử dòng này ở app.ts

```js
//app.use('/api/v1', usersRoute);
app.use('/api/v1/users', usersRoute);
```

## 💛 Tạo Service

Nếu bạn muốn tách phần xử lý business logic fetch Data ra khỏi controller
thì tạo thêm lớp Service. Controller chỉ nhận data và trả lại response

Tạo file src/services/users.service.ts

Lưu ý: nó trả về Data cho Controller nên sử dụng return

```js
import createError from 'http-errors';
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
const getAllUsers = async (users) => {
  return users;
};

// Get a user by ID
const getUserById = async (req) => {
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
const createUser = async () => {
  console.log('createUser');
  return users;
};

// Update a user by ID
const updateUserById = async () => {
  console.log('updateUserById');
  return users;
};

// Delete a user by ID
const deleteUserById = async () => {
  console.log('deleteUserById');
  return users;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
```

Khi đó user Controller bạn refactor lại như sau:

chuyển hết phần hander error sang service

```js
import createError from 'http-errors';
import usersService from '../services/users.service';

const getAllUsers = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getUserById(req);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

// Create a new user
const createUser = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('createUser');
};

// Update a user by ID
const updateUserById = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('updateUserById');
};

// Delete a user by ID
const deleteUserById = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('deleteUserById');
};
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
```

Còn không bạn có thể dừng lại ở mức cơ bản là controller, fetch Data và trả
lại response.

## 💛 Validate Requests

- validate Body parameter
- validate Path parameter
- validate Query parameter

**Bước 1:** Chúng ta cần tạo một Middleware để handle validate `src\middlewares\validateSchema.middleware.ts`

Sử dụng thư viện `joi` để validate

Chi tiết cách sử dụng joi xem ở [link sau](https://joi.dev/api/?v=17.9.1)

```js
import Joi from 'joi';
import _ from 'lodash';
import{ NextFunction, Request, Response } from 'express';
import {sendJsonErrors} from '../helpers/responseHandler'

const validateSchema = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
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
      .map((detail: any) => detail.message)
      .join(', ');
    return sendJsonErrors(res, {
      status: 400,
      message: errorMessage,
      typeError: 'validateSchema'
    });

  }
  Object.assign(req, value);
  return next();
};
export default validateSchema
```

**Bước 2:** Tạo các Schema Validation

Tạo folder `src/validations`

Trong folder này tạo file `user.validation.ts

```js
import Joi from 'joi';

const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

export default {
  getUserById
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

Tạo Schema Login src/validations/auth.validation.ts

```js
import Joi from 'joi';

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default {
  userLogin,
};
```

Tạo Route Auth src/routes/v1/auth.route.ts

```js
import express from 'express';
const router = express.Router();

import authController from '../../controllers/auth.controller';
import validateSchema from'../../middlewares/validateSchema.middleware';
import authValidation from'../../validations/auth.validation';

//http://localhost:8686/api/v1/auth
router.post(
  '/',
  validateSchema(authValidation.userLogin),
  authController.userLogin
);

export default router;
```

Gắn route Auth vào app.ts

```js
//...
import authRouteV1 from './routes/v1/auth.route';

app.use('/api/v1/auth', authRouteV1);
```

Tạo Controller Auth src/controllers/auth.controller.ts

User login sẽ mang theo payload là email và password

```js
import  authService from '../services/auth.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const userLogin = async (req: Request, res: Response) => {
  const user = await authService.userLogin(req.body);
  sendJsonSuccess(res)(user);
};

export default {
  userLogin,
};
```

Tạo Service Auth src/services/auth.service.ts

```js
import  createError from 'http-errors';
import jwt from 'jsonwebtoken';

const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com', password: '123' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com', password: '123' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com', password: '123' },
];

/**
 * Ví dụ trên chỉ tạo ra một Mật khẩu đơn giản
 * Nâng cấp lên mật khẩu phức tạp hơn để tăng độ khó
 */

const userLogin = async (body) => {
  console.log(body);
  //Tìm xem có tồn tại user có email không
  let user = await users.find((user) => user.email === body.email);

  if (!user) {
    throw createError(400, 'Invalid email or password');
  }

  // So tiếp mật khẩu có đúng không
  if (user.password !== body.password) {
    throw createError(400, 'Invalid email or password');
  }

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign({ _id: user.id, email: user.email }, 'secure_key');

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};

export default {
  AuthLogin
}

```
