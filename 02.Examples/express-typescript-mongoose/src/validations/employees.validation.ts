import Joi from 'joi'
import { objectId, passwordStrong } from './custom.validation'

/* objectId regex */
const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};



const create = {
  body: Joi.object().keys({
    firstName: Joi.string().min(6).max(12).required(),
    lastName: Joi.string().min(6).max(12).required(),
    phoneNumber: Joi.string().optional(),
    email: Joi.string().email().required(),//optional = có thể ko truyền, và phải là email
    password: Joi.custom(passwordStrong).required(),
    address: Joi.string().required(),
    birthDay: Joi.date().optional(),
  }),
};


const updateById = {
  body: Joi.object().keys({
    firstName: Joi.string().min(6).max(12).optional(),
    lastName: Joi.string().min(6).max(12).optional(),
    phoneNumber: Joi.string().optional(),
    email: Joi.string().email().optional(),//optional = có thể ko truyền, và phải là email
    password: Joi.custom(passwordStrong).optional(),
    address: Joi.string().optional(),
    birthDay: Joi.date().optional(),
  }),
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

export = {
  getById,
  create,
  updateById,
  deleteById
};
