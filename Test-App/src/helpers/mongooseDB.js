const mongoose = require('mongoose');
const configs = require('../constants/configs');

const connectDB = async () => {
  const mongooseDbOptions = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(configs.MONGODB_URI, mongooseDbOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB', error);
  }
};

module.exports = { connectDB, disconnectDB };
