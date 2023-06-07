const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};


const create = {
  body: Joi.object().keys({
    name: Joi.string().max(160).required(),
    slug: Joi.string().allow('').optional(),
    description: Joi.string().max(255).optional(),
    image: Joi.string().max(255).optional()
  }).when(Joi.object({ slug: Joi.string().required() }), {then: Joi.object({
    slug: Joi.string().pattern(/^[a-zA-Z0-9-]+$/).required(),
  })})
};


const updateById = {
  body: Joi.object().keys({
    name: Joi.string().max(160).required(),
    slug: Joi.string().allow('').optional(),
    description: Joi.string().max(255).optional(),
    image: Joi.string().max(255).optional()
  }).when(Joi.object({ slug: Joi.string().required() }), {then: Joi.object({
    slug: Joi.string().pattern(/^[a-zA-Z0-9-]+$/).required(),
  })}),
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
