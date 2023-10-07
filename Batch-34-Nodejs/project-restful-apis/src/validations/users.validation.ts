import Joi from 'joi';

/***
 * Tất cả các hàm ở đây bạn nên đặt tên giống với controller và service
 */
const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().required(), //Muốn id là số, và bắt buộc điền
  }),
};

const updateItem = {
  params: Joi.object().keys({
    id: Joi.number().required(), //Muốn id là số, và bắt buộc điền
  }),
  body: Joi.object().keys({
    name: Joi.string().empty('').optional(),//optional = có thể ko truyền
    email: Joi.string().email().optional(),//optional = có thể ko truyền, và phải là email
    password: Joi.string().optional(),//optional = có thể ko truyền
  }),
}

export default {
  getUserById,
  updateItem
};