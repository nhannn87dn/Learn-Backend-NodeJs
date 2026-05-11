import express from 'express';
import type { Express } from 'express';
import createError from 'http-errors';

import userRoute from "./routes/v1/users.route";
import userRouteV2 from "./routes/v2/users.route";
import studentRoute from "./routes/v1/students.route";
import categoryRoute from "./routes/v1/categories.route";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next)=>{
    res.send('Hello World!');
})
//Gắn route users
app.use('/api/v1/users', userRoute);
//Gắn route students
app.use('/api/v1/students', studentRoute);
app.use('/api/v2/users', userRouteV2);
//Gắn route categories
app.use('/api/v1/categories', categoryRoute);

//Xử lý lỗi 404
app.use((req, res, next)=>{
    next(createError(404, 'Not Found'));
})

//Xử lý lỗi chung (bao gồm lỗi 404)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction)=>{
    const statusCode = err.status || 500;
    res.status(statusCode).json({
         statusCode: statusCode,
        message: err.message || 'Internal Server Error'
    });
});

export default app;