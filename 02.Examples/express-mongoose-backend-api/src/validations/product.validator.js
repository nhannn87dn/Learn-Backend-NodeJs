const Joi = require('joi');
const { objectId, slugFriendly } = require('./custom.validation');

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const getBySlug = {
  params: Joi.object().keys({
    slug: Joi.custom(slugFriendly).required(),
  }),
};

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.custom(slugFriendly).required(),
    brandId: Joi.custom(objectId).required(),
    category: Joi.custom(objectId).required(),
    price: Joi.number().required(),
    meteTitle: Joi.string().max(255),
    meteDescription: Joi.string().max(255),
    content: Joi.string().max(3000),
    rating: Joi.number().required().min(0).max(5),
    reviews: Joi.array().items(Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
      customerId: Joi.custom(objectId).required(),
    })),
    thumbnail: Joi.string(),
    images: Joi.array().items(Joi.object({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
      caption: Joi.string().optional(),
      position: Joi.number().optional().default(0),
    })).max(15),
    stock: Joi.number().required().default(0),
    discount: Joi.number().default(0).min(0).max(100),
  }),
};

const updateById = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.custom(slugFriendly).required(),
    brandId: Joi.custom(objectId).required(),
    category: Joi.custom(objectId).required(),
    price: Joi.number().required(),
    meteTitle: Joi.string().max(255),
    meteDescription: Joi.string().max(255),
    content: Joi.string().max(3000),
    rating: Joi.number().required().min(0).max(5),
    reviews: Joi.array().items(Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
      customerId: Joi.custom(objectId).required(),
    })),
    thumbnail: Joi.string(),
    images: Joi.array().items(Joi.object({
      url: Joi.string().optional(),
      alt: Joi.string().optional(),
      caption: Joi.string().optional(),
      position: Joi.number().optional().default(0),
    })).max(15),
    stock: Joi.number().required().default(0),
    discount: Joi.number().default(0).min(0).max(100),
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
  getBySlug,
  create,
  updateById,
  deleteById,
};