import appConfigs from './src/constants/configs';
import app from './src/app';
import mongoose from 'mongoose';


const PORT = appConfigs.PORT;

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
    .connect(appConfigs.MONGODB_CONNECT_URL as string, mongooseDbOptions)
    .then(() => {
      console.log('⚡️[MongoDB]: Connected to MongoDB');
      //should listen app here
      const server = app.listen(PORT, () => {
        console.log(`⚡️[Express]: Server is running at http://localhost:${PORT}`);
        });
    
      
    })
    .catch((err) => {
      console.error('Failed to Connect to MongoDB', err);
    });
    
    //Show log debug
    mongoose.set("debug", (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });