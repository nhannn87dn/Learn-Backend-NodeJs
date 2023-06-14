const Joi = require('joi');
const { objectId, slugFriendly } = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required().max(160),
    slug: Joi.string().lowercase().required().max(160).custom(slugFriendly),
    meteTitle: Joi.string().max(255),
    meteDescription: Joi.string().max(255),
    content: Joi.string().max(500),
    image: Joi.string().max(255),
  }),
};

const updateById = {
  body: Joi.object().keys({
    name: Joi.string().required().max(160),
    slug: Joi.string().lowercase().required().max(160).custom(slugFriendly),
    meteTitle: Joi.string().max(255),
    meteDescription: Joi.string().max(255),
    content: Joi.string().max(500),
    image: Joi.string().max(255),
  }),
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  create,
  updateById,
  getById,
  deleteById,
};