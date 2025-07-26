import {AnySchema, ValidationError} from 'yup';
import { NextFunction, Request, Response } from 'express';

const validateSchemaYup = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, 
    { 
      abortEarly: false, // abortEarly: false để lấy tất cả lỗi thay vì chỉ lấy lỗi đầu tiên
    }  
  );

  next();

  } catch (err) {
    //console.log(err);
    if (err instanceof ValidationError) {
      // Tạo object lỗi dạng { key: message }
      const errors: Record<string, string> = {};
      if (Array.isArray(err.inner) && err.inner.length > 0) {
        err.inner.forEach((e) => {
          if (e.path) {
            // Lấy tên field từ path (ví dụ: body.email -> email)
            const fieldName = e.path.split('.').pop() || e.path;
            errors[fieldName] = e.message;
          }
        });
      } else if (err.path) {
        const fieldName = err.path.split('.').pop() || err.path;
        errors[fieldName] = err.message;
      }
      res.status(400).json({
        statusCode: 400,
        message: 'Request validation failed',
        errors: errors, // trả về object lỗi
        typeError: 'validateSchema'
      });
      return;
    }

    res.status(500).json({
      statusCode: 500,
      message: 'validate Yup Error',
      typeError: 'validateSchemaUnknown'
    });
  }
};

export default validateSchemaYup;
