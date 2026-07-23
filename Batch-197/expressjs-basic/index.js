const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Home Page Express');
});

app.get('/users', (req, res)=>{
    res.json([
      { id: 1, name: "Tom" },
      { id: 2, name: "John" },
    ])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});