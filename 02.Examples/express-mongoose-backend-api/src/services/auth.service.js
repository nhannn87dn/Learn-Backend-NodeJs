const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {JWT_SECRET} = require('../constants/configs')

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
    { _id: user.id, email: user.email, name: user.name},
    JWT_SECRET
  );

  const refreshToken  = jwt.sign(
    { _id: user.id, email: user.email, name: user.name},
   JWT_SECRET,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );


  return {
    user: { id: user.id, email: user.email, name: user.name},
    token,
    refreshToken
  };
}


exports.refreshToken  = async (user) => {
  const refreshToken  = jwt.sign(
    { _id: user.id, email: user.email, name: user.name},
    JWT_SECRET,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );
  return refreshToken;
}