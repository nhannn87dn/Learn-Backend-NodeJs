
//const express = require('express')
import express, {Express, Request, Response} from 'express'
import path from 'path';


const app: Express = express()
const port = 3000

/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));
/* Khai báo thư mục chứa tài nguyên tĩnh */
//app.use(express.static(path.join(__dirname, '../public')))
//Thêm tiền tố ảo vào URL
app.use('/static', express.static(path.join(__dirname, '../public')))


// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');


// Trang chủ
app.get('/', (req: Request, res: Response) => {
  //res.send('Hello World !')
  //res.json({ name: 'John', age: 30 });
  //res.status(201).send('Page not found');

  //const file = `${__dirname}/demo.txt`;
  //res.download(file); // Gửi tệp tin đến client
  res.render('index') //Đang nhắm đến file views/index.html
})

app.get('/contact', (req: Request, res: Response) => {
  //Lấy template html view/contact.html để hiển thịm
  res.render('contact')
})

app.get('/product', (req: Request, res: Response) => {
  res.send('Product Page !')
})

app.post('/product', (req: Request, res: Response) => {
  console.log('body',req.body);
  
  res.send('Product Page - method Post !')
})

// /product/1
/*
:id chính là route prameter

*/
app.get('/product/:id', (req: Request, res: Response) => {
  console.log('params',req.params);
  //const id = req.params.id
  const {id} = req.params
  //Query string
  console.log('query',req.query);
  //res.send('Product Page Details !' + id)

  const product = {
    id: 1,
    name: "Iphone 15 promax",
    price: 200
  }

  const products = [
    {
      id: 1,
      name: "Iphone 15 promax",
      price: 200
    },
    {
      id:2,
      name: "Iphone 16 promax",
      price: 400
    }
  ]

  res.render('product_detail', {
    id,
    product,
    products
  })
})

// /users/nhannn87dn
app.get('/users/:username([a-z-0-9]+)', (req: Request, res: Response) => {
  res.send('User Page Profile !')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})