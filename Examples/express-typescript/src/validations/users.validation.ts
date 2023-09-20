import Joi from 'joi'
import { objectId, passwordVeryStrong } from './custom.validation'
import mongoose from 'mongoose'

/* objectId regex */
const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

/* objectId mongoose */
const getByIdV2 = {
  params: Joi.object().keys({
    id: Joi.custom((value: string, helper: any)=>{
      if(!mongoose.Types.ObjectId.isValid(value)){
        return helper.message(`ID is non-Objectid`);
      }
      return value;
      
    }).required(),
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

export = {
  getById,
  getByIdV2,
  create,
  updateById,
  deleteById
};
