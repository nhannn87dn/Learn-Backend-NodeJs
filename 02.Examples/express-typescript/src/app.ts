import express, { Express, NextFunction, Request, Response } from 'express';
// import createError from 'http-errors';
import cors from 'cors';
import helmet from "helmet";
import { notFoundHandler, errorHandler } from './middleware';


/* Import Models */
import usersRoutes from './routes/users.route';
import authRoute from './routes/auth.route'

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

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/auth', authRoute);





/** =====     NOT EDIT BEGIN HERE ==== */
// catch 404 and forward to error handler
// app.use(function (req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });
app.use(notFoundHandler);

// error handler
// app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
//   console.error(err.stack);
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   const statusCode = err.status || 500;
//   res.status(statusCode).json({ statusCode: statusCode, message: err.message });
// });
app.use(errorHandler)

export default app;
