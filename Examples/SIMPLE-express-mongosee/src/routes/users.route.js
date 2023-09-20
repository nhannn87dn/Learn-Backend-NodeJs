const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const User = require("../models/user.model");
const {authenticateToken} = require('../middleware/auth.middleware')

// Get all users
// localhost:8686/api/v1/users
router.get('/users', async (req, res) => {
  const users = await User.find();
  
  res.status(200).json({
    codeStatus: 200,
    data: users
  });

});

// Create a new user
// localhost:8686/api/v1/users
router.post('/users', authenticateToken, async (req, res,next) => {
  console.log('createUser',req.body);

  try {
    // Lưu xuống database
    const user = await User.create(req.body);
   
   res.status(200).json({
    codeStatus: 200,
    data: user
  });
    
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

    const user = await User.findById(id);

    console.log("<<< getUserById >>>", id, user);
  

    if (!user) {
      throw createError(404, 'User not found');
    }

    res.status(200).json({
      codeStatus: 200,
      data: user
    });

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

    if (!id) {
      throw createError(400, 'Missing user ID');
    }
    
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      codeStatus: 200,
      data: user
    });

    
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

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = await User.findByIdAndDelete(id, {
      new: true,
    });

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }
    res.status(200).json({
      codeStatus: 200,
      data: user
    });

    
  } catch (err) {
    next(err);
  }
});

module.exports = router;