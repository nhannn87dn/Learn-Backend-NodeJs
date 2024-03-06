var express = require("express");
var router = express.Router();

/* GET users listing. */
//usser
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:username/:id", function (req, res, next) {
  let p = req.params;
  console.log("params", p);
  console.log("query", req.query);
  let username = req.params.username;
  console.log(username);
  res.send(username);
});

router.get("/json", function (req, res, next) {
  res.json({ name: "John", age: 30 });
});

router.get("/r", function (req, res, next) {
  res.redirect("/products");
});

router.get("/download", function (req, res, next) {
  const file = `${__dirname}/../public/file.txt`;
  console.log(file);
  res.download(file); // Gửi tệp tin đến client
});

module.exports = router;
