const configs = require('./src/constants/configs');
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/helpers/mongooseDB');

connectDB()
  .then(() => {
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
    const server = app.listen(configs.PORT, () => {
      console.log(`Server started on port ${configs.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Ngắt kết nối MongoDB khi ứng dụng dừng
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
