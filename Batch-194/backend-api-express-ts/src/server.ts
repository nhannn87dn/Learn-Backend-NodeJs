import { ENV } from './config/ENV'
import app from './app'
import mongoose from 'mongoose';


const PORT = ENV.PORT || 9000;


/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
};

// Kết nối mongoDB
mongoose
  .connect(ENV.MONGODB_CONNECTION_STRING, mongooseDbOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    //should listen app here
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

//express app listen
app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
