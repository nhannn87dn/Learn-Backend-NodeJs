import mongoose from 'mongoose';
import app from './src/app'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 9000;

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
.connect('mongodb://127.0.0.1:27017/Batch3738', mongooseDbOptions)
.then(() => {
    console.log('⚡️[MongoDB]: Connected to MongoDB');
    //should listen app here
    app.listen(PORT,()=>{
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Failed to Connect to MongoDB', err);
});

