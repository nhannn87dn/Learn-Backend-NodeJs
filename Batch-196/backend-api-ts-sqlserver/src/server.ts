import { ENV } from './config/env';
import app from './app';
import { myDataSource } from './dataSource';

const PORT = ENV.PORT || 3000;


myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
         app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
        
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


