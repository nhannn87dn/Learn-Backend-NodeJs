import express, { Express, Request, Response } from 'express';
const app: Express = express();

//Để nhận định dạng json gửi lên từ client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Danh sách các routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

//Xuất app ra cho server.ts
export default app