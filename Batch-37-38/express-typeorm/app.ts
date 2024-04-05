import express from "express"
import { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import routerProduct from "./routes/products.route"
import routerCategories from "./routes/categories.route"
import routerBrand from "./routes/brand.route"
import createError  from 'http-errors';
import cors from 'cors'
// create and setup express app
const app = express()
app.use(bodyParser.json())
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: '*' })); //Cho phép gọi bất kỳ đâu

app.use('/products', routerProduct)
app.use('/categories', routerCategories)
app.use('/brands', routerBrand)


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
      statusCode: statusCode, 
      message: err.message 
    });
  });
export default app;