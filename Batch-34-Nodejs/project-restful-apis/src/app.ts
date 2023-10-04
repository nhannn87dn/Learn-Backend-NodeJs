import express, { Express, Request, Response } from 'express';
import usersRouter from './routes/v1/users.route';
import myloggerMiddleware from './middleware/mylogger.middleware';
import secondsMiddleware from './middleware/seconds.middleware';
import bodyParser from 'body-parser';
import cors from "cors"
const app: Express = express();

const corsOptions = {
  origin: 'https://ecshopvietnam.com', //chỉ cho gọi từ domain này
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Middleware Application ở đây
app.use(cors()); //Cho phép gọi bất kỳ đâu

//app.use(cors(corsOptions)); //cho phép gọi từ một domain xác định

//Để nhận định dạng json gửi lên từ client
//app.use(express.json()); //Built-in middleware 
app.use(bodyParser.json())
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))


app.use(myloggerMiddleware) //Middleware tự định nghĩa
app.use(secondsMiddleware) //Middleware tự định nghĩa

//Gắn thêm một route vào app.ts
//localhost:8080/api/v1/users
app.use('/api/v1',usersRouter);
///Hết Middleware

//Danh sách các routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

//Xuất app ra cho server.ts
export default app