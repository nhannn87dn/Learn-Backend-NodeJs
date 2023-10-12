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

Tạo Schema Login `src/validations/auth.validation.ts`

```ts
import Joi from 'joi';

const authLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default  {
  authLogin,
};
```

Tạo Route Auth Service `src/services/auth.service.ts`

```ts
import createError from 'http-errors';
import jwt  from 'jsonwebtoken';
import User from  '../models/User.model'
import {appConfigs} from '../constants/configs';
import { IUser,UserSchema} from '../types/models';

const AuthLogin = async (userBody: {email: string, password: string}) => {
  console.log('2 ==> ', userBody);
  //Tìm xem có tồn tại user có email không
  let user: UserSchema | null = await User.findOne({
    email: userBody.email,
  });

  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const invalidPasword = user.comparePassword(userBody.password);

  if (!invalidPasword) throw  createError(401, 'Invalid email or password');

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name},
    appConfigs.JWT_SECRET as string
  );

  const refreshToken  = jwt.sign(
    { _id: user._id, email: user.email, name: user.name},
    appConfigs.JWT_SECRET as string,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );


  return {
    user: { id: user._id, email: user.email, name: user.name},
    token,
    refreshToken
  };
}


const refreshToken  = async (user: IUser) => {
  const refreshToken  = jwt.sign(
    { _id: user._id, email: user.email, name: user.name},
    appConfigs.JWT_SECRET as string,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );
  return refreshToken;
}

export default {
  AuthLogin,
  refreshToken
}
```

Tạo Route Auth Controller `src/services/auth.controller.ts`

```ts
import { Request, Response, NextFunction } from "express";
import  authService from '../services/auth.service';
import {sendJsonSuccess} from '../helpers/responseHandler'

const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  console.log('1 ==> auth req', req.body);
  try {
    const user = await authService.AuthLogin(req.body);
    sendJsonSuccess(res)(user);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * Nhận được req.user từ auth.middleware forward qua
     */
    const token = await authService.refreshToken(res.locals.user);
    sendJsonSuccess(res)(token);
  } catch (err) {
    next(err);
  }
};

export default {
  authLogin,
  refreshToken
}
```

Tạo Route Auth `src/routes/auth.route.ts`

```js
import express, { Express } from 'express';
const router: Express = express();
import authController from '../controllers/auth.controller';

//http://localhost:8686/api/v1/auth
router.post('/', authController.authLogin);

export default router;

```

Gắn route Auth vào app.ts

```js
//...
import authRoute from './routes/auth.route';
app.use('/api/v1/auth', authRoute);
```


**Bước 3: Tạo Auth Middleware - Anh gác cổng cho App**

Tạo một file src/middleware/auth.middleware.ts

```js
import jwt, { JwtPayload }  from 'jsonwebtoken'
import User from '../models/User.model'
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import {appConfigs} from '../constants/configs';

interface decodedJWT extends JwtPayload {
   _id?: string
 }

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    try {
      const decoded = jwt.verify(token, appConfigs.JWT_SECRET as string) as decodedJWT;
      //try verify user exits in database
      const user = await User.findById(decoded._id);

      if (!user) {
        return next(createError(401, 'Unauthorized'));
      }
      //Đăng ký biến user global trong app
      res.locals = user;

      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};

export const authorize = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.user.role && !roles.includes(res.locals.user.role)) {
        return next(createError(403, 'Forbidden'));
      }
        // authentication and authorization successful
        next();
    }
}

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