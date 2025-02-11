import express, {Request, Response} from 'express';
import categoriesRouter from './routes/v1/categories.route'
const app = express();

/** -------|| BEGIN REGISTER ROUTES || --------- */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//Đăng ký một route từ file bên ngoài
app.use('/api/v1', categoriesRouter);
/** -------|| END REGISTER ROUTES || --------- */

export default app;