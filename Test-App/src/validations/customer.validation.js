const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const create = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().pattern(
      /^(0?)(3[2-9]|5[8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    ),
    address: Joi.string().required(),
    birthday: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.when("isMember", {
      is: true,
      then: Joi.string()
        .pattern(
          /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
        )
        .required(),
      otherwise: Joi.string(),
    }),
    isMember: Joi.boolean().default(false),
    isEmailVerified: Joi.boolean().default(false),
  }),
};

const updateById = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().pattern(
      /^(0?)(3[2-9]|5[8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    ),
    address: Joi.string().required(),
    birthday: Joi.date(),
    email: Joi.string().email().required(),
    password: Joi.when("isMember", {
      is: true,
      then: Joi.string()
        .pattern(
          /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
        )
        .required(),
      otherwise: Joi.string(),
    }),
    isMember: Joi.boolean().default(false),
    isEmailVerified: Joi.boolean().default(false),
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
