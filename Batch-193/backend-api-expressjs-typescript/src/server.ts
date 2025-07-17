import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose'

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8080;



// Kết nối đến MongoDB
mongoose
.connect(process.env.MONGODB_URI as string)
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