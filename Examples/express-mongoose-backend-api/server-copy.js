require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8686;

const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI,
    mongooseDbOptions
  )
  .then(() => {
    console.log('Connected to MongoDB');
    //should listen app here

    const server = app.listen(PORT, () => {
      console.log(
        `Server start with port ${PORT}, Open URL localhost:${PORT} on your browser`
      );
    });
  })
  .catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
  });
