import express, { Express, NextFunction, Request, Response } from 'express';
// import createError from 'http-errors';
import cors from 'cors';
import helmet from "helmet";
import { notFoundHandler, errorHandler } from './middleware';
/* Import Routes */
import authRoute from './routes/auth.route';
import employeesRoutes from './routes/employees.route';
import categoriesRoutes from './routes/categories.route';
import suppliersRoutes from './routes/suppliers.route';
import customersRoutes from './routes/customers.route';
import productsRoutes from './routes/products.route';


const app: Express = express();
/** =====     APP MIDDLEWARE    ==== */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use cors
app.use(cors({ origin: '*' }));
// Use Helmet!
app.use(helmet());

/** =====  ROUTES LIST ==== */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Express + TypeScript Server'});
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/employees', employeesRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/suppliers', suppliersRoutes);
app.use('/api/v1/customers', customersRoutes);
app.use('/api/v1/products', productsRoutes);

/** =====     NOT EDIT BEGIN HERE ==== */
app.use(notFoundHandler);
app.use(errorHandler)

export default app;
