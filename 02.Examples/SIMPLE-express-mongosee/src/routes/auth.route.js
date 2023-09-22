const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const validateSchema = require('../middleware/validateSchema.middleware')
const authValidation = require('../validations/auth.validation')
const users = require('../data/users.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} =  process.env;

//http://localhost:8686/api/v1/auth/login
router.post('/login', async (req, res,next) => {
    
  try{

  
    console.log(req.body);
    //Tìm xem có tồn tại user có email không
    let user =  users.find((user) => user.email === req.body.email);

    if (!user) {
      throw createError(400, 'Invalid email or password');
    }

    // So tiếp mật khẩu có đúng không
    if (user.password !== req.body.password) {
      throw createError(400, 'Invalid email or password');
    }

    //Tồn tại thì trả lại thông tin user kèm token
    const token = jwt.sign(
      { _id: user.id, email: user.email },
      JWT_SECRET
      );

      res.status(200).json({
          user: { id: user.id, email: user.email },
          token
        });
 
  } catch (err) {
    next(err);
  }
});
  
module.exports = router;