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
    description: Joi.string().max(500).optional(),
  }),
};

const updateById = {
  body: Joi.object().keys({
    name: Joi.string().max(160).optional(),
    description: Joi.string().max(500).optional(),
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

module.exports = {
  getById,
  create,
  updateById,
  deleteById,
};