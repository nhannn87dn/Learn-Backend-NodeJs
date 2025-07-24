import app from './app';
import mongoose from 'mongoose'
import { env } from './helpers/env.helper';

const PORT = env.PORT || 8080;

// Kết nối đến MongoDB
mongoose
.connect(env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB successfully');
  // Khởi động server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});