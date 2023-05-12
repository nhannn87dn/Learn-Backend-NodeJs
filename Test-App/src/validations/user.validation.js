const Joi = require('joi');
//const { objectId } = require('./custom.validation');

const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

module.exports = {
  getUserById,
};
