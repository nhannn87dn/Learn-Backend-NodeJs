import app from './app';
import { env } from './helpers/env.helper';
import { myDataSource } from './data-soucre';

const PORT = env.PORT || 8080;

// Khởi động server

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
})
