import express from 'express';
import bodyParser from 'body-parser';
import categoryRoute from './routes/category.route'
const app = express();

/* bắt được body string từ request */
// app.use(express.urlencoded());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



// Trang chu
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//==== DINH NGHIA ROUTES ==== //
app.use('/api/v1/categories', categoryRoute);

//
export default app