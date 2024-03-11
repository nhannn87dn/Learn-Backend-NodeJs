# Middleware and Authentication



## 💛  Tổng quan Middleware

### 🌻  Middleware là gì ?

Trong lấp trình ứng dụng WEB, Middleware sẽ đóng vai trò trung gian giữa request/response (tương tác với người dùng) và các xử lý logic bên trong web server.

Middleware sẽ là các hàm được dùng để tiền xử lý, lọc các request trước khi đưa vào xử lý logic hoặc điều chỉnh các response trước khi gửi về cho người dùng.

![middleware-partern](img/middleware-partern.png)

Hình trên mô tả 3 middleware có trong ExpressJS. Một request khi gửi đến Express sẽ được xử lý qua 5 bước như sau :

1. Tìm Route tương ứng với request
2. Dùng CORS Middleware để kiểm tra cross-origin Resource sharing của request
3. Dùng CRSF Middleware để xác thực CSRF của request, chống fake request
4. Dùng Auth Middleware để xác thực request có được truy cập hay không
5. Xử lý công việc được yêu cầu bởi request (Main Task)

Bất kỳ bước nào trong các bước 2,3,4 nếu xảy ra lỗi sẽ trả về response thông báo cho người dùng, có thể là lỗi CORS, lỗi CSRF hay lỗi auth tùy thuộc vào request bị dừng ở bước nào.

**Middleware trong ExpressJS** về cơ bản sẽ là một loạt các hàm Middleware được thực hiện liên tiếp nhau. Sau khi đã thiết lập, các request từ phía người dùng khi gửi lên ExpressJS sẽ thực hiện lần lượt qua các hàm Middleware cho đến khi trả về response cho người dùng. Các hàm này sẽ được quyền truy cập đến các đối tượng đại diện cho Request - req, Response - res, hàm Middleware tiếp theo - next, và đối tượng lỗi - err nếu cần thiết.

Một hàm Middleware sau khi hoạt động xong, nếu chưa phải là cuối cùng trong chuỗi các hàm cần thực hiện, sẽ cần gọi lệnh next() để chuyển sang hàm tiếp theo, bằng không xử lý sẽ bị treo tại hàm đó.

Trong Express, có 5 kiểu middleware có thể sử dụng :

- Application-level middleware (middleware cấp ứng dụng)
- Router-level middleware (middlware cấp điều hướng - router)
- Error-handling middleware (middleware xử lý lỗi)
- Built-in middleware (middleware sẵn có)
- Third-party middleware (middleware của bên thứ ba)

## 🌻 Cách để tạo ra một middleware theo nhu cầu

Tại thư mục middleware, tạo một file tên: mylogger.middleware.ts

```js
//Tạo và export luôn
module.exports = function (req: Request, res: Response, next: NextFunction) {
  //Logic Here
  console.log('LOGGED', req);

  //Có thể gắn Thêm vào request một biến
  req.aptech = { name: 'Softech', add: '38 yen bai' };

  //End with next() -> chuyển tiếp sang middleware khác nếu có
  next();
};
```

### 🌻 Gắn middleware vào Application

Tại express app

```js
const myLogger require('./middlewares/mylogger.middleware');

//Gắn middleware vào app
app.use(myLogger);
```

### 🌻 Lớp middleware

Tạo thêm 2 ví dụ về middleware nữa để thấy được sự chuyển tiếp giữa các lớp middleware


## 💛 JWT Token

Tìm hiểu [JWT](../Day-15-Advanced/JWT.md)

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


## 💛 Chuẩn hóa định dạng JSON API trả về

Không có bất kỳ quy tắc nào để ràng buộc cách bạn trả về một chuổi JSON có cấu trúc như thế nào cả.

Tuy nhiên dưới đây là một số cách định dạng mà bạn có thể tham khảo:

[JSON API](http://jsonapi.org/) - JSON API covers creating and updating resources as well, not just responses.

[JSend](https://github.com/omniti-labs/jsend) - Simple and probably what you are already doing.

Bạn phải thể hiện được khi có lỗi thì cần trả về gì, khi thành công thì cần trả về cái gì ? Và tất cả các Endpoint API phải có cùng cấu trúc.

Ví dụ: Thành công

```json
{
  "statusCode": "0",
  "message": "Successfully"
}
```

Ví dụ: Thành công có gửi kèm data

```json
{
  "statusCode": "0",
  "message": "Successfully",
  "data": {
    "posts": [
      { "id": 1, "title": "A blog post", "body": "Some useful content" },
      { "id": 2, "title": "Another blog post", "body": "More content" }
    ]
  }
}
```

Trong đó:
- statusCode: là mã code mà bạn tự quy định cho việc xử lý tác vụ
- message: là lời nhắn trả lại cho client
- data: là thông trả lại cho client nếu có

Ví dụ: Thất bại (không có lỗi, chỉ là nó chưa tuân thủ một quy tắc nào đó như là validations)

```json
{
  "statusCode": "400",
  "message": "A title is required"
}
```

Ví dụ: Lỗi (khiến code không thể xử lý)

```json
{
  "statusCode": "500",
  "message": "Can not connect to Datatabase"
}
```

Thông thường người ta tạo ra một bảng danh mục mã lỗi kèm message để đối chiếu khi làm một hệ thống lớn.

| Error Code |    Description     |
| :--------: | :----------------: |
|     0      |    Successfull     |
|     1      |      Pending       |
|    201     | Create new success |
|    404     |   API Not Found    |
|    500     |    Error Server    |

Tạo một file `src\helpers\responseHandler.ts` để handle việc đó

```js
import {Request, Response} from 'express';
const sendJsonSuccess = (res: Response, message = 'Success', code = 200) => {
    return (data: any = null) => {
      const resData = data ? { statusCode: code, message, data} : { statusCode: code, message};
      res.status(code).json(resData);
    };
  };
  
  const sendJsonErrors = (req: Request, res: Response, error: any) => {
    console.log(error);
    return res.status(error.status || 500).json({
      statusCode: error.status || 500,
      message: error.message || 'Unhandled Error',
      error,
    });
  };
  
export {
    sendJsonSuccess,
    sendJsonErrors,
  };


```
