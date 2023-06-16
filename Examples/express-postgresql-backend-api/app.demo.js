const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000;

const db = require('./queries')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })



app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})



// Middleware xử lý lỗi 404
const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'Không tìm thấy' });
  };
  

  
  // Middleware xử lý lỗi
  const errorHandler = (err, req, res, next) => {
    console.error('Lỗi:', err);
  
    // Xử lý lỗi dựa trên loại lỗi
    if (err instanceof CustomError) {
      // Xử lý lỗi tùy thuộc vào loại lỗi cụ thể
      return res.status(err.statusCode).json({ error: err.message });
    }
  
    // Xử lý lỗi mặc định
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  };
  

// Sử dụng middleware xử lý 404
app.use(notFoundHandler);
// Sử dụng middleware xử lý lỗi
app.use(errorHandler);
  