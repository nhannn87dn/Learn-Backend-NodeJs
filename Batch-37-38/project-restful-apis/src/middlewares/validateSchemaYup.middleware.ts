import * as yup from 'yup';
//import _ from 'lodash';
import { NextFunction, Request, Response } from 'express';


const validateSchemaYup = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    console.log(err);
    if (err instanceof yup.ValidationError) {
      console.error(err);
      return res.status(400).json({
        statusCode: 400,
        message: err.message, // Đây là thông điệp lỗi từ Yup
        typeError: 'validateSchema'
      });
    }
    return res.status(400).json({
          statusCode: 400,
          message:'validate Yup Error',
          typeError: 'validateSchemaUnknown'
    });
  }
};

// const validateSchemaYup = (schema: object) => async (req: Request, res: Response, next: NextFunction) => {
//   const pickSchema = _.pick(schema, ['params', 'body', 'query']);
//   // const pickSchema = {
//   //   params: req.params,
//   //   body: req.body,
//   //   query: req.query
//   // }
//   const object = _.pick(req, Object.keys(pickSchema));
 
//   try {
//     const value = await yup.object(pickSchema).validate(object, { abortEarly: false });
//     Object.assign(req, value);
//     return next();
//   } catch (error: any) {
//     const errorMessage = error.inner
//       .map((detail: any) => detail.message)
//       .join(', ');
//       return res.status(400).json({
//         statusCode: 400,
//         message: errorMessage,
//         typeError: 'validateSchema'
//       });
//   }
// };

export default validateSchemaYup;
