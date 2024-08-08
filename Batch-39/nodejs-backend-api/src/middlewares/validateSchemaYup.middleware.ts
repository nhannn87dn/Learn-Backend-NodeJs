import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

const validateSchemaYup = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
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

    return next();
  } catch (err) {
    //console.log(err);
    if (err instanceof yup.ValidationError) {
      //console.error(err);
      return res.status(400).json({
        statusCode: 400,
        message: err.errors, // err.errors chứa tất cả các thông điệp lỗi
        typeError: 'validateSchema'
      });
    }
    return res.status(400).json({
      statusCode: 400,
      message: 'validate Yup Error',
      typeError: 'validateSchemaUnknown'
    });
  }
};

export default validateSchemaYup;
