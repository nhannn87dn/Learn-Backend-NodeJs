import jwt from 'jsonwebtoken';
import { getEnv } from '../common/configs/env';

export const generateToken = (payload: any, expiresIn: string = '1h') => {
  const token = jwt.sign(payload, getEnv().JWT_SECRET as string, { expiresIn } as jwt.SignOptions);
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, getEnv().JWT_SECRET as string);
    return decoded;
  }
    catch (error) {
    throw new Error('Invalid token');
  }
};
