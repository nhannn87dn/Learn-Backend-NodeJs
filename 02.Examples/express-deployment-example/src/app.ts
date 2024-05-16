import express, { NextFunction, Express, Request, Response } from "express";
import cors from 'cors'
import { sendJsonErrors } from './helpers/responseHandler';
import createError  from 'http-errors';
import routeCategories from './routes/v1/categories.route'
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: '*' })); //Cho phép gọi bất kỳ đâu

app.get("/", (req, res) => {
        res.send({
            message: "Hello, World!",
        });
})
app.get("/random", (req, res) => {
        res.send({
            number: Math.floor(Math.random() * 100),
   });
});

// Đăng ký route cho products
app.use('/api/v1/categories', routeCategories);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    sendJsonErrors(req,res,err)
});

export default app;