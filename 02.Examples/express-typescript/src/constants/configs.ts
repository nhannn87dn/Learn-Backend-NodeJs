import dotenv from 'dotenv';
dotenv.config();

/**
 * Tập trung tất cả các thông số
 * - cấu hình chung
 * - biến môi trường
 *  lại một chỗ
 */
// type appConfigsType = {
//     NODE_ENV: string,
//     PORT: number | string,
//     MONGODB_CONNECT_URL: string | undefined,
//     MONGODB_DATABASE_NAME: string | undefined,
// }
export const appConfigs = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    MONGODB_CONNECT_URL: process.env.MONGODB_CONNECT_URL,
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
}