import dotenv from 'dotenv';
dotenv.config();

/**
 * Tập trung tất cả các thông số
 * - cấu hình chung
 * - biến môi trường
 *  lại một chỗ
 */

export default  {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    MONGODB_CONNECT_URL: process.env.MONGODB_CONNECT_URL,
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    mongooseDbOptions: {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}