import dotenv from 'dotenv';
dotenv.config(); //load biến môi trường

//load biến môi trường từ file .env
// quản lý biến môi trường tập trung 1 file
export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'your-secret-key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
}