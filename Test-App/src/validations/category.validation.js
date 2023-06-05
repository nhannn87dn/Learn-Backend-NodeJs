const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCategoryById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  getCategoryById,
};
