const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.any().required(),
  }),
};

const updateById = {
  body: Joi.object().keys({
    name: Joi.string().optional(),
    value: Joi.any().optional(),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const deleteById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  create,
  updateById,
  deleteById,
};