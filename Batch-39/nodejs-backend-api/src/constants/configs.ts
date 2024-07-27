import dotenv from 'dotenv'
dotenv.config()

/**
 * lấy được các biến môi trường
 * từ file .env
 */

export const globalConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
}