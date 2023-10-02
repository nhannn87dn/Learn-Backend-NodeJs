var express = require('express');
var router = express.Router();

//Biến này mô phỏng lấy ra từ database
const products = [
  {id: 1, name: "iPhone 14", price: 300},
  {id: 2, name: "iPhone 15", price: 500},
  {id: 3, name: "iPhone 15 Pro Max", price: 700}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

//Hiển thị danh sách all sản phẩm
router.get('/products', function(req, res, next) {
 
  /**
   * @param1 string, 'product' thì nó lấy file views/product.html để render
   * @param2 json, truyền data từ server đến client
   */
  res.render('category', { title: 'product', products });
});

//HIển thị chi tiết 1 sp dựa vào slug
router.get('/products/:id', function(req, res, next) {
  const {id} =  req.params;

  const product = products.find(product => product.id === parseInt(id))
  /**
   * @param1 string, 'product' thì nó lấy file views/product.html để render
   * @param2 json, truyền data từ server đến client
   */
  res.render('product', { title: 'product', id, product });
});

module.exports = router;
