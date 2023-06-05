const Joi = require('joi');
const { objectId, passwordVeryStrong } = require('./custom.validation');

const getUserById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};


const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.custom(passwordVeryStrong).required(),
    role: Joi.string().default('user').valid('user', 'admin', 'root')
  }),
};


const updateUserById = {
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

const deleteUserById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
