import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

/// Tạo token
export const createToken = (payload: object,  expiresIn = '1h') => {
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn } as jwt.SignOptions);
};

/// Xác thực token
export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
