const express = require('express');
const app = express();
const PORT = 9000;
const path = require('path');
/**
 * Cấu hình để nhận được dữ liệu
 *  từ body của request
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

//dinh nghia mot router
//localhost:9000/
app.get('/', (req, res) => {
    //res.send('Hello World! ');
    res.render('index');
});
//localhost:9000/about
app.get('/about',(req, res)=>{
    res.send('About page updated 12343434');
});

app.post('/users', (req, res)=>{
    res.json([
        {name: 'Teo', age: 10},
        {name: 'Ti', age: 12},
    ])
});

// app.post('/users/:username', (req, res)=>{
//     res.send(`Hello ${req.params.username}`);
// });

/* Chi chap nhan a-z, 0-9, _ */
app.post('/users/:username([a-z0-9_]+)', (req, res)=>{
    res.send(`Hello ${req.params.username}`);
});

app.post('/product/:id(\\d{1,3})', (req, res)=>{
    //const id = req.params.id;
    // route params
    const {id} = req.params;
    // query params
    const {page} = req.query;

    //body
    const body = req.body;

    console.log('<<=== 🚀 body ===>>',body);
    
    res
    .status(400)
    .send(`Product page ${id} - Page ${page}`);
});


// Lang nghe port 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
} );

//Nhan phim Ctrl + C de STOP server