import app from './src/app'
import {globalConfig} from './src/constants/configs'
import { myDataSource } from './src/databases/data-soucre'

const PORT = globalConfig.PORT

// Kết nối với SQL server 

myDataSource
    .initialize()
    .then(() => {
        console.log("Kết nối với SQL Server thành công !")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})