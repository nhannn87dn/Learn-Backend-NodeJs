const Joi = require('joi');
const _ = require('lodash');
const { sendJsonErrors } = require('../helpers/responseHandler');

const validateSchema = (schema) => (req, res, next) => {
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
      .map((detail) => detail.message)
      .join(', ');
    return sendJsonErrors(req,res, {
      status: 400,
      message: errorMessage,
    }, 'validateSchema');

  }
  Object.assign(req, value);
  return next();
};

module.exports = validateSchema;
