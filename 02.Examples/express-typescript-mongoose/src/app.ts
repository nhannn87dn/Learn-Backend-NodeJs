import express, { Express, NextFunction, Request, Response } from 'express';
// import createError from 'http-errors';
import cors from 'cors';
import helmet from "helmet";
import { notFoundHandler, errorHandler } from './middleware';


/* Import Models */
import employeesRoutes from './routes/employees.route';
import authRoute from './routes/auth.route';
import categoriesRoutes from './routes/categories.route';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use cors
app.use(cors({ origin: '*' }));
// Use Helmet!
app.use(helmet());

/* Using Routes */

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/categories', categoriesRoutes);




/** =====     NOT EDIT BEGIN HERE ==== */
app.use(notFoundHandler);
app.use(errorHandler)

export default app;
