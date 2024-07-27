import app from './src/app'
import {globalConfig} from './src/constants/configs'
const PORT = globalConfig.PORT || 9000



app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})