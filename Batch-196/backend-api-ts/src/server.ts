import { ENV } from './config/env';
import app from './app';
import mongoose from 'mongoose';

const PORT = ENV.PORT || 3000;

// Connect to MongoDB
const mongoDBOptions: mongoose.ConnectOptions = {
    autoIndex: true, // Tự động tạo index
}
mongoose.connect(ENV.MONGO_URI, mongoDBOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    // Sau khi kết nối thành công, bạn có thể khởi động server ở đây
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

