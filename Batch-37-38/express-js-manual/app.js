const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cấu hình kiểu tập tin template
app.engine(".html", require("ejs").__express);
// Cấu hình thư mục template views
app.set("views", path.join(__dirname, "views"));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set("view engine", "html");

const product = {
  id: 1,
  name: "Iphone 16",
};

//Dinh nghia rout
app.get("/", (req, res) => {
  //res.status(200).json({ message: "Hello World!" });
  res.render("home");
});

app.get("/about", (req, res) => {
  res.status(200).send("About");
});

app.get("/products", (req, res) => {
  //res.status(200).send("products");

  const products = [
    {
      id: 1,
      name: "Iphone 16",
    },
    {
      id: 2,
      name: "Iphone 17",
    },
    {
      id: 3,
      name: "Iphone 18",
    },
  ];

  res.render("product", {
    product,
    products,
  });
});

app.post("/products", (req, res) => {
  res.send(req.body);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  res.render("product_detail", {
    id,
    product,
  });
});

app.get("/blog", (req, res) => {
  res.status(200).send("blog");
});

app.get("/login", (req, res) => {
  res.status(200).send("login");
});

//404
app.use(function (req, res, next) {
  res.render("notfound");
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
