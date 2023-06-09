
require('dotenv').config();

const configs = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8686,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = configs;
