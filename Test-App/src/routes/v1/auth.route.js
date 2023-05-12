const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');

const validateSchema = require('../../middlewares/validateSchema.middleware');
const authValidation = require('../../validations/auth.validation');

//http://localhost:8686/api/v1/auth
router.post(
  '/',
  validateSchema(authValidation.userLogin),
  authController.userLogin
);

module.exports = router;
