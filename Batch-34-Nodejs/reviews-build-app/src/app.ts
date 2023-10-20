import express, {Express, Request, Response} from 'express';
import userRoute from './routes/v1/users.route';

const app : Express = express();

//==================== DANH SÁCH APP MIDDLEWARE ========//
/***
Muốn nhận được dữ liệu từ Body mà client gửi lên
thì cấu hình như bên dưới
*/
app.use(express.json());
app.use(express.urlencoded());

//==================== DANH SÁCH CÁC ROUTES ========//
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});
//Sử dụng các router bên ngoài app
///localhost:8080/api/v1/users
app.use('/api/v1/users',userRoute);


//==================== HANDLE ERRORS ========//
//404- NOT FOUND

//500 - Internal Server
export default app