import dotenv from 'dotenv';

dotenv.config();

/**
 * Lay all bien moi truong trong file nay
 */
export const globalConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 8080,
    PRIVATE_KEY: process.env.PRIVATE_KEY as string
}
