var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/tin-tuc", function (req, res, next) {
  res.send("Tin tuc");
});

//tin-tuc/dien-thoai-iphone-16-ra-mat-123
router.get("/tin-tuc/:slug([0-9a-z_-]+)", function (req, res, next) {
  let slug = req.params.slug;
  res.send("Tin tuc Detail: " + slug);
});

/*
GET http://localhost:3000/products
*/

router.get("/products", function (req, res, next) {
  console.log("GET products");
  res.send("GET products");
});

//POST
router.post("/products", function (req, res, next) {
  console.log("POST products");
  const data = req.body;
  console.log(data);
  res.send("POST products");
});

router.put("/products", function (req, res, next) {
  console.log("put products");
  const data = req.body;
  console.log(data);
  res.send("put products");
});

router.delete("/products", function (req, res, next) {
  console.log("delete products");

  res.send("delete products");
});

module.exports = router;
