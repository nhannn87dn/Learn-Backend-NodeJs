import { ENV } from "./config/env";
import app from "./app";
import mongoose from "mongoose";


const PORT = ENV.PORT;

//Step 1: Kết nối với DB qua mongoose
mongoose
.connect(ENV.MONGODB_URI, {})
.then(() => {
  console.log("✅[database]: Connected to MongoDB");
  //Step 2: Start the server after successful DB connection
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

})
.catch((error) => {
  console.error("❌[database]: Error connecting to MongoDB", error);
});

