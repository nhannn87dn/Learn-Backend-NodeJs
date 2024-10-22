import app from "./src/app";
import { globalConfig } from "./src/constants/config";
import mongoose from "mongoose";

// Kết nối MongoDB
const connectionString: string = "mongodb://localhost:27017/Batch188";
mongoose
  .connect(connectionString, {
    dbName: "Batch188", //Database name
    maxPoolSize: 100, //Max pool size
    socketTimeoutMS: 60, //Socket timeout
  })
  .then(() => {
    console.log("Connected to MongoDB");
    //Ket noi thanh cong ==> moi di listen express server
    app.listen(globalConfig.PORT, () => {
      console.log(
        `Example app listening on port http://localhost:${globalConfig.PORT}`
      );
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
