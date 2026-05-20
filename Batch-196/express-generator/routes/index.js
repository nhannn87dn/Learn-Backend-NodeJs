var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Add more routes here
router.get('/blog', (req, res, next)=>{
  res.send('This is the blog page');
})

// Dynamic route
router.get('/blog/:id', (req, res, next)=>{
  res.send('This is the blog page with id: ' + req.params.id);
})

router.get('/post/:slug', (req, res, next)=>{
  res.send('This is the post page with slug: ' + req.params.slug);
})

//POST request
router.post('/blog', (req, res, next)=>{
  res.send('method is post');
})

//PUT request
router.put('/blog', (req, res, next)=>{
  res.send('method is put');
})

//DELETE request
router.delete('/blog', (req, res, next)=>{
  res.send('method is delete');
})


//PRODUCTS ROUTES
router.get('/products', (req, res, next)=>{
  const query = req.query;
  console.log('<<=== 🚀 query ===>>',query);
  //res.send('This is the products page');
  res.status(400).json({
    message: 'This is the products page',
    query: query
  });
})

router.get('/products/:id', (req, res, next)=>{
  const id = req.params.id;
  console.log('<<=== 🚀 id ===>>',id);
  res.send('This is the products page with id: ' + id);
})

router.post('/products', (req, res, next)=>{
  //body data
  const body = req.body;
  console.log('<<=== 🚀 body ===>>',body);
  
  res.send('This is the products page with post method');
})

module.exports = router;
