import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import taskRouter from './routes/v1/tasks.route';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*** BEGIN DECLARE ROUTES */
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Mount task routes
app.use('/api/v1/tasks', taskRouter);

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
