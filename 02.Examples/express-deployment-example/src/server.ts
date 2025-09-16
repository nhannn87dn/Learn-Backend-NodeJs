import mongoose from 'mongoose';
import app from './app';
import SETTINGS from "./constants/SETTINGS";

const PORT = SETTINGS.PORT || 9000;

/// Start the server
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

mongoose
.connect(SETTINGS.MONGODB_CONNECTION_STRING as string)
.then(() => {
    console.log('⚡️[MongoDB]: Connected to MongoDB. Database: ',SETTINGS.MONGODB_CONNECTION_STRING as string);
    //should listen app here
    app.listen(PORT,()=>{
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
});

