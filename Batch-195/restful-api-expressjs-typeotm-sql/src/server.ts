import app from './app';
import { getEnv } from './common/configs/env';
import { myDataSource } from './data-soucre';

const PORT = getEnv().PORT;


// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        //Start the server
        app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
        });

    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
    

