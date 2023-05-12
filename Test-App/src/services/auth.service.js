const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com', password: '123' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com', password: '123' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com', password: '123' },
];

/**
 * Ví dụ trên chỉ tạo ra một Mật khẩu đơn giản
 * Nâng cấp lên mật khẩu phức tạp hơn để tăng độ khó
 */

exports.userLogin = async (body) => {
  console.log(body);
  //Tìm xem có tồn tại user có email không
  let user = await users.find((user) => user.email === body.email);

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
