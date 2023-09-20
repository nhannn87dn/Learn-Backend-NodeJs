const Joi = require('joi');
const { objectId, passwordVeryStrong } = require('./custom.validation');

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};


const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.custom(passwordVeryStrong).required(),
    role: Joi.string().default('user').valid('user', 'admin', 'root')
  }),
};


const updateById = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.custom(passwordVeryStrong).required(),
    role: Joi.string().default('user').valid('user', 'admin', 'root'),
    isEmailVerified: Joi.boolean().required().default('false'),
  }),
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const deleteById = {
  body: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  getById,
  create,
  updateById,
  deleteById,
};
