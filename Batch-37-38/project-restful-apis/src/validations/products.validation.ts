import Joi from 'joi';
import customerValidator from './custom.validation'


const getAll = {
    query: Joi.object().keys({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(5).max(50).optional(),
      sortBy: Joi.string().optional().valid('price', 'sort'),
      sortType: Joi.string().optional().valid('ASC', 'DESC'),
    }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.custom(customerValidator.objectId).required(),
  }),
};

export default {
    getAll,
    getProductById
};