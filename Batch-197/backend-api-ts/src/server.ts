
import app from './app';
import mongoose from 'mongoose';
import {ENV} from './config/env';

const PORT = ENV.PORT || 3000;


//kết nối mongodb qua mongoose
mongoose.connect(ENV.MONGODB_URI, {
  autoIndex: true, // Tự động tạo index từ schema
})
.then(() => {
  console.log('Connected to MongoDB');
  //Sau đó mới đi vào listen server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Thoát ứng dụng nếu không kết nối được
});


