import express, { type Express, type Request, type Response } from 'express';
import categoriesRouter from "./routes/v1/categories.route"
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


//Khai báo route cho categories
app.use('/api/v1/categories', categoriesRouter);

export default app;
