import dotenv from "dotenv";
dotenv.config();

/**
 * Dùng file này để quản lý các biến môi trường
 * tập trung 1 chỗ
 */
export const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}
