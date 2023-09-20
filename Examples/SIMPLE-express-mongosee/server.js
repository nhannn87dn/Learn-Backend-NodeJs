require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 8686;

const id =  new mongoose.Types.ObjectId();

console.log('myID',id)

/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect('mongodb://127.0.0.1:27017/myStore', mongooseDbOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    //should listen app here
    const server = app.listen(PORT, () => {
      console.log(`WSV start with port ${PORT} - Link: http://localhost:8686/api`);
    });
    
  })
  .catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
  });