const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { User } = require('../models');
const validateSchema = require('../middleware/validateSchema.middleware')
const userValidation = require('../validations/users.validation')
const {authenticateToken} = require('../middleware/auth.middleware')

// Lấy danh sách users
router.get('/', async (req, res,next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      codeStatus: 200,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// Lấy danh sách users by ID
router.get('/:id', authenticateToken, validateSchema(userValidation.getUserById), async (req, res,next) => {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw createError(404, 'User not found');
    }
    res.status(200).json({
      codeStatus: 200,
      data: user
    });
  } catch (error) {
    next(error);
  }
});


// Create a new user
// localhost:8686/api/v1/users
router.post('/users',  async (req, res, next) => {
  console.log('Create a new user');
  try {

    // validate check trung lap email
    if (await User.findOne({ where: { email: req.body.email } })) {
       throw createError(404, 'Email "' + req.body.email + '" is already registered');
    }

    const user = await User.create(req.body);
    
    // hash password
    //user.password = await bcrypt.hash(req.body.password, 10);

    // save user
    const result = await user.save();
    console.log(result);

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result
    });

  } catch (err) {
    next(err);
  }
});

// Update a user
// localhost:8686/api/v1/users/1
router.put('/:id',  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);

    // validate
    const emailChanged = req.body.email && user.email !== req.body.email;
    if (emailChanged && await User.findOne({ where: { email: req.body.email } })) {
        throw createError(404, 'Email "' + req.body.email + '" is already taken');
    }

    // hash password if it was entered
    // if ( req.body.password) {
    //      req.body.password = await bcrypt.hash( req.body.password, 10);
    // }

    // copy body to user and save
    Object.assign(user, req.body);
    const result = await user.save();

    console.log('Update a user',result);
    
    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result
    });

  } catch (err) {
    next(err);
  }
});

// Delete a user
// localhost:8686/api/v1/users
router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await getUser(id);
    const result = await user.destroy();

    console.log(result);

    res.status(200).json({
      codeStatus: 200,
      message: 'Success',
      data: result
    });

  } catch (err) {
    next(err);
  }
});


async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user;
}


module.exports = router;
