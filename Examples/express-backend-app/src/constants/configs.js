
require('dotenv').config();

const configs = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8686,
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    UPLOAD_DIRECTORY: process.env.UPLOAD_DIRECTORY,
    UPLOAD_FILES_DIR: process.env.UPLOAD_FILES_DIR,
    UPLOAD_FILES_IMG: process.env.UPLOAD_FILES_IMG
}

module.exports = configs;
