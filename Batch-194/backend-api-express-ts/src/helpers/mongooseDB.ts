import mongoose from 'mongoose';
import { ENV } from '../config/ENV';

export const connectDB = async () => {
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
    await mongoose.connect(ENV.MONGODB_CONNECTION_STRING, mongooseDbOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB', error);
  }
};


