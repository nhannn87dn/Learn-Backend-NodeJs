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
    name: Joi.string().max(160).required(),
    slug: Joi.string().required(),
    content: Joi.string().max(500).optional(),
    image: Joi.string().max(255).optional()
  })
};


const updateById = {
  body: Joi.object().keys({
    name: Joi.string().max(160).required(),
    slug: Joi.string().required(),
    content: Joi.string().max(500).optional(),
    image: Joi.string().max(255).optional()
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
