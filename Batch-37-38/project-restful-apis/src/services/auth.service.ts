import createError from 'http-errors';
import jwt  from 'jsonwebtoken';
import Staff from  '../models/staff.model'
import globalConfig from '../constants/config';
import { IStaff} from '../types/models';

const AuthLogin = async (staffBody: {email: string, password: string}) => {
  console.log('2 ==> ', staffBody);
  //Tìm xem có tồn tại staff có email không
  let staff: IStaff | null = await Staff.findOne({
    email: staffBody.email,
  });

  if (!staff) {
    throw createError(401, 'Invalid email or password');
  }

  //const invalidPasword = staff.comparePassword(staffBody.password);
  const invalidPasword = staff.password === staffBody.password;

  if (!invalidPasword) throw  createError(401, 'Invalid email or password');

  //Tồn tại thì trả lại thông tin staff kèm token
  const token = jwt.sign(
    { _id: staff._id, email: staff.email},
    globalConfig.JWT_SECRET as string,
    {
        expiresIn: '7d', // expires in 7days
      }
  );

  const refreshToken  = jwt.sign(
    { _id: staff._id, email: staff.email},
    globalConfig.JWT_SECRET as string,
    {
      expiresIn: '365d', // expires in 24 hours (24 x 60 x 60)
    }
  );


  return {
    staff: { id: staff._id, email: staff.email},
    token,
    refreshToken
  };
}


const refreshToken  = async (staff: IStaff) => {
  const refreshToken  = jwt.sign(
    { _id: staff._id, email: staff.email},
    globalConfig.JWT_SECRET as string,
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