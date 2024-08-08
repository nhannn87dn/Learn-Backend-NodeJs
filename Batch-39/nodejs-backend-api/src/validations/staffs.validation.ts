import Joi from 'joi'

const createRecord = {
  /**
   * 1 request có 3 thùng hàng
   * Muốn validate thùng nào
   * thì liệt kê vào bên dưới
   */
  // params: Joi.object().keys({
  //   id: Joi.number().required(),
  // }),

  body: Joi.object().keys({
    first_name: Joi.string().min(4).required().label('First_name không hợp lệ'),
    last_name: Joi.string().min(4).required(),
    phone: Joi.string().min(10).max(10).required(),
    email: Joi.string().email().required().lowercase(),
    active: Joi.boolean().optional(),
    password: Joi.string().min(6).required()

  }),
  //query: {}
};

export default {
  createRecord
}