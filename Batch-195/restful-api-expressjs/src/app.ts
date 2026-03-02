import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import taskRouter from './routes/v1/tasks.route';
import brandRouter from './routes/v1/brands.route';
import categoryRouter from './routes/v1/categories.route';
import productRouter from './routes/v1/products.route';
import { logMiddleware } from './middlewares/log.middleware';
import staffRouter from './routes/v1/staffs.route';
import authRouter from './routes/v1/auth.route';
import cors from 'cors';


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware)

//CORS
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, //allow cookies
}));

/*** BEGIN DECLARE ROUTES */
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Mount task routes
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/staffs', staffRouter);
app.use('/api/v1/auth', authRouter);

/*** END DECLARE ROUTES */

/** Handle Errors */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    statusCode: err.status || 500,
    message: err.message,
    data: null,
  });
});

export default app;
