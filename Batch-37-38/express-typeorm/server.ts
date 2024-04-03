import { myDataSource } from "./data-soucre"
import app from './app';


const PORT = process.env.PORT || 8000;

myDataSource.initialize().then(() => {
    console.log("🚀[SQL Server] Data Source has been initialized!");


        app.listen(PORT, () =>
        console.log(`🚀[ExpressJs] Server ready at: http://localhost:${PORT}`),
        )

})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})