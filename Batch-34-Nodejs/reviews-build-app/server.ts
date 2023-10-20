import appConfig from './src/constants/configs';
import app from './src/app';

//Khởi tạo server
app.listen(appConfig.PORT, () => {
  console.log(`Example app listening on port ${appConfig.PORT}`)
});