const Joi = require('joi');
const _ = require('lodash');

//Midleware validateSchema
const validateSchema = (schema) => (req, res, next) => {
  //dùng pick để chỉ chọn ra các phần tử cần lấy
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
    return res.status(400).json({
      status: 400,
      type: 'validateSchema Joi',
      message: errorMessage,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validateSchema;