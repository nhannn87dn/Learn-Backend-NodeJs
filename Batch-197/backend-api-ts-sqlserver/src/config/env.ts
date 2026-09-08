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
    MAIL: {
        USER: process.env.MAIL_USER || 'nhannn@softech.vn',
        PASS: process.env.MAIL_APP_PASS || 'jskshogmuytudeml',
        FROM: process.env.MAIL_FROM || 'your_email@gmail.com',
        HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
        PORT: Number(process.env.MAIL_PORT) || 587,
        SECURE: process.env.MAIL_SECURE === 'true',
    },
    DB: {
        NAME: process.env.DB_NAME,
        HOST: process.env.DB_HOST,
        USER_NAME: process.env.DB_USER_NAME,
        PASS: process.env.DB_PASS,
        PORT: Number(process.env.DB_PORT) || 1433,
        TYPE: process.env.DB_TYPE || 'mssql',
        SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
    }
};