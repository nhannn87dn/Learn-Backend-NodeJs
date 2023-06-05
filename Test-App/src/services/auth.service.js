const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.userLogin = async (userBody) => {
  console.log('2 ==> ', userBody);
  //Tìm xem có tồn tại user có email không
  let user = await User.findOne({
    email: userBody.email,
  });

  if (!user) {
    throw new createError(401, 'Invalid email or password');
  }

  const invalidPasword = await user.comparePassword(userBody.password);

  if (!invalidPasword) throw new createError(401, 'Invalid email or password');

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user.id, email: user.email },
    process.env.JWT_SECURE_KEY
  );

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};
