import mongoose  from 'mongoose';
import { getEnv } from '../common/configs/env';
const connectDB = async () => {
  
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(getEnv().MONGODB_CONNECTION_STRING as string);
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

export { connectDB, disconnectDB };
