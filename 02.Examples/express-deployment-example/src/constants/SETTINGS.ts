import dotenv from 'dotenv';

dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MOBGODB_CONNECTION_STRING: process.env.MOBGODB_CONNECTION_STRING,
}