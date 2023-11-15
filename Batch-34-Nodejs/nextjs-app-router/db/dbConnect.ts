import mongoose from "mongoose";

const connectDB = () => {
  try {

    if(mongoose.connections[0].readyState){
      console.log('Mongodb is ready connected');
      return;
    }
    
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
    mongoose.connect('mongodb://127.0.0.1:27017/TodosTest', mongooseDbOptions)

  } catch (error) {
    console.log(error);
    throw new Error("Connection failed!");
  }
};

export default connectDB;