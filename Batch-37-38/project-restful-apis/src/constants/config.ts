import dotenv from 'dotenv';

dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MOBGODB_CONNECTION_STRING: process.env.MOBGODB_CONNECTION_STRING,
    GMAIL_EMAIL:process.env.GMAIL_EMAIL,
    GMAIL_PASS_APP: process.env.GMAIL_PASS_APP,
    GMAIL_HOST:process.env.GMAIL_HOST,
    GMAIL_PORT:process.env.GMAIL_PORT,
}