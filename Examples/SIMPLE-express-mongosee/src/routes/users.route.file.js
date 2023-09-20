const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const users = require('../data/users.json');
const fs = require('fs');
const {authenticateToken} = require('../middleware/auth.middleware')

/* System file khởi chạy thì nó đứng ngay thư mục root server */
const fileNameUsers = './src/data/users.json';
console.log(fileNameUsers);
// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  res.status(200).json(users);
});

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', authenticateToken, async (req, res,next) => {
  console.log('createUser',req.body);

  try {

    let randomInteger = Math.floor(Math.random() * 100) + 1;

    let payload = {
      id: randomInteger,
      name: req.body.name,
      email: req.body.email,
      password: '123456',
    };
    console.log('<<< playload >>>',payload);

    newUsers = [...users, payload];
    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    res.status(200).json(newUsers);

    
  } catch (err) {
     next(err);
  }
});

// Get a user by ID
// localhost:8686/api/v1/users/1
router.get('/users/:id', validateSchema(userValidation.getUserById), async (req, res,next) => {
  console.log('getUserById');
 
  try {
    const { id } = req.params;

    console.log('<<<< id>>>',id, typeof id)

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user =  users.find((user) => user.id === parseInt(id));

    console.log('<<<< user >>>',user, users)

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }

});

// Update a user
// localhost:8686/api/v1/users/1
router.put('/users/:id', authenticateToken, async (req, res, next) => {
  console.log('upadteUserById');
  try {
    const { id } = req.params;

    
    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.map((user) => {
      if (user.id === parseInt(id)) {
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;
      }
      return user;
    });

    console.log('after', newUsers);

    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    res.status(200).json(newUsers);

    
  } catch (err) {
     next(err);
  }
});

// Delete a user
// localhost:8686/api/v1/users/1
router.delete('/users', authenticateToken, async (req, res, next) => {
  console.log('deleteUserById');

  try {
    const { id } = req.body;


    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.filter((user) => user.id !== parseInt(id));

    console.log('after', newUsers);

    //Ghi lại file
    fs.writeFileSync(fileNameUsers, JSON.stringify(newUsers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    res.status(200).json(newUsers);

    
  } catch (err) {
    next(err);
  }
});

module.exports = router;