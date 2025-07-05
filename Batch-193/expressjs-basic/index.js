const express = require("express"); // import vào
const app = express(); // khởi tạo application
const path = require("node:path");
app.use(express.json()); // Middleware để xử lý JSON body

// cấu hình kiểu tập tin template
app.engine(".html", require("ejs").__express);
// Cấu hình thư mục template views
app.set("views", path.join(__dirname, "views"));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set("view engine", "html");

//Cấu hình tài nguyên tĩnh trong folder public
app.use(express.static(path.join(__dirname, 'public')));

//định 1 route trang chủ
app.get("/", (req, res, next) => {
  //res.send({id: 1, name: 'xyz'}); // in ra body. document.write
  const user = {
    id: 1,
    name: "Tuan",
    email: "tuan@gmail.com",
  };
  const users = [
    { id: 1, name: "Tuan", email: "tuan@gmail.com" },
    {
      id: 2,
      name: "Minh",
      email: "minh@gmail.com",
    },
  ];
  const title = "Home page";
  res.render("index", { title, user,users });
});
app.get("/blog", (req, res, next) => {
  console.log("<<=== 🚀 req.query ===>>", req.query);
  const { page, limit } = req.query;
  res.send("Blog Page ! " + page + "-" + limit);
});
app.get("/blog/:id", (req, res, next) => {
  console.log("<<=== 🚀 req.params ===>>", req.params);
  // const id = req.params.id;
  const { id } = req.params;
  res.send("Blog Page Detail !" + id);
});
app.get("/tin-tuc/:slug", (req, res, next) => {
  res.send("Blog  Detail with slug!");
});

app.get("/users", (req, res) => {
  res.status(205).json({ name: "John", age: 10 });
});

app.post("/users", (req, res) => {
  //body string
  console.log("<<=== 🚀 req.body ===>>", req.body);
  res.send("Method POST");
});
app.put("/users", (req, res) => {
  res.send("Method PUT");
});

app.delete("/users", (req, res) => {
  res.send("Method DELETE v222222222");
});

//Khởi tạo server
// Lắng nghe request từ client gửi lên ở cổng 8080
app.listen(8080, () => {
  console.log("Server running http://localhost:8080");
});
