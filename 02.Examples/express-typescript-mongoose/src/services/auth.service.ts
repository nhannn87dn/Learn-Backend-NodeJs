import createError from 'http-errors';
import jwt  from 'jsonwebtoken';
import Employee from  '../models/Employee.model'
import {appConfigs} from '../constants/configs';
import { IEmployee} from '../types/models';

const AuthLogin = async (userBody: {email: string, password: string}) => {
  console.log('2 ==> ', userBody);
  //Tìm xem có tồn tại user có email không
  let user = await Employee.findOne({
    email: userBody.email,
  });

  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const invalidPasword = user.comparePassword(userBody.password);

  if (!invalidPasword) throw  createError(401, 'Invalid email or password');

  //Tồn tại thì trả lại thông tin user kèm token
  const token = jwt.sign(
    { _id: user._id, email: user.email},
    appConfigs.JWT_SECRET as string
  );

  const refreshToken  = jwt.sign(
    { _id: user._id, email: user.email},
    appConfigs.JWT_SECRET as string,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );


  return {
    user: { id: user._id, email: user.email},
    token,
    refreshToken
  };
}


const refreshToken  = async (user: IEmployee) => {
  const refreshToken  = jwt.sign(
    { _id: user._id, email: user.email},
    appConfigs.JWT_SECRET as string,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );
  return refreshToken;
}

export default {
  AuthLogin,
  refreshToken
}