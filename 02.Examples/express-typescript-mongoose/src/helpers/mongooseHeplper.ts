import mongoose  from 'mongoose';
import appConfigs from '../constants/configs';

const connectDB = async () => {
  
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(appConfigs.MONGODB_CONNECT_URL as string, appConfigs.mongooseDbOptions);
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
