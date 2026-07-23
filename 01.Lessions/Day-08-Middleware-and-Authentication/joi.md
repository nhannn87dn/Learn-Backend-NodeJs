# Cách sử dụng Joi

Tài liệu: https://joi.dev/api/?v=17.12.2

## Cài đặt

```bash
yarn add joi
```

## Sử dụng

Một số trường hợp thông dụng

```js
import Joi from 'joi';
//const Joi = require('joi');

// Define custom validation function for gender
const validateGender = (value, helpers) => {
    if (value === 'male' || value === 'female') {
        return value;
    }
    return helpers.error('any.invalid');
};

// Define custom validation function for phone number
const validatePhone = (value, helpers) => {
    const regex = /^[0-9]{10}$/;
    if (regex.test(value)) {
        return value;
    }
    return helpers.error('string.pattern.base');
};

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
    access_token: [
        Joi.string(),
        Joi.number()
    ],
    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),
    email: Joi.string().
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    //tags là một mảng các chuỗi, có độ dài tối thiểu là 2 và tối đa là 4.
    tags: Joi.array().items(Joi.string()).min(2).max(4).required(),
    //Chỉ chấp nhận 1 trong 2 giá trị
    gender: Joi.string().valid('male', 'female').required(),
    //custom validate
    phone: Joi.string().required().custom(validatePhone, 'custom validation')
    //Khớp với một regex
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    //Kiểu ngày
    from: Joi.date().required(),
    to: Joi.date().min(Joi.ref('from')).required()
})
.with('username', 'birth_year')
.xor('password', 'access_token')
.with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }

```

### Middleware validateSchema with Joi


```js
import Joi from 'joi';
import _ from 'lodash';
import{ NextFunction, Request, Response } from 'express';

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
    return res.status(400).json({
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


## Tạo các Schema Validation

Tạo folder `src/validations`

Trong folder này tạo file `category.validation.ts`

```ts
import Joi from 'joi';

const getCategoryById = {
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
};

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(1).required(),
    description: Joi.string().allow('').optional(),
  }),
};

export default {
  getCategoryById,
  createCategory,
};
```