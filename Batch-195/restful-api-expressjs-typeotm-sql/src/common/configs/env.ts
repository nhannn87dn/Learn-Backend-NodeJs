import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config(); //chấp nhật mặc định file .env
//Muốn custom file .env thì truyền vào như sau:
// dotenv.config({ path: '.env.development' })

//Sử dụng biến môi trường
export const getEnv = () => {
  //return về object chứa các biến môi trường cần thiết
  return {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || '',
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '15m',
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
  };
};
