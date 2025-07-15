import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose'

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8080;

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Kết nối đến MongoDB
mongoose
.connect('mongodb://localhost:27017/Batch193')
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});