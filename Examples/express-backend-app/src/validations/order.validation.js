const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getById = {
  params: Joi.object().keys({
    id: Joi.custom(objectId).required(),
  }),
};

const create = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    user: Joi.custom(objectId).required(),
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.custom(objectId).required(),
          quantity: Joi.number().min(1).required().default(1),
          price: Joi.number().min(0).required().default(0),
          discount: Joi.number().min(0).max(100).optional().default(0),
        })
      )
      .required(),
    shippedDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    paidDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    deliveredDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    paymentMethod: Joi.custom(objectId).required(),
    shippingMethod: Joi.custom(objectId).required(),
    status: Joi.string()
      .valid(
        "pending",
        "confirmed",
        "canceled",
        "prepareShipping",
        "shipping",
        "cancelShipping",
        "shipped",
        "paid",
        "refund",
        "finished"
      )
      .optional(),
    actionsLog: Joi.array()
      .items(
        Joi.object({
          action: Joi.string().required(),
          note: Joi.string().required(),
          addTime: Joi.date().required(),
        })
      )
      .optional(),
    total: Joi.number().min(0).required(),
    createdDate: Joi.date().required(),
  }),
};

const updateById = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    user: Joi.custom(objectId).required(),
    products: Joi.array()
      .items(
        Joi.object({
          product: Joi.custom(objectId).required(),
          quantity: Joi.number().min(1).required().default(1),
          price: Joi.number().min(0).required().default(0),
          discount: Joi.number().min(0).max(100).optional().default(0),
        })
      )
      .required(),
    shippedDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    paidDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    deliveredDate: Joi.date().when("createdDate", {
      is: Joi.exist(),
      then: Joi.date().max(Joi.ref("createdDate")).optional(),
      otherwise: Joi.date().optional(),
    }),
    paymentMethod: Joi.custom(objectId).required(),
    shippingMethod: Joi.custom(objectId).required(),
    status: Joi.string()
      .valid(
        "pending",
        "confirmed",
        "canceled",
        "prepareShipping",
        "shipping",
        "cancelShipping",
        "shipped",
        "paid",
        "refund",
        "finished"
      )
      .optional(),
    actionsLog: Joi.array()
      .items(
        Joi.object({
          action: Joi.string().required(),
          note: Joi.string().required(),
          addTime: Joi.date().required(),
        })
      )
      .optional(),
    total: Joi.number().min(0).required(),
    createdDate: Joi.date().required(),
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
