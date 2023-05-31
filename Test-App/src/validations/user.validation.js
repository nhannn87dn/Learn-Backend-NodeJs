const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getUserById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

module.exports = {
  getUserById,
};
