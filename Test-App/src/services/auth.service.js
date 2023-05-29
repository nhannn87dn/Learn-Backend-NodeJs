const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const users = require("../constants/users");
/**
 * Ví dụ trên chỉ tạo ra một Mật khẩu đơn giản
 * Nâng cấp lên mật khẩu phức tạp hơn để tăng độ khó
 */

exports.userLogin = async (body) => {
  console.log("2 ==> ",body);
  //Tìm xem có tồn tại user có email không
  let user =  users.find( u => u.email === body.email);

  if (!user) {
    throw createError(400, 'Invalid email or password');
  }

  // So tiếp mật khẩu có đúng không
  if (user.password !== body.password) {
    throw createError(400, 'Invalid email or password');
  }

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign({ _id: user.id, email: user.email }, 'secure_key');

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};
