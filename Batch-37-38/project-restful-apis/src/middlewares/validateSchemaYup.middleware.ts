import * as yup from 'yup';
import _ from 'lodash';
import { NextFunction, query, Request, Response } from 'express';

const validateSchemaYup = (schema: object) => async (req: Request, res: Response, next: NextFunction) => {
  const pickSchema = _.pick(schema, ['params', 'body', 'query']);
  const object = _.pick(req, Object.keys(pickSchema));
 
  try {
    const value = await yup.object(pickSchema).validate(object, { abortEarly: false });
    Object.assign(req, value);
    return next();
  } catch (error: any) {
    const errorMessage = error.inner
      .map((detail: any) => detail.message)
      .join(', ');
      return res.status(400).json({
        statusCode: 400,
        message: errorMessage,
        typeError: 'validateSchema'
      });
  }
};

export default validateSchemaYup;
