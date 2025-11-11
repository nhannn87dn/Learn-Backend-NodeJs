import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/ENV";


// ✅ Tạo token
export const generateToken = (payload: any, expiresIn: string): string => {
  return jwt.sign(payload, ENV.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  } as jwt.SignOptions);
};

// Tạo access token và refresh token
export const generateTokens = (payload: any) => {
  const accessToken = generateToken(payload, ENV.JWT_ACCESS_TOKEN_EXPIRES_IN);
  const refreshToken = generateToken(payload, ENV.JWT_REFRESH_TOKEN_EXPIRES_IN);
  return { accessToken, refreshToken };
};

// ✅ Xác thực token (verify)
export const verifyToken = (token: string): any | null => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY) as JwtPayload;
    return decoded as any;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
