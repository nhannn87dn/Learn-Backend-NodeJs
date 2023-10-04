import dotenv from 'dotenv';
//const dotenv = require("dotevn")
import express, { Express, Request, Response } from 'express';
const app: Express = express();
dotenv.config();

//Khai báo port cho server
const PORT = process.env.PORT || 9000;

//Để nhận định dạng json gửi lên từ client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Danh sách các routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

//Khởi tạo server ở PORT đã chỉ định ở trên
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});