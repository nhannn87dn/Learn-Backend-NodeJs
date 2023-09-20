import express, { Express} from 'express';
import usersController from '../controllers/users.controller';
import { validateSchema } from '../middleware/validateSchema.middleware';
import userSchema from '../validations/users.validation'
const router: Express = express();

/**
 * Get All Users
 * [GET] /api/v1/users 
 * 
 */
router.get('/', usersController.getAllUsers);
  
/**
 * Get a User by ID
 * [GET] /api/v1/users/:id
 * 
 */
router.get('/:id', validateSchema(userSchema.getById), usersController.getUserById);

export default router;
