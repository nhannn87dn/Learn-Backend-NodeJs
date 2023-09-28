require('dotenv').config();
import 'reflect-metadata';
import { AppDataSource } from "./AppDataSource";

const app = require("./src/app");
const PORT = process.env.PORT || 9000;

AppDataSource.initialize().then(() => {
    console.log("🚀[SQL Server] Data Source has been initialized!");


        const server = app.listen(PORT, () =>
        console.log(`🚀[ExpressJs] Server ready at: http://localhost:${PORT}`),
        )

})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})