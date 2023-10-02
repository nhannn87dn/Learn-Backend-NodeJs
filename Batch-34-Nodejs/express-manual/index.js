const express = require('express')
const app = express()
const port = 3000

//Bật chế độ nhận json từ client gửi lên
app.use(express.json());

//==> Routes =  định tuyến
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//==> Routes
app.get('/about', (req, res) => {
    res.send('About Page')
})
//==> Routes Static
app.get('/blog', (req, res) => {
    res.send('Blog Page')
})

//Dynamic routes
//dtdd/vivo-y36-128gb ==> khớp
//dtdd/iphone-15-pro-max ==> khớp
//dtdd/123 ==> khớp
//:slug là đại diện cho phần thôgn tin đứng sau /dtdd/*
// :slug thùng hàng route params (req.params)
//req sẽ mang theo 3 thùng hàng từ client gửi lên
//req.params
app.get('/dtdd/:slug', (req, res) => {
    const {slug} = req.params;
    //const slug = req.params.slug
    res.send(`DTDD slug: ${slug}`)
})

//Get ALl Users
//Thùng 2 thứ 2: Query String 
///users?page=2 => page=2 ==> chính là Query String 
app.get('/users', (req, res)=>{
    
    const page = req.query.page;

    console.log('GET All users',page);
    res.json(req.query)
});


//Regular expression
//==> match chính xác url theo định dạng mình muốn
app.get('/users/:id([0-9]+)', (req, res) => {
    const {id} = req.params;
    res.send(`User ID: ${id}`)
});

//http://localhost:3000/users [POST]
//Thùng hàng thứ 3: nằm ở req.body
app.post('/users', (req, res)=>{
    console.log('POST user');
    if(!req.body.email){
        res.status(404).json({message: 'Bad Request'})
    }
    res.json(req.body);
});

app.put('/users', (req, res)=>{
    console.log('PUT user');
    res.json(req.body);
});

app.delete('/users', (req, res)=>{
    console.log('PUT user');
    res.status(500);
    res.json(req.body);
});
app.patch('/users', (req, res)=>{
    console.log('Patch user');
});


/**
 * Các phương thức trong requests
 * GET --> nhận thông tin
 * POST --> muốn thêm mới, tạo mới 
 * PUT --> muốn update toàn bộ thông tin
 * PATCH --> update, nhưng chỉ 1 phần thông tin
 * DELETE --> xóa 
 */


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})