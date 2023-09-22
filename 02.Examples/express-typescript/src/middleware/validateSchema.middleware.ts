const Joi = require('joi');
const _ = require('lodash');
import{ NextFunction, Request, Response } from 'express';
import responseHandler from '../helpers/responseHandler'

export const validateSchema = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
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
    return responseHandler.sendJsonErrors(res, {
      status: 400,
      message: errorMessage,
      typeError: 'validateSchema'
    });

  }
  Object.assign(req, value);
  return next();
};


