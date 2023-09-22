const Joi = require('joi');
//const { objectId } = require('./custom.validation');

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

/**
 * Ví dụ trên chỉ tạo ra một Mật khẩu đơn giản
 * Nâng cấp lên mật khẩu phức tạp hơn để tăng độ khó
 * Khi đó sẽ validate theo cách khác
 */

module.exports = {
  userLogin,
};
