const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');

const validateSchema = require('../../middleware/validateSchema.middleware');
const authValidation = require('../../validations/auth.validation');
const { authenticateToken } = require('../../middleware/auth.middleware');

//http://localhost:8686/api/v1/auth
router.post(
  '/',
  validateSchema(authValidation.userLogin),
  authController.userLogin
);

//http://localhost:8686/api/v1/auth/refresh-token
router.post(
  '/refresh-token',
  authenticateToken,
  authController.refreshToken
);

module.exports = router;
