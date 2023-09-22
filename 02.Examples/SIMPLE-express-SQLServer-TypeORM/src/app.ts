import * as express from "express"
import {AppDataSource} from "../dataSource"
import userRoutes from "./routes/user.route"
const createError = require('http-errors');
// create and setup express app
const app = express()
app.use(express.json())

// register routes
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.use('/api/v1/users', userRoutes);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.send({ error: err.message });
    });
    
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

module.exports = app;
