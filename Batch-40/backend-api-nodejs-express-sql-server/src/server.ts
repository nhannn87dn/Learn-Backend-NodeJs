import app from "./app";
import { env } from "./helpers/env.helper";
import {myDataSource} from './databases/data-source'
const PORT = env.PORT;

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Express Server is running at http://localhost:${PORT}`);
      });   
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
})

