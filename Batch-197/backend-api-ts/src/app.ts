import express, { type Express, type Request, type Response } from 'express';
import categoriesRouter from "./routes/v1/categories.route"
const app: Express = express();

// Middleware để parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


//Khai báo route cho categories
app.use('/api/v1/categories', categoriesRouter);

export default app;
