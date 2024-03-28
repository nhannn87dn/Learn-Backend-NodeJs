import Joi from 'joi';
import customerValidator from './custom.validation'


const getAll = {
    query: Joi.object().keys({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).max(50).optional(),
      sortBy: Joi.string().optional().valid('price', 'sort'),
      sortType: Joi.string().optional().valid('ASC', 'DESC'),
      price_min: Joi.number().min(0).optional(),
      price_max: Joi.number().min(0).greater(Joi.ref('price_min')).optional(),
      cat_id: Joi.string().custom(customerValidator.objectId).optional(),
    }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.custom(customerValidator.objectId).required(),
  }),
};


const getProductBySlug = {
  params: Joi.object().keys({
    slug: Joi.custom(customerValidator.slugFriendly).required(),
  }),
};

export default {
    getAll,
    getProductById,
    getProductBySlug
};