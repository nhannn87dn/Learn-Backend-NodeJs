
import app from './app';
import {ENV} from './config/env';
import { myDataSource } from './data-source';

const PORT = ENV.PORT || 3000;


//KẾT NỐI DB
myDataSource
  .initialize()
  .then(() => {
      console.log("Data Source has been initialized!");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
  })
  .catch((err) => {
      console.error("Error during Data Source initialization:", err)
      process.exit(1); // Exit the process with an error code
  })
  

