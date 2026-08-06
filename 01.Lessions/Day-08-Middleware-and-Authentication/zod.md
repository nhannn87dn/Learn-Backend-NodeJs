# Validation with Zod

## Cài đặt

```bash
pnpm install zod
```

## Tạo middleware validation

```ts
import { ZodError, ZodType} from 'zod';
import { NextFunction, Request, Response } from 'express';

type ValidationErrorItem = {
 field: string;
 message: string;
 code: string;
};


const mapZodIssues = (issues: ZodError['issues']): ValidationErrorItem[] => {
 return issues.map((issue) => ({
  field: issue.path.length > 0 ? issue.path.join('.') : 'request',
  message: issue.message,
  code: issue.code,
 }));
};

const validateSchema = (schema: ZodType) => (req: Request, res: Response, next: NextFunction): void => {
 try {
  const result = schema.safeParse({
   body: req.body,
   query: req.query,
   params: req.params,
  });

  if (!result.success) {
   const errors = mapZodIssues(result.error.issues);

   res.status(400).json({
    success: false,
    statusCode: 400,
    message: 'Request validation failed',
    errors,
   });
   return;
  }

  next();
 } catch (err) {
  if (err instanceof ZodError) {
   const errors = mapZodIssues(err.issues);

   res.status(400).json({
    success: false,
    statusCode: 400,
    message: 'Request validation failed',
    errors,
   });
   return;
  }

  res.status(500).json({
    success: false,
   statusCode: 500,
   message: 'validate Zod Error',
  });
 }
};

export default validateSchema;
```

## Tạo các Schema Validation

Tạo folder `src/validations`

Trong folder này tạo file `category.validation.ts`

```ts
import { z } from 'zod';

const getCategoryById = z.object({
 params: z.object({
  id: z.coerce.number().int().positive(),
 }),
});

export default {
 getCategoryById,
};
```

Giải thích: chúng ta cần validate cho sự kiện `getCategoryById` khi gọi

```code
localhost:8686/api/v1/categories/:id
```

`id` phải được truyền vào request và có kiểu số.

Chúng ta lần lượt tạo thêm các schema cho từng route của category resources.

Ví dụ với schema login:

```ts
import { z } from 'zod';

const authLogin = z.object({
 body: z.object({
  email: z.string().email(),
  password: z.string().min(1),
 }),
});

export default {
 authLogin,
};
```

## Sử dụng trong các routes

```ts
import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import validateSchemaZod from '../../middlewares/zodValidateSchema.middleware';
import categoriesValidation from '../../validations/category.validation';

const router = express.Router();

// Get By ID
// http://localhost:8080/api/v1/categories/:id
router.get('/:id', validateSchemaZod(categoriesValidation.getCategoryById), categoriesController.getCategoryById);

export default router;
```

## Gợi ý đặt middleware

Nếu bạn muốn dùng cho nhiều route khác nhau, hãy đặt `validateSchemaZod(...)` ngay trước controller của từng route cần validate.

Ví dụ với route login:

```ts
router.post('/login', validateSchemaZod(authValidation.authLogin), authController.authLogin);
```

## Lưu ý với Zod

- `z.coerce.number()` rất hữu ích khi validate `params` và `query` vì Express thường nhận giá trị dạng chuỗi.
- `safeParse()` phù hợp cho middleware vì nó không ném lỗi trực tiếp, giúp xử lý response lỗi rõ ràng hơn.
- Nếu bạn muốn dùng lại dữ liệu đã parse, có thể gán `result.data` vào `res.locals` hoặc một biến trung gian riêng.
