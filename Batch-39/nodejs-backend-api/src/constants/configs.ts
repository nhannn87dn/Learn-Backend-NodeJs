import dotenv from 'dotenv'
dotenv.config()

/**
 * lấy được các biến môi trường
 * từ file .env
 */

export const globalConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 9000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}