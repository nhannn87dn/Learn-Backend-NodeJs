import { ENV } from './config/ENV'
import app from './app'
import { myDataSource } from './data-soucre';


const PORT = ENV.PORT || 9000;

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        //Khi kết nối thành công thì mới lắng nghe cổng
        app.listen(PORT, () => {
            console.log(`Example app listening on port http://localhost:${PORT}`)
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

