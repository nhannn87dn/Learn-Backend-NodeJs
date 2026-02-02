import app from './app';
import { getEnv } from './common/configs/env';
import mongoose from "mongoose"

const PORT = getEnv().PORT;

mongoose
  .connect(getEnv().MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    //should listen app here
    //Start the server
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });

  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

